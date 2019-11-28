import { TYPE } from './../../common/const/type';
let initState = {
    open: false
};

export const MutilBox = (state = initState, action: any ) => {
    switch (action.type) {
        case TYPE.HANDLE:
            return {
                ...state,
                open: !state.open
            };
    
        default:
            return state;
    }
}