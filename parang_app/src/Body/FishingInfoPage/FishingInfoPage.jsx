
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

import { Grid, Box } from "@mui/material";
import FishingInfoMap from "./FishingInfoMap";
import { VerticalTabs } from "./VerticalTab";



export const FishingInfoPage = () => {


    const [portName, setPortName] = useState("송정항");
    const [countyName, setCountyName] = useState("도,광역시");
    const [cityName, setCityName] = useState("시,군,구");

    const [tdWeather, setTdWeather] = useState([{
        weather_id: 0,
        fcst_date: "0",
        fcst_time: "0",
        fcst_pop: "0",
        fcst_pcp: "0mm",
        fcst_vec: "0",
        fcst_reh: "0",
        fcst_wav: "0",
        fcst_sky: "0",
        fcst_pty: "0",
        fcst_harbor_name: "미정"
    },
        {
            weather_id: 0,
            fcst_date: "0",
            fcst_time: "0",
            fcst_pop: "0",
            fcst_pcp: "0mm",
            fcst_vec: "0",
            fcst_reh: "0",
            fcst_wav: "0",
            fcst_sky: "0",
            fcst_pty: "0",
            fcst_harbor_name: "미정"
        },
    ]);

    const [btList, setBtList] = useState(
        [{
            id: 0,
            fsboNo: "null",
            fsboNm: "null",
            shpmHangNm: "null",
            maxShcrNum: "null",
            maxPsrNum: "null"
        }]
    );

    let inputData = { "harborName": portName }
    let inputData2 = { "shpmHangNm": portName }
    console.log(inputData)

    useEffect(() => {
        axios.post("http://localhost:8080/weather/retrieve", inputData, null).then((res) => {
            console.log("AXIOS 통신성공")
            console.log(res.data.resList)
            setTdWeather(res.data.resList)
        }).catch(() => {
            console.log("AXIOS 통신에러")
        }, [portName])
        axios.post("http://localhost:8080/boat/retrieve", inputData2, null).then((res) => {
            console.log("AXIOS 통신성공")
            console.log(res.data.resList)
            setBtList(res.data.resList)
        }).catch(() => {
            console.log("AXIOS 통신에러")
        }, [portName])
    }, [portName])

    return (
        <Grid container>
            <Grid item xs={4}>
                <VerticalTabs setPortName={setPortName} tdWeather={tdWeather} btList={btList} />
            </Grid>
            <Grid item xs={8}>
                <FishingInfoMap />
            </Grid>
        </Grid>
    )
}


