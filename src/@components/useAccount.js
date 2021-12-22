import React from 'react';
import {ethers} from "ethers";
import Web3Modal from "web3modal";

const useAccount = (unitName='ether') => {
    const [address, setAddress] = React.useState('');
    const [balance, setBalance] = React.useState('');
    const [busy, setBusy] = React.useState(false);
    const getAccount = async () => {
        setBusy(true);
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(connection);
    
        const accounts = await provider.listAccounts();
        setAddress(accounts[0]);
        
        const balance = await provider.getBalance(accounts[0]);
        let formatBalance = ethers.utils.formatUnits(balance.toString(), unitName);
        formatBalance = (+formatBalance).toFixed(4);
        setBalance(formatBalance);
        setBusy(false);
    };

    React.useEffect(()=>{
        getAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return [address, balance, busy];
};

export default useAccount;