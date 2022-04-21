import { useState, useEffect } from 'react'
import WeightLogForm from './WeightLogForm'
import { convertKgToLbs } from '../utils/macrocalculator'
import { useAuth } from '@clerk/nextjs';


const WeightLog = ({test}) => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    const [weightLogs, setWeightLogs] = useState([])
    const [showLogForm, setShowLogForm] = useState(false)

    if (!isLoaded || !userId) {
        return null;
    }

    useEffect(() => {
        readWeightLog()
    }, [test])

    const openWeightLogForm = () => {
        setShowLogForm(true)
    }

    const closeWeightLogForm = () => {
        setShowLogForm(false)
    }

    const handleLogWeight = (weight) => {
        createWeightLog(weight)
        setShowLogForm(false)
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
    }

    const readWeightLog = async () => {
        const res = await fetch(`/api/weightLog`, {
            method: "GET"
        })
        const data = await res.json()
        setWeightLogs(data)
    }

    const updateWeightLog = async () => {
        const res = await fetch(`/api/weightLog`, {
            method: "PUT"
        })
    }

    const deleteWeightLog = async (e) => {

        const weightLog = {
            _id: e.target.id
        }

        const res = await fetch(`/api/weightLog`, {
            method: "DELETE",
            body: JSON.stringify(weightLog)
        })

        switch (res.status) {
            case 204:

                const updatedLogs = weightLogs.filter((log) => {
                    if (log._id !== e.target.id) {
                        return log
                    }
                })

                setWeightLogs(updatedLogs)

                break;
            case 404:
            
                break;
            default:
                break;
        }
        
    }

    let hideAdd = false

    weightLogs.map((log) => {
        let date = new Date(log.date).toLocaleDateString()
        let todaysDate = new Date().toLocaleDateString()
        if (date === todaysDate) {
            hideAdd = true
        }
    })

    weightLogs.sort((a,b) => {
        if (a.date < b.date) {
            return 1
        }
        if (a.date > b.date) {
            return -1
        }
        return 0
    })

    return (<>
        <div className="w-full md:w-1/4 md:mx-0">
            <h1 className="text-2xl text-center">Weight Log</h1>
            

            <div className="overflow-x-auto h-[40vh]">
                <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Weight</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                {
                    weightLogs.length > 0 ?
                        weightLogs.map((weightLog, index) => {
                            return(
                                <tr key={`tr_${index}`}>
                                    <td>{new Date(weightLog.date).toLocaleDateString()}</td>
                                    <td>{Math.floor(convertKgToLbs(weightLog.weight))}</td>
                                    <td>
                                        <button type='button' id={weightLog._id}  onClick={deleteWeightLog}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    :
                        <tr className="text-center w-full">
                            <td></td>
                            <td>No Data</td>
                            <td></td>
                            </tr>
                }
                </tbody>
            </table>
        </div>
        </div>
        
        {
            showLogForm ?
            <div className="flex flex-col absolute top-72">
                <WeightLogForm onLog={handleLogWeight} cancelInput={closeWeightLogForm}/>
            </div>
            : 
            <div className="flex flex-col h-full justify-end">
                <button className="h-16 w-16 rounded-full border justify-self-center" onClick={openWeightLogForm} hidden={hideAdd}>Add</button>   
            </div>
        }
        
        
    </>)
}

export default WeightLog