import React from 'react';
import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {Box, Grid} from "@mui/material";
import LocationSelect from './LocationSelect';

const FishingInfoMap = ({portName}) => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    let markers = new Array();
    let infoWindows = [];

    let areaArr = new Array();
    areaArr.push(
        {shipHome : '송정항', lat : '35.1805', lng :'129.2068'}, //부산 송정항
        {shipHome : '강릉항', lat :'37.7728', lng : '128.9530' }, // 강릉시 강릉항
        {shipHome : '아야진항', lat : '38.2708', lng : '128.5578'} // 강원도 아야진항
    );

    const { naver } = window;
    useEffect(()=> {

        let position = new naver.maps.LatLng(37.7728, 129.9530);
        let mapOptions = {
            center: position,
            zoom: 7,

        };


        let map = new naver.maps.Map('map', mapOptions);

        for(let i = 0; i< areaArr.length; i++){
            //마커 설정
            let markerOptions = {
                position: new naver.maps.LatLng(areaArr[i].lat, areaArr[i].lng),
                map: map,
                icon: './boat.png'
            };
            let marker = new naver.maps.Marker(markerOptions);
        }
    }, [])



    return (


            <Grid container>
                <Grid item  id="map" style={{width:"100vw", height:"100vh"}}>
                </Grid>
            </Grid>

    );
};

export default FishingInfoMap;