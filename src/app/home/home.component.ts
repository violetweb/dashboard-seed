import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Sort } from '@angular/material';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ DataService]
})

export class HomeComponent implements OnInit {

  columnsToDisplay = ['satisfaction', 'recommend', 'quotetimely', 'contactinfo', 'comments', 'collected'];
  surveyresults: Object;
  doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  doughnutChartData = [120, 150, 180, 90];
  doughnutChartType = 'doughnut';
  dataSource;

   constructor(private data: DataService) { }

   getResults(): void {
      this.dataSource = this.data.getSurveyResults();
   }

   sortData(sort: Sort) {

    const datab = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = datab;
      return;
    }

    this.dataSource = datab.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'satisfaction': return this.compare(a.satisfaction, b.satisfaction, isAsc);
        case 'quotetimely': return this.compare(a.quotetimely, b.quotetimely, isAsc);
        case 'recommend': return this.compare(a.recommend, b.recommend, isAsc);
        default: return 0;
      }
    });
  }

  ngOnInit() {
    this.data.getSurveyResults().subscribe(data => {
        //this.dataSource = data['data'];
        this.dataSource = data['data'].slice();
      }
    );
  }

  applyFilter(filterValue: string) {
   // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  firstClick() {
    console.log('clicked');
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
