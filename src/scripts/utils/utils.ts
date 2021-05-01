class Utils {

    /**
     * @param to - man value to generate.
     * @param from - min value to generate.
     * @returns random number between inputs.
     */
    static randomValue(to: number, from?: number): number {
        return from ? Math.floor(Math.random() * to) + from : Math.floor(Math.random() * to);
    }

    /**
     * @returns random hex colour code.
     */
    static randomColorCode(): number {
        let elements = '0123456789ABCDEF';
        let code = '0x';
        for (let i = 0; i < 6; i++) {
            code = code + elements[this.randomValue(16)];
        }
        return Number(code);
    }

}

export default Utils;
