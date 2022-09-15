
import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { Grid, Box } from "@mui/material";
import FishingInfoMap from "./FishingInfoMap";
import { VerticalTabs } from "./VerticalTab";
import { useStores } from "../../states/Context";
import { useObserver } from "mobx-react";
import { API_BASE_URL} from "../../config/API-Config"

function useStoreData() {
    const { countyStore } = useStores();

    return useObserver(() => ({
        harbor: countyStore.harbor,
        county: countyStore.county,
        city: countyStore.city,
    }))
}

export const FishingInfoPage = () => {
    const {  harbor } = useStoreData();

    const [tdWeather, setTdWeather] = useState([]);

    const [btList, setBtList] = useState([]);


    useEffect(() => {
        axios.post(API_BASE_URL+"/weather/retrieve", { "harborName": harbor }, null).then((res) => {
            console.log("AXIOS 통신성공")
            console.log(res.data.resList)
            setTdWeather(res.data.resList)
        }).catch(() => {
            console.log("AXIOS 통신에러")
        })
        axios.post(API_BASE_URL+"/boat/retrieve", { "shpmHangNm": harbor }, null).then((res) => {
            console.log("AXIOS 통신성공")
            console.log(res.data.resList)
            setBtList(res.data.resList)
        }).catch(() => {
            console.log("AXIOS 통신에러")
        })

    }, [harbor])

    return (
        <Grid container>
            <Grid item xs={4}>
                <VerticalTabs tdWeather={tdWeather} btList={btList} />
            </Grid>
            <Grid item xs={8}>
                <FishingInfoMap />
            </Grid>
        </Grid>
    )
}


