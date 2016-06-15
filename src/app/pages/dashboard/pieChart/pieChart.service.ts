import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'Credits',
        stats: '57,820',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Debits',
        stats: '89,745',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Dollar %',
        stats: '178,391',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Euro %',
        stats: '32,592',
        icon: 'money',
      }
    ];
  }
}
