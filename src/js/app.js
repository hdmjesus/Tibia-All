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
const $characterContainer = document.getElementById("infoCharacter")
const $deaths_container = document.getElementById('deaths_container')


const load = async() => {
        const API_DATA = 'https://api.tibiadata.com/v2/characters/'


        async function getData(url) {

            try {
                const response = await fetch(`${url}${$character}.json`)
                const person = await response.json(`${url}${$character}.json`)
                return person

            } catch (err) {
                const error = new Error(err)
                console.log(error)
            }


        }

        function characterTemplate(character) {

            if (character.guild.name) {
                return `<ul>
            <li>${character.name}</li>
            <li>${character.sex}</li>
            <li>${character.vocaction}</li>
            <li>${character.level}</li>
            <li>${character.achievement_points}</li>
            <li>${character.world}</li>
            <li>${character.residence}</li>
            <li>${character.guild.name}</li>
            <li>${character.last_login[0].date}</li>
            <li>${character.account_status}</li>
         </ul>`
            } else {
                return `<ul>
            <li>${character.name}</li>
            <li>${character.sex}</li>
            <li>${character.vocaction}</li>
            <li>${character.level}</li>
            <li>${character.achievement_points}</li>
            <li>${character.world}</li>
            <li>${character.residence}</li>
            <li>None</li>
            <li>${character.last_login[0].date}</li>
            <li>${character.account_status}</li>
         </ul>`
            }

        }

        function deathTemplate(muerte) {
            console.log()
            return (
                    `<p class="information__dead--list">${muerte.date.date} ${muerte.reason.replace("Died",`Died at Level ${muerte.level}`)} </p>`
        )
    }

    const { characters: { data: infoCharacter } } = await getData(API_DATA)
    const { characters: { deaths } } = await getData(API_DATA)
    console.log(infoCharacter)
    console.log(deaths)



    function renderCharacter(infoCharacter, $container) {
        const htmlSting = characterTemplate(infoCharacter)
        $container.innerHTML = htmlSting

    }

    function renderDeaths(muertes, $container) {

        for (let dead = 0; dead < muertes.length; dead++) {
            const htmlSting = deathTemplate(muertes[dead])

            $container.innerHTML = $container.innerHTML + htmlSting

        }



    }

    renderCharacter(infoCharacter, $characterContainer)
    renderDeaths(deaths, $deaths_container)
}


load()