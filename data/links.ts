type HeaderLink = { link: string; label: string }

export const matrixLink: HeaderLink = {
    link: "/page/strengths+weakness",
    label: "Strengths & Weakness"
}

export const advisorLink: HeaderLink = {
    link: "/page/advisor",
    label: "Tera raid advisor"
}

export const pokedexLink: HeaderLink = {
    link: "/page/pokedex",
    label: "Pokédex"
}
export const recipesLink: HeaderLink = {
    link: "/page/recipes",
    label: "Recipes"
}

export const evTrain: HeaderLink = {
    link: "/page/ev-training",
    label: "EV Training"
}

export const mealPowers: HeaderLink = {
    link: "/page/meal-powers",
    label: "Meal powers"
}

export const links: HeaderLink[] = [
    matrixLink, advisorLink, pokedexLink, recipesLink, evTrain, mealPowers
]