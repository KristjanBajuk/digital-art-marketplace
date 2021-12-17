import React from 'react';
import {Container} from "@mui/material";
import { ethers } from "ethers"
import { useState } from "react"
import Web3Modal from 'web3modal'
import {create as ipfsHttpClient} from 'ipfs-http-client'

import { nftaddress, nftmarketaddress } from "../../config"

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import KBMarket from '../../artifacts/contracts/KBMarket.sol/KBMarket.json'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

import {useHistory} from 'react-router-dom';

import Busy from '../../@components/busy';

// in this component we set IPFS up to host out nft data of file storage
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Index = () => {
    const history = useHistory();
    const [fileUrl, setFileUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [formInput, updateFormInput] = useState({price: '', name: '', description: ''});


    //set up a function  to fireoff when we update files in our form - we can add our NFT images - IPFS

    const onChange = async(e) => {
        setUploading(true);
        const file = e.target.files[0];
        try {
            const added = await client.add(
                file, {
                    progress: (prog) => console.log(`recieved: ${prog}`)
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url);
            setUploading(false);
        } catch (error) {
            setUploading(false);
            console.log("Error uploading file: ", error);
        }
    }

    const createMarket = async() => {
        const {name, description, price} = formInput;
        if(!name || !description || !price || !fileUrl) return;

        //upload to IPFS
        const data = JSON.stringify({
            name, description, image: fileUrl
        })

        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            //run a function that creates sale and passes in the url
            createSale(url);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }

    const createSale = async(url) => {
        // account the items and list them on the marketplace
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = await new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        // we want to account a token
        let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
        let transaction = await contract.mintToken(url);
        let tx = await transaction.wait();
        let event = tx.events[0];
        let value = event.args[2];
        let tokenId = value.toNumber();
        const price = ethers.utils.parseUnits(formInput.price, 'ether');

        // list the item for sale on the marketplace
        contract = new ethers.Contract(nftmarketaddress, KBMarket.abi, signer);
        let listingPrice = await contract.getListingPrice();

        listingPrice = listingPrice.toString();
        transaction = await contract.makeMarketItem(nftaddress, tokenId, price, {value: listingPrice});

        await transaction.wait();
        history.push('./');
    }
    return <Container maxWidth={'md'} sx={{mt: '100px'}}>
        <Box sx={{fontWeight: 600, fontSize: '40px', color: 'rgb(4, 17, 29)'}}>Create new NFT</Box>
        <Box>
            <Box mt={2}>
                <TextField
                    fullWidth
                    placeholder="Asset Name"
                    id="asset-name"
                    label="Asset Name"
                    variant="outlined"
                    onChange={(e) =>
                        updateFormInput({ ...formInput, name: e.target.value })
                    }
                />
            </Box>
            <Box mt={2}>
                <TextField
                    fullWidth
                    rows={5}
                    multiline
                    placeholder="Asset Description"
                    id="asset-name"
                    label="Asset Description"
                    variant="outlined"
                    onChange={(e) =>
                        updateFormInput({ ...formInput, description: e.target.value })
                    }
                />
            </Box>
            <Box mt={2}>
                <TextField
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">ETH</InputAdornment>
                        ),
                    }}
                    placeholder="Asset Price"
                    id="asset-name"
                    label="Asset Price"
                    variant="outlined"
                    onChange={(e) =>
                        updateFormInput({ ...formInput, price: e.target.value })
                    }
                />
            </Box>
           <Box mt={2}>
              
           </Box>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                onChange={onChange}
                type="file"
            />
            <label htmlFor="raised-button-file" style={{width: '350px', height: '300px'}}>
                <Box variant="raised" component="span" sx={{cursor: 'pointer', padding: '10px', borderRadius: '10px', border: '2px dotted lightgray', textAlign:'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '350px', height: '300px'}}>
                  <Box sx={{display:'flex', justifyContent: 'center'}}>
                      {uploading && <Busy.Indicator />}
                      {  !fileUrl && !uploading && <ImageOutlinedIcon  style={{fontSize: '100px', opacity: 0.5}}  />}
                      {
                          fileUrl && <img alt={'nft-preview'} style={{height: '280px', width:'100%', borderRadius: '10px'}} width='100%' src={fileUrl} />
                      }
                  </Box>
                  
                </Box>
            </label>
            <Box mt={2}>
                <Button sx={{borderRadius: '10px', fontSize: '16px', fontWeight: 600, padding: '12px 20px'}} onClick={createMarket} variant="contained">MINT</Button>
            </Box>
        </Box>
    </Container>
};

export default Index;