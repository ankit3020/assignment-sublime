import classes from "./UserProfile.module.css";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <section className={classes.profile}>
      {isLoggedIn && <h1>Welcome to Sublime Data System</h1>}
    </section>
  );
};

export default UserProfile;
