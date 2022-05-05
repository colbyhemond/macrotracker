import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'

const DateDisplay = ({date, onChange}) => {
    const [_date, setDate] = useState(null)

    useEffect(() => {
        if (!_date) {
            setDate(date)
        }
    }, [date])

    if (!_date) {
        return null
    } 

    const handleSubtractDay = () => {
        let date = new Date(_date.valueOf());
        date.setDate(date.getDate() - 1);
        setDate(date)
        onChange(date)
    }

    const handleAddDay = () => {
        let date = new Date(_date.valueOf());
        date.setDate(date.getDate() + 1);
        setDate(date)
        onChange(date)
    }

    return (<>
        <div className='flex items-center pb-5'>
            <div className='mx-5' onClick={handleSubtractDay}>
                <ArrowLeft />
            </div>
            <div className=" text-2xl font-bold">
                {new Date(_date).toDateString()}
            </div>
            <div className='mx-5' onClick={handleAddDay}>
                <ArrowRight/>
            </div>
        </div>
    </>)
}

export default DateDisplay