import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const useGateway = () => {
    const firebaseConfig = {
        apiKey: window.env.APIKEY,
        authDomain: window.env.DOMAIN,
        databaseURL: window.env.GATEWAY,
        projectId: window.env.PROJECT_ID,
        storageBucket: window.env.STORAGE_BUCKET,
        messagingSenderId: window.env.MESSAGE_SENDER_ID,
        appId: window.env.APP_ID
    };

    const firebase = initializeApp(firebaseConfig);
    return getDatabase(firebase);
};

export default useGateway;
