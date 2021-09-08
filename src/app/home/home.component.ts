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

  columnsToDisplay = ['satisfaction', 'satisfactioncomment','recommend','recommendcomment', 'quotetimely','quotecomment', 'rankimprovement', 'rankcomment', 'contactinfo', 'comments', 'collected'];
  surveyresults: Object;
  doughnutChartLabels = ['No', 'Yes'];
  doughnutChartDataQuotetimely = [];
  doughnutChartDataRecommend = [];
  doughnutChartDataProductquality = [];
  doughnutChartType = 'pie';
  doughnutColors = [{backgroundColor: ['#e84351', '#008000', '#3ebf9b', '#4d86dc', '#f3af37']}];
  doughnutChartDataAll;
  dataSource;
  barChartType = 'bar';
  barChartSatisfaction = [];
  barChartLabels = ['1-Star/Very Dissatisfied', '2-Star/Dissatisfied', '3-Star/Neutral', '4-Star/Satisfied', '5-Star/Very Satisfied'];
 


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
        case 'quotetimely': return this.compare(a.quotetimelyyes, b.quotetimelyno, isAsc);
        case 'recommend': return this.compare(a.recommendyes, b.recommendno, isAsc);
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
        this.doughnutChartDataQuotetimely.push(item.quotetimelyno,item.quotetimelyyes);
      }
    });

    this.data.getChartRecommend().subscribe(data => {
      const doughnutChartDataRecommend = data['data'].slice();
      for (const item of doughnutChartDataRecommend) {
        this.doughnutChartDataRecommend.push(item.recommendno,item.recommendyes);
      }
  });

    this.data.getChartProductquality().subscribe(data => { 
      const doughnutChartDataProductquality = data['data'].slice();
      for (const item of doughnutChartDataProductquality) {
        this.doughnutChartDataProductquality.push(item.productqualityno,item.productqualityyes);
      }
    });

    this.data.getChartSatisfaction().subscribe(data => {
      const barChartSatisfaction = data['data'].slice();
      for (const item of barChartSatisfaction) {
        this.barChartSatisfaction.push(item.onestar,item.twostar,item.threestar,item.fourstar,item.fivestar);
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
