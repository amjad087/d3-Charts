import { NavBarService } from './../services/nav-bar.service';
import { ChartsService } from './../services/charts.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('available', {read: ElementRef}) elRef;

  private data = [
    {"complete": "100"},
    {"complete": "0"},
  ];;
  private johnData = [
    {"complete": "75"},
    {"complete": "25"},
  ];;
  private completeData = [
    {"complete": "100"},
    {"complete": "0"},
  ];;
  private unavailableData = [
    {"complete": "100"},
    {"complete": "0"},
  ];;

  private svg;
  private svg2;
  private svg3;
  private svg4;
  margin = 50;
  private radius;
  private width = 200;
  private height = 200;
  private colors;
  private johnColors;
  private completeColors;
  private unavailableColors;

  constructor(private chartsService: ChartsService, private router: Router, private navService: NavBarService) { }

  ngOnInit(): void {
    this.navService.show();
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
    .range(["#94aad8", "#94aad8"]);

    this.johnColors = d3.scaleOrdinal()
    .domain(this.johnData.map(d => d.complete.toString()))
    .range(["#ffc028", "#1b2023"]);


    this.completeColors = d3.scaleOrdinal()
    .domain(this.johnData.map(d => d.complete.toString()))
    .range(["#ffc028", "#1b2023"]);


    this.unavailableColors = d3.scaleOrdinal()
    .domain(this.johnData.map(d => d.complete.toString()))
    .range(["#1b2023", "#1b2023"]);
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
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Build the pie chart
    this.svg2
    .selectAll('pieces')
    .data(pie(this.johnData))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(90)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.johnColors(i)))
    .attr("stroke", "#000")
    .style("stroke-width", "1px");

    // Build the pie chart
    this.svg3
    .selectAll('pieces')
    .data(pie(this.completeData))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(90)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.completeColors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Build the pie chart
    this.svg4
    .selectAll('pieces')
    .data(pie(this.unavailableData))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(90)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.unavailableColors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");
  }

  onAvailableButtonClicked() {
    this.router.navigate(['/setup']);
  }

  onJohnButtonClicked() {
    this.router.navigate(['/progress']);
  }

  onCompleteButtonClicked() {
    this.router.navigate(['/complete']);
  }
}
