// named imports
import { userUserStore } from '@/store/useUserStore'
// default imports
import DashboardLayout from '@/components/globals/DashboardLayout'
import NotAuthorized from '@/components/globals/NotAuthorized'

const ProfilePage = () => {
  const [role, userAddress, setRole] = userUserStore(state => [state.role, state.userAddress, state.setRole])
  const isAdmin = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS === userAddress ? true : false
  console.log(role)

  if (!isAdmin) return <NotAuthorized />

  return (
    <DashboardLayout>
      <div className='p-4'>
        <h2 className='dashboard-heading'>Admin Profile</h2>
      </div>
    </DashboardLayout>
  )
}

export default ProfilePage
