import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Donut extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      options: {
        colors: [
          '#FF5733', // Red
          '#33FF57', // Green
          '#5733FF', // Blue
          '#FF33A9', // Pink
          '#33A9FF', // Light Blue
          '#FFC300', // Yellow
          '#FF8333', // Orange
          '#33FFC3', // Light Green
          '#33FF33', // Bright Green
          '#FF3366', // Magenta
          '#A933FF', // Purple
          '#FFA933', // Dark Orange
          '#33C3FF', // Sky Blue
          '#A9FF33', // Lime Green
          '#A9FFA9', // Pale Green
          '#FFA9FF', // Lavender
          '#FF33FF', // Fuchsia
          '#33FF99', // Mint Green
          '#FF9933', // Gold
        ],
        labels: props.departamentos,
      },
      series: props.personas,
    };
  }

  render() {
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="380"
        />
      </div>
    );
  }
}

export default Donut;
