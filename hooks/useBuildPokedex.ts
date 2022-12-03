import {pokedex} from "../data/api";
import {useMemo} from "react";

export const useBuildPokedex = () => {
    return useMemo(() => pokedex, [])
}