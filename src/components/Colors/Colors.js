import { red, pink, purple, indigo, deepPurple, cyan, green, lightGreen, lime, orange, deepOrange, brown } from "@material-ui/core/colors";

const colors = [
    {
        color: 'transparent',
        dark: '#202124',
        light: '#ffffff'
    },
    {
        color: 'red',
        dark: red[900],
        light: red[200]
    },
    {
        color: 'pink',
        dark: pink[900],
        light: pink[200]
    },
    {
        color: 'purple',
        dark: purple[900],
        light: purple[200]
    },
    {
        color: 'indigo',
        dark: indigo[900],
        light: indigo[200]
    },
    {
        color: 'deepPurple',
        dark: deepPurple[900],
        light: deepPurple[200]
    },
    {
        color: 'cyan',
        dark: cyan[900],
        light: cyan[200]
    },
    {
        color: 'green',
        dark: green[900],
        light: green[200]
    },
    {
        color: 'lightGreen',
        dark: lightGreen[900],
        light: lightGreen[200]
    },
    {
        color: 'lime',
        dark: lime[900],
        light: lime[200]
    },
    {
        color: 'orange',
        dark: orange[900],
        light: orange[200]
    },
    {
        color: 'deepOrange',
        dark: deepOrange[900],
        light: deepOrange[200]
    },
]

const getColor = (color) => {
    if(!color){
        return colors[0]
    }
    const index = colors.findIndex((c) => c.color === color)
    if(index != -1){
        return colors[index]
    }
    return colors[0]
}

module.exports = {colors, getColor}