import { parse } from "acorn";

class LineNumbers {
    private lineStarts: number[] = [];

    init(code: string) {
        // 0. Init line offsets.
        this.lineStarts = [0];
        const regex = /\r?\n/g;
        while (regex.exec(code)) {
            this.lineStarts.push(regex.lastIndex);
        }
        this.lineStarts.push(code.length);
    }
    line(offset: number): number {
        // 0. Get line at specific offset.
        let lineNumber = 1;
        while (this.lineStarts[lineNumber] < offset) {
            lineNumber++;
        }
        return lineNumber;
    }
}

function getErrorPos(error: string) {
    let m = /\((\d+):(\d+)\)$/.exec(error);
    return m ? { line: +m[1], col: +m[2] } : {line: 0, col: 0};
}

let code = `
function name(params) {
    var a = {...[1,2]};
    var a = {...[1,2]};
    var a = {...[1,2]};
    var a = {...[1,2]};
    var a = {...[1,2]};
    var a = {...[1,2]};
    var a = {...[1,2]};
    var a = {...[1,2]};
    var b: number = 5;
    var a = {...[1,2]};
    var a = {...[1,2]};
    var a = {...[1,2]};
    var a = {...[1,2]};
    var a = {...[1,2]};
    var a = {...[1,2]};
    var a = {...[1,2]};
    var b: number = 5;
}
`;

function errorText(code: string, line: number, col: number) {
    let lines = code.split(/\r?\n/g);

    const arround = 5;
    let start = line - arround < 0 ? 0 : line - arround;
    let end = line + arround > lines.length - 1 ? lines.length - 1 : line + arround;
    if (start === end) {
        return '';
    }

    let newLines = [];

    for (let i = start; i <= end; i++) {
        if (i === line) {
            newLines.push(`${' '.repeat(col - 1)} ^`);
        }
        newLines.push(lines[i]);
    }

    return newLines.join('\r\n');
}

export function start() {
    let ast;

    try {
        ast = parse(code, {ecmaVersion: "latest"});
    } catch (error) {
        console.log('parse error', error.message);
        const { line, col } = getErrorPos(error.message);
        console.log('trace', errorText(code, line, col));
    }

    if (!ast) {
        return;
    }

    console.log('ast', JSON.stringify(ast, null, 4));
}
