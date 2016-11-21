import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'rvn-link-diagram',
  templateUrl: './link-diagram.component.html',
  styleUrls: ['./link-diagram.component.scss']
})
export class LinkDiagramComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var width = 480,
      height = 500;

    var color = d3.scale.category20();

    var force = d3.layout.force()
      .charge(-120)
      .linkDistance(30)
      .size([width, height]);

    var svg = d3.select("#link-diagram").append("svg")
      .attr("width", width)
      .attr("height", height);

    d3.json("assets/miserables.json", function(error, graph) {
      if (error) throw error;

      force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

      var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d:any) { return Math.sqrt(d.value); });

      var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 5)
        .style("fill", function(d:any) { return color(<any>d.group); })
        .call(force.drag);

      node.append("title")
        .text(function(d:any) { return d.name; });

      force.on("tick", function() {
        link.attr("x1", function(d:any) { return d.source.x; })
          .attr("y1", function(d:any) { return d.source.y; })
          .attr("x2", function(d:any) { return d.target.x; })
          .attr("y2", function(d:any) { return d.target.y; });

        node.attr("cx", function(d:any) { return d.x; })
          .attr("cy", function(d:any) { return d.y; });
      });
    });
    
  }

}
