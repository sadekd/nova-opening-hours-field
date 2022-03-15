import {EMPTY_WEEK} from "./const";

export const weekProp = {
    week: {
        type: Object,
        default: EMPTY_WEEK,
    },
}
export const exceptionsProp = {
    exceptions: {
        type: Object,
        default: {},
    },
}

// export const identifierProp = {
//     identifier: String,
// }

export const editableProp = {
    editable: {
        type: Boolean,
        default: false,
    },
}

export const useTextInputsProp = {
    useTextInputs: {
        type: Boolean,
        default: false,
    },
}
