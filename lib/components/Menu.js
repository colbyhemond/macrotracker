const { default: MenuButton } = require("./MenuButton")


const Menu = ({onWeight, onMacros, onItems}) => {

    return (<>
        <div className="flex gap-x-px w-full justify-center bg-slate-400">
            <MenuButton name='Macros' onClick={onMacros}/>
            <MenuButton name='Weight' onClick={onWeight}/>
            {/* <MenuButton name='Items' onClick={onItems}/> */}
        </div>
    </>)
}

export default Menu