import { useState, useEffect } from 'react'
import { convertKgToLbs, calcBMR } from '../utils/macrocalculator'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import Modal from './Modal';
import WeightLogForm from './WeightLogForm';
import ModalButton from './ModalButton';
import { useAuth } from '@clerk/nextjs';
import User from '../utils/User'



const WeightChart = ({test}) => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const [weightLogs, setWeightLogs] = useState([])

    useEffect(() => {
        readWeightLog()
    }, [test])

    if (!isLoaded || !userId) {
        return null;
    }

    const readWeightLog = async () => {
        const res = await fetch(`/api/weightLog?user=${userId}`, {
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

    const handleLogWeight = (weight) => {
        createWeightLog(weight)
    }

    const createWeightLog = async (weight) => {

        let weightLog = {
            user: userId,
            date: new Date().toJSON(),
            weight: weight
        }

        const res = await fetch(`/api/weightLog`, {
            method: "POST",
            body: JSON.stringify(weightLog)
        })

        switch (res.status) {
            case 201:
                setWeightLogs([...weightLogs, weightLog])
                break;
            default:
                break;
        }

        let user = null

        await User.read(userId).then((res) => {
            console.log('response found');
            user = res[0]
            
        }).catch((e) => {
          console.log('ERROR');
          console.log(e);
        })

        if (user) {
            user.weight = weight
            const _cm = (user.height * 2.54) 
            user.bmr = calcBMR(user.gender, user.weight, _cm, parseInt(user.age), user.activity)
            user.user = userId
            const res2 = await User.update(user)
        }
        
    }

    let hideAdd = false

    weightLogs.map((log) => {
        let date = new Date(log.date).toLocaleDateString()
        let todaysDate = new Date().toLocaleDateString()
        if (date !== todaysDate) {
            hideAdd = true
        }
    })


    const data = weightLogs.map((log) => {
                return  {
                    name: Math.floor(convertKgToLbs(log.weight)),
                    date: new Date(log.date).toLocaleDateString()
                }
            })


    return (<>
        <div className='overflow-scroll'>
            <LineChart width={400} height={450} data={data}>
                <Line type="monotone" dataKey="name" stroke="#94a3b8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis tickCount={10} interval='preserveEnd' domain={[190, 215]}/>
            </LineChart>
        </div>
        <Modal modalId='weightinput'>
            <WeightLogForm onLog={handleLogWeight}/>
        </Modal>
        {hideAdd ? (
            null
        ) : (
        <div className="flex justify-center absolute bottom-20 w-full">
            <ModalButton modalId='weightinput'>+ Add Weight</ModalButton>
        </div>
        )}
        
    </>)
}

export default WeightChart