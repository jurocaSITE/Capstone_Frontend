
export const stripHTMLtags = (text) => {
    if (text === null || text === undefined || text === "") {
        return text
    }
    let str = text.toString()
    return str.replace( /(<([^>]+)>)/ig, '');
}