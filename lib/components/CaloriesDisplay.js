

const CaloriesDisplay = ({calories}) => {

    if (!calories) {
        calories = '0'
    }

    return (<>
        <div className='text-3xl font-bold'>{calories}</div>
        <div className='text-xs font'>Calories Remaining</div>
    </>)
}

export default CaloriesDisplay