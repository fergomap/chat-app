import {ReduxTypesEnum} from './types';

export default interface MainAction {
    type: string;
}

export const RESET_ACTION: MainAction = {
    type: ReduxTypesEnum.RESET
};
