import {Injectable} from '@angular/core';

@Injectable()
export class FeedService {

  private _data = [
    {
      type: 'text-message',
      accountId: 1,
      author: 'Vikash',
      surname: 'Sharma',
      header: 'New Deposit',
      text: '10000999',
      time: 'Thu Jun 16 2016 15:21:11 GMT+0530 (India Standard Time)',
      expanded: false,
    }, {
      type: 'text-message',
      accountId: 2,
      author: 'Bill',
      surname: 'Gellerstedt',
      header: 'New Deposit',
      text: '10000080',
      time: 'Thu Jun 16 2016 15:32:00 GMT+0530 (India Standard Time)',
      expanded: false,
    }, {
      type: 'text-message',
      accountId: 3,
      author: 'Venu',
      surname: 'Madhav',
      header: 'New Deposit',
      text: '8005000',
      time: 'Thu Jun 16 2016 15:45:10 GMT+0530 (India Standard Time)',
      expanded: false,
    }, {
     type: 'text-message',
      accountId: 4,
      author: 'Vishad',
      surname: 'Gupta',
      header: 'New Deposit',
      text: '7000000',
      time: 'Wed Jun 15 2016 12:00:11 GMT+0530 (India Standard Time)',
      expanded: false,
    }, {
      type: 'text-message',
      accountId: 5,
      author: 'Ryan',
      surname: 'Dunckel',
      header: 'New Deposit',
      text: '55000000',
      time: 'Wed Jun 15 2016 11:00:00 GMT+0530 (India Standard Time)',
      expanded: false,
    },
    {
      type: 'text-message',
      accountId: 6,
      author: 'Thulasi',
      surname: 'Muniraj',
      header: 'New Deposit',
      text: '50000000',
      time: 'Wed Jun 15 2016 09:00:00 GMT+0530 (India Standard Time)',
      expanded: false,
    },
    {
      type: 'text-message',
      accountId: 6,
      author: 'Scott',
      surname: 'Meyer',
      header: 'New Deposit',
      text: '50000000',
      time: 'Wed Jun 15 2016 08:15:00 GMT+0530 (India Standard Time)',
      expanded: false,
    }
  ];

  getData() {
    return this._data;
  }
}
