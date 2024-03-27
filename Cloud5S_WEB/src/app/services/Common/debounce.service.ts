import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DebounceService {
  private debounceTimeouts: {[key: string]: any} = {};

  debounce(key: string, callback: () => void, delay: number) {
    if (this.debounceTimeouts[key]) {
      clearTimeout(this.debounceTimeouts[key]);
    }

    this.debounceTimeouts[key] = setTimeout(() => {
      callback();
      delete this.debounceTimeouts[key];
    }, delay);
  }
}
