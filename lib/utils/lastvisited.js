



export const getLastVisited = () => {
    const storage = window.localStorage
    const lastVisited = storage.getItem('_macroLastVisited')

    if (lastVisited) {
        return new Date(lastVisited)
    }
}

export const setLastVisited = (date) => {
    const storage = window.localStorage
    const lastVisited = storage.setItem('_macroLastVisited', date)
}