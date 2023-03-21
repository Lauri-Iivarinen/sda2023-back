import { readFileSync } from "fs";
import path from 'path';

/** Return all rows as string from csv file */
export const getData = (pathName:string ,name:string) => {
    let file = path.join(__dirname, '..', '..', pathName + name);
    const lines = readFileSync(file, 'utf-8').split('\n');
    const removed = lines.splice(0, 1)

    return lines
}

/** Checks if there are commas wrapped around "" and edits them accordingly for DB usage */
export const splitRow = (item: string) => {
    const rowHasParenthesis = item.includes('"')
    if (rowHasParenthesis) {
        let array: string[] = []
        let arr = item.split(',')
        let start = true //Beginning of a string wrapped in ""
        let string = ''
        arr.forEach((text, index) => {
            //Start of a "string"
            if (text.includes('"') && start) {
                string += text.replace('"', '')
                start = false
            //"string" ends
            } else if (text.includes('"') && !start) {
                string += text.replace('"', '')
                array.push(string)
                start = true
                string = ''
            //"string continues"
            } else if (!start) {
                string += text
            } else {
                array.push(text)
            }
        })
        return array
    } else {
        return item.split(',')
    }

}