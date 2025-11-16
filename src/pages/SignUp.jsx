import React, { useEffect, useState } from 'react'
import FormInput from '../components/FormInput'
import user from '../assets/user.svg'
import mailicon from '../assets/mailicon.svg'
import passwordLock from '../assets/passwordLock.svg'
import eyeOpen from '../assets/eyeOpen.svg'
import eyeOff from '../assets/eyeOff.svg'
import Buttons from '../components/Buttons'
import { Link, useNavigate } from 'react-router'
import Theme from '../components/Theme'
import { UserAuth } from '../context/AuthContext'


function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    

    const {signUpNewUser} = UserAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        if(name.trim().length < 3) return "Name must be at least 3 characters.";
        if(!email.includes("@")) return "Enter a valid email address.";
        if(password.length < 6) return "Password must be at least 6 characters.";
        if(password !== confirmPassword) return "Passwords do not match.";
        return null;
    }

    
    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        const validationError = validateForm();
        if(validationError) {
            setError(validationError)
            return;
        }

        setLoading(true);

        try {
            const result = await signUpNewUser(name, email, password)
            if(result.success) {
                setSuccess('Hurray, account successfully created!');
                navigate('/login')
            }
        } catch (err){
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

  return (
    <main className='w-full h-screen flex flex-col justify-center items-center '>
        <div className='p-2 m-5 bg-background-black/50 rounded-lg border-border shadow-lg border absolute top-0 right-0 w-auto flex justify-center items-center' >
            <Theme style='flex item-center cursor-pointer py-1'/>
        </div>
        <div className='bg-background-black flex flex-col gap-5 w-102 lg:w-115 p-8 rounded-xl shadow-lg'>
            <form onSubmit={handleSignUp} className=' flex flex-col gap-5 w-full'>
                <figure className='flex flex-col justify-center items-center gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-wrench-icon lucide-wrench text-text-muted"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/></svg>
                    
                    <figcaption className='flex flex-col justify-center items-center gap-3'>
                        <h2 className='text-text text-2xl'>Create an account</h2>
                        <p className='text-text-muted text-sm text-center'>
                            Create your account to start reporting, tracking, and managing facility issues easily and efficiently.
                        </p>
                    </figcaption>
                </figure>

                <FormInput
                    label = 'Username'
                    formIcon = {user}
                    type='text'
                    name="name"
                    placeholder="John Doe"
                    className='w-5 h-5'
                    onChange= {(e)=> setName(e.target.value)}
                />

                <FormInput
                    label = 'Email Address'
                    formIcon = {mailicon}
                    type='email'
                    name="email"
                    placeholder="you@example.com"
                    className='w-5 h-5'
                    onChange= {(e)=> setEmail(e.target.value)}
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
                    onChange= {(e)=> setPassword(e.target.value)}
                />

                <FormInput
                    label = 'Confirm Password'
                    formIcon = {passwordLock}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm entered password"
                    onClick= {() => {
                        setShowConfirmPassword(!showConfirmPassword)
                    }}
                    eyesIcon = {showConfirmPassword ? eyeOff : eyeOpen}
                    className='w-5 h-5'
                    onChange= {(e)=> setConfirmPassword(e.target.value)}
                />

                {error && <p className='text-error text-sm mt-2'>{error}</p>}

                <Buttons type='submit' disabled={loading} style='cursor-pointer w-full bg-primary-dark p-2 rounded-lg text-white font-bold hover:bg-primary-dark/70' text={loading? 'Loading...' : 'Create Account'} />
            </form>

            <p className='text-text-muted text-center '>
                Already have an account? <Link to='/login' className='text-primary-dark'>Sign In</Link>
            </p>
        </div>

        {success && (<p className='text-success m-3'>{success}</p>)}       
    </main>
  )
}

export default SignUp
