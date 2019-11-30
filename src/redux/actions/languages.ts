import { ILanguages } from '../models/languages';
import { REDUX } from '../../common/const/actions';

export const getLanguages = (data: ILanguages) => ({
    type: REDUX.LANGUAGES.GET_LANGUAGES, 
    data
});
