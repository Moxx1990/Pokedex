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

function createPreviewCard(pokemonName, pokemonId, pokemonImage, pokemonType, pokemonSecondType, index) {
    let container = document.getElementById('pokemon-container');

    container.innerHTML += templatePreviewCard(pokemonName, pokemonId, pokemonImage, pokemonType, pokemonSecondType, index);
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

function showPokemonCard() {
    document.getElementsByClassName('overlay')[0].style.display = 'block';
    document.getElementById('loaded-card').style.display = 'block';
}

function loadPokemonCardStructure(index, pokemonArray) {
    let pokemon = pokemonArray[index];
    let loadedCardContainer = document.getElementById('loaded-card');
    loadedCardContainer.innerHTML = templateCardStructure(pokemon);
}

function loadPokemonInfo(index, pokemonArray) {
    let pokemon = pokemonArray[index];
    document.getElementById('pokemon-info').innerHTML = templatePokemonInfo(pokemon);
}

function loadTypeNavigation(index, pokemonArray) {
    document.getElementById('pokemon-type-navigation').innerHTML = templateTypeNavigation(index);
    disableNavigationButtons(index, pokemonArray);
}

function loadPokemonPicture(index, pokemonArray) {
    let pokemon = pokemonArray[index];
    document.getElementById('pokemon-picture').classList.add(`${pokemon.types[0].type.name}`);
    document.getElementById('pokemon-picture').innerHTML = templatePokemonPicture(pokemon);
}

function loadPokemonStats(index, pokemonArray) {
    let pokemon = pokemonArray[index];
    
    document.getElementById('pokemon-stats').innerHTML = '';
    document.getElementById('pokemon-stats').innerHTML = templatePokemonStats(pokemon);
}

function loadPokemonAttacks(index, pokemonArray) {
    let pokemon = pokemonArray[index];
    let maxMoves = Math.min(pokemon.moves.length, 15);

    document.getElementById('pokemon-attacks').innerHTML = '';

    for (let i = 0; i < maxMoves; i++) {
        document.getElementById('pokemon-attacks').innerHTML += templatePokemonAttacks(pokemon, i);
    }
}

function loadPokemonTypes(index, pokemonArray) {
    let pokemon = pokemonArray[index];

    document.getElementById('pokemon-type').innerHTML = '';
    document.getElementById('pokemon-type').innerHTML = templatePokemonTypes(pokemon);
}

function closePokemonCard() {
    document.getElementById('loaded-card').innerHTML = '';
    document.getElementById('loaded-card').style.display = 'none';
    document.getElementsByClassName('overlay')[0].style.display = 'none';
    document.body.style.removeProperty('overflow');
}

function getActivePokemon() {
    return window.isFromSearch
        ? searchedPokemon[window.activeIndex]
        : currentPokemon[window.activeIndex];
}

function changePokemonCard(index, direction) {
    let pokemonArray = isSearchActive ? searchedPokemon : currentPokemon;

    let newIndex = index + direction;
    if (newIndex < 0 || newIndex >= pokemonArray.length) return;

    createPokemonCard(newIndex);
    scrollToEnd();
}

function disableNavigationButtons(newIndex, pokemonArray) {
    let prevBtn = document.getElementById('backward');
    let nextBtn = document.getElementById('forward');

    if (newIndex <= 0) {
        prevBtn.disabled = true; 
        prevBtn.innerHTML = "";
        prevBtn.style.cursor = "default";
    } else if (newIndex >= pokemonArray.length - 1) {
        nextBtn.innerHTML = "";
        nextBtn.style.cursor = "default";
        nextBtn.disabled = true;
    } 
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

function loadingScreen() {
    let container = document.getElementById('pokemon-container');
    container.innerHTML = templateLoadingScreen();
}

async function loadMorePokemon() {
    pokemonloadIndex = pokemonloadIndex + 20;
    getPokemonStart();
}

function hideLoadMoreButton() {
    document.getElementById('load-more').style.display = 'none';
}

function showLoadMoreButton() {
    document.getElementById('load-more').style.display = 'flex';
}

function searchPokemon() {
    let input = getSearchInput();

    if (input.length === 0) return resetSearch();
    if (input.length < 3 && isNaN(input)) return;
    isSearchActive = true;
    hideLoadMoreButton();
    
    let container = clearContainer();
    let results = getMatchingPokemon(input);
    if (results.length === 0) return showNoResults(container);
    results.forEach(pokemon => renderPokemonCard(pokemon, container));
}

function resetSearch() {
    isSearchActive = false;
    showLoadMoreButton();
    pokemonPreview();
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

function showNoResults(container) {
    container.innerHTML = templateShowNoResults(container);
}

function renderPokemonCard(pokemon, container) {
    let index = searchedPokemon.indexOf(pokemon);
    let type1 = pokemon.types[0].type.name;
    let type2 = pokemon.types[1]?.type.name || "none";

    renderSearchCard(index, type1, type2, container);
}

function renderSearchCard(index, type1, type2, container) {
    container.innerHTML += templateSearchCard(index, type1, type2, container);
}