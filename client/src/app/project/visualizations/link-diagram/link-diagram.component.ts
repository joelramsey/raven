import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

import { LinkDiagramDatum } from './link-diagram-datum.interface';

@Component({
  selector: 'rvn-link-diagram',
  templateUrl: './link-diagram.component.html',
  styleUrls: ['./link-diagram.component.scss']
})
export class LinkDiagramComponent implements OnInit {

  @Input() data:LinkDiagramDatum;

  private _svg;

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
    
    this._svg.selectAll("*").remove();
    
    var width = 480,
      height = 500;

    var color = d3.scale.category20();

    var force = d3.layout.force()
      .charge(-120)
      .linkDistance(30)
      .size([width, height]);

    this._svg
      .attr('width', width)
      .attr('height', height);


    force
      .nodes(this.data.nodes)
      .links(this.data.links)
      .start();

    var link = this._svg.selectAll('.link')
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

    var node = this._svg.selectAll('.node')
      .data(this.data.nodes)
      .enter().append('circle')
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
}
