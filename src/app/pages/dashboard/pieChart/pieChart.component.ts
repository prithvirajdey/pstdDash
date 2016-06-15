import {Component, ViewEncapsulation} from '@angular/core';

import {BaCard} from '../../../theme/components';
import {PieChartService} from './pieChart.service';

import './pieChart.loader.ts';

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

  constructor(private _pieChartService: PieChartService) {
    this.charts = this._pieChartService.getData();
    this._totalTrans = 147295;
  }

  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      this._updatePieCharts();
      this._init = true;
    }
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
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min };

    $('.pie-charts .chart').each(function(index, chart) {
      $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    });
  }
}
