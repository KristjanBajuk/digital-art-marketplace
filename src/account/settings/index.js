import React, {useState} from 'react';
import {Container} from "@mui/material";
import Box from '@mui/material/Box';
import Auth from "../../@components/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {useService} from '../hooks';
import Busy from "../../@components/busy";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {create as ipfsHttpClient} from "ipfs-http-client";

// in this component we set IPFS up to host out nft data of file storage
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Index = React.memo(() => {
    const {setUser} = Auth.useAuth();
    const service = useService();
    const [, ,userInfo] = Auth.useAuth();
    const [uploading, setUploading] = useState(false);
    const [formInput, updateFormInput] = useState({avatar: '', username: '', bio: '', emailAddress: '', walletAddress: ''});
    
    React.useEffect(()=>{
        updateFormInput(userInfo);
    },[userInfo]);
    
    
    const updateUser = () => {
        service.save(userInfo?.walletAddress, formInput).then(() => {
            setUser(formInput);
        });
    }

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
            updateFormInput({...formInput,  avatar: url});
            setUploading(false);
        } catch (error) {
            setUploading(false);
            console.log("Error uploading file: ", error);
        }
    }
    
    return <Container maxWidth={'md'} sx={{mt: '100px'}}>
        <Box sx={{fontWeight: 600, fontSize: '40px', color: 'rgb(4, 17, 29)'}}>Settings</Box>
        <Box mt={2}>
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
                    {  !formInput?.avatar && !uploading && <ImageOutlinedIcon  style={{fontSize: '100px', opacity: 0.5}}  />}
                    {
                        formInput?.avatar && <img alt={'nft-preview'} style={{height: '280px', width:'100%', borderRadius: '10px'}} width='100%' src={formInput?.avatar} />
                    }
                </Box>

            </Box>
        </label>
        </Box>
        {/*<Box mt={2}>*/}
        {/*    <Box sx={{textAlign: 'center', display:'flex', justifyContent:'center'}}>*/}
        {/*        <Avatar sx={{width: '120px', height: '120px'}}>KB</Avatar>*/}
        {/*    </Box>*/}
        {/*</Box>*/}
        <Box mt={2}>
            <TextField
                fullWidth
                placeholder="Username"
                id="asset-name"
                label="Username"
                variant="outlined"
                value={formInput?.username || ''}
                onChange={(e) =>
                    updateFormInput({ ...formInput, username: e.target.value })
                }
            />
        </Box>
        <Box mt={2}>
            <TextField
                multiline
                rows={4}
                fullWidth
                placeholder="Bio"
                id="asset-name"
                label="Bio"
                variant="outlined"
                value={formInput?.bio || ''}
                onChange={(e) =>
                    updateFormInput({ ...formInput, bio: e.target.value })
                }
            />
        </Box>
        <Box mt={2}>
            <TextField
                fullWidth
                placeholder="Email Address"
                id="asset-name"
                label="Email Address"
                variant="outlined"
                value={formInput?.emailAddress || ''}
                onChange={(e) =>
                    updateFormInput({ ...formInput, emailAddress: e.target.value })
                }
            />
        </Box>
        <Box mt={2}>
            <TextField
                disabled
                fullWidth
                placeholder="Wallet Address"
                id="asset-name"
                label="Wallet Address"
                variant="outlined"
                value={formInput?.walletAddress || ''}
                onChange={(e) =>
                    updateFormInput({ ...formInput, walletAddress: e.target.value })
                }
            />
        </Box>
        <Box mt={2}>
            <Button sx={{borderRadius: '10px', fontSize: '16px', fontWeight: 600, padding: '12px 20px'}} onClick={updateUser} variant="contained">Save</Button>
        </Box>
        
    </Container>
});

export default Index;