import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const NavBar = () => {
  const [user] = useAuthState(auth);

  const userSignOut = async () => {
    await signOut(auth);
  };
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      {!user ? (
        <Link to="/login">Login</Link>
      ) : (
        <Link to="/createpost">Create Post</Link>
      )}
      {user && (
        <div>
          <p>{user?.displayName}</p>
          <img src={user?.photoURL || ""} width="100" height="100" />
          <button onClick={userSignOut}>Logout</button>
        </div>
      )}
    </div>
  );
};
