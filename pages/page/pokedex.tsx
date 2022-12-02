import {GetStaticProps} from "next";

export const getStaticProps: GetStaticProps<{ pageName: string }> = async (params) => {
    return {
        props: {
            pageName: "Pokédex"
        }
    };
};


const PokedexPage = () => {
    return (
        <>Pokedex</>
    )
}

export default PokedexPage