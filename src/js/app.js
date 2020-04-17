const url = new URLSearchParams(window.location.search)
const $character = url.get("character").replace(/ /g, "+") //<-- es una expresion regular que cambias los espacios por signos +
const $magicLevel = url.get("Magic")
const $distance = url.get("Distance")
const $sword = url.get("Sword")
const $shielding = url.get("Shielding")
const $club = url.get("Club")
const $axe = url.get("Axe")
const $fist = url.get("Fist")
const $fishing = url.get("Fishing")


const load = async() => {
    const API_DATA = 'https://api.tibiadata.com/v2/characters/'


    async function getData(url) {

        try {
            const response = await fetch(`${url}${$character}.json`)
            const { characters: { data } } = await response.json(`${url}${$character}.json`)
            return data

        } catch (err) {
            const error = new Error(err)
            console.log(error)
        }


    }

    function characterInfo() {
        return `<ul>
            <li>Krubyz</li>
            <li>Male</li>
            <li>Royal Paladin</li>
            <li>340</li>
            <li>306</li>
            <li>Solidera</li>
            <li>Roshamuul</li>
            <li>Unstoppable</li>
            <li>20,4,2020</li>
            <li>Premiun Account</li>
         </ul>`
    }
    const infoCharacter = getData(API_DATA)

}


load()