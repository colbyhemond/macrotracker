import MacroInputForm from "./MacroInputForm"
import { useState } from "react"


const ItemList = ({items}) => {
    const [showInputForm, setShowInputForm] = useState(false)

    const deleteItem = () => {

    }

    const openItemForm = () => {
        setShowInputForm(true)
    }

    const handleItemAdded = () => {
        setShowInputForm(false)
    }

    const handleCancelInput = () => {
        setShowInputForm(false)
    }

    return (<>
        <div className="w-full ">
            <h1 className="text-2xl text-center">Items</h1>
            

            <div class="overflow-x-auto h-[40vh]">
                <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>F</th>
                        <th>C</th>
                        <th>P</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                {
                    items.length > 0 ?
                        items.map((item, index) => {
                            return(
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.fat}</td>
                                    <td>{item.carb}</td>
                                    <td>{item.protein}</td>
                                    <td>
                                        <button type='button' id={item._id}  onClick={deleteItem}>X</button>
                                    </td>
                                </tr>
                            )
                        })
                    :
                        <tr className="text-center w-full">
                            <td>No Data</td>
                            <td></td>
                            <td></td>
                            </tr>
                }
                </tbody>
            </table>
        </div>
        </div>

        {
            showInputForm ?
                <div className='absolute flex top-40 md:top-60'>
                <MacroInputForm itemAdded={handleItemAdded} cancelInput={handleCancelInput}/>
                </div>
            : 
                <div className="flex items-end h-full">
                    <button className="h-16 w-16 rounded-full border" onClick={openItemForm} >Add</button>
                </div>
        }

        
    </>)
}

export default ItemList