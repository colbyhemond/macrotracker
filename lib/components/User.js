import { useState } from 'react'

const User = () => {
    const [users, setUsers] = useState([])

    const createUser = async () => {

        let user = {
            name: 'user123',
            email: 'hemond.colby@gmail.com',
            createdDate: new Date().toJSON(),
        }

        const res = await fetch(`/api/user`, {
            method: "POST",
            body: JSON.stringify(user)
        })
    }

    const readUser = async () => {
        const res = await fetch(`/api/user`, {
            method: "GET"
        })
        const data = await res.json()
        setUsers(data)
    }

    const updateUser = async () => {
        const res = await fetch(`/api/user`, {
            method: "PUT"
        })
    }

    const deleteUser = async (e) => {

        const user = {
            _id: e.target.id
        }

        const res = await fetch(`/api/user`, {
            method: "DELETE",
            body: JSON.stringify(user)
        })

        switch (res.status) {
            case 204:

                const updatedUsers = users.filter((user) => {
                    if (user._id !== e.target.id) {
                        return user
                    }
                })

                setUsers(updatedUsers)

                break;
            case 404:
            
                break;
            default:
                break;
        }
        
    }


    return (<>
        <h1 className="text-2xl">Users</h1>
        <button onClick={createUser}>Create</button>
        <button onClick={readUser}>Read</button>
        <button onClick={updateUser}>Update</button>
        
        <div>
            {
                users.length > 0 ?
                     users.map((user) => {
                        return(<div key={user._id}>{user.name}<button id={user._id}  onClick={deleteUser}>X</button></div>)
                    })
                :
                    <div>No Users</div>
            }
        </div>
    </>)
}

export default User