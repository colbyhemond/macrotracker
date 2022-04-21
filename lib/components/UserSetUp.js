import {useState} from 'react'
import {convertLbsToKg, calcBMR} from '../utils/macrocalculator'

const UserSetUp = () => {
    const [age, setAge] = useState(0)
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [gender, setGender] = useState('male')
    const [bmr, setBmr] = useState(0)

    const handleAgeInput = (e) => {
        setAge(e.target.value)
    }

    const handleWeightInput = (e) => {
        setWeight(convertLbsToKg(e.target.value))
    }

    const handleHeightInput = (e) => {
        setHeight(e.target.value)
    }

    const handleGenderInput = (e) => {
        if (e.target.check === false) {
            setGender('m')
        } else {
            setGender('f')
        }
    }

    const handleCalcBMR = () => {
        setBmr(calcBMR(gender, weight, height, age))
    }

    return (<>
    <div className="h-[100vh] flex flex-col justify-center items-center">
        <div className="flex flex-col relative">
            <form className="flex flex-col border border-slate-500 rounded shadow-lg bg-slate-400 content-center w-min h-min p-3">
            <h1 className="text-center text-slate-700 font-extrabold text-2xl">Get Started!</h1>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Name: </label>
                    <input type="text" name='item' className="border rounded w-100 p-1 text-xl" ></input>
                </div>
                <div className=" border border-slate-400 shadow-md rounded flex justify-evenly items-center py-2 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Male</label>
                    <input type="checkbox" className="toggle toggle-lg" onChange={handleGenderInput}></input>
                    <label className="mr-1 text-slate-600 font-extrabold">Female</label>
                </div>
                
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Age:</label>
                    <input type="text" pattern="\d*" name='test' className="border rounded w-100 p-1 text-xl" onChange={handleAgeInput}></input>
                </div>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Weight:</label>
                    <input type="text" pattern="\d*" name='test' className="border rounded w-100 p-1 text-xl" onChange={handleWeightInput}></input>
                </div>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Height:</label>
                    <input type="text" pattern="\d*" name='test' className="border rounded w-100 p-1 text-xl" onChange={handleHeightInput}></input>
                </div>
                <button type="button" className="border border-slate-400 shadow-md rounded bg-slate-300 py-3 my-1 text-slate-700 font-extrabold hover:shadow-xl hover:bg-slate-300" onClick={handleCalcBMR}>Calculate BMR</button>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">BMR:</label>
                    <input type="text" pattern="\d*" name='test' className="border rounded w-100 p-1 text-xl" value={bmr} readOnly={true}></input>
                </div>
            </form>
            <button type="button" className="border border-slate-400 shadow-md rounded bg-slate-400 py-3 px-9 my-5 text-slate-700 font-extrabold hover:shadow-xl hover:bg-slate-300" >Continue</button>
        </div>
        </div>
    </>)
}

export default UserSetUp