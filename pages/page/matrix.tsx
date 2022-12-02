import {MatrixComponent} from "../../components/MatrixComponent";
import {GetStaticProps} from "next";

export const getStaticProps: GetStaticProps<{ pageName: string }> = async (params) => {
    return {
        props: {
            pageName: "Matrix"
        }
    };
};

const MatrixPage = () => {
    return (
        <MatrixComponent />
    )
}

export default MatrixPage