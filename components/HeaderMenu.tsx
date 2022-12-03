import {Burger, Container, createStyles, Group, Header} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {links} from "../data/links";
import Link from "next/link";
import {useRouter} from "next/router";
import {ThemeToggle} from "./ThemeToggle";


const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,

        [theme.fn.smallerThan('sm')]: {
            justifyContent: 'flex-start',
        },
    },

    links: {
        width: 450,

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    social: {
        width: 260,

        [theme.fn.smallerThan('sm')]: {
            width: 'auto',
            marginLeft: 'auto',
        },
    },

    burger: {
        marginRight: theme.spacing.md,

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
            color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
        },
    },
}));

export function HeaderMenu() {
    const [opened, {toggle}] = useDisclosure(false)
    const router = useRouter()
    const {classes, cx} = useStyles()

    const items = links.map((link) => (
        <Link
            key={link.label}
            href={link.link}
            className={cx(classes.link, {[classes.linkActive]: router.pathname === link.link})}
        >
            {link.label}
        </Link>
    ));

    return (
        <Header height={56}>
            <Container className={classes.inner}>
                <Burger opened={opened} onClick={toggle} size="sm" className={classes.burger}/>
                <Group className={classes.links} spacing={5}>
                    {items}
                </Group>
                <Group spacing={0} className={classes.social} position="right" noWrap>
                    <ThemeToggle />
                </Group>
            </Container>
        </Header>
    );
}