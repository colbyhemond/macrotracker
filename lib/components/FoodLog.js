import { useState } from 'react'

const FoodLog = () => {
    const [foodLogs, setFoodLogs] = useState([])

    const createFoodLog = async () => {

        let foodLog = {
            user: 'user123',
            date: new Date().toJSON(),
            items: []
        }

        const res = await fetch(`/api/foodLog`, {
            method: "POST",
            body: JSON.stringify(foodLog)
        })
    }

    const readFoodLog = async () => {
        const res = await fetch(`/api/foodLog`, {
            method: "GET"
        })
        const data = await res.json()
        setFoodLogs(data)
    }

    const updateFoodLog = async () => {
        const res = await fetch(`/api/foodLog`, {
            method: "PUT"
        })
    }

    const deleteFoodLog = async (e) => {

        const foodLog = {
            _id: e.target.id
        }

        const res = await fetch(`/api/foodLog`, {
            method: "DELETE",
            body: JSON.stringify(foodLog)
        })

        switch (res.status) {
            case 204:

                const updatedLogs = foodLogs.filter((log) => {
                    if (log._id !== e.target.id) {
                        return log
                    }
                })

                setFoodLogs(updatedLogs)

                break;
            case 404:
            
                break;
            default:
                break;
        }
        
    }


    return (<>
        <h1 className="text-2xl">Food Log</h1>
        <button onClick={createFoodLog}>Create</button>
        <button onClick={readFoodLog}>Read</button>
        <button onClick={updateFoodLog}>Update</button>
        
        <div>
            {
                foodLogs.length > 0 ?
                     foodLogs.map((foodLog) => {
                        return(<div key={foodLog._id}>{foodLog.date}<button id={foodLog._id}  onClick={deleteFoodLog}>X</button></div>)
                    })
                :
                    <div>No Food Logs</div>
            }
        </div>
    </>)
}

export default FoodLog