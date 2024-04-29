//https://superheroapi.com/api/acess-token/character-id



const SUPERHERO_TOKEN = 'bcee5e7d0ac0e96ad03b2f3835e17417'
const BASE_URL =
  `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const newHeroButton = document.getElementById('newHero')

const heroImageDiv = document.getElementById('heroImage')

const searchButton = document.getElementById('searchButton')

const searchInput = document.getElementById('searchInput')

const getSuperHero = (id, name) => {
  fetch(`${BASE_URL}/${id}`)
  .then(response => response.json())
  .then(json => {
    console.log(json)
    const stats = getStatsHTML(json)
    const name = `<h2>${json.name}</h2>`
    heroImageDiv.innerHTML += `${name}<img src='${json.image.url}' height=300 width=200/> ${stats}`
  })
}

const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '🏃‍♂️' ,
  durability: '🏋️‍♂️' ,
  power: '📊' ,
  combat: '⚔️'
}

const getStatsHTML = (character) => {
   const stats = Object.keys(character.powerstats).map(stat => {
     return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]} </p>`
    })

    console.log(stats.join(''))
    return stats.join('')
}


const getSearchSuperHero = (name) => {
  console.log(searchInput.value)
  fetch(`${BASE_URL}/search/${name}`)
  .then(response => response.json())
  .then(json => {
    const hero = json.results[0]
    console.log(hero)
    heroImageDiv.innerHTML += `<img src='${hero.image.url}'height=300 width=200 />` 
  })
}

newHeroButton.onclick = () => getSuperHero(Math.floor(Math.random() * 731) + 1)

searchButton.onclick = () => getSearchSuperHero(searchInput.value)


