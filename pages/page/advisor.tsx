import {GetStaticProps} from "next";
import {advisorLink} from "../../data/links";
import {PokemonTypeSelect} from "../../components/PokemonTypeSelect";
import {useEffect, useState} from "react";
import {PokemonType} from "../../types/PokemonType";
import {PokemonComponent, PokemonEfficiencyComponent} from "../../components/PokemonComponent";
import {Grid, Input, LoadingOverlay, Text} from "@mantine/core";
import {useTeraRaidAdvise} from "../../hooks/useTeraRaidAdvise";
import {Pokemon, PokemonEfficiency} from "../../types/Pokemon";
import {PokemonSelect} from "../../components/PokemonSelect";
import {pokemonFilter} from "../../utils/pokemonFilter";
import {useReachBottom} from "../../hooks/useReachBottom";


const pageSize = 16
const AdvisorPage = () => {
    const [type, setType] = useState<PokemonType>()
    const [boss, setBoss] = useState<Pokemon>()
    const [minStats, setMinStats] = useState<number>(525)
    const [raiders, setRaiders] = useState<PokemonEfficiency[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>()
    const [size, setSize] = useState(pageSize)
    const loadRaiders = useTeraRaidAdvise()
    useReachBottom(() => {
        setSize(size + pageSize)
    })
    useEffect(() => {
        if (type) {
            setLoading(true)
            setTimeout(
                () => {
                    loadRaiders(type, boss, minStats)
                        .then(o=>{
                            setSize(pageSize)
                            setRaiders(o)
                        })
                        .finally(() => setLoading(false))
                }
            )

        } else {
            setSize(pageSize)
            setSearchText(undefined)
            setRaiders([])
        }
    }, [type, boss, minStats, loadRaiders])
    const filteredRaiders = raiders.filter(o=>pokemonFilter(o.pokemon, searchText)).slice(0, size)
    return (
        <Grid p={10} justify={"center"}>
            <LoadingOverlay
                visible={loading}
            />
            <Text p={10}>Advisor counting only damage multipliers to types not base stats nor IV nor EV of
                pokemons</Text>
            <Grid.Col>
                <Grid justify={"center"}>
                    <Grid.Col xs={1} md={2}>
                        <PokemonTypeSelect onPick={setType}/>
                    </Grid.Col>
                    <Grid.Col xs={1} md={2}>
                        <PokemonSelect onPick={setBoss}/>
                    </Grid.Col>
                    <Grid.Col xs={1} md={2}>
                        <Input
                            defaultValue={minStats}
                            type="number"
                            onChange={e => {
                                const val = e.currentTarget.value
                                if (val) {
                                    setSize(pageSize)
                                    setMinStats(parseFloat(val))
                                }
                            }}
                            placeholder="Min stats"
                        />
                    </Grid.Col>
                    <Grid.Col xs={1} md={2}>
                        <Input
                            hidden={raiders.length === 0}
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
            <Grid.Col>
                <Grid justify={"center"}>
                    {
                        boss && (
                            <Grid.Col md={3}>
                                <Text mb={"xs"} align={"center"}>Boss</Text>
                                <PokemonComponent pokemon={boss}/>
                            </Grid.Col>
                        )
                    }
                </Grid>
            </Grid.Col>
            <Grid.Col>
                <Text align={"center"}>Raiders</Text>
            </Grid.Col>
            {filteredRaiders.map(raider=>{
                return (
                    <Grid.Col key={raider.pokemon.order} md={3}>
                        <PokemonEfficiencyComponent pokemonEfficiency={raider} />
                    </Grid.Col>
                )
            })}

        </Grid>
    )
}


export const getStaticProps: GetStaticProps<{ pageName: string }> = async (params) => {
    return {
        props: {
            pageName: advisorLink.label
        }
    };
};

export default AdvisorPage