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

type PokemonImageTypeProps = { type: PokemonType, orientation?: PokemonTypeImageOrientation }

export const PokemonImageType = ({type, orientation = 'horizontal'}: PokemonImageTypeProps) =>
    <Image src={`/types/${orientation}/${type}.png`}
           alt={type}
           width={sizes[orientation]?.width}
           height={sizes[orientation]?.height}
    />