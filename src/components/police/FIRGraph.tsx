import { CategoryScale } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'

const FIRGraph = () => {

  const crimeTypes = [
    "Murder",
    "Robbery",
    "Assault",
    "Burglary",
    "Theft",
    "Kidnapping",
    "Cybercrime",
    "Fraud",
    "Drug trafficking",
    "Money laundering",
    "Shoplifting",
    "Insider trading",
    "Environmental crimes",
    "Cyberbullying",
    "Animal cruelty",
    "Smuggling",
    "Harassment",
    "Prostitution",
    "Hate speech",
    "Terrorism"
  ];

  const crimeCounts = [2, 10, 3, 12, 34, 12, 26, 11, 22, 3, 2, 10, 13, 5, 1, 10, 2, 13, 11, 13]

  const state = {
    labels: crimeTypes,
    datasets: [
      {
        label: 'FIRs',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: crimeCounts,
        fill: {
          target: 'origin',
          above: 'rgba(175, 200, 190, 0.4)',   // Area will be red above the origin
          below: 'rgb(4, 162, 235)'    // And blue below the origin
        }
      }
    ]
  }
  ChartJS.register(...registerables, CategoryScale)

  return (
    <div className=''>
      <Line
        width={600}
        height={300}
        data={state}
        options={{
          elements: {
            line: {
              tension: 0.2
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'FIRs registered of different types of crimes',
            },
            legend: {
              display: true,
              position: 'right',
              fullSize: false,
            }
          }
        }}
      />
    </div>
  )
}

export default FIRGraph
