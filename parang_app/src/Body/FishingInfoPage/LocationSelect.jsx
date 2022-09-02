import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import moment from 'moment';
import { Button } from "@mui/material";
import { Container } from "@mui/material";
import { Construction, Key } from '@mui/icons-material';
import FishingInfoMap from './FishingInfoMap';


const LocationSelect = ({ setPortName }) => {

    const [dateValue, setDateValue] = useState(new Date());
    const targetDateValue = moment(dateValue).format("YYYYMMDD");
    const [county, setCounty] = useState({
        부산광역시: {
            서구: { 송정항: "35.129" },
        },
        제주특별자치도: {
            제주시: { 우도항: "33.126" },
            서귀포시: { 서귀포항: "33.126" }
        },
        인천광역시: {
            시흥시: { 오이도항: "37.126" }
        },
        충청남도: {
            서산시: { 삼길포항: "37.126" }
        },
        강원도: {
            고성군: { 아야진항: "38.128", 씨발항: "35.123" },
            강릉시: { 강릉항: "37.128" }
        }
    });

    const findByKey = (obj, value) => {
        for (let key in obj) {
            if (key === value) {
                return key;
            }
        }
    }

    const [city, setCity] = useState({});
    const [harbor, setHarbor] = useState({});
    const [locationArray, setLocationArray] = useState([]);


    const onChange = (e) => {
        setCity(county[findByKey(county, e.target.value)]);
    };

    //시군구 onchange
    const finalSelect = (e) => {
        setHarbor(city[findByKey(city, e.target.value)]);
    };

    const testtest = (e) => {
        console.log("함수실행됨")
        setPortName(e.target.value)
    }


    return (

        <div>
            <Calendar onChange={setDateValue} value={dateValue}
                      navigationLabel={null}
                      showNeighboringMonth={true}
            />

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">도,광역시</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    // value={county2}
                    onChange={onChange}
                    label="도,광역시"
                >
                    <MenuItem value={"default"} disabled>
                        <em>도,광역시를 선택하세요</em>
                    </MenuItem>
                    {Object.keys(county).map((cti, idx) => {
                        return (
                            <MenuItem key={idx} value={cti}>{cti}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">시,군,구</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    // value={city2}
                    onChange={finalSelect}
                    label="시,군구"
                >
                    <MenuItem value="default" disabled>
                        <em>시,군,구를 선택하세요</em>
                    </MenuItem>
                    {Object.keys(city).map((ct, idx) => {
                        return (
                            <MenuItem key={idx} value={ct}>{ct}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">항구</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={testtest}
                    label="항구"
                >
                    <MenuItem value="default" disabled>
                        <em>항구를 선택하세요</em>
                    </MenuItem>
                    {Object.keys(harbor).map((hb, idx) => {
                        return (
                            <MenuItem key={idx} value={hb}>{hb}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <Button>선택완료</Button>
        </div>
    );

}
export default LocationSelect;