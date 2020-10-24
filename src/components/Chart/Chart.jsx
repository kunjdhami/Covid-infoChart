import React, {useState, useEffect, setValue} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar, Radar, Pie, Polar, Bubble, Scatter} from 'react-chartjs-2';
import styles from './Chart.module.css';
import {FormControlLabel, FormControl, RadioGroup, Radio, FormLabel} from '@material-ui/core';

const Chart = ({data: {confirmed, deaths, recovered}, country}) => {
    const [dailyData, setDailyData] = useState([]);
    const [value, setValue] = useState('lineChart');

    /* const handleChange = (event) => {
        setValue(event.target.value);
      }; */
    
    const handleChange = (name) => {
        setValue(name);
    }

    useEffect(()=>{
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
        // console.log(dailyData);
    }, []);

    const lineChart = (
        dailyData.length
        ? (<Line 
            data={{
                labels: dailyData.map(({date})=>date),
                datasets: [{
                    data: dailyData.map(({confirmed})=>confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({deaths})=>deaths),
                    label: 'Deaths',
                    borderColor: '#red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true,
                }],
            }}
        /> ): null
    );

    const barChart = (
        confirmed
        ? (
            <Bar
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets: [{
                        label: 'people',
                        backgroundColor: ['rgba(0,0,255,0.6)','rgba(0,255,0,0.6)','rgba(255,0,0,0.6)',],
                        data: [confirmed.value, recovered.value, deaths.value],
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display:true, text: `current state in ${country}`},
                }}
            />
        ) : null
    );

    const radarChart = (
        dailyData.length
        ? (
            <Radar
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets: [{
                        label: 'people',
                        backgroundColor: ['rgba(0,0,255,0.6)','rgba(0,255,0,0.6)','rgba(255,0,0,0.6)',],
                        data: [confirmed.value, recovered.value, deaths.value],
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display:true, text: `current state in ${country}`},
                }}
            />
        ) : null
    );

    const pieChart = (
        dailyData.length
        ? (
            <Pie
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets: [{
                        label: 'people',
                        backgroundColor: ['rgba(0,0,255,0.6)','rgba(0,255,0,0.6)','rgba(255,0,0,0.6)',],
                        data: [confirmed.value, recovered.value, deaths.value],
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display:true, text: `current state in ${country}`},
                }}
            />
        ) : null
    );

    const polarChart = (
        dailyData.length
        ? (
            <Polar
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets: [{
                        label: 'people',
                        backgroundColor: ['rgba(0,0,255,0.6)','rgba(0,255,0,0.6)','rgba(255,0,0,0.6)',],
                        data: [confirmed.value, recovered.value, deaths.value],
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display:true, text: `current state in ${country}`},
                }}
            />
        ) : null
    );

    const bubbleChart = (
        dailyData.length
        ? (
            <Bubble
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets: [{
                        label: 'people',
                        backgroundColor: ['rgba(0,0,255,0.6)','rgba(0,255,0,0.6)','rgba(255,0,0,0.6)',],
                        data: [confirmed.value, recovered.value, deaths.value],
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display:true, text: `current state in ${country}`},
                }}
            />
        ) : null
    );

    const scatterChart = (
        dailyData.length
        ? (
            <Scatter
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets: [{
                        label: 'people',
                        backgroundColor: ['rgba(0,0,255,0.6)','rgba(0,255,0,0.6)','rgba(255,0,0,0.6)',],
                        data: [confirmed.value, recovered.value, deaths.value],
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display:true, text: `current state in ${country}`},
                }}
            />
        ) : null
    );

    return(
        <div className={styles.container}>
            <FormControl component="fieldset">
                <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={value}
                        onChange={(e)=>handleChange(e.target.value)}
                        // onChange={handleChange}
                        row
                    >
                        <FormControlLabel disabled={country ? true : false} value="lineChart" control={<Radio />} label="line" />
                        <FormControlLabel value="barChart" control={<Radio />} label="bar" />
                        <FormControlLabel value="radarChart" control={<Radio />} label="radar" />
                        <FormControlLabel value="pieChart" control={<Radio />} label="pie" />
                        <FormControlLabel value="polarChart" control={<Radio />} label="polar" />
                        
                     </RadioGroup>
            </FormControl>
            <div className={styles.container}> 
                {/* {country ? value: lineChart } */}
                {value.localeCompare("lineChart") ? null : (country?null:lineChart)}
                {value.localeCompare("barChart") ? null : barChart}
                {value.localeCompare("radarChart") ? null : radarChart}
                {value.localeCompare("pieChart") ? null : pieChart}
                {value.localeCompare("polarChart") ? null : polarChart}
            </div>
        </div>
    )
}

export default Chart;