import { useState } from "react";
const Login = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="w-full h-full flex flex-grow items-center justify-center border-t-2 border-[#BBC8CA]">
      <form
        action=""
        className="w-[300px] h-[400px] flex flex-col items-center justify-center bg-[#C7FFED] shadow-md rounded-md"
      >
        <div className="flex text-3xl text-[#9C7178] items-center justify-center space-x-6  w-full px-4 font-roboto">
          <div className="flex flex-col items-center w-full cursor-pointer">
            <button className="mb-2">Log in</button>
            {isLogin && (
              <div className="border-[#9C7178] border-[1px] w-[50px]"></div>
            )}
          </div>
          <div className="flex flex-col items-center w-full cursor-pointer">
            <button className="mb-2">Sign up</button>
            {isSignup && (
              <div className="border-[#9C7178] border-[1px] w-[50px]"></div>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-8 w-full my-8 px-9 font-poppins">
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
          {/* <div className="flex flex-col space-y-8"> */}
          {/*   <input */}
          {/*     type="text" */}
          {/*     className="w-full border-b-[#BBC8CA] border-b-2 italic text-[#BBC8CA] outline-none bg-transparent" */}
          {/*     placeholder="Email" */}
          {/*   /> */}
          {/*   <input */}
          {/*     type="text" */}
          {/*     className="w-full border-b-[#BBC8CA] border-b-2 italic text-[#BBC8CA] outline-none bg-transparent" */}
          {/*     placeholder="Phone number" */}
          {/*   /> */}
          {/* </div> */}
          {/**/}
          <div className="font-poppins font-thin italic text-[#9C7178] cursor-pointer">
            Forget password?
          </div>
        </div>
        <button className="border-2 px-6 py-2 rounded-md border-[#9C7178] text-[#9C7178] hover:bg-[#9C7178] hover:text-[#C7FFED] transition duration-200">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
