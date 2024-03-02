import React, { createContext, useContext, useEffect, useState } from "react";
import { AUTH, STORAGE } from "../Firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { GoogleAccount } from "../Firebase/config";
import { signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function CreateAccount(email, password, confirmPassword) {
    const TempName = email;
    const MakeTempName = TempName.slice(0, TempName.indexOf("@"));
    const UserInfo = {
      a_Name: MakeTempName,
      b_Age: "--",
      c_Gender: "--",
      d_Email: email,
      e_Password: Number(password),
      f_Favorite: [],
      g_profile:
        "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
    };
    createUserWithEmailAndPassword(AUTH, email, password);
    setDoc(doc(STORAGE, "FilmTube User", email), UserInfo);
  }

  async function CreateAccountWithGoogle(email, username, userprofile) {
    const UserInfo = {
      a_Name: username,
      b_Age: "--",
      c_Gender: "--",
      d_Email: email,
      e_Password: "User Through Google Signup",
      f_Favorite: [],
      g_profile: userprofile,
    };
    setDoc(doc(STORAGE, "FilmTube User", email), UserInfo);
  }

  function LoginAccount(email, password) {
    return signInWithEmailAndPassword(AUTH, email, password);
  }

  function RemoveAccount() {
    return signOut(AUTH);
    // navigate("/")
  }

  useEffect(() => {
    const UnSubscribe = onAuthStateChanged(AUTH, (authUser) => {
      setUser(authUser || null);
    });
    return () => {
      UnSubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        CreateAccount,
        LoginAccount,
        RemoveAccount,
        user,
        CreateAccountWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
