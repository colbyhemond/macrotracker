import MacroInputForm from '../components/MacroInputForm'
import MacroProgress from '../components/MacroProgress'
import {calcFatGrams, calcCarbGrams, calcProteinGrams, getIntakeValues} from '../utils/macrocalculator'
import { useState, useEffect } from 'react'
import ItemList from './ItemList'
import {getLastVisited, setLastVisited} from '../utils/lastvisited'
import FoodLog from '../utils/FoodLog'
import { useAuth } from '@clerk/nextjs';


const DailyMacroTracker = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const [showForm, setShowForm] = useState(false)
  const [todaysLog, setTodaysLog] = useState({})
  const todaysDate = new Date()
  const intakeValues = {fat:0,carbs:0,protein:0}

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
    setShowForm(false)
  }

  const handleShowForm = () => {
    setShowForm(true)
  }

  const handleCancelInput = () => {
    setShowForm(false)
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
  }

console.log(todaysLog);


  return (
    <>
      <div className="h-[30vh] flex flex-col justify-end items-center">
        <div className="pb-5 text">
          {todaysDate.toDateString()}
        </div>
        <MacroProgress intakeValues={intakeValues} baseValues={baseValues} />
      </div>
      
        { 
          showForm ? 
          <div className="absolute flex flex-col top-48">
            <MacroInputForm itemAdded={handleItemAdded} cancelInput={handleCancelInput}/> 
          </div>
          :
          <div className="h-[50vh] flex flex-col content-start items-start">
            <button className="px-10 py-2 text-2xl font-bold" onClick={handleShowForm}>+ Add Item</button>
          </div>
        }
        
    </>
  )
}

export default DailyMacroTracker