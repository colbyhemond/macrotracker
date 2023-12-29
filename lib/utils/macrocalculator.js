

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

    export const calcFatCals = (grams) => {
        const calories = Math.floor(( grams ) * 9)
        return calories
    }

    export const calcCarbCals = (grams) => {
        const calories = Math.floor(( grams ) * 4)
        return calories
    }

    export const calcProteinCals = (grams) => {
        const calories = Math.floor(( grams ) * 4)
        return calories
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

    export const getCalories = (items) => {
        const macros = getIntakeValues(items)

        let fatCals = 0
        let carbCals = 0
        let proteinCals = 0
        let calories = 0

        fatCals = calcFatCals(macros.fat)
        carbCals = calcCarbCals(macros.carbs)
        proteinCals = calcProteinCals(macros.protein)

        calories = fatCals + carbCals + proteinCals
        console.log(calories);

        return calories

    }

    export const calcBMR = (g, w, h, a, act) => {
        // https://reference.medscape.com/calculator/846/mifflin-st-jeor-equation
        let bmr = 0
        console.log(g);
        if (g === 'm') {

            // let x = (13.75 * w)
            // let y = (5.003 * h)
            // let z = (6.75 * a)

            // bmr = ((66.5) + x + y - z)
            bmr = (10 * w) + (6.25 * h) - (5 * a) + 5

        }

        if (g === 'f') {
            bmr = (10 * w) + (6.25 * h) - (5 * a) - 161
        }

        return Math.floor(bmr * act)
        //raise error for no gender entered

    }

    export const convertLbsToKg = (w) => {
        // return w / 2.205
        return w * 0.45359237
    }

    export const convertKgToLbs = (w) => {
        // return w * 2.205
        return w / 0.45359237
    }

    export const activityLevels = [
        {key: 'Sedentary', value: '1.2'},
        {key: 'Lightly Active', value: '1.375'},
        {key: 'Moderately Active', value: '1.55'},
        {key: 'Active', value: '1.725'},
        {key: 'Very Active', value: '1.9'},
    ]