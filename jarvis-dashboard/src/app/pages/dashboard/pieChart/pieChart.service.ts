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
        stats: 57820,
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Debits',
        stats: 89745,
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Dollar %',
        stats: 178391,
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Euro %',
        stats: 32592,
        icon: 'money',
      }
    ];
  }
}
