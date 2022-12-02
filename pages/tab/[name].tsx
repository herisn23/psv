import {AppTabs, tabs, toTabName} from "../../components/AppTabs";
import {GetStaticPaths, GetStaticProps} from "next";
import _ from "lodash";

export const getStaticPaths: GetStaticPaths<{ name: string }> = async () => {
    const paths = tabs.map(tab => ({params: {name: toTabName(tab.name)}}))
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<{ pageName: string }> = async (params) => {
    return {
        props: {
            pageName: _.capitalize(`${params.params?.name}`)
        }
    };
};

const Tab = () => {
    return (
        <AppTabs />
    )
}

export default Tab