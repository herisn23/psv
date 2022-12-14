import {Pokemon} from "../types/Pokemon";

export const pokemonFilter = (pokemon:Pokemon, searchText?:string) => {
    if (searchText) {
        return pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    } else {
        return true
    }
}