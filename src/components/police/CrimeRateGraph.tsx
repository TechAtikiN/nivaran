import { CategoryScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'

const CrimeRateGraph = () => {
  const years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']
  const values = [25, 28, 60, 81, 56, 55, 40, 20]
  const state = {
    labels: years,
    datasets: [
      {
        label: 'Crime Rate',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
        data: values
      }
    ]
  }
  ChartJS.register(...registerables, CategoryScale)

  return (
    <div className='border-r pr-20 border-gray-400'>
      <Bar
        width={400}
        height={250}
        data={state}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Crime Rate in India',
            },
            legend: {
              display: false,
              position: 'right',
              fullSize: true,
            }
          }
        }}
      />
    </div>
  )
}

export default CrimeRateGraph
