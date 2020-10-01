import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Observable } from 'rxjs';
import { Starship } from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  constructor(
    private apiService: ApiService
  ) { }

  getStarships(page: number = 1): Observable<{count: number, next: string, previous: string, results: [Starship]}> {
    return this.apiService.get('starships/', {
      'page': page
    });
  }
}
