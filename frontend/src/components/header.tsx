import { FaClinicMedical } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="flex w-full h-[80px] px-8">
      <div className="flex items-center justify-center px-6 h-full">
        <div className="rounded-full h-[50px] w-[50px] bg-[#C7FFED] text-[#9C7178] text-3xl flex items-center justify-center shadow-md cursor-pointer">
          <FaClinicMedical />
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
      {isLoggedIn ?? (
        <div className="flex items-center justify-center px-6 h-full">
          <div className="rounded-full h-[50px] w-[50px] bg-[#C7FFED] text-[#9C7178] text-3xl flex items-center justify-center shadow-md cursor-pointer">
            <GiExitDoor />
          </div>
        </div>
      )}
      <div className="w-[92px] h-full"></div>
    </div>
  );
};

export default Header;
