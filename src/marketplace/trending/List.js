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
import Web3Modal from 'web3modal'
import { nftaddress, nftmarketaddress } from "../../config"

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import KBMarket from '../../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

const useStyles = makeStyles((theme) => ({
    card: {
        '&:hover': {
            boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px', 
            transition: 'all 0.1s ease 0s'
        }
    },
    cardAction: {
        '&:hover': {
           
        }
    }
}));

const Index = () => {
    const classes = useStyles();
    const [nfts, setNfts] = React.useState([]);
    const [loadingState, setLoadingState] = React.useState('not-loaded');

    React.useEffect(()=>{
        loadNFTs()
    }, []);


    const loadNFTs = async() => {
        //provider, tokenContract, marketContract, data for our MarketItems

        const provider = new ethers.providers.JsonRpcProvider();

        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
        const marketContract = new ethers.Contract(nftmarketaddress, KBMarket.abi, provider);
  
        let data = await marketContract.fetchMarketTokens();

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

    // function to buy nfts for market

    const buyNFT = async (nft) => {

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();

        const contract = new ethers.Contract(nftmarketaddress, KBMarket.abi, signer);

        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

        const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
            value: price
        });

        await transaction.wait();
        loadNFTs();
    }

    return <Container maxWidth={'xl'}>
        <Box sx={{textAlign: 'center', mt: '30px'}}>
            {loadingState === 'loaded' && !nfts.length && <Box>
                No NFTs in marketplace
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
                                <CardContent style={{ maxHeight: '120px'}}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {nft?.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} color="text.secondary">
                                        {nft?.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Divider sx={{mt: 1}} />
                            <Box sx={{p: 2, display:'flex', justifyContent:'space-between'}}>
                                <Box sx={{cursor:'pointer', color: '#1976d2', fontWeight: 'bold'}} onClick={()=>buyNFT(nft)} variant="contained">Buy now</Box>
                                <Box>
                                    <img alt={'eth icon'} width={'14px'} height={'14px'} src={'https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg'}/>
                                    {nft?.price}
                                </Box>
                            </Box>
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