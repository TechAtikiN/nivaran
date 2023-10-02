import { useRouter } from 'next/router'
import AdminDashboard from '@/components/admin/AdminDashboard'
import { useAddress } from '@thirdweb-dev/react'
import { useEffect } from 'react'

const AdminView = () => {
  const address = useAddress()
  const router = useRouter()

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS !== address) {
      router.push('/login')
    }
  }, [address])

  return (
    <AdminDashboard />
  )
}

export default AdminView
