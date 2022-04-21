
import RadialProgress from '../components/RadialProgress'

const MacroProgress = ({intakeValues, baseValues}) => {
    return (<>
        <div className="flex py-5">
          <RadialProgress label="Fat" value={intakeValues.fat} baseValue={baseValues.fatGrams}/>
          <RadialProgress label="Carbs" value={intakeValues.carbs} baseValue={baseValues.carbGrams}/>
          <RadialProgress label="Protein" value={intakeValues.protein} baseValue={baseValues.proteinGrams}/>
        </div>
    </>)
}

export default MacroProgress