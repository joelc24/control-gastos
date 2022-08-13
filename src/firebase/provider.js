import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./firebaseConfig";

export const signInWithEmailPassword = async({email, password})=>{

    try {
        
        const { user } = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        const { uid, displayName, photoURL } = user

        return {
            ok: true,
            uid,
            displayName,
            photoURL
        }

    } catch (error) {
        return {
            ok: false,
            errorCode: error.code,
            errorMessage: error.message
        }
    }

}

export const registerWithEmailPassword = async({email, password, displayName})=>{

    try {
        
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,     email, password)
        
        const { uid, photoURL } = resp.user

        await updateProfile(FirebaseAuth.currentUser, {
            displayName
        })

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName
        }

    } catch (error) {
        return { 
            ok: false, 
            errorMessage: error.message
        }
    }


}

export const logoutFirebase = async()=>{
    return await FirebaseAuth.signOut()
}