let pokemonloadIndex = 20;
let currentPokemon = [];


async function getPokemonStart() {
    loadingScreen();
    await getPokemonData();
    pokemonPreview();
}

function loadingScreen() {
    let container = document.getElementById('pokemon-container');
    container.innerHTML = `<div class="loading-screen">
    <div class="loading"></div>
    <div>Loading...</div>
</div>`;
}



async function reload() {
    pokemonloadIndex = 20;
    getPokemonStart();
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
    console.log(pokemonDetails);
}

async function pokemonPreview() {
    let container = document.getElementById('pokemon-container');
    container.innerHTML = '';
    for (let index = 0; index < currentPokemon.length; index++) {
        let pokemonName = currentPokemon[index].name;
        let pokemonId= currentPokemon[index].id;
        let pokemonImage = currentPokemon[index].sprites.front_default;
        let pokemonType = currentPokemon[index].types[0].type.name;
        let pokemonSecondType = currentPokemon[index].types[1]?.type.name || "none";

       container.innerHTML += `<div class="pokemon-card" id="pokemon-card-${index}" onclick="createPokemonCard(${index})">
            <div>#${pokemonId} ${pokemonName}</div>
            <div class="${pokemonType} pokemon-card-image"><img src="${pokemonImage}"> </div>
            <div class="pokemon-card-type">
                <img src="./picture/${pokemonType}.png" class="${pokemonType} pokemon-type-icon">
                <img src="./picture/${pokemonSecondType}.png" class="${pokemonSecondType} pokemon-type-icon" onerror="this.style.display='none'">
            </div>
    </div>`;
} 
        
    }    

function createPokemonCard(index) {
    let pokemon = currentPokemon[index];
    console.log(pokemon);
    
} 


async function loadMorePokemon() {
    pokemonloadIndex = pokemonloadIndex + 20;
    getPokemonStart();
 }

function searchPokemon() {
    
}

function darkModeToggle() {
    
}


