let pokemonloadIndex = 20;
let currentPokemon = [];
let isSearchActive = false;
let searchedPokemon = [];

async function getPokemonStart() {
    document.getElementById('load-more').style.display = 'none';
    loadingScreen();
    await getPokemonData();
    pokemonPreview();
    document.getElementById('load-more').style.removeProperty('display');
}



async function reload() {
    isSearchActive = false;
    searchedPokemon = [];
    pokemonloadIndex = 20;
    getPokemonStart();
    document.getElementById('search-input').value = '';
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

function createPokemonCard(index) {
    document.body.style.overflow = 'hidden';
    event.stopPropagation();
    let pokemonArray = isSearchActive ? searchedPokemon : currentPokemon;
    showPokemonCard();
    loadPokemonCardStructure(index, pokemonArray); 
    loadPokemonInfo(index, pokemonArray); 
    loadTypeNavigation(index, pokemonArray); 
    loadPokemonPicture(index, pokemonArray);
    loadPokemonStats(index, pokemonArray);
    loadPokemonAttacks(index, pokemonArray);
    loadPokemonTypes(index, pokemonArray);
}

function getActivePokemon() {
    return window.isFromSearch
        ? searchedPokemon[window.activeIndex]
        : currentPokemon[window.activeIndex];
}

function nextPokemonCard(index) {
    changePokemonCard(index, 1);
}

function previousPokemonCard(index) {
    changePokemonCard(index, -1);
}

function changePokemonCard(index, direction) {
    let prevBtn = document.getElementById('backward');
    let nextBtn = document.getElementById('forward');
    let  pokemonArray = isSearchActive ? searchedPokemon : currentPokemon;

    let newIndex = index + direction;
    if (newIndex < 0 || newIndex >= pokemonArray.length) return;

    createPokemonCard(newIndex);
    scrollToEnd();

    prevBtn.disabled = newIndex <= 0;
    nextBtn.disabled = newIndex >= pokemonArray.length - 1;
}

function scrollToEnd() {
    document.getElementById("pokemon-type-navigation").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

document.addEventListener('click', (event) => {
  let card = document.getElementById('loaded-card');

    if (!card) return;
    if (!card.contains(event.target)) {
        closePokemonCard();
        }
    }
);

async function loadMorePokemon() {
    pokemonloadIndex = pokemonloadIndex + 20;
    getPokemonStart();
}

function searchPokemon() {
    let input = getSearchInput();

    if (input.length === 0) {
        isSearchActive = false;
        showLoadMoreButton();
        pokemonPreview();
        return;
    }
    if (input.length < 3 && isNaN(input)) {
        return;
    }
    isSearchActive = true;
    hideLoadMoreButton();
    
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
    const matches =  currentPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(input.toLowerCase()) ||
        pokemon.id.toString() === input
    );
    searchedPokemon = matches;
    return matches;
}

function renderPokemonCard(pokemon, container) {
    let index = searchedPokemon.indexOf(pokemon);
    let type1 = pokemon.types[0].type.name;
    let type2 = pokemon.types[1]?.type.name || "none";

    renderSearchCard(index, type1, type2, container);
}