import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarshipListComponent } from './starship-list/starship-list.component';
import { StarshipDetailComponent } from './starship-detail/starship-detail.component';
import { CoreModule } from '../core/core.module';
import { StarshipService } from './starship.service';



@NgModule({
  declarations: [StarshipListComponent, StarshipDetailComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  providers: [
    StarshipService
  ]
})
export class StarshipModule { }
