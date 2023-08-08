import ReactApexChart from "react-apexcharts";

const Bar = ({ usersByOcupation, ocupationsName }) => {
  const hasDataToShow =
    usersByOcupation.length > 0 && ocupationsName.length > 0;

  const data = {
    series: [
      {
        data: usersByOcupation,
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ocupationsName,
      },
    },
  };
  return (
    <div>
      <h2>Mis censados por ocupación:</h2>
      <div id="chart">
        {hasDataToShow ? (
          <ReactApexChart
            options={data.options}
            series={data.series}
            type="bar"
            height={300}
            width={600}
          />
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default Bar;
