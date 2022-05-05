import Head from 'next/head'
import Script from 'next/script'
import DailyMacroTracker from '../lib/components/DailyMacroTracker'
import UserSetUp from '../lib/components/UserSetUp'
import WeightWidget from '../lib/components/WeightWidget'
import ItemList from '../lib/components/ItemList'
import Menu from '../lib/components/Menu'
import { useState } from 'react'
import MenuPosition from '../lib/components/MenuPosition'
import MainContentPosition from '../lib/components/MainContentPosition'
import { Settings } from 'react-feather'



export default function Home() {
  const [widget, setWidget] = useState('macro')
  const [date, setDate] = useState(new Date())


  const handleClickMacros = () => {
    setWidget('macro')
  }

  const handleClickWeight = () => {
    setWidget('weight')
  }

  const handleClickItems = () => {
    setWidget('items')
  }

  const handleClickSettings = () => {
    setWidget('settings')
  }

  const handleDateChange = (d) => {
    setDate(d)
  }

  return (
    <>
    <Script
        src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
        async=""
      ></Script>
    <Head>
      <title>Macro Tracker</title>
      <meta
        name="description"
        content="Track those macros"
      />
      <link rel="icon" href="/favicon.ico" />
      
    </Head>
      <div className='h-[10vh] flex justify-end mr-5 mt-5'>
        <div onClick={handleClickSettings}>
          <Settings/>
        </div>
      </div>
      <MainContentPosition>
        { widget === 'settings' ? <UserSetUp/> : null}
        { widget === 'macro' ? <DailyMacroTracker date={date} onDateChange={handleDateChange}/> : null}
        { widget === 'setup' ? <UserSetUp/> : null}
        { widget === 'weight' ? <WeightWidget/> : null}
        { widget === 'items' ? <ItemList items={[]}/>: null}
      </MainContentPosition>
      <MenuPosition>
        <Menu onWeight={handleClickWeight} onMacros={handleClickMacros} onItems={handleClickItems}/>
      </MenuPosition>
    </>
  )
}