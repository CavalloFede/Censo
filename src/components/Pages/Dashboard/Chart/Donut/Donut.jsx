import ReactApexChart from 'react-apexcharts';
const Donut = ({ usersByState, departmentsName }) => {
  const hasDataToShow = departmentsName.length > 0 && usersByState.length > 0;
  const data = {
    series: usersByState,
    options: {
      chart: {
        type: 'pie',
      },
      labels: departmentsName,
      colors: [
        '#FF5733',
        '#33FF57',
        '#5733FF',
        '#FF33A9',
        '#33A9FF',
        '#FFC300',
        '#FF8333',
        '#33FFC3',
        '#33FF33',
        '#FF3366',
        '#A933FF',
        '#FFA933',
        '#33C3FF',
        '#A9FF33',
        '#A9FFA9',
        '#FFA9FF',
        '#FF33FF',
        '#33FF99',
        '#FF9933',
      ],
    },
  };
  return (
    <div id="chart">
      {hasDataToShow ? (
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="donut"
          height={300}
        />
      ) : (
        <p>No hay datos para mostrar.</p>
      )}
    </div>
  );
};

export default Donut;
