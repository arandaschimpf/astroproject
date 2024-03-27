


export async function getPokemonsApi() {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`
        const response = await fetch(url);
        const result = await response.json();
        return result
    } catch (error) {
        throw error
    }
}

export async function getPokemonByUrl(pokemonUrl: string) {
    try {
        const url = pokemonUrl;
        const response = await fetch(url);
        const result = await response.json();
        return result
    } catch (error) {
        throw error
    }
}