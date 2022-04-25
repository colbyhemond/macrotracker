import Head from 'next/head'
import Script from 'next/script'
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

  const handleClickSettings = () => {
    setWidget('settings')
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
          <img src='/settings.svg'/>
        </div>
      </div>
      <div className="h-[50vh] flex flex-col justify-start items-center pt-10">
        { widget === 'settings' ? <UserSetUp/> : null}
        { widget === 'macro' ? <DailyMacroTracker/> : null}
        { widget === 'setup' ? <UserSetUp/> : null}
        { widget === 'weight' ? <WeightWidget/> : null}
        { widget === 'items' ? <ItemList items={[]}/>: null}
        
      </div>
      <div className="h-[10vh] flex flex-col justify-center items-center">
        <Menu onWeight={handleClickWeight} onMacros={handleClickMacros} onItems={handleClickItems}/>
      </div>
      <footer></footer>
    </>
  )
}