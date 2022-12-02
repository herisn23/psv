import {GetStaticProps} from "next";

export const getStaticProps: GetStaticProps<{ pageName: string }> = async (params) => {
    return {
        props: {
            pageName: "Tera Raid Advisor"
        }
    };
};

const AdvisorPage = () => {
    return (
        <>Advisor</>
    )
}

export default AdvisorPage