import {useContext} from "react";
import {Auth} from "./context";

const useAuth = () => {
    return useContext(Auth);
};

export default useAuth;
