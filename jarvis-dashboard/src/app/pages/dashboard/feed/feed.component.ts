import {Component, ViewEncapsulation} from '@angular/core';

import {BaProfilePicturePipe, BaAppPicturePipe} from '../../../theme/pipes';
import {FeedService} from './feed.service';

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
  selector: 'feed',
  encapsulation: ViewEncapsulation.None,
  providers: [FeedService],
  pipes: [BaProfilePicturePipe, BaAppPicturePipe],
  styles: [require('./feed.scss')],
  template: require('./feed.html')
})
export class Feed {
  
  socket: any;
  transactions: Array<Transaction>;

  public feed:Array<Object>;

  constructor(private _feedService:FeedService) {
    this.transactions = [];
  }

  ngOnInit() {
    const horizon = Horizon({ host: 'localhost:8181' });
    this.socket = horizon("transactionFeed");
    this.socket.watch().subscribe((item) => { this.aggregateData(item) });
    this._loadFeed();
    this.storeTransaction();
  }
  
  // As images for all customers are not available, we will track only 10 known customers in this feed.
  // The account numbers of 10 customers from DB will need to be updated to the feed.service.ts data
  aggregateData(item) {
    this.transactions.push(item[0]);
    for (var i in this.feed) {
      if (item[0].accountId == this.feed[i].accountId) {
        console.log('match');
        var temp = Object.assign({}, this.feed[i]);
        this.feed.splice(i, 1);
        temp.time = new Date() + "";
        this.feed.unshift(Object.assign({}, temp));
      }
    }
  }
  
  // Temporary function to store data in horizon
  storeTransaction() {
    setTimeout(function() {
    console.log('storing feed');
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
    }, 900000);
    
  }

  expandMessage (message){
    message.expanded = !message.expanded;
  }

  private _loadFeed() {
    this.feed = this._feedService.getData();
  }
}
