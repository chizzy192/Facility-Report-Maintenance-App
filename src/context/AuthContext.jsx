import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../subabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined)

    //signUp

    const signUpNewUser = async (name, email, password) => {
        const {data, error} = await supabase.auth.signUp({
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

        return { success: true };

        // const user = data.user;

        // // Insert profile into users table
        // const { error: userError } = await supabase
        // .from("users")
        // .insert([{
        //     user_id: user.id,
        //     full_name: name,
        //     email: email,
        // }]);

        // if (userError) {
        // console.error("User insert error:", userError);
        // return { success: false, error: userError };
        // }

        // 



    }

    //sign in
    const signInUser = async (email, password) => {
        try{
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if(error) {
                console.error('sign in error occured: ', error);
                return{success: false, error: error.message};
            }
            console.log("signin sucessful")
            return{success: true, data};
        } catch (error) {
            console.error("an error occurred:", error)
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    }, []);

    //signout

    const signOut =() => {
        const { error } = supabase.auth.signOut();
        if (error) {
            console.error("there was an error: ", error);
        }
    }

    return (
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}