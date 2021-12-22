import {ethers} from "ethers";

const useContract = () => {
    return (contractAddress, abi, signerOrProvider) => {
       return new ethers.Contract(contractAddress, abi, signerOrProvider);
    }
};

export default useContract;