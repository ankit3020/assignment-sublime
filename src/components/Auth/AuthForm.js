import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // const nameInputRef = useRef();
  // const lastInputRef = useRef();
  // const phoneInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const isLoggedIn = authCtx.isLoggedIn;
  const token = authCtx.token;

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // const firstname = nameInputRef.current.value;
    // const lastname = lastInputRef.current.value;
    // const phoneNum = phoneInputRef.current.value;

    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfKvN--fd3uEljzQtZHEHZ5rDAh4mUU9I",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            // fname: firstname,
            // lname: lastname,
            // phone: phoneNum,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            authCtx.login(data.idToken);
          });
        } else {
          return res.json().then((data) => {
            let errorMessage = "Wrong Credentials";
            alert(errorMessage);
          });
        }
      });
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfKvN--fd3uEljzQtZHEHZ5rDAh4mUU9I",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            // fname: firstname,
            // lname: lastname,
            // phone: phoneNum,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            let errorMessage =
              "Please enter correct email or password. Password must be 6 character long";
            alert(errorMessage);
          });
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      {!isLoggedIn && <h1>{isLogin ? "Login" : "Sign Up"}</h1>}
      {!isLoggedIn && (
        <form onSubmit={submitHandler}>
          {/* {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="fname">First Name</label>
              <input type="text" id="fname" required ref={nameInputRef} />
            </div>
          )}
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="lname">Last Name</label>
              <input type="text" id="lname" required ref={lastInputRef} />
            </div>
          )}
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="phone">Phone Number</label>
              <input type="number" id="phone" required ref={phoneInputRef} />
            </div>
          )} */}
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button>{isLogin ? "Login" : "Create Account"}</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default AuthForm;
