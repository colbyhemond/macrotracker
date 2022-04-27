

const MacroInput = ({props, label, onChange, defaultValue}) => {
    console.log(label);
    console.log(value);
    return (<>
        <div className=" border border-slate-400 shadow-md rounded flex justify-between items-center p-1 my-1 bg-slate-300">
            <label className="mr-1 text-slate-600 font-extrabold">{label}:</label>
            <input type="text" defaultValue={defaultValue} pattern="\d*" name={props.name} className="border rounded w-[70%] p-1 text-xl" ref={onChange} ></input>
        </div>
    </>)
}

export default MacroInput