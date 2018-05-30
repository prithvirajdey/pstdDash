import {Injectable} from '@angular/core';

@Injectable()
export class FeedService {

  private _data = [
    {
      type: 'text-message',
      accountId: 2000000006,
      author: 'Vikash',
      surname: 'Sharma',
      header: 'New Deposit',
      text: '890000',
      time: 'Thu Jun 16 2016 15:21:11 GMT+0530 (India Standard Time)',
      expanded: false,
    }, {
      type: 'text-message',
      accountId: 2000000012,
      author: 'Bill',
      surname: 'Gellerstedt',
      header: 'New Deposit',
      text: '850000',
      time: 'Thu Jun 16 2016 15:32:00 GMT+0530 (India Standard Time)',
      expanded: false,
    }, {
      type: 'text-message',
      accountId: 2000000008,
      author: 'Venu',
      surname: 'Madhav',
      header: 'New Deposit',
      text: '820000',
      time: 'Thu Jun 16 2016 15:45:10 GMT+0530 (India Standard Time)',
      expanded: false,
    }, {
     type: 'text-message',
      accountId: 2000000010,
      author: 'Vishad',
      surname: 'Gupta',
      header: 'New Deposit',
      text: '770000',
      time: 'Wed Jun 15 2016 12:00:11 GMT+0530 (India Standard Time)',
      expanded: false,
    }, {
      type: 'text-message',
      accountId: 2000000002,
      author: 'Ryan',
      surname: 'Dunckel',
      header: 'New Deposit',
      text: '620000',
      time: 'Wed Jun 15 2016 11:00:00 GMT+0530 (India Standard Time)',
      expanded: false,
    },
    {
      type: 'text-message',
      accountId: 2000000003,
      author: 'Thulasi',
      surname: 'Muniraj',
      header: 'New Deposit',
      text: '540000',
      time: 'Wed Jun 15 2016 09:00:00 GMT+0530 (India Standard Time)',
      expanded: false,
    },
    {
      type: 'text-message',
      accountId: 2000000016,
      author: 'Prasannakumar',
      surname: 'Nijalingappa',
      header: 'New Deposit',
      text: '500000',
      time: 'Wed Jun 15 2016 08:15:00 GMT+0530 (India Standard Time)',
      expanded: false,
    }
  ];

  getData() {
    return this._data;
  }
}
