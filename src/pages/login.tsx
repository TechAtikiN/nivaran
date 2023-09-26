// named imports
import { ConnectWallet, useAddress, useContract } from '@thirdweb-dev/react'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import { userUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'
// default imports
import Image from 'next/image'

enum Role {
  POLICE = 'Police',
  ADMIN = 'Admin',
  CITIZEN = 'Citizen'
}

const Login = () => {
  const router = useRouter()
  const [role, setRole] = userUserStore((state) => [state.role, state.setRole]) // user state from zustand store  

  const address = useAddress()

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as Role)
  }

  return (
    <div className='lg:grid lg:grid-cols-11 h-screen'>
      {/* left section  */}
      <div className='col-span-5 bg-sky-200'>

      </div>

      {/* right section  */}
      <div className='col-span-6'>
        {/* thirdweb connect btn */}
        <div className='m-3'>
          <ConnectWallet theme='dark' />
        </div>

        <div className='flex flex-col items-center mb-10'>

          {/* logo */}
          <div>
            <div className='rounded-full p-5 bg-sky-100 border border-sky-400'>
              <Image width={170} height={170} src='/logo.svg' alt='logo' />
            </div>
          </div>

          {/* logo name  */}
          <h2 className='text-5xl mt-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-700 font-bold'
          >
            Nivaran
          </h2>
          <p className='text-sm mt-2 text-sky-600'>Decentralised FIR Management System</p>

          {/* select role  */}
          <div className='my-5 flex flex-col items-center space-y-2'>
            <p className='font-bold py-2 text-sky-800'>Access the Dashboard as</p>
            <select
              value={role}
              onChange={(e) => handleRoleChange(e)}
              name='role' id='role'
              className='bg-sky-100 p-2 focus:outline-none font-bold text-sky-600 rounded-tl-xl rounded-br-xl border border-sky-400 w-1/2'
            >
              <option value='Citizen'>{Role.CITIZEN}</option>
              <option value='Police'>{Role.POLICE}</option>
              <option value='Admin'>{Role.ADMIN}</option>
            </select>
          </div>

          {/* go to dashboard btn  */}
          <button
            disabled={!address}
            onClick={() => router.push('/')}
            className='bg-sky-500 disabled:opacity-60 flex items-center justify-center px-3 py-2 rounded-full w-3/4 font-semibold text-center text-white mt-5'>
            Go to Dashboard
            <ArrowUpRightIcon className='w-3 h-3 ml-2' />
          </button>

        </div>
      </div>
    </div>
  )
}

export default Login
