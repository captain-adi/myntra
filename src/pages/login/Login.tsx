import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/query";

function Login() {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();

  const onSubmit = (data: { email: string; password: string }) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-pink-100 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20">
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              disabled={isPending}
              {...register("email")}
              type="email"
              placeholder="📧 Email"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition bg-white/60"
            />
          </div>
          <div>
            <input
              disabled={isPending}
              {...register("password")}
              type="password"
              placeholder="🔒 Password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition bg-white/60"
            />
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg transform transition hover:scale-105"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-pink-500 hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
