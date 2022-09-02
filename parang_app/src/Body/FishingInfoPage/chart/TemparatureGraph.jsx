import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Brush,
    AreaChart, Area, ComposedChart

} from "recharts";
import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from 'react';
import axios from 'axios';




const TemparatureGraph = ({ tdWeather }) => {

    const toInt = (data) => {
        return Number(data.fcst_wav);
    }
    const toIntTime = (data) => {
        return Number(data.fcst_time);
    }

    const toTimeString = (data) => {
        return data.fcst_time.substr(0, 2) + "시"
    }




    return (
        <div>



            <Container align={'center'}>
                {/*기온그래프*/}
                <ResponsiveContainer width={'100%'} aspect={1 / 1}>

                    <ComposedChart data={tdWeather} >
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis minTickGap={1} dataKey={toTimeString} stroke="#5550bd" fontSize={'8px'} />
                        <CartesianGrid stroke="#f5f5f5" />
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#9923d2" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <Area type="monotone" name='파고 (m)' dataKey={toInt} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />

                        <Brush dataKey={toTimeString} height={10} startIndex={0} endIndex={tdWeather.length == 2 ? 1 : 10} stroke={"#5550bd"} />
                        <Legend verticalAlign="top" height={36} />
                        <Tooltip />
                    </ComposedChart>

                </ResponsiveContainer>


            </Container>



        </div>
    );
};

export default TemparatureGraph;
