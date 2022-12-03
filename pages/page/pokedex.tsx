import {GetStaticProps} from "next";
import {pokedexLink} from "../../data/links";

export const getStaticProps: GetStaticProps<{ pageName: string }> = async (params) => {
    return {
        props: {
            pageName: pokedexLink.label
        }
    };
};


const PokedexPage = () => {
    return (
        <>Pokedex</>
    )
}

export default PokedexPage