import {GetStaticProps} from "next";
import {MatrixValue} from "../../types/Matrix";
import {PokemonType} from "../../types/PokemonType";
import {useMatrix} from "../../context/DataContext";
import {Table} from "@mantine/core";
import {PokemonTypeImage} from "../../components/PokemonTypeImage";
import {matrixLink} from "../../data/links";

export const getStaticProps: GetStaticProps<{ pageName: string }> = async (params) => {
    return {
        props: {
            pageName: matrixLink.label
        }
    };
};

const ValueCell = ({values, type}: { values: MatrixValue[], type: PokemonType }) => {
    let color;
    let value;
    const mv = values.find(v=>v.type === type)
    if (mv?.value == 0) {
        value = mv.value
        color = "gray"
    } else if (mv?.value === 0.5) {
        value = "½"
        color = "#6b6bb7"
    } else if (mv?.value === 2) {
        value = mv.value
        color = "#ea4c4c"
    }
    return (
        <td style={{color}}>
            {
                value
            }
        </td>
    )
}


const MatrixPage = () => {
    const matrix = useMatrix()
    const types = matrix.map(m => m.type)
    return (
        <Table highlightOnHover withBorder withColumnBorders>
            <thead>
            <tr>
                <th colSpan={types.length +2} style={{textAlign:"center"}}>Defending</th>
            </tr>
            <tr>
                <th></th>
                {
                    types.map(type => {
                        return (
                            <th key={type} style={{textAlign:"center"}}>
                                <PokemonTypeImage type={type} orientation={'vertical'}/>
                            </th>
                        )
                    })
                }
            </tr>
            </thead>
            <tbody>
            {
                matrix.map(m => {
                    return (
                        <tr key={m.type} style={{textAlign:"center"}}>
                            <td><PokemonTypeImage type={m.type}/></td>
                            {
                                types.map((type, index) => (
                                    <ValueCell key={`${m.type}-${index}`} values={m.values} type={type}/>
                                ))
                            }
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
    )
}

export default MatrixPage