

const RadialProgress = ({label, value, baseValue}) => {


    const calculatePercentage = (numerator, denominator) => {
        return ( numerator / denominator ) * 100
    }

    return (<>
    <div className="px-2">
        <div className="radial-progress" style={{"--value":calculatePercentage(value, baseValue)}}>
            <div className="flex flex-col items-center">
                <div >
                    {baseValue - value}g
                </div>
                <div className="text-xs">
                    {label}
                </div>
            </div>
        </div>
    </div>
    </>)
}

export default RadialProgress