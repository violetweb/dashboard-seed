import { Component, OnInit } from '@angular/core';
import { AceconnexService } from '../aceconnex.service';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-connex',
  templateUrl: './connex.component.html',
  styleUrls: ['./connex.component.scss'],
  providers: [ AceconnexService]
})
export class ConnexComponent implements OnInit {

  dataSource;
  constructor(private data: AceconnexService) { }

  ngOnInit() {
    this.data.getConnexRegistrants().subscribe(data => {
      this.dataSource = data['data'].slice();
    }
  );
  }

}
