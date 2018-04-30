import { Component, OnInit } from '@angular/core';

import { Chart } from 'angular-highcharts';

import { defectDistribution } from './../helpers/data.helper';
import { highchartsColumn } from './../helpers/highcharts-configs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  private _chartData;
  public get chartData() { return this._chartData; };

  private _chart;
  public get chart() { return this._chart; };

  getItemsList() {
    let result = [];
    for(let key in defectDistribution) {
      for (let attr in defectDistribution[key][0]) {
        if(result.indexOf(attr) < 0) result.push(attr);
      }
    }
    return result;
  }

  createColumnChart() {
    let config = highchartsColumn();
    let series = [];
    let obj = {};
    const itemsList = this.getItemsList();
    console.log(itemsList);
    config.title.text = 'Defect Distribution';
    for(let key in defectDistribution) {
      config.xAxis.categories.push(key);

      defectDistribution[key].forEach((item) => {
        itemsList.forEach((attr) => {
          obj[attr] = obj[attr] || {};
          obj[attr].name = obj[attr].name || attr;
          obj[attr].data = obj[attr].data || [];
          obj[attr].data.push(item[attr] ? item[attr] : null);
        });
      });
    }

    for(let key in obj) {
      series.push(obj[key]);
    }

    config.series = series;

    this._chart = new Chart(config);
  }

  ngOnInit() {
    this._chartData = defectDistribution;
    this.createColumnChart();
  }
}
