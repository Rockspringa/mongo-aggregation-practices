import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals/globals.service';

@Component({
  selector: 'app-nav-guest',
  templateUrl: './nav-guest.component.html',
  styleUrls: ['./nav-guest.component.css'],
})
export class NavGuestComponent implements OnInit {
  constructor(private globalsService: GlobalsService) {}

  ngOnInit(): void {
    this.globalsService.deleteUser();
  }
}
