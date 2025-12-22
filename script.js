let pokemonloadIndex = 10;
let currentPokemon = [];


async function getPokemonStart() {
    getPokemonData();
}

async function getPokemonData() {
    let amountOfPokemon = pokemonloadIndex;
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${amountOfPokemon}&offset=0`;
    let response = await fetch(url);
    let loadedPokemon = await response.json();  

     let pokemonDetails = await Promise.all(
        loadedPokemon.results.map(async (pokemon) => {
            let res = await fetch(pokemon.url);
            return await res.json();
        })
    );

    currentPokemon = pokemonDetails;
    console.log(loadedPokemon);    
    console.log(pokemonDetails);
    
    pokemonPreview();  

}

async function pokemonPreview() {
    let container = document.getElementById('pokemon-container');
    container.innerHTML = '';
    for (let index = 0; index < currentPokemon.length; index++) {
        let pokemonName = currentPokemon[index].name;
        let pokemonId= currentPokemon[index].id;
        let pokemonImage = currentPokemon[index].sprites.front_default;
        let pokemonType = currentPokemon[index].types[0].type.name;

       container.innerHTML += `<div class="pokemon-card" id="pokemon-card-${index}" onclick="createPokemonCard(${index})">
            <div>#${pokemonId} ${pokemonName}</div>
            <div class="${pokemonType}"><img src="${pokemonImage}"> </div>
            <div><img src="./picture/${pokemonType}.png" class="${pokemonType} pokemon-type-icon"></div>
    </div>`;
} 
        
    }    

async function createPokemonCard(index) {

} 


async function loadMorePokemon() {
    pokemonloadIndex = pokemonloadIndex + 10;
    getPokemonStart();
}

function searchPokemon() {
    
}

function darkModeToggle() {
    
}


