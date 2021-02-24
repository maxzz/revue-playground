import { parse } from "acorn";

class LineNumbers {
    private lineStarts: number[] = [];

    initLineOffsets(code: string) {
        const regex = /\r?\n/g;
        this.lineStarts = [0];
        while (regex.exec(code)) {
            this.lineStarts.push(regex.lastIndex);
        }
        this.lineStarts.push(code.length);
    }
    lineNumber(offset: number): number {
        let lineNumber = 1;
        while (this.lineStarts[lineNumber] < offset) {
            lineNumber++;
        }
        return lineNumber;
    }
}

let code = `
function name(params) {
    var a = {...[1,2]};
}
`;

export function start() {
    let ast;

    try {
        ast = parse(code, {ecmaVersion: "latest"});
    } catch (error) {
        console.log('parse error', error.message);
    }

    if (!ast) {
        return;
    }

    console.log('ast', JSON.stringify(ast, null, 4));
}
