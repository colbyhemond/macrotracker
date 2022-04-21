import { useState } from 'react'

const Item = () => {
    const [items, setItems] = useState([])

    const createItem = async () => {

        let item = {
            name: 'item123',
            email: 'hemond.colby@gmail.com',
            createdDate: new Date().toJSON(),
        }

        const res = await fetch(`/api/item`, {
            method: "POST",
            body: JSON.stringify(item)
        })
    }

    const readItem = async () => {
        const res = await fetch(`/api/item`, {
            method: "GET"
        })
        const data = await res.json()
        setItems(data)
    }

    const updateItem = async () => {
        const res = await fetch(`/api/item`, {
            method: "PUT"
        })
    }

    const deleteItem = async (e) => {

        const item = {
            _id: e.target.id
        }

        const res = await fetch(`/api/item`, {
            method: "DELETE",
            body: JSON.stringify(item)
        })

        switch (res.status) {
            case 204:

                const updatedItems = items.filter((item) => {
                    if (item._id !== e.target.id) {
                        return item
                    }
                })

                setItems(updatedItems)

                break;
            case 404:
            
                break;
            default:
                break;
        }
        
    }


    return (<>
        <h1 className="text-2xl">Items</h1>
        <button onClick={createItem}>Create</button>
        <button onClick={readItem}>Read</button>
        <button onClick={updateItem}>Update</button>
        
        <div>
            {
                items.length > 0 ?
                     items.map((item) => {
                        return(<div key={item._id}>{item.name}<button id={item._id}  onClick={deleteItem}>X</button></div>)
                    })
                :
                    <div>No Items</div>
            }
        </div>
    </>)
}

export default Item