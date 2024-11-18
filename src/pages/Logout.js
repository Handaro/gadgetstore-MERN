import { Navigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";

export default function Logout() {
  const { setUser, unsetUser } = useContext(UserContext);
  /* localStorage.clear(); */

  unsetUser();

  useEffect(() => {
    setUser({
      id: null,
      isAdmin: null,
    });
  });

  return <Navigate to="/login" />;
}
