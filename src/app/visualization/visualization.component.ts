import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Transaction } from '../transcation';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent implements OnInit {
  private svg: any;
  private transactions: Transaction[] = [];
  private radius = 200; // Adjust as needed
  private color = d3.scaleOrdinal(d3.schemeCategory10);

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      this.transactions = JSON.parse(storedTransactions);
    }
    this.createPieChart();
  }

  createPieChart(): void {
    // Remove the old chart if it exists
    d3.select('svg').remove();

    // Calculate income and expense
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expense = this.transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    // Define the data for the pie chart
    const data = [
      { name: 'Income', value: income },
      { name: 'Expense', value: expense }
    ];

    // Create the SVG
    this.svg = d3.select('body')
      .append('svg')
      .attr('width', this.radius * 2)
      .attr('height', this.radius * 2)
      .append('g')
      .attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');

    // Create the pie chart
  const pie = d3.pie<any>().value((d: any) => Number(d.value));
  const path = d3.arc<any>()
    .outerRadius(this.radius - 10)
    .innerRadius(0);

  const arc = this.svg.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc');

  arc.append('path')
    .attr('d', path)
    .attr('fill', (d: any) => this.color(d.data.name));

  // Add labels
  const label = d3.arc<any>()
    .outerRadius(this.radius)
    .innerRadius(this.radius - 80);

  arc.append('text')
    .attr('transform', (d: any) => 'translate(' + label.centroid(d) + ')')
    .attr('dy', '0.35em')
    .text((d: any) => d.data.name + ': ' + d.data.value);
}
}
