export interface userState {
  authenticated: boolean;
  status: string;
  token: string;
}
export const initialState: userState = {
  authenticated: false,
  status: '',
  token: '',
};
