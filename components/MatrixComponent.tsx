import {MatrixValue} from "../types/Matrix";
import {PokemonType} from "../types/PokemonType";
import {Table} from "@mantine/core";
import {useMatrix} from "../context/DataContext";
import {PokemonImageType} from "./PokemonImageType";

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

export const MatrixComponent = () => {
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
                                <PokemonImageType type={type} orientation={'vertical'}/>
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
                            <td><PokemonImageType type={m.type}/></td>
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