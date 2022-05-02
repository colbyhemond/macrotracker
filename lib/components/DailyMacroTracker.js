import MacroInputForm from '../components/MacroInputForm'
import MacroProgress from '../components/MacroProgress'
import {calcFatGrams, calcCarbGrams, calcProteinGrams, getIntakeValues, getCalories} from '../utils/macrocalculator'
import { useState, useEffect } from 'react'
import ItemList from './ItemList'
import {getLastVisited, setLastVisited} from '../utils/lastvisited'
import FoodLog from '../utils/FoodLog'
import { useAuth } from '@clerk/nextjs';
import Modal from './Modal'
import ModalButton from './ModalButton'
import CaloriesDisplay from './CaloriesDisplay'


const DailyMacroTracker = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const [todaysLog, setTodaysLog] = useState({})
  const todaysDate = new Date()
  const intakeValues = {fat:0,carbs:0,protein:0}
  const calories = 0

  useEffect( () => {

    if (todaysLog && Object.keys(todaysLog).length === 0) {
        FoodLog.read(
            todaysDate.toLocaleDateString()
        ).then((res) => {
            setTodaysLog(res[0])
        })
        
    }
  }, [])

  if (!isLoaded || !userId) {
    return null;
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

  const macros = {
    calories: 2251,
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


  return (
    <>
      <div className="flex flex-col justify-end items-center">
        <div className="pb-5 text">
          {todaysDate.toDateString()}
        </div>
        <MacroProgress intakeValues={intakeValues} baseValues={baseValues} />
        <CaloriesDisplay calories={calories}/>
      </div>
      
       
      <Modal modalId='macroinput'>
        <MacroInputForm itemAdded={handleItemAdded} /> 
      </Modal>

      <div className="flex justify-center absolute bottom-20 w-full">
        <ModalButton modalId='macroinput'>+ Add Food</ModalButton>
      </div>
        
    </>
  )
}

export default DailyMacroTracker