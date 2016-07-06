import {Component, ViewEncapsulation} from '@angular/core';
import {HTTP_PROVIDERS, Http, Headers, Response} from '@angular/http';

import {BaAppPicturePipe} from '../../../theme/pipes';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';

const Horizon = require('@horizon/client');

interface Popular {
  arrangementId: number,
  reduction: number
}


@Component({
  selector: 'popular-app',
  encapsulation: ViewEncapsulation.None,
  pipes: [BaAppPicturePipe],
  styles: [require('./popularApp.scss')],
  template: require('./popularApp.html')
})
export class PopularApp {
  
  socket: any;
  
  
  public accountId = 0;
  public creditAmount = 0;
  public headers;
  
  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  ngOnInit() {
    
     // const horizon = Horizon({ host: 'localhost:8181' });
     // this.socket = horizon("popularApp");
     // this.socket.watch().subscribe((item) => {
      //   console.log("adding popular", item);
      //   this.accountId = item[item.length-1].arrangementId;
      //   this.creditAmount = item[0].reduction;
      //  });
       
     this.storePopular();
     // this.readRest();
    
  }
  
  readRest(){
    console.log('calling popular rest');
    this.http.get('http://192.168.0.188:4000/transactions/top-account')
      .map((res:Response) => res.json())
      .subscribe(
      data => {
        console.log(data);
        this.accountId = data.group[1].accountId;
        this.creditAmount = data.reduction;        
      },
        err => console.error(err),
        () => console.log('done')
      );
  }
  
  // Temporary function to store data in horizon
  storePopular() {
    console.log('storing popular');
    let pop: Popular = {
      arrangementId: 2000000055,
      reduction: 5608443,
    }
    this.socket.store(pop);
    
  }
}
