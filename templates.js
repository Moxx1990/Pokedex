function templatePreviewCard(pokemonName, pokemonId, pokemonImage, pokemonType, pokemonSecondType, index) {
    return `
        <div class="pokemon-card" id="pokemon-card-${index}" onclick="createPokemonCard(${index})">
            <div>#${pokemonId} ${pokemonName}</div>
            <div class="${pokemonType} pokemon-card-image"><img src="${pokemonImage}"> </div>
            <div class="pokemon-card-type">
                <img src="./picture/${pokemonType}.png" class="${pokemonType} pokemon-type-icon">
                <img src="./picture/${pokemonSecondType}.png" class="${pokemonSecondType} pokemon-type-icon" onerror="this.style.display='none'">
            </div>
        </div>`;
}

function templateCardStructure(index) {    
    return `
        <div class="loaded_card" id="loaded-card-${index}">
            <div class="close-button" onclick="closePokemonCard()">&#10006;</div>
            <div class="pokemon-picture" id="pokemon-picture"></div>
            <div class="pokemon-info" id="pokemon-info"></div>
            <div class="pokemon-type-navigation" id="pokemon-type-navigation"></div>
        </div>`;
}

function templatePokemonInfo(pokemon) {
    return `
        <h2 class="pokemon-card-name" id="pokemon-card-name">${pokemon.name}</h2>
        <div class="pokemon-stats" id="pokemon-stats"></div>
        <div class="pokemon-attacks" id="pokemon-attacks"></div>`;
}

function templateTypeNavigation(index) {
    return `
        <div class="backward" id="backward" onclick="changePokemonCard(${index}, -1)" href="#backward"> &#129032 </div>
        <div class="pokemon-type" id="pokemon-type"></div>
        <div class="forward" id="forward" onclick="changePokemonCard(${index}, +1)" href="#froward"> &#129034 </div> `;
}

function templatePokemonPicture(pokemon) {    
    return `
        <img src="${pokemon.sprites.other['home'].front_default}">`;
}

function templatePokemonStats(pokemon) {    
    return `
        <div class="hp-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[0].base_stat}">${pokemon.stats[0].base_stat}</div></div></div>
        <div class="attack-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[1].base_stat}">${pokemon.stats[1].base_stat}</div></div>
        <div class="defense-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[2].base_stat}">${pokemon.stats[2].base_stat}</div></div>
        <div class="special-attack-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[3].base_stat}">${pokemon.stats[3].base_stat}</div></div>
        <div class="special-defense-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[4].base_stat}">${pokemon.stats[4].base_stat}</div></div>
        <div class="speed-stat progress-bar"><div class="bar ${pokemon.types[0].type.name}" style="--value:${pokemon.stats[5].base_stat}">${pokemon.stats[5].base_stat}</div></div>`;
}

function templatePokemonAttacks(pokemon, i) {
    return `
        <div class="attack">${pokemon.moves[i].move.name}</div>`;
}

function templatePokemonTypes(pokemon) {    
    return `
        <img src="./picture/${pokemon.types[0].type.name}.png" class="${pokemon.types[0].type.name} pokemon-type-icon">
        <img src="./picture/${pokemon.types[1]?.type.name || "none"}.png" class="${pokemon.types[1]?.type.name || "none"} pokemon-type-icon" onerror="this.style.display='none'">`;
}

function templateLoadingScreen() {
    return `
        <div class="loading-screen">
            <div class="loading"></div>
            <div>Loading...</div>
        </div>`;
}

function templateShowNoResults() {    
    return `
        <div class="no-results">No Pokemon found</div>`;
}

function templateSearchCard(index, type1, type2, container) {
    return `
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