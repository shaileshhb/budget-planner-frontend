import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

const SECURE_STORAGE = require('secure-web-storage');

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  // Set the json data to local storage
  setJsonValue(key: string, value: any) {
    this.secureStorage.setItem(key, value);
  }

  // Get the json value from local storage
  getJsonValue(key: string) {
    return (this.secureStorage.getItem(key) == null) ? "" : this.secureStorage.getItem(key);
  }

  // Clear the local storage
  clearLocalStorage() {
    return this.secureStorage.clear();
  }

  // Remove a specific item.
  removeToken(key: string) {
    return this.secureStorage.removeItem(key);
  }

  private secureStorage = new SECURE_STORAGE(localStorage, {
    // Encrypt the storage data
    hash: function hash(key: any) {
      return CryptoJS.SHA256(key).toString()
    },
    encrypt: function encrypt(data: any) {
      return CryptoJS.AES.encrypt(data, environment.SECRET_KEY).toString();
    },
    // Decrypt the encrypted data
    decrypt: function decrypt(data: any) {
      return CryptoJS.AES.decrypt(data, environment.SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }
  });

}
