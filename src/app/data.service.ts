import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Survey } from './survey';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http:  HttpClient) { }

  url = environment.baseUrl;

  getSurveyResults() {
      return this.http.get<Survey[]>(this.url + '/customersurvey/all');
  }

  getChartData() {
    return this.http.get<Survey[]>(this.url + '/customersurvey/chartdata');
  }

  getChartQuotetimely() {
    return this.http.get<Survey[]>(this.url + '/customersurvey/chartdataquotetimely');
  }
  getChartRecommend() {
    return this.http.get<Survey[]>(this.url + '/customersurvey/chartdatarecommend');
  }
  getChartProductquality() {
    return this.http.get<Survey[]>(this.url + '/customersurvey/chartdataproductquality');
  }
  getChartSatisfaction() {
    return this.http.get<Survey[]>(this.url + '/customersurvey/chartdatasatisfaction');
  }

}
