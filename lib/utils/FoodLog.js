
const FoodLog = {

    create: async function(req) {

        let foodLog = {
            user: req.user,
            date: new Date(req.date).toLocaleDateString(),
            items: req.items
        }

        const res = await fetch(`/api/foodLog`, {
            method: "POST",
            body: JSON.stringify(foodLog)
        })

         const data = res.json()
         return data
    },

    read: async (date) => {
        console.log('Foodlog/READ')
        const res = await fetch(`/api/foodLog?date=${date}`, {
            method: "GET"
        })
        const data = await res.json()
        return data

    }

    // const update = async () => {
    //     const res = await fetch(`/api/foodLog`, {
    //         method: "PUT"
    //     })
    // },

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

export default FoodLog