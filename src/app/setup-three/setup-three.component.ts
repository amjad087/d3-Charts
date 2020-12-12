import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-setup-three',
  templateUrl: './setup-three.component.html',
  styleUrls: ['./setup-three.component.css']
})
export class SetupThreeComponent implements OnInit {
  private data = [
    {"complete": "65"},
   {"complete": "35"},
  ];
  private svg;
  private margin = 50;
  private width = 500;
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
    this.svg = d3.select("svg")
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
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map(d => d.complete.toString()))
    .range(["#c4b432", "#333"]);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.complete));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(90)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    // const labelLocation = d3.arc()
    // .innerRadius(100)
    // .outerRadius(this.radius);

    // this.svg
    // .selectAll('pieces')
    // .data(pie(this.data))
    // .enter()
    // .append('text')
    // .text(d => d.data.Framework)
    // .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
    // .style("text-anchor", "middle")
    // .style("font-size", 15);
  }


}
