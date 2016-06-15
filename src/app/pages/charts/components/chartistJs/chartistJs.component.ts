import {Component, ViewEncapsulation} from '@angular/core';
import {BaCard} from '../../../../theme/components';

import {ChartistJsService} from './chartistJs.service';
import {BaChartistChart} from '../../../../theme/components';

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
  selector: 'chartist-js',
  encapsulation: ViewEncapsulation.None,
  pipes: [],
  providers: [ChartistJsService],
  directives: [BaCard, BaChartistChart],
  styles: [require('chartist/dist/chartist.css'), require('./chartistJs.scss')],
  template: require('./chartistJs.html'),
})

export class ChartistJs {

  data: any;
  socket: any;
  // transactions: Observable<Array<Transaction>>;
  transactions: Array<Transaction>;

  constructor(private _chartistJsService:ChartistJsService) {
    this.transactions = [];
  }

  ngOnInit() {
    this.data = this._chartistJsService.getAll();
    const horizon = Horizon({ host: 'localhost:8181' });
    this.socket = horizon("transactions");
    this.socket.watch().subscribe((item) => { this.aggregateData(item) });
    // this.transactions = this.socket.watch();
    // setInterval(this.storeTransaction, 3000);
  }
  
  aggregateData(item){
    this.transactions.push(item[0]);
    var month = item[0].createdAt.getMonth();
    if(item[0].paymentType == 'CREDIT'){
      this.data.creditLineData.series[0][month] = this.data.creditLineData.series[0][month] + item[0].amount;
    }
    else if(item[0].paymentType == 'DEBIT'){
      this.data.debitLineData.series[0][month] = this.data.debitLineData.series[0][month] + item[0].amount;
    }
    console.log(this.data.creditLineData.series[0]);
  }
  
  // Temporary function to store data in horizon
  storeTransaction() {
    console.log('storing');
    let trans: Transaction = {
      accountId: 12326682,
      amount: Math.random()* (7000 - 500) + 500,
      createdAt: new Date('2016-06-15T04:01:34.169Z'),
      currency: 'USD',
      id: 3,
      paymentType: 'CREDIT',
      source: 'source',
      status: 'status'
    }
    this.socket.store(trans);
    
  }

  getResponsive(padding, offset) {
    return this._chartistJsService.getResponsive(padding, offset);
  }
}
