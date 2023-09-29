import DashboardLayout from "@/components/globals/DashboardLayout"
import NotAuthorized from "@/components/globals/NotAuthorized"
import { useAuth } from "@/hooks/useAuth"
import { userUserStore } from "@/store/useUserStore"

const ProfilePage = () => {
  const [role, userAddress, setRole] = userUserStore(state => [state.role, state.userAddress, state.setRole])
  const isAuthenicated = useAuth(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS!, userAddress)

  if (!isAuthenicated) return <NotAuthorized />

  return (
    <DashboardLayout>
      <div className='p-4'>
        <h2 className='dashboard-heading'>Police Profile</h2>

      </div>
    </DashboardLayout>
  )
}

export default ProfilePage
