import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAGbk9gLRYGBoIpjXiafC4smP0IyxuTPkQ",
  authDomain: "netflix-clone-11197.firebaseapp.com",
  projectId: "netflix-clone-11197",
  storageBucket: "netflix-clone-11197.appspot.com",
  messagingSenderId: "824428934612",
  appId: "1:824428934612:web:1dc597f0970604dfdf5241"
};


const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password) => {
     try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
     } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
     }
}

const login = async(email,password) => {
    try {
       await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
       console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export{auth,db,login,logout,signup};