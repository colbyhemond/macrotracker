

const MacroInputForm = ({itemAdded}) => {
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
        console.log(item);

        document.getElementById("macroinputform").reset();
        console.log(item);
        
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
        <div className="flex flex-col ">
            <form id="macroinputform" className="flex flex-col border border-slate-500 rounded shadow-lg bg-slate-400 content-center p-3">
            <h1 className="text-center text-slate-700 font-extrabold text-2xl">Enter Macros</h1>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Item: </label>
                    <input type="text" name='item' required className="border rounded w-[70%] p-1 text-xl" onChange={handleItemNameChange}></input>
                </div>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Fat: </label>
                    <input type="text" pattern="\d*" name='fat' required className="border rounded w-[70%] p-1 text-xl" onChange={handleFatChange}></input>
                </div>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Carbs: </label>
                    <input type="text" pattern="\d*" name='carbs' required className="border rounded w-[70%] p-1 text-xl" onChange={handleCarbChange}></input>
                </div>
                <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
                    <label className="mr-1 text-slate-600 font-extrabold">Protein: </label>
                    <input type="text" pattern="\d*" name='protein' required className="border rounded w-[70%] p-1 text-xl" onChange={handleProteinChange}></input>
                </div>
            </form>
            <div className='modal-action'>
                <label for='macroinput' className="btn w-full" onClick={handleItemAdded}>Log</label>
            </div>
        </div>
    </>)
}

export default MacroInputForm