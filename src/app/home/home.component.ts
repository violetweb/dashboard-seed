import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ DataService]
})
export class HomeComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  columnsToDisplay = ['satisfaction', 'recommend', 'quotetimely', 'contactinfo', 'comments', 'collected'];
  surveyresults: Object;
  doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  doughnutChartData = [120, 150, 180, 90];
  doughnutChartType = 'doughnut';
  dataSource;

  constructor(private data: DataService) { }

  ngOnInit() {

    this.data.getSurveyResults().subscribe(data => {
      this.surveyresults = data;
        }
    );
    this.data.getSurveyResults().subscribe(data => {
        this.dataSource = new MatTableDataSource(data['data']);
        this.dataSource.sort = this.sort;
      }
  );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  firstClick() {
    console.log('clicked');
  }

}
