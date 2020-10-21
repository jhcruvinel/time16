import { Component, OnInit } from '@angular/core';
import { Tribunal } from '../tribunal/tribunal';
import { Grau } from '../grau/grau';
import * as d3 from 'd3';
import axios from 'axios';
import { AppSettings } from '../app-settings';
interface HierarchyDatum {
  cd_situacao: string;
  ds_situacao: string;
  children?: Array<HierarchyDatum>;
}
@Component({
  selector: 'app-visual3',
  templateUrl: './visual3.component.html',
  styleUrls: ['./visual3.component.css'],
})
export class Visual3Component implements OnInit {
  dataList: any;
  margin: any;
  width: number;
  height: number;
  svg: any;
  duration: number;
  root: any;
  tree: any;
  treeData: any;
  nodes: any;
  links: any;
  tribunal: string;
  tribunais: Tribunal[] = [];
  grau: string;
  graus: Grau[] = [];

  constructor() {}

  ngOnInit(): void {
    this.consultaTribunal();
    this.dataList = {};
  }

  onChangeTribunal(tribunal) {
    console.log('Selecionou ' + tribunal);
    this.consultaGraus(tribunal);
  }

  onChangeGrau(grau) {
    console.log('Selecionou ' + grau);
    this.consultaFluxo(this.tribunal, grau);
  }

  consultaTribunal() {
    axios
      .get([AppSettings.API_ENDPOINT, 'v1.0/tribunal'].join('/'))
      .then((response) => {
        for (let obj of response.data) {
          this.tribunais.push(new Tribunal(obj.sg_tribunal));
        }
        console.log('Tribunais carregados');
        if (this.tribunais.length == 1) {
          this.tribunal = this.tribunais[0].sg_tribunal;
          this.consultaGraus(this.tribunal);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }

  consultaGraus(tribunal: string) {
    axios
      .get([AppSettings.API_ENDPOINT, 'v1.0/grau', tribunal].join('/'))
      .then((response) => {
        for (let obj of response.data) {
          this.graus.push(new Grau(obj.sg_grau));
        }
        console.log('Graus carregados');
        if (this.graus.length == 1) {
          this.grau = this.graus[0].sg_grau;
          this.consultaFluxo(this.tribunal, this.grau);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }

  consultaFluxo(tribunal: string, grau: string) {
    console.time('fluxo_arvore');
    axios
      .get(
        [
          AppSettings.API_ENDPOINT,
          'v1.0/fluxo/arvore',
          tribunal,
          grau,
          'S',
        ].join('/')
      )
      .then((response) => {
        this.dataList = response.data;
        console.log('Arvore carregada');
        console.timeEnd('fluxo_arvore');
        this.setData();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }

  setData() {
    this.margin = { top: 10, right: 10, bottom: 10, left: 0 };
    this.width = 3200 - this.margin.left - this.margin.right;
    this.height = 1200 - this.margin.top - this.margin.bottom;
    this.svg = d3
      .select('div#tree')
      .append('svg')
      .attr('width', this.width + this.margin.right + this.margin.left)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );

    this.duration = 150;

    // declares a tree layout and assigns the size
    this.tree = d3.tree().size([this.height, this.width]);

    console.log(this.dataList);
    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(this.dataList, (d) => {
      return d.children;
    });
    this.root.x0 = this.height / 2;
    this.root.y0 = 0;

    // Collapse after the second level
    if (this.root.children) {
      this.root.children.forEach(collapseChild);
    }
    this.updateChart(this.root);

    function collapseChild(d) {
      if (d.children) {
        d.children.forEach(collapse);
      }
    }
    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }
  }

  click = (d) => {
    console.log('click');
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.updateChart(d);
  };

  updateChart(source) {
    let i = 0;
    console.log(source);
    this.treeData = this.tree(this.root);

    this.nodes = this.treeData.descendants();
    this.links = this.treeData.descendants().slice(1);
    this.nodes.forEach((d) => {
      d.y = d.depth * 180;
    });

    let node = this.svg.selectAll('g.node').data(this.nodes, (d) => {
      return d.id || (d.id = ++i);
    });

    let nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
      })
      .on('click', this.click);

    nodeEnter
      .append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style('fill', (d) => {
        return d._children ? 'lightsteelblue' : '#fff';
      });

    nodeEnter
      .append('text')
      .attr('dy', '.35em')
      .attr('x', (d) => {
        return d.children || d._children ? -13 : 13;
      })
      .attr('text-anchor', (d) => {
        return d.children || d._children ? 'end' : 'start';
      })
      .style('font', '14px sans-serif')
      .text((d) => {
        return d.data.ds_situacao;
      });

    let nodeUpdate = nodeEnter.merge(node);

    nodeUpdate
      .transition()
      .duration(this.duration)
      .attr('transform', (d) => {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    nodeUpdate
      .select('circle.node')
      .attr('r', 10)
      .style('stroke-width', '3px')
      .style('stroke', 'steelblue')
      .style('fill', (d) => {
        return d._children ? 'lightsteelblue' : '#fff';
      })
      .attr('cursor', 'pointer');

    let nodeExit = node
      .exit()
      .transition()
      .duration(this.duration)
      .attr('transform', (d) => {
        return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

    nodeExit.select('circle').attr('r', 1e-6);

    nodeExit.select('text').style('fill-opacity', 1e-6);

    let link = this.svg.selectAll('path.link').data(this.links, (d) => {
      return d.id;
    });

    let linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('stroke-width', '5px')
      .attr('d', function (d) {
        let o = { x: source.x0, y: source.y0 };
        return diagonal(o, o);
      });

    let linkUpdate = linkEnter.merge(link);

    linkUpdate
      .transition()
      .duration(this.duration)
      .attr('d', (d) => {
        return diagonal(d, d.parent);
      });

    let linkExit = link
      .exit()
      .transition()
      .duration(this.duration)
      .attr('d', function (d) {
        let o = { x: source.x, y: source.y };
        return diagonal(o, o);
      })
      .remove();

    this.nodes.forEach((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
    function diagonal(s, d) {
      let path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;
      return path;
    }
  }
}
