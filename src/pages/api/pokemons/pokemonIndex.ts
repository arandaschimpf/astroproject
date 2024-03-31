


export async function getPokemonsApi(url: string) {
    try {
        const URL = url
        const response = await fetch(URL);
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