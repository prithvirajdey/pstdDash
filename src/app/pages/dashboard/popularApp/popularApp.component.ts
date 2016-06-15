import {Component, ViewEncapsulation} from '@angular/core';

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

  ngOnInit() {
    
     const horizon = Horizon({ host: 'localhost:8181' });
     this.socket = horizon("popular");
     this.socket.watch().subscribe((item) => { 
        console.log(item);
        console.log(item.length)
        this.accountId = item[item.length-1].arrangementId;
        this.creditAmount = item[0].reduction;
       });
       
     this.storePopular();
    
  }
  
  // Temporary function to store data in horizon
  storePopular() {
    console.log('storing');
    let pop: Popular = {
      arrangementId: 1,
      reduction: 56844
    }
    this.socket.store(pop);
    
  }
}
