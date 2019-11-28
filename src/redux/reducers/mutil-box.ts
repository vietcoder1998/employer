import { TYPE } from './../../common/const/type';
let initState = {
    open: false,
    open_modal: false,
    title: "",
    type_modal: "",
    children: "",
    msg: "",
};

export const MutilBox = (state = initState, action: any) => {
    switch (action.type) {
        case TYPE.HANDLE:
            return {
                ...state,
                open: !state.open
            };

        case TYPE.OPEN:
            return {
                ...state,
                msg: action.msg,
                open_modal: !state.open_modal,
                type_modal: action.type_modal,
                title: action.title,
                children: action.children
            };

        default:
            return state;
    }
}