import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarshipService } from '../starship.service';

@Component({
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss']
})
export class StarshipListComponent implements OnInit {

  public page: number;
  public starships = [];
  public errorApi = false;
  public totalStarships: number;
  public nextPage: number;
  public previousPage: number;

  constructor(
    private router: Router,
    private starshipService: StarshipService
  ) { }

  ngOnInit(): void {
    this.getStarships(1);
  }

  public logout(): void {
    this.router.navigateByUrl('/login');
  }

  private getStarships(page): void {
    this.starshipService.getStarships(page).subscribe(
      res => {
        this.page = page;
        this.starships = res.results;
        this.totalStarships = res.count;
        this.nextPage = res.next && parseInt(res.next.split('page=')[1]);
        this.previousPage = res.previous && parseInt(res.previous.split('page=')[1]);
      }, err => {
        this.errorApi = true;
      }
    )
  }

  public next(): void {
    this.getStarships(this.nextPage);
  }

  public previous(): void {
    this.getStarships(this.previousPage);
  }

}
