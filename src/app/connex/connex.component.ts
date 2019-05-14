import { Component, OnInit } from '@angular/core';
import { AceconnexService } from '../aceconnex.service';
import { Sort, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-connex',
  templateUrl: './connex.component.html',
  styleUrls: ['./connex.component.scss'],
  providers: [ AceconnexService]
})
export class ConnexComponent implements OnInit {

  dataSource;
  totalRegistered;
  totalLunch;
  totalDinner;
  columnsToDisplay = ['id', 'no_guests', 'lunch', 'dinner', 'customer_company', 'phone', 'ext', 'email','contact_name', 'comments', 'collection_date'];
  doughnutFeedbackSatisfaction = ['14', '4', '1'];   //17, 4, 1
  doughnutFeedbackLabels = ['73%', '21%', '5%'];
  doughnutReturn = ['14', '4', '1'];
  doughnutReturnLabels = ['73%', '21%', '5%'];

  doughnutNetworking = ['47', '53'];
  doughnutNetworkingLabels = ['9 People', 'Did Not Mention'];

  doughnutPresentations = ['37', '63'];
  doughnutPresentationsLabels = ['7 People', 'Did Not Mention'];


  doughnutChartType = 'pie';
  doughnutColors = [{backgroundColor: ['#3ebf9b', '#434a54', '#e84351', '#4d86dc', '#f3af37']}];

  constructor(private data: AceconnexService) { }


  ngOnInit() {
    this.data.getConnexRegistrants().subscribe(data => {
      this.dataSource = data['data'].slice();
      this.totalRegistered = this.dataSource.reduce((sum: number, current: { no_guests: number; }) => sum + Number(current.no_guests), 0);
      this.totalLunch = this.dataSource.reduce((sum: number, current: { no_guests: number; lunch: number; }) => sum + Number(current.no_guests*current.lunch), 0);
      this.totalDinner = this.dataSource.reduce((sum: number, current: { no_guests: number; dinner: number; }) => sum + Number(current.no_guests*current.dinner), 0);
     

    }
    );

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
        case 'customer_company': return this.compare(a.customer_company, b.customer_company, isAsc);        
        default: return 0;
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
