import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import useAccount from '../useAccount';

export default function TemporaryDrawer({open, onClose}) {
    const [account, balance] = useAccount();
    
    return (
        <div>
            <React.Fragment key={'right'}>
                <Drawer
                    anchor={'right'}
                    open={open}
                    onClose={onClose}
                >
                    <Box
                        sx={{width: 420, mt: '64px'}}
                        role="presentation"
                        onClick={onClose}
                        onKeyDown={onClose}
                    >
                        {account && balance && <Box>
                            <Box sx={{display: 'flex', padding: '20px', justifyContent: 'space-between'}}>
                                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                    <AccountCircleOutlinedIcon width={'26px'} height={'26px'}/>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    fontWeight: 500,
                                    color: 'rgb(112, 122, 131)',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    {`${account.substring(0, 6)}...${account.slice(-4)}`}
                                </Box>
                            </Box>
                            <Divider/>
                            <Box sx={{padding: '20px'}}>
                                <Box sx={{
                                    display: 'flex',
                                    border: '1px solid rgb(229, 232, 235)',
                                    borderRadius: '10px',
                                    justifyContent: 'center'
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textAlign: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <p style={{fontWeight: 500, fontSize: '14px', color: 'rgb(112, 122, 131)'}}>
                                            Total Balance
                                        </p>
                                        <h4 style={{
                                            marginTop: 0,
                                            fontWeight: 600,
                                            fontSize: '20px',
                                            color: 'rgb(4, 17, 29)'
                                        }}>
                                            {balance} ETH
                                        </h4>
                                    </Box>

                                </Box>

                            </Box>
                        </Box>}
                        {!balance && !account &&   <Box sx={{display: 'flex', padding: '20px', justifyContent: 'center'}}>
                            <h4 style={{
                                marginTop: 10,
                                fontWeight: 600,
                                fontSize: '20px',
                                color: 'rgb(4, 17, 29)'
                            }}> Connect your wallet.</h4>
                        </Box>}
                    </Box>
                </Drawer>
            </React.Fragment>
        </div>
    );
}