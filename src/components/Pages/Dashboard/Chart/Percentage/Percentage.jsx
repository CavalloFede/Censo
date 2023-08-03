import ReactApexChart from 'react-apexcharts';

const Percentage = ({ totalUsers, usersByUser }) => {
  const usersPercentage = (usersByUser.length * 100) / totalUsers;
  const data = {
    series: [50],
    options: {
      chart: {
        type: 'bar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: '70%',
          },
        },
        dataLabels: {
          label: 'Total',
          enabled: true,
        },
      },
    },
  };
  return (
    <div>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="radialBar"
        height={300}
      />
    </div>
  );
};

export default Percentage;
