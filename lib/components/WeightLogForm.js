import {useState} from 'react'
import {convertLbsToKg} from '../utils/macrocalculator'


const WeightLogForm = ({onLog, cancelInput}) => {

    const [weight, setWeight] = useState(0)


    const handleWeightInput = (e) => {
        setWeight(convertLbsToKg(e.target.value))
    }

    const handleClickLog = () => {
        if (weight > 0) {
            onLog(weight)
            document.getElementById("weightlogform").reset();
        } else {
            //error
        }

    }


    return (<>
    {/* <div className="h-[30vh] flex flex-col justify-start items-center"> */}
        <div className="flex flex-col">
        {/* <button className="absolute -right-3 -top-3 rounded-full bg-slate-700 border-4 border-slate-200 w-8 h-8 flex justify-center items-center font-extrabold" onClick={cancelInput}>x</button> */}
            <form id='weightlogform' className="flex flex-col border border-slate-500 rounded shadow-lg bg-slate-400 content-center  h-min p-3">
            <h1 className="text-center text-slate-700 font-extrabold text-2xl">Log Weight</h1>
                
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Weight:</label>
                    <input type="text" pattern="\d*" name='test' className="border rounded w-[70%] p-1 text-xl" onChange={handleWeightInput}></input>
                </div>
            </form>
            <label htmlFor='weightinput' className="btn w-full mt-5" onClick={handleClickLog}>Log</label>
        </div>
        {/* </div> */}
    </>)
}

export default WeightLogForm