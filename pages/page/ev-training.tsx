import evJson from '../../data/ev.json'
import {Card, Grid, Text} from "@mantine/core";
import {GetStaticProps} from "next";
import {evTrain} from "../../data/links";
import {usePokedex} from "../../context/DataContext";
import {PokemonAvatar} from "../../components/PokemonImage";

export const getStaticProps: GetStaticProps<{ pageName: string }> = async (params) => {
    return {
        props: {
            pageName: evTrain.label
        }
    };
};

export const EvTrainingPage = () => {
    const keys = Object.keys(evJson)
    const pokedex = usePokedex()
    return (
        <Grid grow p={10}>
            {keys.map(k => {
                // @ts-ignore
                const data = evJson[k]
                return (
                    <Grid.Col key={k} md={3}>
                        <Card>
                            <Text size={"xl"} weight={800} mb={20}>{k}</Text>
                            {data.map((d: any) => {
                                const p = pokedex.find(_p => _p.name === d.pokemon)
                                return (
                                    <Grid key={d.pokemon}>
                                        <Grid.Col>
                                            <Text weight={500}>{d.pokemon}</Text>
                                            {p&&<PokemonAvatar pokemon={p} />}
                                            <Text weight={100}>{d.area}</Text>
                                            <hr style={{borderWidth:"thin"}}/>
                                        </Grid.Col>
                                    </Grid>
                                )
                            })}
                        </Card>
                    </Grid.Col>
                )
            })}
        </Grid>
    )
}


export default EvTrainingPage