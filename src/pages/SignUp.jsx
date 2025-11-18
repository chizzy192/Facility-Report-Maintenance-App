import { useEffect, useState } from 'react'
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
import { Wrench } from 'lucide-react'


function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    

    const {signUpNewUser} = UserAuth();
    const navigate = useNavigate();
    console.log(form.name, form.email, form.password)

    const validateForm = () => {
        if(form.name.trim().length < 3) return "Name must be at least 3 characters.";
        if(!form.email.includes("@")) return "Enter a valid email address.";
        if(form.password.length < 6) return "Password must be at least 6 characters.";
        if(form.password !== form.confirmPassword) return "Passwords do not match.";
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
            const result = await signUpNewUser(form.name, form.email, form.password)
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
        <div className='p-2 m-5 bg-background-black/50 rounded-lg border-border/50 shadow-lg border absolute top-0 right-0 w-auto flex justify-center items-center' >
            <Theme style='flex item-center cursor-pointer py-1'/>
        </div>
        <div className='flex flex-col gap-5 sm:w-102 py-6 sm:p-8 rounded-xl shadow-lg bg-white dark:bg-black w-85 min-h-152 px-5 pt-4  border-border/50 border'>
            <form onSubmit={handleSignUp} className=' flex flex-col gap-5 w-full'>
                <figure className='flex flex-col justify-center items-center gap-3'>
                    <Wrench className='h-[30px] w-[30px] text-text-muted'/>
                    
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
                    onChange= {(e)=> setForm({...form, name: e.target.value})}
                />

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
                    onChange= {(e)=> setForm({...form, password: e.target.value})}
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
                    onChange= {(e)=> setForm({...form, confirmPassword: e.target.value})}
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
