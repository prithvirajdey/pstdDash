import {Component, ViewEncapsulation} from '@angular/core';
import {BaCard} from '../../../../theme/components';
import {BaAmChart} from '../../../../theme/components';
import {BaThemeConfigProvider, layoutPaths} from '../../../../theme';

import {BubbleMapsService} from "./bubbleMaps.service";

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
  status: string,
  country: string
}

@Component({
  selector: 'bubble-maps',
  pipes: [],
  providers: [BubbleMapsService],
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard, BaAmChart],
  styles: [require('./bubbleMaps.scss')],
  template: require('./bubbleMaps.html'),
})
export class BubbleMaps {

  chartData:Object;
  socket: any;
  transactions: Array<Transaction>;
  mapData: any;

  constructor(private _bubbleMapsService:BubbleMapsService, private _baConfig:BaThemeConfigProvider) {
    this.transactions = [];
    let layoutColors = this._baConfig.get().colors;
    this.mapData = [
      {'code': 'GB', 'name': 'United Kingdom', 'value': 624174317, 'color': layoutColors.warning},
      {'code': 'US', 'name': 'United States', 'value': 313085389, 'color': layoutColors.primary},
      {'code': 'CA', 'name': 'Canada', 'value': 34349598, 'color': layoutColors.primary}
    ];
  }
  
  ngOnInit() {
    console.log('here');
    const horizon = Horizon({ host: 'localhost:8181' });
    this.socket = horizon("transactions");
    this.socket.watch().subscribe((item) => { this.aggregateData(item) });
    this.chartData = this._bubbleMapsService.getData(this.mapData);
    
    // this.storeTransaction();
  }
  
  aggregateData(item){
    this.transactions.push(item[0]);
    for(var i in this.mapData){
    if(item[0].country == this.mapData[i].code){
      console.log('in match');
      this.mapData[i].value = this.mapData[i].value + 1;
    }
      }
    console.log(this.mapData);
    this.chartData = this._bubbleMapsService.getData(this.mapData);
  }
  
  // Temporary function to store data in horizon
  storeTransaction() {
    console.log('storing map');
    let trans: Transaction = {
      accountId: 12326682,
      amount: Math.random()* (7000 - 500) + 500,
      createdAt: new Date('2016-06-15T04:01:34.169Z'),
      currency: 'USD',
      id: 3,
      paymentType: 'CREDIT',
      source: 'ATM',
      status: 'status',
      country: 'US'
    }
    this.socket.store(trans);
    
  }

  
}
