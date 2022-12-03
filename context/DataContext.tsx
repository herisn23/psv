import {Matrix} from "../types/Matrix";
import {Pokemon} from "../types/Pokemon";
import React, {PropsWithChildren, useContext} from "react";
import {useBuildMatrix} from "../hooks/useBuildMatrix";
import {useBuildPokedex} from "../hooks/useBuildPokedex";

type DataContextType = {
    matrix: Matrix[],
    pokedex: Pokemon[]
}

const DataContext = React.createContext<DataContextType>({matrix: [], pokedex: []});


export const useDataContext = () =>
    useContext(DataContext)

export const useMatrix = () => {
    return useDataContext().matrix
}
export const usePokedex = () => {
    return useDataContext().pokedex
}

const DataContextProvider = ({children}: PropsWithChildren) => {
    const matrix = useBuildMatrix()
    const pokedex = useBuildPokedex()

    return (
        <DataContext.Provider value={{matrix, pokedex}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider