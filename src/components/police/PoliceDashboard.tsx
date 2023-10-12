// default imports
import DashboardLayout from '../globals/DashboardLayout'
import CrimeRateGraph from './CrimeRateGraph'
import CriminalRegions from './CriminalRegionsGraph'
import FIRGraph from './FIRGraph'

const PoliceDashboard = () => {
  return (
    <DashboardLayout>
      <div className='p-4'>
        <h2 className='dashboard-heading'>Police Dashboard</h2>

        <div>
          <div className=''>
            <FIRGraph />
          </div>
          <div className='flex items-center space-x-10'>
            <CrimeRateGraph />
            <CriminalRegions />
          </div>

        </div>

      </div>
    </DashboardLayout>
  )
}

export default PoliceDashboard