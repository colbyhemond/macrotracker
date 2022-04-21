const { default: MenuButton } = require("./MenuButton")


const Menu = ({onWeight, onMacros, onItems}) => {

    return (<>
        <div className="fixed flex">
            <MenuButton name='Macros' onClick={onMacros}/>
            <MenuButton name='Weight' onClick={onWeight}/>
            {/* <MenuButton name='Items' onClick={onItems}/> */}
        </div>
    </>)
}

export default Menu