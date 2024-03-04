import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginFormData } from "../lib/definitions";
import { useMutation, useQueryClient } from "react-query";
import { logIn } from "../lib/action";
import { toast } from "sonner";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ defaultValues: { role: "patient" } });

  const mutation = useMutation(logIn, {
    onSuccess: async (loginData) => {
      const { role } = loginData;
      toast.success("Login successfully");
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

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-grow w-full h-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] h-fixed flex flex-col bg-white py-[40px] px-[40px] items-center gap-6 rounded-xl shadow-md"
      >
        <div className="text-3xl">Welcome back!</div>
        <div className="flex flex-col w-full gap-6 justify-between items-center">
          <label className="flex flex-col w-full h-fixed gap-4 text-xl">
            Email:
            <input
              type="text"
              className="py-2 px-2 h-[40px] flex items-center justify-start w-full border-none outline-none bg-[#f6f6f6] rounded-md shadow-md"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500 italic text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </label>
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
              <span className="text-red-500 italic text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </label>
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
            Don't have an account?{" "}
            <i className="text-[#7BB18E] cursor-pointer">
              <Link to="/sign-up">Sign up today!</Link>
            </i>
          </p>
          <button className="w-[200px] h-[40px] bg-[#7BB18E] bg-opacity-60 rounded-md text-xl font-regular">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
