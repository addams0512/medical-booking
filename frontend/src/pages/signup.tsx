import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { type SignUpFormData } from "../lib/definitions";
import { signUp } from "../lib/action";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useQueryClient } from "react-query";

const Signup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Validation form with useForm from react-hook-form
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ defaultValues: { role: "patient" } });

  // useMutation hook to trigger signUp fn and handle success, error
  const mutation = useMutation(signUp, {
    onSuccess: async (signUpData) => {
      const { role } = signUpData;

      toast.success("Registration Success!");
      await queryClient.invalidateQueries("validateToken");

      if (role === "doctor") {
        navigate("/doctor-page");
      } else if (role === "patient") {
        navigate("/patient-page");
      } else {
        navigate("/admin-page");
      }
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
    <div className="w-full h-full flex flex-grow items-center justify-center">
      <div className="py-[40px] px-[40px] w-fixed h-fixed flex flex-col items-center justify-center bg-white shadow-md rounded-xl gap-6">
        <div className="flex justify-center items-center w-full text-3xl">
          Create your new account!
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full h-full gap-6 items-center"
        >
          <div className="flex w-full h-full justify-center items-center gap-4">
            <div className="flex flex-col w-full h-full gap-4">
              <label className="flex flex-col w-full h-fixed gap-4 text-xl">
                Username:
                <input
                  type="text"
                  className="py-2 px-2 h-[40px] flex items-center justify-start w-full border-none outline-none bg-[#f6f6f6] rounded-md shadow-md"
                  {...register("username", {
                    required: "This field is required",
                  })}
                />
                {errors.username && (
                  <span className="text-red-500 italic text-sm">
                    {errors.username.message}
                  </span>
                )}
              </label>
              <label className="flex flex-col w-full h-fixed gap-4 text-xl">
                Email:
                <input
                  type="text"
                  className="py-2 px-2 h-[40px] flex items-center justify-start w-full border-none outline-none bg-[#f6f6f6] rounded-md shadow-md"
                  {...register("email", { required: "This field is required" })}
                />
                {errors.email && (
                  <span className="text-red-500 italic text-sm">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            <div className="flex flex-col w-full h-full gap-4">
              <label className="flex flex-col w-full h-fixed gap-4 text-xl">
                Password:
                <input
                  type="password"
                  className="py-2 px-2 h-[40px] flex items-center justify-start w-full border-none outline-none bg-[#f6f6f6] rounded-md shadow-md"
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 italic text-sm">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <label className="flex flex-col w-full h-fixed gap-4 text-xl">
                Confirm password:
                <input
                  type="password"
                  className="py-2 px-2 h-[40px] flex items-center justify-start w-full border-none outline-none bg-[#f6f6f6] rounded-md shadow-md"
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
                  <span className="text-red-500 italic text-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </label>
            </div>
          </div>
          <div className="flex gap-6 justify-center items-center w-full h-full text-md">
            <div className="flex gap-2 items-center justify-center">
              <input
                type="radio"
                value="patient"
                {...register("role", { required: "Please select your role" })}
              />{" "}
              <span>Patient</span>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <input
                type="radio"
                value="doctor"
                {...register("role", { required: "Please select your role" })}
              />{" "}
              <span>Doctor</span>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <input
                type="radio"
                value="admin"
                {...register("role", { required: "Please select your role" })}
              />{" "}
              <span>Admin</span>
            </div>
          </div>

          <div className="w-full flex flex-col flex-grow items-center justify-center gap-4">
            <p className="text-sm">
              Already have an account?{" "}
              <i className="text-[#7BB18E] cursor-pointer">
                <Link to="/log-in">Log in now.</Link>
              </i>
            </p>

            <button className="w-[160px] h-[40px] bg-[#7BB18E] bg-opacity-60 rounded-md text-xl font-regular">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
