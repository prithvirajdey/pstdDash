import {Component, ViewEncapsulation, ElementRef} from '@angular/core';

import {Chart} from './trafficChart.loader.ts';
import {TrafficChartService} from './trafficChart.service';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';

const Horizon = require('@horizon/client');


interface Transaction {
  accountId: number,
  amount: number,
  createdAt: Date,
  currency: string,
  id: number,
  paymentType: string,
  source: string,
  status: string
}

@Component({
  selector: 'traffic-chart',
  encapsulation: ViewEncapsulation.None,
  providers: [TrafficChartService],
  styles: [require('./trafficChart.scss')],
  template: require('./trafficChart.html')
})

// TODO: move chart.js to it's own component
export class TrafficChart {
  
  socket: any;
  // transactions: Observable<Array<Transaction>>;
  transactions: Array<Transaction>;

  public doughnutData: Array<any>;

  constructor(private trafficChartService:TrafficChartService) {
    this.doughnutData = trafficChartService.getData();
    this.transactions = [];
    const horizon = Horizon({ host: 'localhost:8181' });
    this.socket = horizon("transactions");
    this.socket.watch().subscribe((item) => { this.aggregateData(item) });
    this.storeTransaction();
  }
  
  aggregateData(item){
    this.transactions.push(item[0]);
    for (var i in this.doughnutData){
      if(this.doughnutData[i].label == item[0].source){
        this.doughnutData[i].value = this.doughnutData[i].value + 1;
      }
    }
    this._loadDoughnutCharts();
  }
  
  // Temporary function to store data in horizon
  storeTransaction() {
    console.log('storing pie');
    let trans: Transaction = {
      accountId: 12326682,
      amount: Math.random()* (7000 - 500) + 500,
      createdAt: new Date('2016-06-15T04:01:34.169Z'),
      currency: 'USD',
      id: 3,
      paymentType: 'CREDIT',
      source: 'ATM',
      status: 'status'
    }
    this.socket.store(trans);
    
  }


  ngAfterViewInit() {
    this._loadDoughnutCharts();
  }

  private _loadDoughnutCharts() {
    let el = $('.chart-area').get(0);
    new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true
    });
  }
}
