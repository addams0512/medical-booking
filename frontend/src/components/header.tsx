import { LiaFileMedicalAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { GoBell } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { logOut } from "../lib/action";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useQueryClient } from "react-query";
import { FaRegUser } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

interface ProfileItem {
  icon: any;
  name: string;
}

const Profile: ProfileItem[] = [
  {
    icon: <FaRegUser />,
    name: "My profile",
  },
  {
    icon: <FaRegCalendarAlt />,
    name: "My schedule",
  },
  {
    icon: <FaRegMoneyBill1 />,
    name: "My billing",
  },
  {
    icon: <FiSettings />,
    name: "Settings",
  },
  {
    icon: <FaRegCircleQuestion />,
    name: "Contacts",
  },
  {
    icon: <MdLogout />,
    name: "Log out",
  },
];
const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation(logOut, {
    onSuccess: async () => {
      toast.success("Log Out!");
      await queryClient.invalidateQueries("validateToken");
    },
    onError: (errors: Error) => {
      toast.error(errors.message);
    },
  });
  const handleClickLogout = (item: string) => {
    if (item === "Log out") {
      mutation.mutate();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        !userRef.current?.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      ) {
        setIsOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <div className="inline-flex w-full h-[80px] items-center justify-between px-16">
      <Link
        to="/"
        className="h-full w-fit text-[#9C7178] text-4xl flex items-center justify-center cursor-pointer space-x-2"
      >
        <LiaFileMedicalAltSolid />
        <p className="font-medium text-2xl">HealBook</p>
      </Link>
      <div className="w-fit h-full flex items-center justify-center text-md text-[#9C7178]">
        <div className="flex space-x-9">
          <div className="flex-col items-center justify-center gap-1.5 inline-flex">
            <Link to="/services">Services</Link>
            <div className="self-stretch border-[1px] h-[0px] border-[#9C7178]"></div>
          </div>
          <Link to="/resources">Resources</Link>
          <Link to="/news">News</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
      {isLoggedIn ? (
        <div className="flex text-3xl text-[#9C7178] gap-4 cursor-pointer">
          <GoBell />
          <GoHeart />
          <button
            ref={userRef}
            onClick={() => {
              setIsOpenProfile(!isOpenProfile);
            }}
          >
            <RxAvatar />
          </button>
          {isOpenProfile && (
            <div ref={menuRef} className="flex flex-col dropdownProfile">
              <ul className="w-full flex flex-col text-[16px]">
                {Profile.map((item: ProfileItem) => (
                  <li
                    key={item.name}
                    onClick={() => handleClickLogout(item.name)}
                    className={`flex items-center gap-4 p-2 ${item.name === "My billing" || item.name === "Contacts" ? "border-b-2 border-opacity-40  border-[#BBC8CA]" : ""} `}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/log-in"
          className="w-fit h-[50px] py-5 px-8 bg-[#7BB18E] bg-opacity-60 rounded-xl justify-center items-center flex cursor-pointer"
        >
          <div className="text-[#9C7178] text-xl">Login/Sign-up</div>
        </Link>
      )}
    </div>
  );
};

export default Header;
