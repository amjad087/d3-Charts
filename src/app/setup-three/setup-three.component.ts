import { NavBarService } from './../services/nav-bar.service';
import { WebsocketService } from './../services/websocket.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-setup-three',
  templateUrl: './setup-three.component.html',
  styleUrls: ['./setup-three.component.css']
})
export class SetupThreeComponent implements OnInit, OnDestroy{
  completed = false;
  _current: any;
  arc: any;
  pie: any;
  path: any;
  private data = [
    {"complete": "100"},
    {"complete": "0"},
  ];
  private svg;
  private margin = 50;
  private width = 500;
  private height = 400;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;
  subscription: Subscription;

  constructor(private wsSercice: WebsocketService, private navService: NavBarService) { }

  ngOnInit(): void {
    this.navService.hide();
    this.createSvg();
    this.createColors();
    this.drawChart();
    this.wsSercice.getChartsData("ready", 0, "john");
    this.subscription = this.wsSercice.getServerMessageSubject()
    .subscribe(message => {

      if(message.percent_complete) {
        if(message.percent_complete === 100) {
          this.completed = true;
        }
      }
      const updatedData = [
        {"complete": message.percent_complete},
        {"complete": 100 - message.percent_complete},
      ];
      this.change(updatedData);
    });
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
    .range(["#1b2023", "#ffc028"]);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    this.pie = d3.pie<any>().value((d: any) => Number(d.complete)).sort(null);

    // ------------------------------

    this.path = this.svg.selectAll("pieces")
    .data(this.pie(this.data))
    .enter()
    .append("path");

    this.arc = d3.arc()
    .innerRadius(90)
    .outerRadius(this.radius);

    this.path.transition()
      .duration(500)
      .attr("fill", (d, i) => this.colors(i))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px")
      .attr('d', this.arc)
      .each(function(d) { this._current = d; }); // store the initial angles

      // Add labels
      const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

      this.svg
      .selectAll('pieces')
      .data(this.pie(this.data))
      .enter()
      .append('text')
      .text(d => d.data.Framework)
      .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("color", "#ffffff")
      .style("font-size", 15);
  }

  change(data) {
    this.path.data(this.pie(data));
    this.path.transition().duration(750).attrTween("d", this.arcTween); // redraw the arcs
  }

  arcTween = (datum, index) => {
    const interpolation = d3.interpolate(this._current, datum);
    // this._current[index] = interpolation(0);
    return (t) => {
        return this.arc(interpolation(t));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
