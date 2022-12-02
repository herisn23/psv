import {useRouter} from "next/router";
import {useEffect} from "react";
import {links} from "../data/links";

export default function Home() {
    const {push} = useRouter();
    useEffect(() => {
        push(links[0].link);
    });
    return <></>
}
