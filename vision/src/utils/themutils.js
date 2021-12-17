const theme = {
    chalk: {
        backgroundColor: '#161522',
        titleColor:"#ffffff"
    },
    vintage: {
        backgroundColor: '#eeeeee',
        titleColor:"#000000"
    }
}
export function getThemeValue(themeName){
    return theme[themeName]
}