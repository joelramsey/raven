import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

import { TreeMapDatum } from './tree-map-datum.interface';

@Component({
  selector: 'rvn-tree-map',
  templateUrl: './tree-map.component.html',
  styleUrls: ['./tree-map.component.scss']
})
export class TreeMapComponent implements OnInit, OnChanges {

  @Input() data:TreeMapDatum;
  @Output() entityClick:EventEmitter<any> = new EventEmitter();
  @Output() mergeClick:EventEmitter<any> = new EventEmitter();

  public merging: boolean = false;
  public mergeList: Array<any> = [];
  private _div;

  constructor() {
  }

  ngOnInit() {
    this._div = d3.select('#chart').append('div');

    if (this.data) {
      this._render();
    }
  }

  ngOnChanges(changes:SimpleChanges):void {
    if (changes['data'] && this._div) {
      this._render();
    }
  }

  private _render() {

    this._div.html('');

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var color = d3.scale.category20c();

    var treemap = (<any>(d3.layout.treemap()
      .size([width, height])
      .sticky(true)))
      .value(function (d) {
        return d.count;
      });

    this._div.style('position', 'relative')
      .style('width', (width + margin.left + margin.right) + 'px')
      .style('height', (height + margin.top + margin.bottom) + 'px')
      .style('left', margin.left + 'px')
      .style('top', margin.top + 'px');

    var nodeData = this._div.datum(this.data).selectAll('.node').data(treemap.nodes);

    let self = this;
    let node = nodeData.enter()
      .append('div')
      .attr('class', 'node')
      .on('click', function(d) {
        if (!self.merging) {

          // Emit entity click
          //
          self.entityClick.emit(d);

        } else if (self.mergeList.indexOf(d) === -1) {

          // Add to merge list
          //
          self.mergeList.push(d);

          // Reset styles
          //
          d3.select(this)
            .style('z-index', '' + (1000 + self.mergeList.length))
            .style('background', 'white')
            .style('box-shadow', '0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)')
            .style('transform', 'scale(1.04)')
        } else {

          self.mergeList.splice(self.mergeList.indexOf(d), 1);

          // Reset styles
          //
          d3.select(this)
            .style('z-index', '')
            .style('background', '')
            .style('box-shadow', '')
            .style('transform', '')
        }
      })
      .call(position)
      .style('background', function (d:any) {
        return d.children ? color(d.name) : null;
      })
      .text(function (d:any) {
        return d.children ? null : d.name;
      });

    nodeData.exit()
      .remove();

    d3.selectAll('input').on('change', function change() {
      var value = this.value === 'count'
        ? function () {
        return 1;
      }
        : function (d:any) {
        return d.count;
      };

      node
        .data(treemap.value(value).nodes)
        .transition()
        .duration(1500)
        .call(position);
    });

    function position() {
      this.style('left', function (d) {
        return d.x + 'px';
      })
        .style('top', function (d) {
          return d.y + 'px';
        })
        .style('width', function (d) {
          return Math.max(0, d.dx - 1) + 'px';
        })
        .style('height', function (d) {
          return Math.max(0, d.dy - 1) + 'px';
        })
        .style('position', 'absolute');
    }
  }

  handleMergeClick() {
    if (this.merging) {
      // Send results to service
      //
      console.log('send deconfliction to service');
      console.log(this.mergeList);

      // Reset merge list
      //
      this.mergeList = [];
    } else {

      // Send start merging event for anyone interested
      //
      this.mergeClick.emit();
    }

    this.merging = !this.merging;
  }
}
