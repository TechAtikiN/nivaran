// named imports
import { useAuth } from '@/hooks/useAuth'
import { userUserStore } from '@/store/useUserStore'
// default imports
import DashboardLayout from '@/components/globals/DashboardLayout'
import FIRTable from '@/components/police/FIRTable'
import NotAuthorized from '@/components/globals/NotAuthorized'

const FIRListing = () => {
  const [role, userAddress, setRole] = userUserStore(state => [state.role, state.userAddress, state.setRole])
  const isAuthenicated = useAuth(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS!, userAddress)

  if (!isAuthenicated) return <NotAuthorized />
  console.log(role)
  return (
    <DashboardLayout>
      <div className='p-4'>
        <h2 className='dashboard-heading'>FIR Listing</h2>

        <FIRTable />
      </div>
    </DashboardLayout>
  )
}

export default FIRListing
