import * as recast from 'recast';
import { Parser } from "acorn";

export function start() {
    let code = `function name(params:type) {}`;

    const ast = Parser.parse(code);

    recast.visit(ast, function visitFunctionDeclaration(path) {
        // the navigation code here...
        // return false to stop at this depth
        return false;
    });
}
