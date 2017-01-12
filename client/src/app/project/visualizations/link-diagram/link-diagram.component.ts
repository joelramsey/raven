import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

import { LinkDiagramDatum } from './link-diagram-datum.interface';

@Component({
  selector: 'rvn-link-diagram',
  templateUrl: './link-diagram.component.html',
  styleUrls: ['./link-diagram.component.scss']
})
export class LinkDiagramComponent implements OnInit {

  @Input() data:LinkDiagramDatum;
  @Output() click:EventEmitter<any> = new EventEmitter();

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

    var force = d3.layout.force()
      .charge(-120)
      .linkDistance(30)
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
      .enter().append('circle')
      .on('click', (d) => {
        this.click.emit(d);
      })
      .attr('class', 'node')
      .attr('r', 5)
      .style('fill', function (d:any) {
        return color(<any>d.group);
      })
      .call(force.drag);

    node.append('title')
      .text(function (d:any) {
        return d.name;
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

      node.attr('cx', function (d:any) {
        return d.x;
      })
        .attr('cy', function (d:any) {
          return d.y;
        });
    });
  }

  private _zoomed() {
    this._container.attr('transform', 'translate(' + (<any>d3.event).translate + ')scale(' + (<any>d3.event).scale + ')');
  }
}
