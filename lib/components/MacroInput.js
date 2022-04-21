

const MacroInput = ({props, label, onChange}) => {
    return (<>
        <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
            <label className="mr-1 text-slate-600 font-extrabold">{label}:</label>
            <input type="text" pattern="\d*" name={props.name} className="border rounded w-100 p-1 text-xl" onChange={onChange}></input>
        </div>
    </>)
}

export default MacroInput