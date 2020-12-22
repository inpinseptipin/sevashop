import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import {
  deleteToken,
  setToken,
} from '@/utils/token';

import {
  createUser,
  getUser,
} from './db';
import firebase from './firebase';

const authContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signinWithPhone = (phoneNumber: string, setBody) => {
    setLoading(true);
    var phoneNumber = `+91${phoneNumber}`;
    var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
    });

    console.log("initiating phone auth");
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, recaptcha)
      .then(function (confirmationResult) {
        (window as any).confirmationResult = confirmationResult;
        setLoading(false);
        setBody("screen2");
      })
      .catch(function (error) {
        console.log("error on sending otp", error);
        router.push("/");
      });
  };

  const verifyPhone = (code, toast) => {
    setLoading(true);

    (window as any).confirmationResult
      .confirm(code)
      .then(async function (result) {
        handleUser(result.user);

        if (result.user.displayName) {
          const userData = await getUser(result.user.uid);
          // console.log(
          //   "token received is",
          //   userData.channelToken,
          //   (userData as any).channelToken
          // );
          setToken((userData as any).channelToken);
          router.push("/");
        } else {
          router.push("/register");
        }
      })
      .catch(function (error) {
        toast({
          title: "Incorrect OTP",
          description: "Please try again",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const addDisplayName = () => {
    return firebase.auth().currentUser.updateProfile({
      displayName: "Temp",
    });
  };

  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
      });
  };

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      createUser(user.uid, user);
      setUser(user);
      setLoading(false);
      return user;
    } else {
      setUser(false);
      setLoading(false);
      deleteToken();
      setToken("yti4eygxragh59ndrgz");
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => handleUser(user));

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signinWithPhone,
    verifyPhone,
    addDisplayName,
    loading,
    signout,
  };
}
const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    phoneNumber: user.phoneNumber,
  };
};
