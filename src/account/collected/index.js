import React from 'react';
import {Container} from "@mui/material";
import axios from "axios"
import Box from '@mui/material/Box';
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';


import Grid from '@mui/material/Grid';
import {makeStyles} from '@mui/styles'

import { ethers } from "ethers"

import { nftaddress, nftmarketaddress } from "../../config"

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import NFTMarket from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import useWallet from "../../@components/useWallet";
import useContract from "../../@components/useContract";

const useStyles = makeStyles((theme) => ({
    card: {
        '&:hover': {
            boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px',
            transition: 'all 0.1s ease 0s'
        }
    }
}));

const Index = () => {
    const classes = useStyles();
    const connectWallet = useWallet();
    const getContract = useContract();
    const [nfts, setNfts] = React.useState([]);
    const [loadingState, setLoadingState] = React.useState('not-loaded');

    React.useEffect(()=>{
        loadNFTs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const loadNFTs = async() => {
        const wallet = await connectWallet();

        const tokenContract = getContract(nftaddress, NFT.abi, wallet.provider);
        const marketContract = getContract(nftmarketaddress, NFTMarket.abi, wallet.signer);

        const data = await marketContract.fetchMyNFTS();

        const items = await Promise.all(data.map( async i => {
            const tokenUri = await tokenContract.tokenURI(i.tokenId);
            // we want to get the token metadata - json
            const meta = await axios.get(tokenUri);

            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');

            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description
            }

            return item;
        }));

        setNfts(items);
        setLoadingState('loaded');
    }


    return <Container maxWidth={'xl'}>
        <Box sx={{textAlign: 'center', mt: '30px'}}>
            {loadingState === 'loaded' && !nfts.length && <Box>
                You do not own any NFTs currently :(
            </Box>}
            <Grid container spacing={2}>
                { nfts.map((nft)=>  <Grid key={nft.tokenId} item xs={6} md={4} lg={3}><Card className={classes.card} key={nft?.tokenId} sx={{ maxWidth: 345, borderRadius: '10px' }}>
                    <CardActionArea className={classes.cardAction}>
                        <CardMedia
                            style={{height: '200px', width: '100%'}}
                            component="img"
                            height="140"
                            image={nft?.image}
                            alt="green iguana"
                        />
                        <CardContent style={{minHeight: '80px',maxHeight: '120px'}}>
                            <Typography gutterBottom variant="h5" component="div">
                                {nft?.name}
                            </Typography>
                            <Typography variant="body2" sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} color="text.secondary">
                                {nft?.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <Divider sx={{mt: 1}} />
                </Card></Grid>)
                }
                {
                    loadingState === 'not-loaded' && [1,2,3,4,5,6,7,8,9,10,11,12].map((data) => <Grid key={data} item xs={3}> <Card sx={{ maxWidth: 345, borderRadius: '10px' }}>
                        <CardActionArea className={classes.cardAction}>
                            <Skeleton sx={{ height: 200, width: 345 }} animation="wave" variant="rectangular" />
                            <CardContent style={{height: '60px', maxHeight: '120px'}}>
                                <Skeleton sx={{ height: 50, }} animation="wave" />
                                <Skeleton sx={{ height: 20, }} animation="wave" />
                            </CardContent>

                        </CardActionArea>
                        <Divider sx={{mt: 1}} />
                        <Box sx={{p: 2}}>
                            <Skeleton />
                        </Box>
                    </Card>
                    </Grid>)
                }
            </Grid>
        </Box>
    </Container>
};

export default Index;