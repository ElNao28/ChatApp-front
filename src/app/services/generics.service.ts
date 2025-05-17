import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenericsService {
  constructor() {}

  public getTime(createdAt: string) {
    const date = new Date(createdAt).toLocaleString();
    const timeSplit = date.split(', ')[1];
    const times = timeSplit.split(':');
    const schedule = times[2].split(' ')[1];
    return `${times[0]}:${times[1]} ${schedule}`;
  }
}
