import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setSavedState = (key: string, state: any) => {
    return localStorage.setItem(key, state);
  };

  public getSavedState = (key: string): any => {
    return JSON.parse(localStorage.getItem(key) || '');
  };
}
