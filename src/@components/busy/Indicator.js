import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const Indicator = React.memo(() => {

    return (
        <Box p={3} display="flex" justifyContent="center" width={1}>
            <CircularProgress size={40} />
        </Box>
    );

});

export default Indicator;
