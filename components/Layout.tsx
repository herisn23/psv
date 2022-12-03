import {ColorScheme, ColorSchemeProvider, createEmotionCache, MantineProvider} from "@mantine/core";
import rtlPlugin from 'stylis-plugin-rtl';
import {PropsWithChildren, useState} from "react";
import {useHotkeys, useLocalStorage} from "@mantine/hooks";
import {HeaderMenu} from "./HeaderMenu";

const THEME_KEY = 'mantine-color-scheme';

const rtlCache = createEmotionCache({
    key: 'mantine-rtl',
    prepend: true,
    stylisPlugins: [rtlPlugin],
});

export const Layout = ({children}: PropsWithChildren) => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: THEME_KEY,
        defaultValue: 'dark',
        getInitialValueInEffect: true,
    });
    const [dir, setDir] = useState<'rtl' | 'ltr'>('ltr');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    const toggleDir = () => {
        const nextDir = dir === 'ltr' ? 'rtl' : 'ltr';
        setDir(nextDir);
        document.querySelector('html')!.setAttribute('dir', nextDir);
    };

    useHotkeys([
        ['mod+J', () => toggleColorScheme()],
        ['mod+L', toggleDir],
    ]);

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{colorScheme, dir}}
                withGlobalStyles
                withNormalizeCSS
                emotionCache={dir === 'rtl' ? rtlCache : undefined}
            >
                <HeaderMenu />
                {children}
            </MantineProvider>
        </ColorSchemeProvider>
    )
}