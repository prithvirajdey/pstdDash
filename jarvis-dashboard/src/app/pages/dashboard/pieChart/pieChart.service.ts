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
        stats: 257533,
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Debits',
        stats: 100745,
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Dollar %',
        stats: 190546,
        icon: 'money',
      }, {
        color: pieColor,
        description: 'GBP %',
        stats: 167732,
        icon: 'money',
      }
    ];
  }
}
