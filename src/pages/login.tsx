// named imports
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ConnectWallet, useAddress } from '@thirdweb-dev/react'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import { userUserStore } from '@/store/useUserStore'

// default imports
import Image from 'next/image'

enum Role {
  POLICE = 'Police',
  ADMIN = 'Admin',
  NULL = 0 as const
}

const Login = () => {
  const router = useRouter()
  const address = useAddress()
  console.log(address)

  const [role, setRole, userAddress, setUserAddress] = userUserStore( // user state from zustand store
    (state) => [state.role, state.setRole, state.userAddress, state.setUserAddress]
  )

  useEffect(() => {
    setUserAddress(address as string)
  }, [address, setUserAddress])

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as Role)
  }

  return (
    <div className='lg:grid lg:grid-cols-12 h-screen'>
      {/* left section  */}
      <div className='col-span-6 p-5 bg-gradient-to-tr from-blue-500 to-sky-800 via-sky-400'>
        {/* <Image
          alt='login image'
          width={100}
          height={100}
          className='h-full w-full object-fill rounded-full'
          src='/login-hero.jpg'
        /> */}
      </div>

      {/* right section  */}
      <div className='col-span-6'>
        {/* thirdweb connect btn */}


        <div className='flex flex-col items-center my-10'>

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
          <div>
            <div className='my-5 flex flex-col items-center space-y-2'>
              <p className='font-bold py-2 text-sky-800'>Access the Dashboard as</p>
              <select
                value={role}
                onChange={(e) => handleRoleChange(e)}
                name='role' id='role'
                className='bg-sky-100 p-2 focus:outline-none font-bold text-sky-600 rounded-tl-xl rounded-br-xl border border-sky-400 w-1/2'
              >
                <option value='Police'>{Role.POLICE}</option>
                <option value='Admin'>{Role.ADMIN}</option>
              </select>
            </div>

            <div className='m-3'>
              <ConnectWallet theme='light' />
            </div>
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
