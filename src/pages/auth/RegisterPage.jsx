import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/auth.api";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      localStorage.setItem("token", response.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-5">
      <div className="glass w-full max-w-md rounded-3xl p-8 border border-slate-800 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>

          <p className="text-slate-400">Start tracking your job applications</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Full Name
            </label>

            <input
              {...register("name")}
              type="text"
              placeholder="Enter your full name"
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 outline-none rounded-xl p-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">Email</label>

            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 outline-none rounded-xl p-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>

            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 outline-none rounded-xl p-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Confirm Password
            </label>

            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm password"
              className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 outline-none rounded-xl p-3 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition-all text-black font-semibold py-3 rounded-xl"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400">
            Already have an account?{" "}
            <Link to="/" className="text-cyan-400 hover:text-cyan-300">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
