import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
  private data = [
    {"complete": "15"},
    {"complete": "40"},
    {"complete": "25"},
    {"complete": "10"},
    {"complete": "10"}
  ];
  private svg;
  private margin = 50;
  private width = 400;
  private height = 400;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;
  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3.select("#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  private createColors(): void {

    const clrs = ["#f6c14d", "#b02318", "#9d9d9d", "#1b2023", "#94aad8"];
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map(d => d.complete.toString()))
    .range(clrs);
    console.log(this.colors);

  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.complete)).sort(null);

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius + 5)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#000000")
    .style("stroke-width", "3px");

  }

}
