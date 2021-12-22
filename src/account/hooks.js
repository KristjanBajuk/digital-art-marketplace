import Gateway from "../@components/gateway";
import { ref, set, get as read} from "firebase/database";

export const useService = () => {
    const gateway = Gateway.useGateway();
    
    const save = (address, data) => {
       return set(ref(gateway, 'users/' + address), data);
    };

    const get = (address) => {
        return read(ref(gateway, 'users/' + address));
    };
    
    return {
        save, 
        get
    };
};