

const MenuButton = ({name, onClick}) => {
    return (<>
        <button type="button" className="border rounded-full bg-slate-300 shadow-2xl hover:shadow-black text-slate-700 w-20 h-20 p-2 mx-5 flex justify-center items-center" onClick={onClick}>{name}</button>
    </>)
}

export default MenuButton