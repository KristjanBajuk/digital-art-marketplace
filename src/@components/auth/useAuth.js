import React from 'react';
import {ethers} from "ethers";
import Web3Modal from "web3modal";
import useCurrentUserContext from './contextAPI/useCurrentUserContext';
import {useService} from '../../account/hooks';

const useAuth = (unitName='ether') => {
    const service = useService();
    const {setUser} = useCurrentUserContext();
    const [userInfo, setUserInfo] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [balance, setBalance] = React.useState('');
    const [busy, setBusy] = React.useState(false);
    
    const getWalletData = async () => {
        setBusy(true);
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(connection);
    
        const accounts = await provider.listAccounts();
        const address = accounts[0];
        setAddress(address);
        getUserData(address);
        const balance = await provider.getBalance(accounts[0]);
        let formatBalance = ethers.utils.formatUnits(balance.toString(), unitName);
        formatBalance = (+formatBalance).toFixed(4);
        setBalance(formatBalance);
        
        setBusy(false);
    };
    
    const getUserData = (address) => {
        service.get(address).then((snapshot) => {
            if (snapshot.exists()) {
                setUserInfo(snapshot.val());
                setUser(snapshot.val());
            } else {
                service.save(address, {avatar: '', username: '', bio: '', emailAddress: '', walletAddress: address}).then(()=>console.log('user added'));
            }
        }).catch(error => {
            console.log('error: ', error);
        });
    }

    React.useEffect(()=>{
         getWalletData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return [address, balance, userInfo, busy];
};

export default useAuth;