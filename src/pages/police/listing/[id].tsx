// named imports
import { useAuth } from '@/hooks/useAuth'
import { userUserStore } from '@/store/useUserStore'
// default imports
import DashboardLayout from '@/components/globals/DashboardLayout'
import { useRouter } from 'next/router'

const FIRDetail = () => {
  const router = useRouter()
  const id = router.query.id

  const [role, userAddress, setRole] = userUserStore(state => [state.role, state.userAddress, state.setRole])
  const isAuthenicated = useAuth(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS!, userAddress)

  if (!isAuthenicated) return <div>Unauthorized Access</div>
  console.log(role)
  return (
    <DashboardLayout>
      <div className='p-4'>
        <h2 className='dashboard-heading'>FIR Detail</h2>

        <div className='py-3 px-5 mt-5 border border-gray-300 rounded-md text-gray-800'>
          <div>
            <div>
              <h3 className='text-lg font-semibold'>FIR ID: {id}</h3>
              <p className='text-sm text-gray-500'>FIR Status: Pending</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default FIRDetail
