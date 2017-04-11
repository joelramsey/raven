import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

import { LinkDiagramDatum } from './link-diagram-datum.interface';

@Component({
  selector: 'rvn-link-diagram',
  templateUrl: 'link-diagram.component.html',
  styleUrls: ['link-diagram.component.scss']
})
export class LinkDiagramComponent implements OnInit {

  @Input() data:LinkDiagramDatum;
  @Output() entityClick:EventEmitter<any> = new EventEmitter();

  private _svg;
  private _container;

  constructor() {
  }


  ngOnInit() {
    this._svg = d3.select('#link-diagram').append('svg');

    if (this.data) {
      this._render();
    }
  }

  ngOnChanges(changes:SimpleChanges):void {
    if (changes['data'] && this._svg) {
      this._render();
    }
  }

  private _render() {

    this._svg.selectAll('*').remove();

    var width = 500,
      height = 500;

    var color = d3.scale.category20();

    var legendRectSize=20;
    var legendSpacing=7;
    var legendHeight=legendRectSize+legendSpacing;

    var force = d3.layout.force()
      .charge(-100)
      .linkDistance(200)
      .gravity(0.01)
      .size([width, height]);

    var zoom = d3.behavior.zoom()
      .scaleExtent([.1, 10])
      .on('zoom', this._zoomed.bind(this));

    this._svg
      .attr('width', '100%')
      .attr('height', height);

    var rect = this._svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .call(zoom);

    this._container = this._svg.append('g');

    force
      .nodes(this.data.nodes)
      .links(this.data.links)
      .start();

    var link = this._container.selectAll('.link')
      .data(this.data.links)
      .enter().append('line')
      .attr('class', 'link')
      .style('stroke-width', function (d:any) {
        return Math.sqrt(d.value);
      });

    link.append('title')
      .text(function (d:any) {
        return d.type;
      });

    var node = this._container.selectAll('.node')
      .data(this.data.nodes)
      .enter().append('g')
      .on('click', (d) => {
        this.entityClick.emit(d);
      })
      .attr('class', 'node')
      .call(force.drag);

    node.append('circle')
      .attr('r', 5)
      .attr('class', 'node')
      .style('fill', function (d:any) {
        return color(<any>d.group);
      });

    node.append('text')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .text(function(d) { return d.name });

    node.append('title')
      .text(function (d:any) {
        return d.name;
      });

    var legendHolder = this._svg.append('g')
    // translate the holder to the right side of the graph
      .attr('transform', 'translate(210,100)')

    var legend=legendHolder.selectAll('.legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr({
        class:'legend',
        transform:function(d,i){
          //Just a calculation for x & y position
          return 'translate(-200,' + ((i*legendHeight)-65) + ')';
        }
      });
    legend.append('rect')
      .attr({
        width:legendRectSize,
        height:legendRectSize,
        rx:120,
        ry:120
      })
      .style({
        fill:color,
        stroke:color
      });

    legend.append('text')
      .attr({
        x:30,
        y:15
      })
      .text(function(d){
        return d;
      }).style({
      fill:'#929DAF',
      'font-size':'14px'
    });

    force.on('tick', function () {
      link.attr('x1', function (d:any) {
        return d.source.x;
      })
        .attr('y1', function (d:any) {
          return d.source.y;
        })
        .attr('x2', function (d:any) {
          return d.target.x;
        })
        .attr('y2', function (d:any) {
          return d.target.y;
        });

      node.attr('transform', function(d:any) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });
    });
  }

  private _zoomed() {
    this._container.attr('transform', 'translate(' + (<any>d3.event).translate + ')scale(' + (<any>d3.event).scale + ')');
  }
}
