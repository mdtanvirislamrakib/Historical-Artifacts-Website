import React, { use, useState } from "react";
import Lottie from "lottie-react";
import { User, Mail, Lock, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import signUpLottie from "../assets/signup.json";
import { AuthContext } from "../Authentication/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

const GlassReflection = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-br from-white/10 via-white/0 to-transparent opacity-40 rounded-t-3xl" />
    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-white/5 to-transparent opacity-30 rounded-b-3xl" />
  </div>
);

const SignUp = () => {

  const { SignUpUser, googleLogin, setUser, updateUser } = use(AuthContext)
  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    photoURL: "",
    password: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log("Signup attempt:", formData);

    const form = e.target;
    const name = form.username.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    const lengthValidation = /[A-Za-z\d@$!%*?&]{6,}/;
    const smallLetterValidation = /(?=.*[a-z])/
    const capitalLetterValidation = /(?=.*[A-Z])/
    const digitValidation = /(?=.*\d)/;
    if (lengthValidation.test(password) === false) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password Must be 6 characters",
      });
    } else if (smallLetterValidation.test(password) === false) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must have a small letter!",
      });
    } else if (capitalLetterValidation.test(password) === false) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must have an uppercase letter!",
      });
    } else if (digitValidation.test(password) === false) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must have a number!",
      });
    }

    SignUpUser(email, password)
      .then(result => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photoURL }).then(() => {
          setUser({ ...user, displayName: name, photoURL: photoURL })
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Login!",
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/")
        }).catch(error => {
          setUser(user)
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 1500
          });
        })

      })
      .catch(error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500
        });

      })
  };
  const handleGoogleLogin = () => {
    googleLogin()
      .then(result => {
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${result.user.displayName} Successfully SignUp!`,
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
        });
      })
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
      style={{
        background:
          "linear-gradient(135deg, #18181b 0%, #23232b 50%, #18181b 100%)",
      }}
    >
      {/* // dynamic title add */}
      <Helmet>
        <title>HistoriVault | SignUp</title>
      </Helmet>
      {/* Decorative Background Orbs */}
      <div className="absolute top-[-4rem] left-[-4rem] w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-6rem] right-[-5rem] w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(251,191,36,0.07),transparent_60%)]" />

      <div className="relative w-full max-w-md mx-4 mt-20 px-0 py-0">
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(24,24,27,0.95) 0%, rgba(38,38,42,0.98) 65%, rgba(24,24,27,0.95) 100%)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            border: "1.5px solid rgba(255,255,255,0.12)",
          }}
        >
          <GlassReflection />

          <div className="relative p-8">
            {/* Header & Lottie */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-28 h-28 mb-2 drop-shadow-xl">
                <Lottie
                  animationData={signUpLottie}
                  loop={true}
                  autoplay={true}
                />
              </div>

              <h1 className="text-3xl font-bold text-white mb-1 tracking-wide">
                Create Account
              </h1>
              <p className="text-gray-400 text-sm">
                Sign up to join{" "}
                <span className="text-amber-400 font-semibold">
                  HistoriVault
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-xs font-semibold text-gray-300 mb-1 ml-1"
                >
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-amber-400" />
                  </span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/70 transition-all duration-300 text-sm shadow-sm"
                    placeholder="Your Name"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-gray-300 mb-1 ml-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-amber-400" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/70 transition-all duration-300 text-sm shadow-sm"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Photo URL Field */}
              <div>
                <label
                  htmlFor="photoURL"
                  className="block text-xs font-semibold text-gray-300 mb-1 ml-1"
                >
                  Photo URL
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="h-5 w-5 text-amber-400" />
                  </span>
                  <input
                    type="url"
                    id="photoURL"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/70 transition-all duration-300 text-sm shadow-sm"
                    placeholder="https://your-photo-url.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-300 mb-1 ml-1"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-amber-400" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-12 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/70 transition-all duration-300 text-sm shadow-sm"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-400 hover:text-amber-300 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-semibold hover:from-amber-300 hover:to-amber-500 transition-all duration-200 shadow-lg hover:shadow-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/70 transform hover:scale-[1.03] text-base"
              >
                Create Account
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
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/15 transition-all duration-200 shadow focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            >
              <FcGoogle size={22} />
              <span className="font-medium text-sm">Sign up with Google</span>
            </button>

            {/* Already have account */}
            <div className="mt-8 text-center text-xs text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                Login here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;