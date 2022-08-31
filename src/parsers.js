class Parse {
    static modifier = (input) => (input.match(/\(.+\)/gi)?.pop() ?? "").replace(/\(|\)/gi, "").trim() || null;

    static PrefixedValue = (prefix, input) => (
        (code) => (
            {
                prefix,
                level: (code.match(new RegExp(`${prefix}.`, "g"))?.pop() ?? "").replace(prefix, ""),
                modifier: this.modifier(code)
            }
        )
    )(input.match(new RegExp(`${prefix}.(\\((\\w+|\\d+)\\))?`, "g"))?.pop() ?? "");
    
    static Value = (options, input) => (
        (code) => (
            {
                prefix: "",
                level: code.replace(this.modifier(code), ""),
                modifier: this.modifier(code)
            }
        )
    )(input.match(new RegExp(`(${options.join("|")})(\\(\\.\\))?`, "g"))?.pop() ?? "")
    
    static Factor = (prefix, input) => (
        (code) => (
            {
                prefix,
                level: code?.replace(prefix, "").replace(/\(.+\)/g, "") ?? null,
                modifier: this.modifier(code ?? "")
            }
        )
    )(input.match(new RegExp(`${prefix}((\\+\\+?)|(\\-\\-?)?)(\\(.+\\))?`, "g"))?.pop())
}