import { useForm } from "react-hook-form";

type SignupFormInputs = {
  username: string;
  email: string;
  password: string;
};

function Signup() {
  const { register, handleSubmit } = useForm<SignupFormInputs>();

  const onSubmit = (data: SignupFormInputs) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-pink-200 to-pink-100 relative overflow-hidden">
      {/* Decorative circles for background effect */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Signup Card */}
      <div className="relative w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20">
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              {...register("username")}
              type="text"
              placeholder="👤 Username"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition bg-white/60"
            />
          </div>
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="📧 Email"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition bg-white/60"
            />
          </div>
          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="🔒 Password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition bg-white/60"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg transform transition hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-pink-500 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
