import MacroInput from '../components/MacroInput'

const MacroInputForm = ({itemAdded, cancelInput}) => {
    let itemName = ''
    let fat = 0
    let carb = 0
    let protein = 0

    const handleItemAdded = () => {

        const item = {
            date: new Date().toJSON(),
            item: itemName.toUpperCase(),
            fat: parseInt(fat),
            carb: parseInt(carb),
            protein: parseInt(protein)
        }
        
        itemAdded(item)
    }

    const handleFatChange = (e) => {
        fat = e.target.value
    }

    const handleCarbChange = (e) => {
        carb = e.target.value
    }

    const handleProteinChange = (e) => {
        protein = e.target.value
    }

    const handleItemNameChange = (e) => {
        itemName = e.target.value
    }

    const fatInput = {
        name: 'fat'
    }
    
    const carbInput = {
        name: 'carb'
    }

    const proteinInput = {
        name: 'protein'
    }

    return (<>
        <div className="flex flex-col relative">
            <button className="absolute -right-3 -top-3 rounded-full bg-slate-700 border-4 border-slate-200 w-8 h-8 flex justify-center items-center font-extrabold" onClick={cancelInput}>x</button>
            <form className="flex flex-col border border-slate-500 rounded shadow-lg bg-slate-400 content-center w-min h-min p-3">
            <h1 className="text-center text-slate-700 font-extrabold text-2xl">Enter Macros</h1>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Item: </label>
                    <input type="text" name='item' className="border rounded w-100 p-1 text-xl" onChange={handleItemNameChange}></input>
                </div>
                <MacroInput label="Fat" props={fatInput} onChange={handleFatChange}/>
                <MacroInput label="Carbs" props={carbInput} onChange={handleCarbChange}/>
                <MacroInput label="Protein" props={proteinInput} onChange={handleProteinChange}/>
            </form>
            <button className="border border-slate-400 shadow-md rounded bg-slate-400 py-3 px-9 my-5 text-slate-700 font-extrabold hover:shadow-xl hover:bg-slate-300" onClick={handleItemAdded}>Log</button>
        </div>
    </>)
}

export default MacroInputForm