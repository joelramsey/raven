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
        return d.size;
      });

    this._div.style('position', 'relative')
      .style('width', (width + margin.left + margin.right) + 'px')
      .style('height', (height + margin.top + margin.bottom) + 'px')
      .style('left', margin.left + 'px')
      .style('top', margin.top + 'px');

    var nodeData = this._div.datum(this.data).selectAll('.node').data(treemap.nodes);
    
    var node = nodeData.enter()
      .append('div')
      .attr('class', 'node')
      .on('click', (d) => {
        this.entityClick.emit(d);
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
        return d.size;
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

}
