import {strForSearch} from './strForSearch'

export const searchWithUnicode = (input, option) => {
    if (option.props.value) {
        return strForSearch(option.props.children).includes(
            strForSearch(input)
        );
    } else {
        return false;
    }
}