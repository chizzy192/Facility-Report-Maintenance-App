import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router";
import TechnicanDashboard from "../pages/Technician/TechnicianDashboard";



const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);

    //signUp

    const signUpNewUser = async (name, email, password) => {
        const {data , error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name } // store name in metadata
            }
        });

        
        if(error) {
            console.error('there was a problem signing up:', error);
            return {success: false, error};
        }

        const user = data.user;

        const {  error: profileError} = await supabase
        .from("profiles")
        .insert([
            {
                user_id: user.id,
                full_name: name,
                email: email,
            }
        ]);

          if (profileError) {
            console.log("Profile insert error:", profileError.message);
            return;
        }

        console.log("User and profile created successfully!");

        return { success: true };
    }

    //sign in
    const signInUser = async (email, password ) => {
        try{
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if(error) {
                console.error('sign in error occured: ', error);
                return{success: false, error: error.message };
            }

            setUser(data.user);
            setSession(data.session || null);     
            
            console.log("signin sucessful")
            return{success: true, user: data.user};
            
        } catch (error) {
            console.error("an error occurred:", error)
        }
    }

    const fetchSession = async () => {
        const currentSession = await supabase.auth.getSession();
        console.log(currentSession.data.session);
        setSession(currentSession.data.session);
        setUser(currentSession.data.session?.user || null);
    }

    useEffect(() => {       
        fetchSession();
        //listens to state changes for the auth status
        const {data: authListener} = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user || null);
        })

        return () => {
            authListener.subscription.unsubscribe();
        }
    }, []);

    //signout

    const signOutUser = async () => {
        const { error } = await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        if (error) {
            console.error("there was an error: ", error);
            return { error }; 
        }
    }

    return (
        <AuthContext.Provider value={{session, user, signUpNewUser, signInUser, signOutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}