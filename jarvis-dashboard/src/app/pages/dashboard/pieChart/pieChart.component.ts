import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../../theme/components';
import {PieChartService} from './pieChart.service';

import './pieChart.loader.ts';

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
  selector: 'pie-chart',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard],
  providers: [PieChartService],
  styles: [require('./pieChart.scss')],
  template: require('./pieChart.html')
})
// TODO: move easypiechart to component
export class PieChart {

  public charts: Array<Object>;
  private _init = false;
  private _totalTrans = 0;
  socket: any;
  transactions: Array<Transaction>;

  constructor(private _pieChartService: PieChartService) {
    this.charts = this._pieChartService.getData();
    this._totalTrans = 358278;
    this.transactions = [];
  }
  
  ngOnInit() {
    const horizon = Horizon({ host: 'localhost:8181' });
    this.socket = horizon("transactionPie");
    this.socket.watch().subscribe((item) => { this.aggregateData(item) });
    this.storeTransaction();     
  }

  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      this._updatePieCharts();
      this._init = true;
    }
  }
  
  // Temporary function to store data in horizon
  storeTransaction() {
    console.log('storing pie Charts');
    let trans: Transaction = {
      accountId: 3,
      amount: Math.random()* (100009990 - 10000999) + 10000999,
      createdAt: new Date('2016-06-15T04:01:34.169Z'),
      currency: 'USD',
      id: 3,
      paymentType: 'CREDIT',
      source: 'source',
      status: 'status'
    }
    this.socket.store(trans);
    
  }
  
  // Here we check for Transaction Currency/Type and add to total
  aggregateData(item) {
    console.log(item);
    if(item[0].currency == 'USD'){
      this.charts[2].stats = this.charts[2].stats + 1;
    }else if(item[0].currency == 'EUR'){
      this.charts[3].stats = this.charts[3].stats + 1;
    }if(item[0].paymentType == 'CREDIT'){
      this.charts[0].stats = this.charts[0].stats + 1;
    }if(item[0].paymentType == 'DEBIT'){
      this.charts[1].stats = this.charts[1].stats + 1;
    }
    this._updatePieCharts();
  }

  private _loadPieCharts() {

    $('.chart').each(function () {
      let chart = $(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
         onStep: function (from, to, percent) {
           // console.log(from);console.log(to);console.log(percent);
           $(this.el).find('.percent').text(Math.round(percent));
         },
        barColor: $(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }

  private _updatePieCharts() {
    let getRandomArbitrary = (index) => { return (this.charts[index].stats/this._totalTrans)*100 };
    $('.pie-charts .chart').each(function(index, chart) {
      $(chart).data('easyPieChart').update(getRandomArbitrary(index));
    });
  }
}
