import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import type { SignUpFormData } from "../lib/definitions";
import { signUp } from "../lib/action";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useQueryClient } from "react-query";

const Signup = () => {
  const navigte = useNavigate();

  const queryClient = useQueryClient();
  // Validation form with useForm from react-hook-form
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  // useMutation hook to trigger signUp fn and handle success, error
  const mutation = useMutation(signUp, {
    onSuccess: async () => {
      toast.success("Registration Success!");
      await queryClient.invalidateQueries("validateToken");
      navigte("/");
    },

    onError: (errors: Error) => {
      toast.error(errors.message);
    },
  });

  // trigger form to get user input
  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full h-full flex flex-grow items-center justify-center border-t-2 border-[#BBC8CA]">
      <div className="w-[340px] h-[600px] flex flex-col items-center justify-center bg-[#C7FFED] shadow-md rounded-md">
        <div className="flex text-3xl text-[#9C7178] items-center justify-center space-x-6  w-full px-4 font-roboto ">
          <div className="flex flex-col items-center w-full cursor-pointer">
            <Link className="mb-2" to="/">
              Log in
            </Link>
          </div>
          <div className="flex flex-col items-center w-full cursor-pointer">
            <Link className="mb-2" to="/sign-up">
              Sign up
            </Link>
            <div className="border-[#9C7178] border-[1px] w-[50px]"></div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-6 w-full my-6 px-9 font-poppins items-center"
        >
          <label className="flex flex-col w-full text-bold text-md text-[#9C7178]">
            Username:
            <input
              type="text"
              className="w-full border-b-[#BBC8CA] border-b-2 italic text-[#BBC8CA] outline-none bg-transparent"
              {...register("username", { required: "This field is required" })}
            />
            {errors.username && (
              <span className="text-red-500 italic text-sm mt-1">
                {errors.username.message}
              </span>
            )}
          </label>
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
          <label className="flex flex-col w-full text-bold text-md text-[#9C7178]">
            Confirm password:
            <input
              type="password"
              className="w-full border-b-[#BBC8CA] border-b-2 italic text-[#BBC8CA] outline-none bg-transparent"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Your password do not match!";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 italic text-sm mt-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>
          <span>
            <button className="w-[120px] border-2 px-6 py-2 rounded-md border-[#9C7178] text-[#9C7178] hover:bg-[#9C7178] hover:text-[#C7FFED] transition duration-200">
              Sign Up
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
