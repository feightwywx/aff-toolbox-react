export function nodeLog(input: string) {
    console.log(`\x1B[35m[AFF Toolbox]\x1B[0m ${input}`)
}

export function getLangPrefix(lang: string) {
    if (lang === 'zh' || lang === undefined) {
        return ''
    } else {
        return `${lang}/`
    }
}