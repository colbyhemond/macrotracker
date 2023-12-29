import { useState, useEffect } from 'react'
import {convertLbsToKg, convertKgToLbs, calcBMR, activityLevels} from '../utils/macrocalculator'
import User from '../utils/User'
import { useAuth } from '@clerk/nextjs';


const UserSetUp = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [feet, setFeet] = useState(0)
    const [inches, setInches] = useState(0)
    const [gender, setGender] = useState('m')
    const [bmr, setBmr] = useState(0)
    const [activity, setActivity] = useState(0)

    const { isLoaded, userId, sessionId, getToken } = useAuth();

    useEffect( () => {
        //Need to set up caching so that the DB doesn't have to be read everytime a date change happens
            User.read().then((res) => {
                console.log('response found');
                const user = res[0]
                console.log(user);
                setName(user.name)
                setAge(user.age)
                setWeight(user.weight)
                setFeet(user.feet)
                setInches(user.inches)
                setHeight(user.height)
                setGender(user.gender)
                setBmr(user.bmr)
                setActivity(user.activity)
            }).catch((e) => {
              console.log('ERROR');
              console.log(e);
            })
    
      }, [])


    const handleNameInput = (e) => {
        setName(e.target.value)
    }

    const handleAgeInput = (e) => {
        setAge(e.target.value)
    }

    const handleWeightInput = (e) => {
        setWeight(convertLbsToKg(e.target.value))
    }

    const handleHeightInput = (feet, inches) => {
        setHeight(e.target.value)
    }

    const handleFootInput = (e) => {
        const _feet = isNaN(parseInt(e.target.value)) ? parseInt(0) : parseInt(e.target.value)
        const _inches = _feet * 12
        setFeet(_inches)
        setHeight(_inches + inches)
    }

    const handleInchInput = (e) => {
        const _inches = isNaN(parseInt(e.target.value)) ? parseInt(0) : parseInt(e.target.value)
        setInches(_inches)
        setHeight(_inches + feet)
    }

    const handleGenderInput = (e) => {
        if (e.target.checked === false) {
            setGender('m')
        } else {
            setGender('f')
        }
    }

    const handleActivityInput = (e) => {
        console.log(e.target.value);
        setActivity(parseFloat(e.target.value))
    }

    const handleCalcBMR = () => {
        const _cm = (height * 2.54) 
        const _bmr = calcBMR(gender, weight, _cm, parseInt(age), activity)
        console.log(_bmr);
        setBmr(_bmr)
    }

    const handleSave = async () => {
        console.log(name);
        console.log(gender);
        console.log(parseInt(age));
        console.log(weight);
        console.log(height);
        console.log(bmr);

        const user = {
            user: userId,
            name: name,
            gender: gender,
            age: parseInt(age),
            weight: parseFloat(weight),
            feet: parseInt(feet),
            inches: parseInt(inches),
            height: parseFloat(height),
            bmr: parseInt(bmr),
            activity: parseFloat(activity)
        }
    

        const res = await User.update(user)

        // after save go back to home screen

    }


        


    return (<>
    <div className="h-[60vh] flex flex-col justify-center items-center">
        <div className="flex flex-col relative">
            <form className="flex flex-col border border-slate-500 rounded shadow-lg bg-slate-400 content-center w-min h-min p-3">
            <h1 className="text-center text-slate-700 font-extrabold text-2xl">Settings</h1>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Name: </label>
                    <input type="text" name='item' className="border rounded w-100 p-1 text-xl" value={name} onChange={handleNameInput}></input>
                </div>
                <div className=" border border-slate-400 shadow-md rounded flex justify-evenly items-center py-2 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Male</label>
                    <input type="checkbox" className="toggle toggle-lg" checked={gender === 'f' ? true : false} onChange={handleGenderInput}></input>
                    <label className="mr-1 text-slate-600 font-extrabold">Female</label>
                </div>
                
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Age:</label>
                    <input type="text" pattern="\d*" name='age' className="border rounded w-100 p-1 text-xl" value={age} onChange={handleAgeInput}></input>
                </div>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Weight:</label>
                    <input type="text" pattern="\d*" name='weight' className="border rounded w-100 p-1 text-xl" value={Math.floor(convertKgToLbs(weight))} onChange={handleWeightInput}></input>
                </div>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Feet:</label>
                    <input type="text" pattern="\d*" name='feet' className="border rounded w-100 p-1 text-xl" value={feet / 12} onChange={handleFootInput}></input>
                </div>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Inches:</label>
                    <input type="text" pattern="\d*" name='inches' className="border rounded w-100 p-1 text-xl" value={inches} onChange={handleInchInput}></input>
                </div>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Activity:</label>
                    <select name='activity' className="border rounded w-full p-1 text-xl" onChange={handleActivityInput}>
                        <option disabled selected={activity ? false : true}>Select Level</option>
                        {activityLevels.map((level, key) => {
                            console.log(level.value);
                            console.log(activity);
                            return (<option selected={activity === parseFloat(level.value) ? true : false} key={level.key} value={level.value}>{level.key}</option>)
                        })}
                        {/* <option value={1.2}>Sedentary</option>
                        <option value={1.375}>Lightly Active</option>
                        <option value={1.55}>Moderately Active</option>
                        <option value={1.725}>Active</option>
                        <option value={1.9}>Very Active</option> */}
                    </select>
                </div>
                <button type="button" className="border border-slate-400 shadow-md rounded bg-slate-300 py-3 my-1 text-slate-700 font-extrabold hover:shadow-xl hover:bg-slate-300" onClick={handleCalcBMR}>Calculate BMR</button>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">BMR:</label>
                    <input type="text" pattern="\d*" name='bmr' className="border rounded w-100 p-1 text-xl" value={bmr} readOnly={true}></input>
                </div>
            </form>
            <button type="button" className="border border-slate-400 shadow-md rounded bg-slate-400 py-3 px-9 my-5 text-slate-700 font-extrabold hover:shadow-xl hover:bg-slate-300" onClick={handleSave}>Save</button>
        </div>
        </div>
    </>)
}

export default UserSetUp