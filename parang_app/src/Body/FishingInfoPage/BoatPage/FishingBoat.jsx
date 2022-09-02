import React from 'react';
import { BoatCardSection } from './BoatCardSection'
import { Grid } from '@mui/material'
import { Container, Box } from '@mui/material';

const FishingBoat = ({ btList }) => {




    return (
        <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
            <Box>
                {btList.map((item, idx) => {
                    return (

                        <Box sx={{ width: '100%' }}
                             key={idx}>
                            <BoatCardSection {...item} />
                        </Box>
                    )
                })}

            </Box>
        </div>
    );
};

export default FishingBoat;
