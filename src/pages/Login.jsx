import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserAuth } from "../context/AuthContext";
import FormInput from "../components/FormInput";
import mailicon from "../assets/mailicon.svg";
import passwordLock from "../assets/passwordLock.svg";
import eyeOpen from "../assets/eyeOpen.svg";
import eyeOff from "../assets/eyeOff.svg";
import Theme from "../components/Theme";
import { supabase } from "../supabaseClient";

function Login() {
    const { signInUser } = UserAuth();
    const [form, setForm] = useState({
      email: '',
      password: ''
    })

    const [showPassword, setShowPassword] = useState(false);
    
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);  
    const navigate = useNavigate();

    const validateForm = () => {
        if (!form.email.includes("@")) return "Enter a valid email.";
        if (form.password.length < 6) return "Password must be at least 6 characters.";
        return null;
    };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const result = await signInUser(form.email, form.password);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    const loggedInUser = result.user;

    // Fixed: use roleError instead of error
    const { data: profile, error: roleError } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", loggedInUser.id)
    .single();

    if (roleError || !profile) {
      setError("Profile not found");
      setLoading(false);
      return;
    }

    setLoading(false);

    // Navigate based on role
    switch (profile.role) {
      case "admin":
        navigate("/admindashboard");
        break;
      case "technician":
        navigate("/techniciandashboard");
        break;
      case "reporter":
        navigate("/reporterdashboard");
        break;
      default:
        navigate("/reporterdashboard");
        break;
    }
  };

  return (
    <main className='w-full h-screen flex flex-col justify-center items-center '>
        <div className='p-2 m-5 bg-background-black/50 rounded-lg border-border/50 shadow-lg border absolute top-0 right-0 w-auto flex justify-center items-center' >
            <Theme style='flex item-center cursor-pointer py-1'/>
        </div>
        <div className='bg-background-black flex flex-col gap-5 w-80 sm:w-102 lg:w-115 px-6 py-6 sm:p-8 rounded-xl shadow-lg border-border/50 border h-auto'>
          <h2 className="text-text text-2xl mb-3 text-center">Sign In</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <FormInput
                  label = 'Email Address'
                  formIcon = {mailicon}
                  type='email'
                  name="email"
                  placeholder="you@example.com"
                  className='w-5 h-5'
                  onChange= {(e)=> setForm({...form, email: e.target.value})}
              />

              <FormInput
                  label = 'Password'
                  formIcon = {passwordLock}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onClick= {() => {
                      setShowPassword(!showPassword)
                  }}
                  eyesIcon = {showPassword ? eyeOff : eyeOpen}
                  className='w-5 h-5'
                  onChange= {(e)=> setForm({...form,password: e.target.value})}
              />

            {error && <p className="text-error text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-primary-dark p-2 rounded-lg text-white font-bold hover:bg-primary-dark/70"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-text-muted text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary-dark">
              Sign Up
            </Link>
          </p>
        </div>
    </main>
  );
}

export default Login;