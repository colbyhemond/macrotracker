import  WeightLog  from './WeightLog'
import WeightChart from './WeightChart'
import { useState } from 'react'

const WeightWidget = () => {
    const [checked, setChecked] = useState(false)

    const handleToggle = () => {
        setChecked(!checked)
    }

    return (<>
        {/* {checked ? (
            <WeightLog/>
        ) : ( */}
            <WeightChart/>
        {/* )}
        <div className='flex justify-center'>
            <input type="checkbox" className="toggle" checked={checked} onChange={handleToggle}/>
        </div> */}
    </>)
}

export default WeightWidget