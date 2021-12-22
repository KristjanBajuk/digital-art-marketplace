import React from 'react';
import {Auth} from './context';
//import useLocalStorage from "../useLocalStorage";

const AuthContext = ({children}) => {
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
    return  <Auth.Provider value={{user, setUser}}>
        {children}
    </Auth.Provider>
};


export default AuthContext;
