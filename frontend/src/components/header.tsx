import { FaClinicMedical } from "react-icons/fa";
const Header = () => {
  return (
    <div className="flex w-full h-[80px] px-8">
      <div className="flex items-center justify-center px-6 h-full">
        <div className="rounded-full h-[50px] w-[50px] bg-[#C7FFED] text-[#9C7178] text-3xl flex items-center justify-center shadow-md cursor-pointer">
          <FaClinicMedical />
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center text-2xl text-[#9C7178]">
        <div className="flex space-x-9">
          <h2>Services</h2>
          <h2>Resources</h2>
          <h2>News</h2>
          <h2>About</h2>
        </div>
      </div>
      <div className="w-[92px] h-full"></div>
    </div>
  );
};

export default Header;
