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
    const BASE_API = 'https://api.tibiadata.com/v2/characters/'


    async function getData() {

        const response = await fetch(`${BASE_API}${$character}.json`)

        const { characters: { data } } = await response.json(`${BASE_API}${$character}.json`) //cada await es una promesa

        console.log(data)


    }
    getData()

}


load()