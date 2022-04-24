import { useState, useEffect } from 'react'
import { convertKgToLbs } from '../utils/macrocalculator'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

const WeightChart = ({test}) => {
    const [weightLogs, setWeightLogs] = useState([])


    useEffect(() => {
        readWeightLog()
    }, [test])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'none'
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
    };
    
    const readWeightLog = async () => {
        const res = await fetch(`/api/weightLog`, {
            method: "GET"
        })
        const data = await res.json()
        setWeightLogs(data)
    }

        weightLogs.sort((a,b) => {
        if (a.date < b.date) {
            return -1
        }
        if (a.date > b.date) {
            return 1
        }
        return 0
    })

    const labels = weightLogs.map((log) => {
        return new Date(log.date).toLocaleDateString()
    })    

    const data = {
        labels,
        datasets: [
        {
            label: 'Weight',
            data: weightLogs.map((log) => {
                return Math.floor(convertKgToLbs(log.weight))
            }),
            borderColor: 'grey',
        },
        ],
    };

    return (<>
        <div className='w-[95vw]'>
            <Line options={options} data={data} />
        </div>
    </>)
}

export default WeightChart