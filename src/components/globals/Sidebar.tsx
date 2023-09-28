// named imports
import { usePathname } from 'next/navigation'
import { Kanit } from 'next/font/google'
import { adminNavLinks, policeNavLinks } from '../../constants/navLinks'
import { ConnectWallet } from '@thirdweb-dev/react'
import { userUserStore } from '@/store/useUserStore'

// default imports
import Link from 'next/link'
import { useState } from 'react'

const pacifico = Kanit({ weight: '400', subsets: ['latin'] })

const Sidebar = () => {
  const role = userUserStore(state => state.role)
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-150 ease-in-out bg-[#191825] text-white h-screen flex flex-col justify-between py-6`}>

      <div>
        {/* Sidebar header */}
        <h2 onClick={() => handleSidebar()} className='text-4xl text-center hover:scale-110 transition-transform duration-150 ease-in-out hover:cursor-pointer mb-5 text-gray-200'
        >
          <span className={pacifico.className}>{sidebarCollapsed ? 'N' : 'Nivaran'}</span>
        </h2>

        {/* Sidebar content */}
        <div className='flex flex-col items-center'>
          <ul className='space-y-2'>
            {(role === 'Admin' ? adminNavLinks : policeNavLinks).map((link) => (
              <li className='hover:text-sky-300 hover:scale-105 text-gray-300' key={link.name}>
                <Link
                  href={link.path}
                  className={`p-2 ${pathname === link.path && 'text-sky-300'} flex justify-start items-center space-x-3`}
                >
                  <span className='h-6 w-6'>{link.icon}</span>
                  <p
                    className={`border-b-2 ${sidebarCollapsed ? 'hidden' : 'block'} text-sm border-transparent hover:border-b-2 hover:border-sky-300 `}
                  >
                    {link.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`mx-auto ${sidebarCollapsed ? ' hidden' : 'block'}`}>
        <ConnectWallet />
      </div>
    </div>
  )
}

export default Sidebar
