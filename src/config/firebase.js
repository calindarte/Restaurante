import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// inicializacion de firebase
const app = initializeApp(firebaseConfig);
 // inicializacion de firestore
export const db = getFirestore(app)

export const auth = getAuth(app);

export const login = ({email, password}) =>{
    return signInWithEmailAndPassword(auth, email, password)
}


export const logOut = () => {
    return signOut(auth);
}
