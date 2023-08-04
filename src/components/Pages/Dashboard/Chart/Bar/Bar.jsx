import ReactApexChart from "react-apexcharts";

const Bar = ({ usersByOcupation, ocupationsName }) => {
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
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="bar"
        height={300}
        width={600}
      />
    </div>
  );
};

export default Bar;
