import { CategoryScale } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'

const CriminalRegions = () => {
  const years = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Pune']
  const values = [25, 28, 60, 81, 56, 55, 40, 20]
  const state = {
    labels: years,
    datasets: [
      {
        label: 'Crime Rate',
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',// Light Beige
          'rgb(175, 238, 238)'],
        borderColor: 'rgba(240, 233, 255)',
        data: values
      }
    ]
  }
  ChartJS.register(...registerables, CategoryScale)

  return (
    <div className=''>
      <Doughnut
        width={430}
        height={280}
        data={state}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              position: 'top',
              text: 'Crime Rate in India',
            },
            legend: {
              display: true,
              position: 'right',
              fullSize: true,
            }
          }
        }}
      />
    </div>
  )
}

export default CriminalRegions
