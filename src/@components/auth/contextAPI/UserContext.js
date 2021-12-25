import React from 'react';
import {CurrentUser} from './context';
//import useLocalStorage from "../useLocalStorage";

const UserContext = ({children}) => {
    const [user, setUser] = React.useState(null);
    // const [storedValue, setValue] = useLocalStorage('token', null);
    //
    // React.useEffect(() => {
    //     storedValue == null && token != null && setValue(token);
    // }, [token]);
    //
    // React.useEffect(()=> {
    //     storedValue && setToken(storedValue);
    // }, []);
    //
    return  <CurrentUser.Provider value={{user, setUser}}>
        {children}
    </CurrentUser.Provider>
};


export default UserContext;
