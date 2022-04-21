import Head from 'next/head'
import Image from 'next/image'
import DailyMacroTracker from '../lib/components/DailyMacroTracker'
import UserSetUp from '../lib/components/UserSetUp'
import WeightWidget from '../lib/components/WeightWidget'
import ItemList from '../lib/components/ItemList'
import Menu from '../lib/components/Menu'
import { useState } from 'react'



export default function Home() {
  const [widget, setWidget] = useState('macro')

  const handleClickMacros = () => {
    setWidget('macro')
  }

  const handleClickWeight = () => {
    setWidget('weight')
  }

  const handleClickItems = () => {
    setWidget('items')
  }

  return (
    <>
      <div className="h-[70vh] flex flex-col justify-start items-center pt-10">
        { widget === 'macro' ? <DailyMacroTracker/> : null}
        { widget === 'setup' ? <UserSetUp/> : null}
        { widget === 'weight' ? <WeightWidget/> : null}
        { widget === 'items' ? <ItemList items={[]}/>: null}
        
      </div>
      <div className="h-[20vh] flex flex-col justify-center items-center">
        <Menu onWeight={handleClickWeight} onMacros={handleClickMacros} onItems={handleClickItems}/>
      </div>
    </>
  )
}