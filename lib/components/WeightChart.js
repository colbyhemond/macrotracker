import { useState, useEffect } from 'react'
import { convertKgToLbs } from '../utils/macrocalculator'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const WeightChart = ({test}) => {
    const [weightLogs, setWeightLogs] = useState([])

    useEffect(() => {
        readWeightLog()
    }, [test])


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


    const data = weightLogs.map((log) => {
                return  {
                    name: Math.floor(convertKgToLbs(log.weight)),
                    date: new Date(log.date).toLocaleDateString()
                }
            })


    return (<>
        <div className='overflow-scroll'>
            <LineChart width={600} height={300} data={data}>
                <Line type="monotone" dataKey="name" stroke="#94a3b8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis tickCount={10} interval='preserveEnd' domain={[190, 215]}/>
            </LineChart>
        </div>
    </>)
}

export default WeightChart