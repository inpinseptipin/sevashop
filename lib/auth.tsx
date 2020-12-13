import { useLoginMutation } from "generated/graphql";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext, createContext } from "react";
import { createUser, getUser } from "./db";
import firebase from "./firebase";
const authContext = createContext();

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
  const [userAll, setUserAll] = useState(null);
  const [, gqlLogin] = useLoginMutation();

  // console.log(user);
  const signinWithPhone = (phoneNumber: string) => {
    var phoneNumber = `+91${phoneNumber}`;
    //If you want to make the recaptcha invisible
    var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
    });
    // console.log("recaptcha is ", recaptcha);
    // console.log("captcha created");
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, recaptcha)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        (window as any).confirmationResult = confirmationResult;
        // window.confirmationResult = confirmationResult;
        // console.log((window as any).confirmationResult);
        // setBody("screen2");
      })
      .catch(function (error) {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
  };

  const verifyPhone = (code) => {
    (window as any).confirmationResult
      .confirm(code)
      .then(async function (result) {
        // User signed in successfully.
        // var user = result.user;
        // console.log(user);

        handleUser(result.user);
        router.push("/register");

        // console.log("logged user state is set!!");
        // console.log(user);
        // return true;
        // router.push("/");
        // ...
      })
      .catch(function (error) {
        // User couldn't sign in (bad verification code?)
        // ...
        // return false;
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
      // const user = rawUser;
      // console.log(rawUser);
      // console.log("why is this being called");
      // if (user) {
      // console.log(user);
      // const logindata = useSWR(LOGIN_QUERY, fetcher);
      const ans = await gqlLogin({
        uname: "superadmin",
        pass: "superadmin",
      });
      createUser(user.uid, user);
      const userAlt = await getUser(user.uid);
      // console.log(user);
      // }
      setUser(user);
      setUserAll(userAlt);
      return user;
    } else {
      setUser(false);
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
    userAll,
    signinWithGithub,
    signinWithPhone,
    verifyPhone,
    signout,
  };
}
const formatUser = async (user) => {
  // console.log("what i have received", user);
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    phoneNumber: user.phoneNumber,
    // salonName: "aur kuch",
    // salonLocation: "kuch aur",
  };
};
