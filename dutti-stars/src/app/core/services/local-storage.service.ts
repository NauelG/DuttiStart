import { Injectable } from '@angular/core';
import { LocalStorageItems } from '../models/local-storage.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
  ) { }

  public set(key: LocalStorageItems, value: Object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: LocalStorageItems): void {
    JSON.parse(localStorage.getItem(key));
  }
}
