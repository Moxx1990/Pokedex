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
        let pokemonImage = currentPokemon[index].sprites.other['home'].front_default;
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
    event.stopPropagation();
    showPokemonCard();
    loadPokemonCardStructure(index);   
    loadPokemonPicture(index);
    loadPokemonStats(index);
    loadPokemonAttacks(index);
    loadPokemonTypes(index);
} 

function showPokemonCard() {
    document.getElementsByClassName('overlay')[0].style.display = 'block';
    document.getElementById('loaded-card').style.display = 'block';
}

function loadPokemonCardStructure(index) {
    let pokemon = currentPokemon[index];
    let loadedCardContainer = document.getElementById('loaded-card');

    loadedCardContainer.innerHTML = `
        <div class="loaded_card" id="loaded-card-${index}">
            <div class="pokemon-picture" id="pokemon-picture"></div>
            <div class="pokemon-info" id="pokemon-info">
                <h2 class="pokemon-card-name" id="pokemon-card-name">${pokemon.name}</h2>
                <div class="pokemon-stats" id="pokemon-stats"></div>
                <div class="pokemon-attacks" id="pokemon-attacks"></div>
            </div>
            <div class="pokemon-type-navigation">
                    <div class="backward" onclick="previousPokemonCard(${index})"> <--- </div>
                    <div class="pokemon-type" id="pokemon-type"></div>
                    <div class="forward" onclick="nextPokemonCard(${index})"> ---> </div>
                    
            </div>
        </div>`;
}

function loadPokemonPicture(index) {
    let pokemon = currentPokemon[index];
    document.getElementById('pokemon-picture').classList.add(`${pokemon.types[0].type.name}`);
    document.getElementById('pokemon-picture').innerHTML = `
        <img src="${pokemon.sprites.other['home'].front_default}">
    `;
}

function loadPokemonStats(index) {
    let pokemon = currentPokemon[index];
    
    document.getElementById('pokemon-stats').innerHTML = '';
    document.getElementById('pokemon-stats').innerHTML = `
        <div class="hp-stat progress-bar"><div class="bar" style="--value:${pokemon.stats[0].base_stat}">${pokemon.stats[0].base_stat}</div></div></div>
        <div class="attack-stat progress-bar"><div class="bar" style="--value:${pokemon.stats[1].base_stat}">${pokemon.stats[1].base_stat}</div></div>
        <div class="defense-stat progress-bar"><div class="bar" style="--value:${pokemon.stats[2].base_stat}">${pokemon.stats[2].base_stat}</div></div>
        <div class="special-attack-stat progress-bar"><div class="bar" style="--value:${pokemon.stats[3].base_stat}">${pokemon.stats[3].base_stat}</div></div>
        <div class="special-defense-stat progress-bar"><div class="bar" style="--value:${pokemon.stats[4].base_stat}">${pokemon.stats[4].base_stat}</div></div>
        <div class="speed-stat progress-bar"><div class="bar" style="--value:${pokemon.stats[5].base_stat}">${pokemon.stats[5].base_stat}</div></div>
    `;

}

function loadPokemonAttacks(index) {
    let pokemon = currentPokemon[index];
    let maxMoves = Math.min(pokemon.moves.length, 15);

    document.getElementById('pokemon-attacks').innerHTML = '';

    for (let i = 0; i < maxMoves; i++) {
        document.getElementById('pokemon-attacks').innerHTML += `
            <div class="attack">${pokemon.moves[i].move.name}</div>
        `;
    }

}

function loadPokemonTypes(index) {
    let pokemon = currentPokemon[index];

    document.getElementById('pokemon-type').innerHTML = '';
    document.getElementById('pokemon-type').innerHTML = `
        <img src="./picture/${pokemon.types[0].type.name}.png" class="${pokemon.types[0].type.name} pokemon-type-icon">
        <img src="./picture/${pokemon.types[1]?.type.name || "none"}.png" class="${pokemon.types[1]?.type.name || "none"} pokemon-type-icon" onerror="this.style.display='none'">
    `;
}

function nextPokemonCard(index) {
    currentPokemon[index ++];
    createPokemonCard(index);
}

function previousPokemonCard(index) {
    currentPokemon[index --];
    createPokemonCard(index);
}

document.addEventListener('click', (event) => {
  const card = document.getElementById('loaded-card');

  if (!card) return;

  if (!card.contains(event.target)) {
    closePokemonCard();
  }
});

function closePokemonCard() {
    document.getElementById('loaded-card').innerHTML = '';
    document.getElementById('loaded-card').style.display = 'none';
    document.getElementsByClassName('overlay')[0].style.display = 'none';
}


async function loadMorePokemon() {
    pokemonloadIndex = pokemonloadIndex + 20;
    getPokemonStart();
 }

function searchPokemon() {
    let searchInput = document.getElementById('search-input').value.toLowerCase();
    let container = document.getElementById('pokemon-container');
    container.innerHTML = '';

    for (let index = 0; index < currentPokemon.length; index++) {
        let pokemon = currentPokemon[index];

        let machtes = pokemon.name.toLowerCase().includes(searchInput) || pokemon.id.toString() === searchInput;
        if (!machtes) continue;

        let pokemonName = pokemon.name;
        let pokemonId = pokemon.id;
        let pokemonImage = pokemon.sprites.other['home'].front_default;
        let pokemonType = pokemon.types[0].type.name;
        let pokemonSecondType = pokemon.types[1]?.type.name || "none";

       container.innerHTML += `
       <div class="pokemon-card" id="pokemon-card-${index}" onclick="createPokemonCard(${index})">
            <div>#${pokemonId} ${pokemonName}</div>
            <div class="${pokemonType} pokemon-card-image"><img src="${pokemonImage}"> </div>
            <div class="pokemon-card-type">
                <img src="./picture/${pokemonType}.png" class="${pokemonType} pokemon-type-icon">
                <img src="./picture/${pokemonSecondType}.png" class="${pokemonSecondType} pokemon-type-icon" onerror="this.style.display='none'">
            </div>
    </div>`;
    }   
}