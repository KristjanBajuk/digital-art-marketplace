import useCurrentUserContext from "./contextAPI/useCurrentUserContext";
import useAuth from './useAuth';
import useWalletProvider from './useWalletProvider'
const Auth = {
    useWalletProvider,
    useAuth,
    useCurrentUserContext
};

export default Auth;