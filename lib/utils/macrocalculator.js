

    export const calcFatGrams = (calories, percentage) => {
        const grams = Math.floor(( calories * percentage ) / 9)
        return grams
    }

    export const calcCarbGrams = (calories, percentage) => {
        const grams = Math.floor(( calories * percentage ) / 4)
        return grams
    }

    export const calcProteinGrams = (calories, percentage) => {
        const grams = Math.floor(( calories * percentage ) / 4)
        return grams
    }   

    export const getIntakeValues = (items) => {
        let f = 0
        let c = 0
        let p = 0

        items.map((item) => {
            f = f + item.fat
            c = c + item.carb
            p = p + item.protein
        })

        return {
            fat: f,
            carbs: c,
            protein: p
        }

    }

    export const calcBMR = (g, w, h, a) => {
        let bmr = 0
        console.log(g);
        if (g === 'm') {

            let x = (13.75 * w)
            let y = (5.003 * h)
            let z = (6.75 * a)

            bmr = ((66.5) + x + y - z)

        }

        if (g === 'f') {
            bmr = (10 * w) + (6.25 * h) - (5 * a) - 161
        }

        return Math.floor(bmr)
        //raise error for no gender entered

    }

    export const convertLbsToKg = (w) => {
        return w / 2.205
    }

    export const convertKgToLbs = (w) => {
        return w * 2.205
    }