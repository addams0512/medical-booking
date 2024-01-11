import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../lib/definitions";
import { useMutation } from "react-query";
import { logIn } from "../lib/action";
import { toast } from "sonner";
import { useQueryClient } from "react-query";

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Validation form with useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // useMutation hook to trigger signUp fn and handle success, error
  const mutation = useMutation(logIn, {
    onSuccess: async () => {
      toast.success("Login successfully");
      await queryClient.invalidateQueries("validateToken");
      navigate("/services");
    },
    onError: (errors: Error) => {
      toast.error(errors.message);
    },
  });

  // trigger form to get user input
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="w-full h-full flex flex-grow items-center justify-center border-t-2 border-[#BBC8CA]">
      <div className="w-[300px] h-[450px] flex flex-col items-center justify-center bg-[#C7FFED] shadow-md rounded-md">
        <div className="flex text-3xl text-[#9C7178] items-center justify-center space-x-6  w-full px-4 font-roboto">
          <div className="flex flex-col items-center w-full cursor-pointer">
            <button onClick={() => navigate("/")} className="mb-2">
              Log in
            </button>
            <div className="border-[#9C7178] border-[1px] w-[50px]"></div>
          </div>
          <div className="flex flex-col items-center w-full cursor-pointer">
            <button onClick={() => navigate("/sign-up")} className="mb-2">
              Sign up
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 w-full my-8 px-9 font-poppins items-center"
        >
          <label className="flex flex-col w-full text-bold text-md text-[#9C7178]">
            Email:
            <input
              type="text"
              className="border-b-[#BBC8CA] border-b-2 italic text-[#BBC8CA] outline-none bg-transparent"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500 italic text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </label>
          <label className="flex flex-col w-full text-bold text-md text-[#9C7178]">
            Password:
            <input
              type="password"
              className="w-full border-b-[#BBC8CA] border-b-2 italic text-[#BBC8CA] outline-none bg-transparent"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 italic text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </label>
          <button className="w-[120px] border-2 px-6 py-2 rounded-md border-[#9C7178] text-[#9C7178] hover:bg-[#9C7178] hover:text-[#C7FFED] transition duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
