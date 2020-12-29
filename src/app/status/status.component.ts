import { NavBarService } from './../services/nav-bar.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, AfterViewInit {
  private data = [
    {"complete": "100"},
    {"complete": "0"},
  ];

  private johnData = [
    {"complete": "65"},
    {"complete": "35"},
  ];

  private completeData = [
    {"complete": "100"},
    {"complete": "0"},
  ];
  private unavailableData = [
    {"complete": "100"},
    {"complete": "0"},
  ];

  @ViewChild('available', {read: ElementRef}) elRef;


  private svg;
  private svg2;
  private svg3;
  private svg4;
  private margin = 50;
  private width = 200;
  private height = 200;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;
  private johnColors;
  private completeColors;
  private unavailableColors;

  constructor(private navService: NavBarService) { }

  ngOnInit(): void {
    this.navService.hide();

  }

  ngAfterViewInit() {
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private createSvg(): void {

    const divWidth = (this.elRef.nativeElement as HTMLElement).getBoundingClientRect().right;
    const divHeight = (this.elRef.nativeElement as HTMLElement).getBoundingClientRect().bottom;



    this.width = divWidth;
    this.radius = Math.min(this.width, this.height) / 2 - this.margin;

    this.svg = d3.select("svg#available")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );

    this.svg2 = d3.select("svg#john")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );

    this.svg3 = d3.select("svg#complete")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );

    this.svg4 = d3.select("svg#unavailable")
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
    .range(["#ccf", "#ccf"]);

    this.johnColors = d3.scaleOrdinal()
    .domain(this.johnData.map(d => d.complete.toString()))
    .range(["#c4b432", "#333"]);


    this.completeColors = d3.scaleOrdinal()
    .domain(this.johnData.map(d => d.complete.toString()))
    .range(["#c4b432", "#333"]);


    this.unavailableColors = d3.scaleOrdinal()
    .domain(this.johnData.map(d => d.complete.toString()))
    .range(["#333", "#333"]);


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
      .innerRadius(90)
      .outerRadius(this.radius + 5)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#000")
    .style("stroke-width", "3px");

    // Build the pie chart
    this.svg2
    .selectAll('pieces')
    .data(pie(this.johnData))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(90)
      .outerRadius(this.radius + 5)
    )
    .attr('fill', (d, i) => (this.johnColors(i)))
    .attr("stroke", "#000")
    .style("stroke-width", "3px");

    // Build the pie chart
    this.svg3
    .selectAll('pieces')
    .data(pie(this.completeData))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(90)
      .outerRadius(this.radius + 5)
    )
    .attr('fill', (d, i) => (this.completeColors(i)))
    .attr("stroke", "#000")
    .style("stroke-width", "3px");

    // Build the pie chart
    this.svg4
    .selectAll('pieces')
    .data(pie(this.unavailableData))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(90)
      .outerRadius(this.radius + 5)
    )
    .attr('fill', (d, i) => (this.unavailableColors(i)))
    .attr("stroke", "#000")
    .style("stroke-width", "3px");

  }

}
