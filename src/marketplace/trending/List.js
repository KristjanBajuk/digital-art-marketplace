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

import useContract from "../../@components/useContract";
import useWallet from "../../@components/useWallet";

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
    const getContract = useContract();
    const connectWallet = useWallet();
    const [nfts, setNfts] = React.useState([]);
    const [loadingState, setLoadingState] = React.useState('not-loaded');

    React.useEffect(()=>{
        loadNFTs()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const loadNFTs = async() => {
        //provider, tokenContract, marketContract, data for our MarketItems

        const provider = new ethers.providers.JsonRpcProvider();

        const tokenContract = getContract(nftaddress, NFT.abi, provider);
        const marketContract = getContract(nftmarketaddress, NFTMarket.abi, provider);
       
        let nfts = await marketContract.fetchMarketTokens();

        const items = await Promise.all(nfts.map( async nft => {
            const tokenUri = await tokenContract.tokenURI(nft.tokenId);
            // we want to get the token metadata - json
            const meta = await axios.get(tokenUri);

            let price = ethers.utils.formatUnits(nft.price.toString(), 'ether');

            let item = {
                price,
                tokenId: nft.tokenId.toNumber(),
                seller: nft.seller,
                owner: nft.owner,
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
        const wallet = await connectWallet();
        const contract = getContract(nftmarketaddress, NFTMarket.abi, wallet.signer);
        
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
                                <CardContent style={{minHeight: '80px', maxHeight: '120px'}}>
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