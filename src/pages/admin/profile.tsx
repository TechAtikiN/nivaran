// named imports
import { userUserStore } from '@/store/useUserStore'
// default imports
import DashboardLayout from '@/components/globals/DashboardLayout'
import NotAuthorized from '@/components/globals/NotAuthorized'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

const ProfilePage = () => {
  const [role, userAddress, setRole] = userUserStore(state => [state.role, state.userAddress, state.setRole])
  const isAdmin = process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS === userAddress ? true : false

  if (!isAdmin) return <NotAuthorized />

  const features = [
    'Add Police Officers',
    'Remove Police Officers',
    'View Police Officers',
    'Grant access to Police Officers',
    'View victim complaints',
    'View FIR Listing'
  ]

  return (
    <DashboardLayout>
      <div className='p-4'>
        <h2 className='dashboard-heading'>Admin Profile</h2>

        <div className='border m-5 flex flex-col space-y-4 border-gray-200 rounded-md p-5'>

          <div>
            <h3 className=''>Wallet Address:</h3>
            <p className='font-bold text-gray-500'>{userAddress}</p>
          </div>

          <div>
            <h3 className=''>Role:</h3>
            <p className='font-bold text-gray-500'>{role}</p>
          </div>

          <div>
            <h3 className='my-2'>Features:</h3>
            <div className='flex flex-col space-y-3'>
              {features.map((feature, index) => (
                <div key={index} className='flex space-x-5'>
                  <CheckBadgeIcon className='h-6 w-6 text-sky-500' />
                  <p className='font-semibold text-gray-500'>{feature}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}

export default ProfilePage
