let pokemonloadIndex = 20;
let currentPokemon = [];

async function getPokemonStart() {
    document.getElementById('load-more').style.display = 'none';
    loadingScreen();
    await getPokemonData();
    pokemonPreview();
    document.getElementById('load-more').style.removeProperty('display');
}

function loadingScreen() {
    let container = document.getElementById('pokemon-container');
    container.innerHTML = 
    `<div class="loading-screen">
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

       createPreviewCard(pokemonName, pokemonId, pokemonImage, pokemonType, pokemonSecondType, index);
    } 
}

function createPreviewCard(pokemonName, pokemonId, pokemonImage, pokemonType, pokemonSecondType, index) {
    let container = document.getElementById('pokemon-container');

    container.innerHTML += 
        `<div class="pokemon-card" id="pokemon-card-${index}" onclick="createPokemonCard(${index})">
            <div>#${pokemonId} ${pokemonName}</div>
            <div class="${pokemonType} pokemon-card-image"><img src="${pokemonImage}"> </div>
            <div class="pokemon-card-type">
                <img src="./picture/${pokemonType}.png" class="${pokemonType} pokemon-type-icon">
                <img src="./picture/${pokemonSecondType}.png" class="${pokemonSecondType} pokemon-type-icon" onerror="this.style.display='none'">
            </div>
        </div>`;
}

function createPokemonCard(index) {
    document.body.style.overflow = 'hidden';
    event.stopPropagation();
    showPokemonCard();
    loadPokemonCardStructure(index); 
    loadPokemonInfo(index); 
    loadTypeNavigation(index); 
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
            <div class="close-button" onclick="closePokemonCard()">&#10006;</div>
            <div class="pokemon-picture" id="pokemon-picture"></div>
            <div class="pokemon-info" id="pokemon-info"></div>
            <div class="pokemon-type-navigation" id="pokemon-type-navigation"></div>
        </div>`;
}

function loadPokemonInfo(index) {
    let pokemon = currentPokemon[index];
    document.getElementById('pokemon-info').innerHTML = `
        <h2 class="pokemon-card-name" id="pokemon-card-name">${pokemon.name}</h2>
                <div class="pokemon-stats" id="pokemon-stats"></div>
                <div class="pokemon-attacks" id="pokemon-attacks"></div>`;
}

function loadTypeNavigation(index) {
    
    document.getElementById('pokemon-type-navigation').innerHTML = `
        <div class="backward" onclick="previousPokemonCard(${index})"> &#129032 </div>
        <div class="pokemon-type" id="pokemon-type"></div>
        <div class="forward" onclick="nextPokemonCard(${index})"> &#129034 </div> `;
}

function loadPokemonPicture(index) {
    let pokemon = currentPokemon[index];
    document.getElementById('pokemon-picture').classList.add(`${pokemon.types[0].type.name}`);
    document.getElementById('pokemon-picture').innerHTML = `
        <img src="${pokemon.sprites.other['home'].front_default}">`;
}

function loadPokemonStats(index) {
    let pokemon = currentPokemon[index];
    
    document.getElementById('pokemon-stats').innerHTML = '';
    document.getElementById('pokemon-stats').innerHTML = `
        <div class="hp-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[0].base_stat}">${pokemon.stats[0].base_stat}</div></div></div>
        <div class="attack-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[1].base_stat}">${pokemon.stats[1].base_stat}</div></div>
        <div class="defense-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[2].base_stat}">${pokemon.stats[2].base_stat}</div></div>
        <div class="special-attack-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[3].base_stat}">${pokemon.stats[3].base_stat}</div></div>
        <div class="special-defense-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[4].base_stat}">${pokemon.stats[4].base_stat}</div></div>
        <div class="speed-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[5].base_stat}">${pokemon.stats[5].base_stat}</div></div>`;
}

function loadPokemonAttacks(index) {
    let pokemon = currentPokemon[index];
    let maxMoves = Math.min(pokemon.moves.length, 15);

    document.getElementById('pokemon-attacks').innerHTML = '';

    for (let i = 0; i < maxMoves; i++) {
        document.getElementById('pokemon-attacks').innerHTML += `
            <div class="attack">${pokemon.moves[i].move.name}</div>`;
    }
}

function loadPokemonTypes(index) {
    let pokemon = currentPokemon[index];

    document.getElementById('pokemon-type').innerHTML = '';
    document.getElementById('pokemon-type').innerHTML = `
        <img src="./picture/${pokemon.types[0].type.name}.png" class="${pokemon.types[0].type.name} pokemon-type-icon">
        <img src="./picture/${pokemon.types[1]?.type.name || "none"}.png" class="${pokemon.types[1]?.type.name || "none"} pokemon-type-icon" onerror="this.style.display='none'">`;
}

function nextPokemonCard(index) {
    if (!checkNextPokemonIndex(index)) {
        createPokemonCard(index);
        return;
    }
    index ++;
    createPokemonCard(index);
}

function previousPokemonCard(index) {
    if (!checkPreviousPokemonIndex(index)) {
        createPokemonCard(index);
        return;
    }
    index--;
    createPokemonCard(index);
}

function checkPreviousPokemonIndex(index) {
   let errorDiv = document.getElementById('error-message');
    errorDiv.innerHTML = '';

    if (index <= 0) {
        showError('You are at the first Pokemon');
        return false; // ungültiger Index
    }
   
    return true; // Index ist gültig
}

function checkNextPokemonIndex(index) {
    let errorDiv = document.getElementById('error-message');
    errorDiv.innerHTML = '';

     if (index >= currentPokemon.length - 1) {
        showError('Please load more Pokemon');
        return false;
    }
    return true;
}

function showError (message) {
    let modal = document.getElementById('error-modal');
    let messageP = document.getElementById('error-message');

    messageP.innerText = message;
    modal.style.display = 'flex';

    setTimeout (() => {
        modal.style.display = 'none';
    }, 1000);
}

document.addEventListener('click', (event) => {
  const card = document.getElementById('loaded-card');

    if (!card) return;
    if (!card.contains(event.target)) {
        closePokemonCard();
        }
    }
);

function closePokemonCard() {
    document.getElementById('loaded-card').innerHTML = '';
    document.getElementById('loaded-card').style.display = 'none';
    document.getElementsByClassName('overlay')[0].style.display = 'none';
    document.body.style.removeProperty('overflow');
}

async function loadMorePokemon() {
    pokemonloadIndex = pokemonloadIndex + 20;
    getPokemonStart();
}

function searchPokemon() {
    let input = getSearchInput();
    if (input.length < 3 && isNaN(input)) {
        return;
    }
    let container = clearContainer();
    let results = getMatchingPokemon(input);
    if (results.length === 0) {
        showNoResults(container);
        return;
    }
    results.forEach(pokemon => renderPokemonCard(pokemon, container));
}

function getSearchInput() {
    return document.getElementById('search-input').value.toLowerCase();
}

function clearContainer() {
    let container = document.getElementById('pokemon-container');
    container.innerHTML = '';
    return container;
}

function getMatchingPokemon(input) {
    return currentPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(input) ||
        pokemon.id.toString() === input
    );
}

function renderPokemonCard(pokemon, container) {
    let index = currentPokemon.indexOf(pokemon);
    let type1 = pokemon.types[0].type.name;
    let type2 = pokemon.types[1]?.type.name || "none";
    
    renderSearchCard(index, type1, type2, container);
}

function renderSearchCard(index, type1, type2, container) {
    container.innerHTML += `
        <div class="pokemon-card" onclick="createPokemonCard(${index})">
            <div>#${currentPokemon[index].id} ${currentPokemon[index].name}</div>
            <div class="${type1} pokemon-card-image">
                <img src="${currentPokemon[index].sprites.other.home.front_default}">
            </div>
            <div class="pokemon-card-type">
                <img src="./picture/${type1}.png" class="${type1} pokemon-type-icon">
                <img src="./picture/${type2}.png" class="${type2} pokemon-type-icon"
                     onerror="this.style.display='none'">
            </div>
        </div>`;
}

function showNoResults(container) {
    container.innerHTML = `
        <div class="no-results">No Pokemon found</div>`;
}