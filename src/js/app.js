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
const $dead_wrapper = document.getElementsByClassName('deaths__wrapper')
const $rankServer = document.getElementById('rankserver')
const $rankPlayer = document.getElementById('rankplayer')
const $topLevelNameList = document.getElementById('topLevelNameList')
const $topLevelList = document.getElementById('topLevelList')




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

        function topLevelNameTemplate(name) {
            return `<li>${name}</li>
        `
        }

        function topLevelTemplate(level) {
            return `<li>${level}</li>`
        }

        function rankPlayerTemplate(player) {
            return (`
                    <p> <span class="character">${player.name}</span> Level Rank: <strong>1000</strong> Distance Rank: <strong>400</strong></p>
                `)
        }

        function serverRank(info) {
            return ` <h2>Rank ${info}</h2>`

        }

        function characterTemplate(character) {

            if (character.guild) {
                return `<ul>
            <li>${character.name}</li>
            <li>${character.sex}</li>
            <li>${character.vocation}</li>
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
            <li>${character.vocation}</li>
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

            return `<p class="information__dead--list">${muerte.date.date} ${muerte.reason.replace("Died",`Died at Level ${muerte.level}`)} </p>`
    
        }

    const { characters: { data: infoCharacter } } = await getData(API_DATA)
    const { characters: { deaths } } = await getData(API_DATA)
    const player=infoCharacter.name
    const server=infoCharacter.world
    const vocation=infoCharacter.vocation
  
   

    if(deaths.length==0){
        $dead_wrapper[0].classList.add('offdeath')
    }else{
        $dead_wrapper[0].classList.remove('offdeath')
    }


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

    function renderPlayerRank(character,$container) {
        let htmlSting=rankPlayerTemplate(character)
        $container.innerHTML=htmlSting
        
    }
    function renderServerRank(world,$container) {
        let htmlSting=serverRank(world)
        $container.innerHTML =htmlSting
       
    }
    async function  rendeTopLevels($container,propiedad) {
       const tops= await buscarLevelAlto(server,player)  
      
       console.log(tops)

       if(propiedad=="name"){
        for (let name = 0; name < tops.length; name++) {
            const element = tops[name].name;
            let htmlSting=topLevelNameTemplate(element)
            
            $container.innerHTML+= htmlSting
        }
       }else{
        for (let level = 0; level < tops.length; level++) {
            const element = tops[level].level;
            let htmlSting=topLevelTemplate(element)
            
            $container.innerHTML+= htmlSting
        }
       }
      
    }
        
    const buscarLevelAlto=async (server)=> {
        const API_SCORE = `https://api.tibiadata.com/v2/highscores/${server}/experience/all.json`;
        const {highscores:{data}}=  await getData(API_SCORE)
        const topFive= 5
         let charactersTop=[]
     for (let player = 0; player <topFive; player++) {
         
        
        let objeto=data[player]
        charactersTop.push(objeto)
                 
     }
     return charactersTop
  
    }

    const buscarSkillsAltos= async(vocation)=>{
        
    console.log(vocation)
    }

    renderCharacter(infoCharacter, $characterContainer)
    renderDeaths(deaths, $deaths_container)
    renderPlayerRank(infoCharacter,$rankPlayer)
    renderServerRank(server,$rankServer)
    rendeTopLevels($topLevelNameList,"name")
    rendeTopLevels($topLevelList,"level")
    buscarSkillsAltos(vocation)
  
}


load()