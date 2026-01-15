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

function showPokemonCard() {
    document.getElementsByClassName('overlay')[0].style.display = 'block';
    document.getElementById('loaded-card').style.display = 'block';
}

function loadPokemonCardStructure(index, pokemonArray) {
    let pokemon = pokemonArray[index];
    let loadedCardContainer = document.getElementById('loaded-card');

    loadedCardContainer.innerHTML = `
        <div class="loaded_card" id="loaded-card-${index}">
            <div class="close-button" onclick="closePokemonCard()">&#10006;</div>
            <div class="pokemon-picture" id="pokemon-picture"></div>
            <div class="pokemon-info" id="pokemon-info"></div>
            <div class="pokemon-type-navigation" id="pokemon-type-navigation"></div>
        </div>`;
}

function loadPokemonInfo(index, pokemonArray) {
    let pokemon = pokemonArray[index];
    document.getElementById('pokemon-info').innerHTML = `
        <h2 class="pokemon-card-name" id="pokemon-card-name">${pokemon.name}</h2>
                <div class="pokemon-stats" id="pokemon-stats"></div>
                <div class="pokemon-attacks" id="pokemon-attacks"></div>`;
}

function loadTypeNavigation(index) {
    
    document.getElementById('pokemon-type-navigation').innerHTML = `
        <div class="backward" id="backward" onclick="previousPokemonCard(${index})" href="#backward"> &#129032 </div>
        <div class="pokemon-type" id="pokemon-type"></div>
        <div class="forward" id="forward" onclick="nextPokemonCard(${index})" href="#froward"> &#129034 </div> `;
}

function loadPokemonPicture(index, pokemonArray) {
    let pokemon = pokemonArray[index];
    document.getElementById('pokemon-picture').classList.add(`${pokemon.types[0].type.name}`);
    document.getElementById('pokemon-picture').innerHTML = `
        <img src="${pokemon.sprites.other['home'].front_default}">`;
}

function loadPokemonStats(index, pokemonArray) {
    let pokemon = pokemonArray[index];
    
    document.getElementById('pokemon-stats').innerHTML = '';
    document.getElementById('pokemon-stats').innerHTML = `
        <div class="hp-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[0].base_stat}">${pokemon.stats[0].base_stat}</div></div></div>
        <div class="attack-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[1].base_stat}">${pokemon.stats[1].base_stat}</div></div>
        <div class="defense-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[2].base_stat}">${pokemon.stats[2].base_stat}</div></div>
        <div class="special-attack-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[3].base_stat}">${pokemon.stats[3].base_stat}</div></div>
        <div class="special-defense-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[4].base_stat}">${pokemon.stats[4].base_stat}</div></div>
        <div class="speed-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[5].base_stat}">${pokemon.stats[5].base_stat}</div></div>`;
}

function loadPokemonAttacks(index, pokemonArray) {
    let pokemon = pokemonArray[index];
    let maxMoves = Math.min(pokemon.moves.length, 15);

    document.getElementById('pokemon-attacks').innerHTML = '';

    for (let i = 0; i < maxMoves; i++) {
        document.getElementById('pokemon-attacks').innerHTML += `
            <div class="attack">${pokemon.moves[i].move.name}</div>`;
    }
}

function loadPokemonTypes(index, pokemonArray) {
    let pokemon = pokemonArray[index];

    document.getElementById('pokemon-type').innerHTML = '';
    document.getElementById('pokemon-type').innerHTML = `
        <img src="./picture/${pokemon.types[0].type.name}.png" class="${pokemon.types[0].type.name} pokemon-type-icon">
        <img src="./picture/${pokemon.types[1]?.type.name || "none"}.png" class="${pokemon.types[1]?.type.name || "none"} pokemon-type-icon" onerror="this.style.display='none'">`;
}

function closePokemonCard() {
    document.getElementById('loaded-card').innerHTML = '';
    document.getElementById('loaded-card').style.display = 'none';
    document.getElementsByClassName('overlay')[0].style.display = 'none';
    document.body.style.removeProperty('overflow');
}

function loadingScreen() {
    let container = document.getElementById('pokemon-container');
    container.innerHTML = 
    `<div class="loading-screen">
        <div class="loading"></div>
        <div>Loading...</div>
    </div>`;
}

function showNoResults(container) {
    container.innerHTML = `
        <div class="no-results">No Pokemon found</div>`;
}

function hideLoadMoreButton() {
    document.getElementById('load-more').style.display = 'none';
}

function showLoadMoreButton() {
    document.getElementById('load-more').style.display = 'flex';
}

function renderSearchCard(index, type1, type2, container) {
    container.innerHTML += `
        <div class="pokemon-card" onclick="createPokemonCard(${index})">
            <div>#${searchedPokemon[index].id} ${searchedPokemon[index].name}</div>
            <div class="${type1} pokemon-card-image">
                <img src="${searchedPokemon[index].sprites.other.home.front_default}">
            </div>
            <div class="pokemon-card-type">
                <img src="./picture/${type1}.png" class="${type1} pokemon-type-icon">
                <img src="./picture/${type2}.png" class="${type2} pokemon-type-icon"
                     onerror="this.style.display='none'">
            </div>
        </div>`;
}