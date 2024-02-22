import { FaUserDoctor } from "react-icons/fa6";
import { FaRecycle } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";
import { Link } from "react-router-dom";
const DoctorPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-full p-10 ">
      <div className="flex flex-col justify-center items-center w-full h-fit p-10 shadow-2xl gap-10 rounded-2xl">
        <p className="text-4xl text-[#9C7178] font-medium">Welcome, Doctor!</p>
        <div className="flex text-6xl gap-4">
          <div className="text-[#7BB18E]">
            <FaUserDoctor />
          </div>
          <div className="text-black">
            <FaRecycle />
          </div>
        </div>
        <div className="text-xl text-center">
          This is your first time logging in. Please take a moment to complete
          your profile information. Your information helps us tailor our
          services to your needs and ensures you receive the most relevant
          updates and features. Thank you for choosing our platform!
        </div>
        <Link
          to="/step1"
          className="w-full h-full flex justify-end items-center text-xl text-[#9C7178] gap-2 cursor-pointer"
        >
          <p>Next</p>
          <GrLinkNext />
        </Link>
      </div>
    </div>
  );
};

export default DoctorPage;
