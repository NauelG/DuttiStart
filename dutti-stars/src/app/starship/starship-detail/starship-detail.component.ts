import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Starship } from 'src/app/core/models';

@Component({
  selector: 'app-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.scss']
})
export class StarshipDetailComponent implements OnInit {

  @Input() starship: Starship;
  @Output() starshipChange: EventEmitter<Starship> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public close(): void {
    this.starship = undefined;
    this.starshipChange.emit();
  }

}
