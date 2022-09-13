import React from 'react';
import { Box } from '@mui/material';
import { TabooFishingTable } from "./TabooFishingTable";
import Typography from "@mui/material/Typography";
import { DateStore } from '../../../states/date/DateStore';
import { useStores } from "../../../states/Context";
import { useObserver } from "mobx-react";


function useStoreData() {
    const { dateStore } = useStores();

    return useObserver(() => ({
        dates: dateStore.dates
    }))
}

const ShowMoreFishingInfo = ({ tabooList }) => {
    const { dates } = useStoreData();
    console.log(tabooList)
    console.log(DateStore.dates)

    return (
        <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>


            <Typography textAlign={'center'}>{dates} 금어기</Typography>
            <Typography>{ }</Typography>

            {tabooList.map((item, idx) => {

                return (
                    < TabooFishingTable key={idx} {...item} />
                )
            })}




        </div>
    );
};

export default ShowMoreFishingInfo;
