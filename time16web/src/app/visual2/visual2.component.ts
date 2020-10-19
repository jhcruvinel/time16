import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-visual2',
  templateUrl: './visual2.component.html',
  styleUrls: ['./visual2.component.css']
})
export class Visual2Component implements OnInit {

  private margin: any = { top: 200, bottom: 200, left: 200, right: 200};
  private chart: any;
  private width: number;
  private height: number;
  private svg: any;
  links: any[];
  nodes: any;

  constructor() {        
   }

  ngOnInit(): void {
    this.links = [
      {source: "Michael", target: "Amazon", type: "licensing"},
      {source: "Microsoft", target: "HTC", type: "licensing"},
      {source: "Samsung", target: "Apple", type: "suit"},
      {source: "Motorola", target: "Apple", type: "suit"},
      {source: "Nokia", target: "Apple", type: "resolved"},
      {source: "HTC", target: "Apple", type: "suit"}
    ];
    this.updateChart();
  }

  createChart() {
    var svgSet = d3.select("div#net").append("svg")
      .attr("id","grafo_mob")
      .attr('width', '95%')
      .attr('height', '650')
      .call(d3.zoom().on("zoom", function () 
      {
        svgSet.attr("transform", d3.event.transform)
      })) 
      .append("g")
      this.svg = svgSet;
  }

  
  updateChart() {
    let nodes = {};
    d3.select("#net").select("svg").remove(); //remove o grafico para ser recriado
    this.createChart(); //criação do grafo

  // Compute the distinct nodes from the links. 
  
    this.links.forEach(function(link) {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
    });


    let force = d3.forceSimulation()
        .nodes(d3.values(nodes))
        .force("links", d3.forceLink(this.links).distance(80).strength(2))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("x", d3.forceX(500))
        .force("y", d3.forceY(450))
      // .force("name", d3.text(this.name))
        .on("tick", tick);

    // Per-type markers, as they don't inherit styles.
    this.svg.append("defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
      .enter().append("marker")
        .attr("id", function(d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
      .append("path")
        .attr("d", "M0,-5L10,0L0,5");
    let path = this.svg.append("g").selectAll("path")
        .data(this.links)
        .enter().append("path")
        .attr("class", function(d) { return "link " + d.type; })
        .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });
    let circle = this.svg.append("g").selectAll("circle")
        .data(force.nodes())
      .enter().append("circle")
        .attr("r", 6)
        .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
        function dragstarted(d) {
          if (!d3.event.active) force.alphaTarget(.03).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
  
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
  
    function dragended(d) {
      if (!d3.event.active) force.alphaTarget(.03);
      d.fx = null;
      d.fy = null;
    }    
    let text = this.svg.append("g").selectAll("text")
        .data(force.nodes())
      .enter().append("text")
        .attr("x", 8)
        .attr("y", ".31em")
        .text(function(d) { return ""+d.name});
    // Use elliptical arc path segments to doubly-encode directionality.
    function tick() {
      path.attr("d", linkArc);
      circle.attr("transform", transform);
      text.attr("transform", transform);
    }
    function linkArc(d) {
      let dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
      return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    }
    function transform(d) {
      return "translate(" + d.x + "," + d.y + ")";
    }
  
  
  }

}