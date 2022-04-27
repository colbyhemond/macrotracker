

const MenuButton = ({name, onClick}) => {
    return (<>
        <button type="button" className="bg-slate-300 active:bg-slate-400 text-slate-700 font-extrabold w-full h-16 flex justify-center items-center" onClick={onClick}>{name}</button>
    </>)
}

export default MenuButton