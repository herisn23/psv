import {GetStaticProps} from "next";
import {pokedexLink} from "../../data/links";
import {usePokedex} from "../../context/DataContext";
import {useState} from "react";
import {Grid, Input} from "@mantine/core";
import {pokemonFilter} from "../../utils/pokemonFilter";
import {PokemonComponent} from "../../components/PokemonComponent";
import {useReachBottom} from "../../hooks/useReachBottom";

export const getStaticProps: GetStaticProps<{ pageName: string }> = async (params) => {
    return {
        props: {
            pageName: pokedexLink.label
        }
    };
};
const pageSize = 32

const PokedexPage = () => {
    const [searchText, setSearchText] = useState<string>()
    const [size, setSize] = useState(pageSize)
    const pokedex = usePokedex()
    const pokemons = pokedex.filter(o => pokemonFilter(o, searchText)).slice(0, size)
    useReachBottom(() => {
        setSize(size + pageSize)
    })
    return (
        <Grid p={10} justify={"center"}>
            <Grid.Col>
                <Grid justify={"center"}>
                    <Grid.Col xs={1} md={2}>
                        <Input
                            defaultValue={searchText}
                            onChange={e => {
                                setSize(pageSize)
                                setSearchText(e.currentTarget.value)
                            }}
                            placeholder="Pokemon name"
                        />
                    </Grid.Col>
                </Grid>

            </Grid.Col>
            {
                pokemons.map(pokemon => {
                    return (
                        <Grid.Col key={pokemon.order} md={3}>
                            <PokemonComponent pokemon={pokemon}/>
                        </Grid.Col>
                    )
                })
            }
        </Grid>
    )
}

export default PokedexPage