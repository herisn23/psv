import {PokemonType} from "./PokemonType";

export type Pokemon = {
    order: number,
    name: string,
    types: [PokemonType]
}