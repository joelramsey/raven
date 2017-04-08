import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

import { DendogramDatum } from './dendogram-datum.interface';

@Component({
  selector: 'rvn-dendogram',
  templateUrl: './dendogram.component.html',
  styleUrls: ['./dendogram.component.scss']
})
export class DendogramComponent implements OnInit, OnChanges {

  @Input() data:DendogramDatum;
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

    var margin = {top: 20, right: 120, bottom: 20, left: 120},
  width = 960 - margin.right - margin.left,
  height = 500 - margin.top - margin.bottom;
  
    var i = 0;

    var tree = d3.layout.cluster()
      .size([height, width]);

    var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    var data_rough="name,parent"+"\n"+"Level 2: A,Top Level"+"\n"+"Top Level,null"+"\n"+"Son of A,Level 2: A"+"\n"+"Daughter of A,Level 2: A"+"\n"+"Level 2: B,Top Level"+"\n";

    var data = d3.csv.parse(data_rough);
    var dataMap = data.reduce(function(map:any, node:any) {
        map[node.name] = node;
        return map;
    }, {});

    var treeData = [];
data.forEach(function(node) {
  // add to parent
  var parent = dataMap[node.parent];
  if (parent) {
    // create child array if it doesn't exist
    (parent.children || (parent.children = []))
      // add node to child array
      .push(node);
  } else {
    // parent is null or missing
    treeData.push(node);
  }
});

  var root = treeData[0];
  update(root);

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
    links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d:any) { d.y = d.depth * 180; });

  // Declare the nodesâ€¦
  var node = svg.selectAll("g.node")
    .data(nodes, function(d:any) { return d.id || (d.id = ++i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { 
      return "translate(" + d.y + "," + d.x + ")"; });

  nodeEnter.append("circle")
    .attr("r", 10)
    .style("fill", "#FF0000");

  nodeEnter.append("text")
    .attr("x", function(d) { 
      return d.children || d._children ? -13 : 13; })
    .attr("dy", ".35em")
    .attr("text-anchor", function(d) { 
      return d.children || d._children ? "end" : "start"; })
    .text(function(d) { return d.name; })
    .style("fill-opacity", 1);

  // Declare the linksâ€¦
  var link = svg.selectAll("path.link")
    .attr("stroke-width",2)
    .data(links, function(d:any) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", diagonal);

    }

    }

}
