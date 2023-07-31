import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Donut extends Component {
  constructor(props) {
    super(props);
    const hasDataToShow =
      props.departamentos.length > 0 && props.personas.length > 0;
    this.state = {
      options: {
        colors: [
          // ... colors ...
        ],
        labels: props.departamentos,
      },
      series: props.personas,
      hasDataToShow: hasDataToShow,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.departamentos !== this.props.departamentos ||
      prevProps.personas !== this.props.personas
    ) {
      const hasDataToShow =
        this.props.departamentos.length > 18 && this.props.personas.length > 18;
      this.setState({
        options: {
          ...this.state.options,
          labels: this.props.departamentos,
        },
        series: this.props.personas,
        hasDataToShow: hasDataToShow,
      });
    }
  }

  render() {
    return (
      <div className="donut">
        {this.state.hasDataToShow ? (
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="donut"
            width="380"
          />
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </div>
    );
  }
}

export default Donut;
