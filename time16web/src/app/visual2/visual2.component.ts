import { Component, ViewChild, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Tribunal } from '../tribunal/tribunal';
import { Grau } from '../grau/grau';
import { No } from './no';
import * as d3 from 'd3';
import axios from "axios";

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
  tribunal: string;
  tribunais: Tribunal[] = [];
  grau: string;
  graus: Grau[] = [];

  constructor() {        
   }

  ngOnInit(): void {
    this.consultaTribunal();
    /*
    this.links = [
      {source: "Michael", target: "Amazon", type: "licensing"},
      {source: "Microsoft", target: "HTC", type: "licensing"},
      {source: "Samsung", target: "Apple", type: "suit"},
      {source: "Motorola", target: "Apple", type: "suit"},
      {source: "Nokia", target: "Apple", type: "resolved"},
      {source: "HTC", target: "Apple", type: "suit"}
    ];
    */
    this.links = [];
    this.updateChart();
  }

  onChangeTribunal(tribunal) {
    console.log('Selecionou '+tribunal);
    this.consultaGraus(tribunal);    
  }

  onChangeGrau(grau) {
    console.log('Selecionou '+grau);
    this.consultaFluxo(this.tribunal,grau);
  }

  consultaTribunal() {
    axios.get("http://time16-sanjus.ddns.net:5002/api/v1.0/tribunal")
    .then(response => {
      for (let obj of response.data) {
        this.tribunais.push(new Tribunal(obj.sg_tribunal));
      } 
      console.log('Tribunais carregados')
      if (this.tribunais.length == 1){
        this.tribunal = this.tribunais[0].sg_tribunal;
        this.consultaGraus(this.tribunal);
      }
      })
    .catch(error => { console.error(error); })
    .finally(() => {});
    }

    consultaGraus(tribunal: string) {
      axios.get("http://time16-sanjus.ddns.net:5002/api/v1.0/grau/"+tribunal)
      .then(response => {
        for (let obj of response.data) {
          this.graus.push(new Grau(obj.sg_grau));
        } 
        console.log('Graus carregados')
        if (this.graus.length == 1){
          this.grau = this.graus[0].sg_grau;
          this.consultaFluxo(this.tribunal,this.grau);
        }
        })
      .catch(error => { console.error(error); })
      .finally(() => {});
      }

      consultaFluxo(tribunal: string, grau: string) {
        axios.get("http://time16-sanjus.ddns.net:5002/api/v1.0/fluxo/rede/"+tribunal+"/"+grau+"/S")
        .then(response => {
          this.links = []
          for (let obj of response.data) {
            this.links.push({ "source": obj.source_ds, "target": obj.target_ds, "type": obj.transition_cd });
          } 
          console.log('Nos carregados')
          this.updateChart();
          })
        .catch(error => { console.error(error); })
        .finally(() => {});
        }      
  
  createChart() {
    var svgSet = d3.select("div#net").append("svg")
      .attr("id","net")
      .attr('width', '95%')
      .attr('height', '1200')
      .call(d3.zoom().on("zoom", function () 
      {
        svgSet.attr("transform", d3.event.transform)
      })) 
      .append("g")
      this.svg = svgSet;
  }

  
  updateChart() {
    console.log('atualizando chart')
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
        .force("links", d3.forceLink(this.links).distance(400).strength(2))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("x", d3.forceX(500))
        .force("y", d3.forceY(450))
      // .force("name", d3.text(this.name))
        .on("tick", tick);

    // Per-type markers, as they don't inherit styles.
    this.svg.append("defs").selectAll("marker")
        .data(["R", "IP", "SI"])
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
          dr = Math.sqrt(dx * dx + dy * dy)*20;
      return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
    }
    function transform(d) {
      return "translate(" + d.x + "," + d.y + ")";
    }
  
  
  }

}