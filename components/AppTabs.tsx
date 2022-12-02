import {IconPhoto} from "@tabler/icons";
import {Tabs} from "@mantine/core";
import {MatrixPanel} from "./tabs/MatrixPanel";
import {PokedexPanel} from "./tabs/PokedexPanel";
import {AdvisorPanel} from "./tabs/AdvisorPanel";
import {useRouter} from "next/router";
import {TabName} from "../types/TabName";
import _ from 'lodash';

export const tabs = [
    {
        name: TabName.MATRIX,
        panel: <MatrixPanel/>,
        icon: <IconPhoto size={14}/>
    },
    {
        name: TabName.ADVISOR,
        panel: <AdvisorPanel/>,
        icon: <IconPhoto size={14}/>
    },
    {
        name: TabName.POKEDEX,
        panel: <PokedexPanel/>,
        icon: <IconPhoto size={14}/>
    }
]

export const toPagePath = (tabName: TabName) => `/tab/${toTabName(tabName)}`
export const toTabName = (tabName: TabName) => TabName[tabName].toLowerCase()

export const AppTabs = () => {
    const {asPath, push} = useRouter()
    return <Tabs defaultValue={toPagePath(TabName.MATRIX)}
                 value={asPath}
                 onTabChange={(value) => push(`${value}`)}>
        <Tabs.List>
            {tabs.map(tab => {
                const path = toPagePath(tab.name)
                const name = toTabName(tab.name)
                return <Tabs.Tab key={tab.name} value={path} icon={tab.icon}>{_.capitalize(name)}</Tabs.Tab>
            })}
        </Tabs.List>
        {
            tabs.map(tab=>{
                const path = toPagePath(tab.name)
                return (
                    <Tabs.Panel key={tab.name} value={path} pt="xs">
                        {tab.panel}
                    </Tabs.Panel>
                )
            })
        }
    </Tabs>
}