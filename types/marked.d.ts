
declare module 'marked' {
    export function parse(markdown: string, options?: unknown): string
    export function lexer(src: string, options?: unknown): unknown
    export function parser(src: unknown, options?: unknown): string
    const marked: {
        parse: typeof parse
        lexer: typeof lexer
        parser: typeof parser
    }
    export default marked
}
