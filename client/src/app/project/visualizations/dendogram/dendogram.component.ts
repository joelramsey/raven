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
  height = 1000 - margin.top - margin.bottom;
  
    var i = 0;

    var tree = d3.layout.cluster()
      .size([height, width]);

    var color = d3.scale.category20c();

    var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    var data_rough="name,parent"+"\n"+"root,null"+"\n";
    var entities_type = this.data.children;
    for (var i=0;i<entities_type.length;i++)
    {
        data_rough += entities_type[i]['name']+",root"+"\n";
        for(var j=0;j<(entities_type[i]['children']).length;j++)
        {
          data_rough += entities_type[i]['children'][j]['name']+","+entities_type[i]['name']+"\n";
        }
    }

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
    .style("fill", function (d:any) {
        if(d.children)
        { return color(d.name) }
        else
        { return color(d.parent.name)};
      })
    .style("stroke", "steelblue")
    .style("stroke-width", 3);

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
    .style("stroke-width",2)
    .style("stroke","#ccc")
    .style("fill","none")
    .data(links, function(d:any) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", diagonal)
    .style("stroke-width",2)
    .style("stroke","#ccc")
    .style("fill","none");

    }

    }

}
