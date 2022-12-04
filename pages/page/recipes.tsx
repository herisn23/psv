import {Card, Grid, Text} from "@mantine/core";
import {recipes} from "../../data/api";
import {PokemonTypeImage} from "../../components/PokemonTypeImage";
import {GetStaticProps} from "next";
import {recipesLink} from "../../data/links";
import {Recipe} from "../../types/Recipe";
import {useState} from "react";
import {PokemonTypeSelect} from "../../components/PokemonTypeSelect";
import {PokemonType} from "../../types/PokemonType";
import Image from "next/image";

export const getStaticProps: GetStaticProps<{ pageName: string }> = async (params) => {
    return {
        props: {
            pageName: recipesLink.label
        }
    };
};

const RecipeComp = ({recipe}: { recipe: Recipe }) => {
    return (
        <Card>
            <PokemonTypeImage type={recipe.type}/>
            {
                recipe.ingredients.map(i => {
                    return (
                        <Text key={i.name}>{i.count} x {i.name}</Text>
                    )
                })
            }
        </Card>
    )
}

export const RecipesPage = () => {
    const [type, setType] = useState<PokemonType>()

    return (
        <Grid p={10} >
            <Grid.Col>
                <Text align={"center"}>Sparkling Recipes LV 3</Text>
            </Grid.Col>
            <Grid.Col>
                <Grid justify={"center"}>
                    <Grid.Col md={3}>
                        <PokemonTypeSelect onPick={setType}/>
                    </Grid.Col>
                </Grid>
            </Grid.Col>
            {
                recipes.filter(r=>{
                    return !type || r.type == type
                }).map(r => {
                    return (
                        <Grid.Col key={r.type} md={4}>
                            <RecipeComp recipe={r}/>
                        </Grid.Col>
                    )
                })
            }
            <Grid.Col>
                <Image src={"/img.png"} alt={"sparkling"} width={640} height={948} />
            </Grid.Col>
        </Grid>
    )
}

export default RecipesPage