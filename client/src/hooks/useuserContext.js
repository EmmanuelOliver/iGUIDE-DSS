import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useUserContext = () => {
  const { userType, setUserType, firstName, setFirstName, lastName, setLastName } = useContext(UserContext);
  return { userType, setUserType, firstName, setFirstName, lastName, setLastName };
};
