import {GetStaticProps} from "next";
import {advisorLink} from "../../data/links";
import {PokemonTypeSelect} from "../../components/PokemonTypeSelect";
import {useEffect, useState} from "react";
import {PokemonType} from "../../types/PokemonType";
import {PokemonEfficiencyComponent} from "../../components/PokemonComponent";
import {Grid, Input, LoadingOverlay} from "@mantine/core";
import {useTeraRaidAdvise} from "../../hooks/useTeraRaidAdvise";
import {PokemonEfficiency} from "../../types/Pokemon";


type TeraTypeUsageAdviceProps = { raiders: PokemonEfficiency[] }


const TeraTypeUsageAdvice = ({raiders}: TeraTypeUsageAdviceProps) => {
    return (
        <Grid  gutter="sm">
            {raiders.map(p => {
                return (
                    <Grid.Col key={p.pokemon.order} span={3} w={300}>
                        <PokemonEfficiencyComponent pokemonEfficiency={p}/>
                    </Grid.Col>
                )
            })}
        </Grid>
    )
}

const AdvisorPage = () => {
    const [type, setType] = useState<PokemonType>()
    const [raiders, setRaiders] = useState<PokemonEfficiency[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>()
    const loadRaiders = useTeraRaidAdvise()
    useEffect(() => {
        if (type) {
            setLoading(true)
            setTimeout(
                () => {
                    loadRaiders(type)
                        .then(setRaiders)
                        .finally(() => setLoading(false))
                }
            )

        } else {
            setRaiders([])
        }
    }, [type])
    return (
        <Grid p={10}>
            <LoadingOverlay
                visible={loading}
            />
            <Grid.Col>
                <Grid>
                    <Grid.Col span={2}>
                        <PokemonTypeSelect onPick={setType}/>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        {
                            raiders.length > 0 && <Input
                                onChange={e => {
                                    setSearchText(e.currentTarget.value)
                                }}
                                placeholder="Pokemon name"
                            />
                        }
                    </Grid.Col>
                </Grid>
            </Grid.Col>
            {raiders.length > 0 && (
                <Grid.Col>
                    <TeraTypeUsageAdvice raiders={raiders.filter(o => {
                        if (searchText) {
                            return o.pokemon.name.toLowerCase().includes(searchText)
                        } else {
                            return true
                        }
                    })}/>
                </Grid.Col>
            )}
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