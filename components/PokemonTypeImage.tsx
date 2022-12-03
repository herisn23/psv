import {PokemonType} from "../types/PokemonType";
import Image from "next/image";

export type PokemonTypeImageOrientation = 'horizontal' | 'vertical'

const sizes: { [key in PokemonTypeImageOrientation]: { width: number, height: number } } = {
    'horizontal': {
        width: 65,
        height: 15
    },
    'vertical': {
        height: 65,
        width: 15
    }
}

type PokemonTypeImageProps = { type: PokemonType, orientation?: PokemonTypeImageOrientation }

export const PokemonTypeImage = ({type, orientation = 'horizontal'}: PokemonTypeImageProps) =>
    <Image src={`/types/${orientation}/${type}.png`}
           alt={type}
           width={sizes[orientation]?.width}
           height={sizes[orientation]?.height}
    />