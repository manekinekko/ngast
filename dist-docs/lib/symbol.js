import * as ts from 'typescript';
/**
 * Base class which provides primitive for the DirectiveSymbol and
 * PipeSymbol. It contains some functionality common between these classes.
 *
 * @export
 * @class Symbol
 */
export class Symbol {
    /**
     * Creates an instance of Symbol.
     *
     * @param {ts.Program} _program
     * @param {StaticSymbol} _symbol
     *
     * @memberOf Symbol
     */
    constructor(_program, _symbol) {
        this._program = _program;
        this._symbol = _symbol;
    }
    /**
     * Gets the ts.node which corresponds to the controller of the DirectiveSymbol
     * or the implementation of the pipe.
     *
     * @returns {(ts.ClassDeclaration | undefined)}
     *
     * @memberOf Symbol
     */
    getNode() {
        const program = this._program.getSourceFile(this._symbol.filePath);
        const findNode = (node) => {
            if (node.kind === ts.SyntaxKind.ClassDeclaration &&
                (node.name || { text: undefined }).text === this._symbol.name) {
                return node;
            }
            else {
                return ts.forEachChild(node, findNode);
            }
        };
        return findNode(program);
    }
    /**
     * The wrapped `StaticSymbol` from `@angular/compiler`.
     *
     * @readonly
     *
     * @memberOf Symbol
     */
    get symbol() {
        return this._symbol;
    }
}
//# sourceMappingURL=symbol.js.map