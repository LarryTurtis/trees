class DrawInstruction {
    constructor(line, rule) {
        this._line = line;
        this._rule = rule;
    }
    
    get line() {
        return this._line;
    }

    get rule() {
        return this._rule;
    }

    set line(line) {
        this._line = line;
    }

    set rule(rule) {
        this._rule = rule;
    }

}

export { DrawInstruction }