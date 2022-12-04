import {Group} from "@mantine/core";
import {GetStaticProps} from "next";
import {mealPowers} from "../../data/links";

export const getStaticProps: GetStaticProps<{ pageName: string }> = async (params) => {
    return {
        props: {
            pageName: mealPowers.label
        }
    };
};

const MealPowersPage = () => {
    return (
        <Group p={10}>
            <ul>
                <li><strong>Catching Power:</strong> Increase chances of successful catches</li>
                <li><strong>Egg Power:</strong> Increase chances of finding Pokémon Eggs</li>
                <li><strong>Encounter Power:</strong> Increase chances of locating certain types</li>
                <li><strong>EXP Power:</strong> Gain more EXP points</li>
                <li><strong>Humungo Power:</strong> Increase chances of finding large Pokémon</li>
                <li><strong>Item Drop Power:</strong> Increase chances of gaining more materials after battles</li>
                <li><strong>Raid Power:</strong> Increase chances of obtaining more Tera Raid battle rewards</li>
                <li><strong> Sparkling Power:</strong> Increase chances of finding Shiny Pokémon</li>
                <li><strong> Teensy Power:</strong> Increase chances of finding smaller Pokémon</li>
                <li><strong> Title Power:</strong> Increase chances of finding Pokémon with titles</li>
            </ul>


        </Group>
    )
}

export default MealPowersPage