import { FaBookMedical } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { logOut } from "../lib/action";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useQueryClient } from "react-query";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(logOut, {
    onSuccess: async () => {
      toast.success("Log Out!");
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (errors: Error) => {
      toast.error(errors.message);
    },
  });
  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <div className="flex w-full h-[80px] px-8">
      <div className="flex items-center justify-center px-6 h-full">
        <div className="rounded-md h-[50px] w-[180px] bg-[#C7FFED] text-[#9C7178] text-3xl flex items-center justify-center shadow-md cursor-pointer space-x-2">
          <FaBookMedical className="rotate-12" />
          <p className="font-semibold italic text-2xl">HealBook</p>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center text-2xl text-[#9C7178]">
        <div className="flex space-x-9">
          <Link to="/services">Services</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/news">News</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
      {isLoggedIn ? (
        <button
          onClick={handleClick}
          className="flex items-center justify-center mx-6 h-full"
        >
          <div className="rounded-full h-[50px] w-[50px] bg-[#C7FFED] text-[#9C7178] text-3xl flex items-center justify-center shadow-md cursor-pointer">
            <GiExitDoor />
          </div>
        </button>
      ) : (
        <div className="w-[92px] h-full"></div>
      )}
    </div>
  );
};

export default Header;
