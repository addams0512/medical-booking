import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigte = useNavigate();
  return (
    <div className="w-full h-full flex flex-grow items-center justify-center border-t-2 border-[#BBC8CA]">
      <div className="w-[300px] h-[450px] flex flex-col items-center justify-center bg-[#C7FFED] shadow-md rounded-md">
        <div className="flex text-3xl text-[#9C7178] items-center justify-center space-x-6  w-full px-4 font-roboto">
          <div className="flex flex-col items-center w-full cursor-pointer">
            <button onClick={() => navigte("/")} className="mb-2">
              Log in
            </button>
          </div>
          <div className="flex flex-col items-center w-full cursor-pointer">
            <button onClick={() => navigte("/sign-up")} className="mb-2">
              Sign up
            </button>
            <div className="border-[#9C7178] border-[1px] w-[50px]"></div>
          </div>
        </div>
        <form className="flex flex-col space-y-8 w-full my-8 px-9 font-poppins">
          <input
            type="text"
            className="w-full border-b-[#BBC8CA] border-b-2 italic text-[#BBC8CA] outline-none bg-transparent"
            placeholder="Username"
          />
          <input
            type="text"
            className="w-full border-b-[#BBC8CA] border-b-2 italic text-[#BBC8CA] outline-none bg-transparent"
            placeholder="Password"
          />
          <input
            type="text"
            className="w-full border-b-[#BBC8CA] border-b-2 italic text-[#BBC8CA] outline-none bg-transparent"
            placeholder="Email"
          />
          <input
            type="text"
            className="w-full border-b-[#BBC8CA] border-b-2 italic text-[#BBC8CA] outline-none bg-transparent"
            placeholder="Phone number"
          />
          <button className="border-2 px-6 py-2 rounded-md border-[#9C7178] text-[#9C7178] hover:bg-[#9C7178] hover:text-[#C7FFED] transition duration-200">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
