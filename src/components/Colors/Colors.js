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
        light: red[300]
    },
    {
        color: 'pink',
        dark: pink[900],
        light: pink[300]
    },
    {
        color: 'purple',
        dark: purple[900],
        light: purple[300]
    },
    {
        color: 'indigo',
        dark: indigo[900],
        light: indigo[300]
    },
    {
        color: 'deepPurple',
        dark: deepPurple[900],
        light: deepPurple[300]
    },
    {
        color: 'cyan',
        dark: cyan[900],
        light: cyan[300]
    },
    {
        color: 'green',
        dark: green[900],
        light: green[300]
    },
    {
        color: 'lightGreen',
        dark: lightGreen[900],
        light: lightGreen[300]
    },
    {
        color: 'lime',
        dark: lime[900],
        light: lime[300]
    },
    {
        color: 'orange',
        dark: orange[900],
        light: orange[300]
    },
    {
        color: 'deepOrange',
        dark: deepOrange[900],
        light: deepOrange[300]
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