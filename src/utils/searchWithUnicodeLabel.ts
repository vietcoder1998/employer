import {strForSearch} from './strForSearch'

export const searchWithUnicodeLabel = (input, option) => {
    if (option.props.label) {
        return strForSearch(option.props.label).includes(
            strForSearch(input)
        );
    } else {
        return false;
    }
}