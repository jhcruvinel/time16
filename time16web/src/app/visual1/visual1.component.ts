import { Component, OnInit } from '@angular/core';
import {
  hierarchy,
  HierarchyNode,
  HierarchyPointNode,
  HierarchyLink,
  HierarchyPointLink,
  StratifyOperator,
  TreeLayout,
  tree,
  ClusterLayout,
  cluster
} from 'd3-hierarchy'
import * as d3 from 'd3';
//import { forEach } from '@angular/router/src/utils/collection';
interface HierarchyDatum {
  name: string;
  value: number;
  children?: Array<HierarchyDatum>;
}
const data: HierarchyDatum = {
  name: "A1",
  value: 100,
  children: [
      {
          name: "B1",
          value: 100,
          children: [
              {
                  name: "C1",
                  value: 100,
                  children: undefined 
              },
              {
                  name: "C2",
                  value: 300,
                  children: [
                      {
                          name: "D1",
                          value: 100,
                          children: undefined
                      },
                      {
                          name: "D2",
                          value: 300,
                          children: undefined
                      }
                  ] 
              },
              {
                  name: "C3",
                  value: 200,
                  children: undefined 
              }
          ]
      },
      {
          name: "B2",
          value: 200,
          children: [
              {
                  name: "C4",
                  value: 100,
                  children: undefined 
              },
              {
                  name: "C5",
                  value: 300,
                  children: undefined 
              },
              {
                  name: "C6",
                  value: 200,
                  children: [
                      {
                          name: "D3",
                          value: 100,
                          children: undefined
                      },
                      {
                          name: "D4",
                          value: 300,
                          children: undefined
                      }
                  ]  
              }
          ]
      }
  ]
};
@Component({
  selector: 'app-visual1',
  templateUrl: './visual1.component.html',
  styleUrls: ['./visual1.component.css']
})
export class Visual1Component implements OnInit {
  private margin: any = { top: 20, right: 120, bottom: 20, left: 120 };
  private width: number;
  private height: number;
  private root: HierarchyPointNode<HierarchyDatum>;
  private tree: TreeLayout<HierarchyDatum>;
  private svg: any;
  private diagonal: any;
  constructor() { }

  ngOnInit(): void {
         this.width = 1000 - this.margin.right - this.margin.left;
         this.height = 640 - this.margin.top - this.margin.bottom;
         this.svg = d3.select("div#tree").append("svg")
             .attr("width", this.width + this.margin.right + this.margin.left)
             .attr("height", this.height + this.margin.top + this.margin.bottom)
             .append("g")
             .attr("class", "g")
             //.attr("transform", "translate(5,5)");
             .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
         d3.select('svg g.g')
             .append("g")
             .attr("class", "links");
         d3.select('svg g.g')
             .append("g")
             .attr("class", "nodes");
         console.log("flare inside", data);
         this.tree = tree<HierarchyDatum>();
         this.tree.size([this.height, this.width]);
         this.root = this.tree(hierarchy<HierarchyDatum>(data));
         this.draw(this.root);
  }
  private draw(root: HierarchyPointNode<HierarchyDatum>) {
    // Nodes
    d3.select('svg g.nodes')
        .selectAll('circle.node')
        .data(root.descendants())
        .enter()
        .append('circle')
        .classed('node', true)
        .attr('style', "fill: steelblue;stroke: #ccc;stroke-width: 3px;")
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('r', 10);
    // Links
    d3.select('svg g.links')
        .selectAll('line.link')
        .data(root.links())
        .enter()
        .append('line')
        .classed('link', true)
        .attr('style', "stroke: #ccc;stroke-width: 3px;")
        .attr('x1', function (d) { return d.source.x; })
        .attr('y1', function (d) { return d.source.y; })
        .attr('x2', function (d) { return d.target.x; })
        .attr('y2', function (d) { return d.target.y; });
  }
}
