import {Joiner} from "./joiner";

const parseSpecValue = function (specs) {
    if (!specs) {
        return null;
    }
    const joiner = new Joiner('；', 2);
    specs.forEach(spec => {
        joiner.join(spec.value);
    });
    return joiner.getStr();
}

export {
    parseSpecValue
}