import { info } from './localization.action';

export interface localizationState {
  localization: number[];
  whereami: info;
}
export const init: localizationState = {
  localization: [0, 0],
  whereami: {
    pc: '',
    address: '',
    city: '',
  },
};
