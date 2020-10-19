import { Component, OnInit } from '@angular/core';
import { AngularD3TreeLibService } from 'angular-d3-tree';
import * as d3 from 'd3';

@Component({
  selector: 'app-visual2',
  templateUrl: './visual2.component.html',
  styleUrls: ['./visual2.component.css']
})
export class Visual2Component implements OnInit {

  data: any[];

  constructor(private treeService: AngularD3TreeLibService) {

      
   }

  ngOnInit(): void {
    
    var treeData = [
      {
        "name": "Top Level",
        "children": [
          {
            "name": "Level 2: A",
            "children": [
              {
                "name": "Son of A",
              },
              {
                "name": "Daughter of A",
              }
            ]
          },
          {
            "name": "Level 2: B",
          }
        ]
      }
    ];

  }

  
  generateTree(){
  }

}