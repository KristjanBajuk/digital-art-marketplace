import {useContext} from "react";
import {CurrentUser} from "./context";

const useCurrentUserContext = () => {
    return useContext(CurrentUser);
};

export default useCurrentUserContext;
