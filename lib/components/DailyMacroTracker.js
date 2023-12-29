import MacroInputForm from '../components/MacroInputForm'
import MacroProgress from '../components/MacroProgress'
import {calcFatGrams, calcCarbGrams, calcProteinGrams, getIntakeValues, getCalories} from '../utils/macrocalculator'
import { useState, useEffect } from 'react'
import ItemList from './ItemList'
import {getLastVisited, setLastVisited} from '../utils/lastvisited'
import FoodLog from '../utils/FoodLog'
import User from '../utils/User'
import { useAuth } from '@clerk/nextjs';
import Modal from './Modal'
import ModalButton from './ModalButton'
import CaloriesDisplay from './CaloriesDisplay'
import DateDisplay from './DateDisplay'


const DailyMacroTracker = ({date, onDateChange, onUserSetupRequired}) => {
  console.log('START');
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  console.log('AFTER AUTH');
  const [todaysLog, setTodaysLog] = useState({})
  const [userInfo, setUserInfo] = useState({})

  let intakeValues = {fat:0,carbs:0,protein:0}
  let calories = 0
  let addFood = false

  useEffect( () => {
    //Need to set up caching so that the DB doesn't have to be read everytime a date change happens
      
        FoodLog.read(
            date.toLocaleDateString()
        ).then((res) => {
            console.log('response found');
            setTodaysLog(res[0])
        }).catch((e) => {
          console.log('ERROR');
          console.log(e);
        })

  }, [date])

  useEffect( () => {
    User.read().then((res) => {
      console.log('response found');
      setUserInfo(res[0])
  }).catch((e) => {
    console.log('ERROR');
    console.log(e);
  })
  }, [])

  if (!isLoaded || !userId) {
    return null;
  }

  if (!date) {
    return null
  }

  if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
    addFood = true
  }

  const handleItemAdded = async (item) => {

    let itemsArray = todaysLog && todaysLog.items ? todaysLog.items : []
    itemsArray.push(item)

    let newLog ={
        user: userId,
        date: new Date(),
        items: itemsArray
    }
    const res = await FoodLog.create(newLog)
    newLog._id = res
    setTodaysLog(newLog)
  }

  const handleDateChange = (date) => {
    console.log(date);
  }
  console.log(userInfo);

  if (!userInfo) {
    onUserSetupRequired()
  }

  const macros = {
    calories: userInfo ? userInfo.bmr : 0, // 2251,
    fatPercentage: .2,
    carbPercentage: .5,
    proteinPercentage: .3
  }

  const baseValues = {
    fatGrams: calcFatGrams(macros.calories, macros.fatPercentage),
    carbGrams: calcCarbGrams(macros.calories, macros.carbPercentage),
    proteinGrams: calcProteinGrams(macros.calories, macros.proteinPercentage)
  }

  if ( todaysLog && todaysLog.items && todaysLog.items.length > 0) {
    intakeValues = getIntakeValues(todaysLog.items)
    calories = macros.calories - getCalories(todaysLog.items)
  } else {
    calories = macros.calories
  }

console.log(todaysLog);
  //if user info is non existent, then we need to set up the user

  return (
    <>

        <div className="flex flex-col justify-end items-center">
          <DateDisplay date={date} onChange={onDateChange}/>
          <MacroProgress intakeValues={intakeValues} baseValues={baseValues} />
          <CaloriesDisplay calories={calories}/>
        </div>

      
      
       
      <Modal modalId='macroinput'>
        <MacroInputForm itemAdded={handleItemAdded} /> 
      </Modal>
      { addFood ? (
        <div className="flex justify-center absolute bottom-20 w-full">
          <ModalButton modalId='macroinput'>+ Add Food</ModalButton>
        </div>
      ) : null}
      
        
    </>
  )
}

export default DailyMacroTracker