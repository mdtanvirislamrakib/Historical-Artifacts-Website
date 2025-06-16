import React, { use, useState } from 'react';
import Lottie from 'lottie-react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import loginLottie from "../assets/loginLottie.json";
import { AuthContext } from '../Authentication/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

// Utility to create a gentle glass reflection
const GlassReflection = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-br from-white/10 via-white/0 to-transparent opacity-40 rounded-t-3xl" />
    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-white/5 to-transparent opacity-30 rounded-b-3xl" />
  </div>
);


const Login = () => {

  const { login, googleLogin } = use(AuthContext)
  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then(result => {
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${result?.user?.displayName} Successfully Login!`,
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500
        })
      })
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(result => {
        navigate("/")
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${result?.user?.displayName} Successfully Login!`,
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500
        })
      })
  }



  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
      style={{
        background: 'linear-gradient(135deg, #18181b 0%, #23232b 50%, #18181b 100%)',
      }}
    >
      // dynamic title add
      <Helmet>
        <title>HistoriVault | Login</title>
      </Helmet>
      {/* Decorative Background Orbs */}
      <div className="absolute top-[-4rem] left-[-4rem] w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-6rem] right-[-5rem] w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(251,191,36,0.07),transparent_60%)]" />

      <div className="relative w-full max-w-md mx-4 mt-20 px-0 py-0">
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(24,24,27,0.95) 0%, rgba(38,38,42,0.98) 65%, rgba(24,24,27,0.95) 100%)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            border: '1.5px solid rgba(255,255,255,0.12)',
          }}
        >
          <GlassReflection />

          <div className="relative p-8">
            {/* Header & Lottie */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-28 h-28 mb-2 drop-shadow-xl">
                <Lottie
                  animationData={loginLottie}
                  loop={true}
                  autoplay={true}
                />
              </div>
              <h1 className="text-3xl font-bold text-white mb-1 tracking-wide">Welcome Back</h1>
              <p className="text-gray-400 text-sm">Sign in to access <span className="text-amber-400 font-semibold">HistoriVault</span></p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-300 mb-1 ml-1">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-amber-400" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="username"
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/70 transition-all duration-300 text-sm shadow-sm"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-gray-300 mb-1 ml-1">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-amber-400" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    className="w-full pl-11 pr-12 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/70 transition-all duration-300 text-sm shadow-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-400 hover:text-amber-300 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-gray-300 text-xs select-none cursor-pointer">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="accent-amber-500 h-4 w-4 rounded border-gray-700 bg-white/10"
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-amber-400 hover:text-amber-300 transition-colors text-xs font-semibold">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-semibold hover:from-amber-300 hover:to-amber-500 transition-all duration-200 shadow-lg hover:shadow-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/70 transform hover:scale-[1.03] text-base"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 border-t border-gray-700" />
              <span className="px-2 bg-transparent text-gray-400 text-xs">Or</span>
              <div className="flex-1 border-t border-gray-700" />
            </div>

            {/* Social Login Buttons */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/15 transition-all duration-200 shadow focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            >
              <FcGoogle size={22} />
              <span className="font-medium text-sm">Sign in with Google</span>
            </button>

            {/* Sign Up Link */}
            <div className="mt-8 text-center text-xs text-gray-400">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                Create one here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;