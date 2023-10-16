// named impors
import { useRouter } from 'next/router'
import { useAddress } from '@thirdweb-dev/react'
import { useEffect } from 'react'
// default imports
import AdminDashboard from '@/components/admin/AdminDashboard'
import DashboardLayout from '@/components/globals/DashboardLayout'

const AdminView = () => {
  const address = useAddress()
  const router = useRouter()

  // useEffect(() => {
  //   if (process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS !== address) {
  //     router.push('/login')
  //   }
  // }, [address])

  return (

    <DashboardLayout>
      <AdminDashboard />
    </DashboardLayout>
  )
}

export default AdminView
