
const User = {

    create: async function(req) {

        let foodLog = {
            user: req.user,
            date: new Date(req.date).toLocaleDateString(),
            items: req.items
        }

        const res = await fetch(`/api/user`, {
            method: "POST",
            body: JSON.stringify(foodLog)
        })

         const data = res.json()
         return data
    },

    read: async (user) => {
        const res = await fetch(`/api/user?user=${user}`, {
            method: "GET"
        })
        const data = await res.json()
        return data

    },

    update: async (userInfo) => {
        const res = await fetch(`/api/user`, {
            method: "PUT",
            body: JSON.stringify(userInfo)
        })

        const data = res.json()
        return data
    },

    updateWeight: async (weight) => {
        const res = await fetch(`/api/user?weight=true`, {
            method: "PUT",
            body: JSON.stringify({"weight": weight})
        })

        const data = res.json()
        return data
    }

    // const del = async () => {

    //     const foodLog = {
    //         _id: e.target.id
    //     }

    //     const res = await fetch(`/api/foodLog`, {
    //         method: "DELETE",
    //         body: JSON.stringify(foodLog)
    //     })

    //     switch (res.status) {
    //         case 204:

    //             const updatedLogs = foodLogs.filter((log) => {
    //                 if (log._id !== e.target.id) {
    //                     return log
    //                 }
    //             })

    //             return updatedLogs

    //             break;
    //         case 404:
            
    //             break;
    //         default:
    //             break;
    //     }
        
    // }
    
}

export default User