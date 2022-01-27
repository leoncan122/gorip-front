import { Spot } from 'src/models/spot';

//normalization
//Models with a unique identifier are best stored in
//an object where the identifier is used as a key while
//the model instance represents the corresponding value.
export interface Spots {
  [id: number]: Spot;
}
//any object of type Issues is a dictionary having strings as keys and Issue
//objects as values. The type can then be used as a replacement for the list:
export interface spotState {
  entities: Spots;
  selected: number[];
  failure: boolean;
}

export const initialState: spotState = {
  entities: {},
  selected: [],
  failure: false,
};
