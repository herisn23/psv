import {toPagePath} from "../components/AppTabs";
import {TabName} from "../types/TabName";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Home() {
    const {push} = useRouter();
    useEffect(() => {
        push(toPagePath(TabName.MATRIX));
    });
    return <></>
}
