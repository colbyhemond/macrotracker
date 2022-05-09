import {useState} from 'react'

const Collapse = ({title, children}) => {
    const [collapse, setCollapse] = useState('collapse-closed')

    const handleClickCollapse = () => {
        if (collapse === 'collapse-closed') {
            setCollapse('collapse-open')
        } else if (collapse === 'collapse-open') {
            setCollapse('collapse-closed')
        }
    }

    return (<>
        <div class={`collapse collapse-arrow ${collapse}`} onClick={handleClickCollapse}>
            <input type="checkbox" class="peer" /> 
            <div class="collapse-title bg-slate-600 text-primary-content font-extrabold">
                {title}
            </div>
            <div class="collapse-content bg-slate-500 text-primary-content"> 
                {children}
            </div>
        </div>
    </>)
}

export default Collapse