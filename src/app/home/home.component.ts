import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Sort } from '@angular/material';
import { literalArr } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ DataService]
})

export class HomeComponent implements OnInit {

  columnsToDisplay = ['satisfaction', 'recommend', 'quotetimely', 'contactinfo', 'comments', 'collected'];
  surveyresults: Object;
  doughnutChartLabels = ['No', 'Yes'];
  doughnutChartDataQuotetimely = [];
  doughnutChartDataRecommend = [];
  doughnutChartDataProductquality = [];
  doughnutChartType = 'pie';
  doughnutColors = [{backgroundColor: ['#e84351', '#434a54', '#3ebf9b', '#4d86dc', '#f3af37']}];
  doughnutChartDataAll;
  dataSource;
  barChartType = 'bar';
  barChartSatisfaction = [];
  barChartLabels = ['1', '2', '3', '4', '5'];
 


   constructor(private data: DataService) { }

   getResults(): void {
      this.dataSource = this.data.getSurveyResults();
      this.doughnutChartDataAll = this.data.getChartData();
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
        case 'collected': return this.compare(a.collected, b.collected, isAsc);
        default: return 0;
      }
    });
  }

  ngOnInit() {
    this.data.getSurveyResults().subscribe(data => {
        this.dataSource = data['data'].slice();
      }
    );
    this.data.getChartQuotetimely().subscribe(data => {
      const doughnutChartDataQuotetimely = data['data'].slice();
      for (const item of doughnutChartDataQuotetimely) {
        this.doughnutChartDataQuotetimely.push(item.count_quotetimely);
      }
    });

    this.data.getChartRecommend().subscribe(data => {
      const doughnutChartDataRecommend = data['data'].slice();
      for (const item of doughnutChartDataRecommend) {
        this.doughnutChartDataRecommend.push(item.count_recommend);
      }
  });

    this.data.getChartProductquality().subscribe(data => { 
      const doughnutChartDataProductquality = data['data'].slice();
      for (const item of doughnutChartDataProductquality) {
        this.doughnutChartDataProductquality.push(item.count_productquality);
      }
    });

    this.data.getChartSatisfaction().subscribe(data => {
      const barChartSatisfaction = data['data'].slice();
      for (const item of barChartSatisfaction) {
        this.barChartSatisfaction.push(item.count_satisfaction);
      }
    });
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
