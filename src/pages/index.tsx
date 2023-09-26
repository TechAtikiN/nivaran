// named imports
import { useEffect } from 'react'
import { userUserStore } from '@/store/useUserStore'
import { useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react'
// default imports
import AdminDashboard from './components/admin/AdminDashboard';
import PoliceDashboard from './components/police/PoliceDashboard';
import CitizenDashboard from './components/citizen/CitizenDashboard';

enum Role {
  POLICE = 'Police',
  ADMIN = 'Admin',
  CITIZEN = 'Citizen'
}

export default function Home() {
  // user state from zustand store
  const [role, setRole] = userUserStore(state => [state.role, state.setRole])

  // user address
  const address = useAddress()

  // define contracts for police and citizen NFTs
  const { contract: policeCollection } = useContract(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS)
  const { contract: citizenCollection } = useContract(process.env.CITIZEN_NFT_CONTRACT_ADDRESS)

  // fetch nfts owned by police and citizen
  const { data: policeAccessNFTs, isLoading: policeAccessDataLoading } = useOwnedNFTs(policeCollection, address)
  const { data: citizenAccessNFTs, isLoading: citizenAccessDataLoading } = useOwnedNFTs(citizenCollection, address)

  //  fetch FIR NFTs from three collections
  // const { contract } = useContract(process.env.NEXT_PUBLIC_COLLECTION_CONTRACT)
  // const { data: ownedNFTs, isLoading: userDataLoading } = useOwnedNFTs(contract, address)

  // set role based on address
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS === address) {
      setRole(Role.ADMIN)
    } else if (policeAccessNFTs) {
      setRole(Role.POLICE)
    } else {
      setRole(Role.CITIZEN)
    }
  }, [address])

  // if not connected to wallet
  if (!address) return <p>Not connected...</p>

  // if admin
  if (process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS === address) return <AdminDashboard />

  if (!policeAccessNFTs) {
    return <p>No Access...</p>
  }

  // if (policeAccessDataLoading || citizenAccessDataLoading) {
  //   return (
  //     <div className='flex items-center justify-center'>
  //       <Image
  //         src='https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif'
  //         alt='Loading...'
  //         width={200}
  //         height={200}
  //       />
  //     </div>
  //   )
  // }

  if (role === Role.POLICE) {
    return <PoliceDashboard />
  } else if (role === Role.CITIZEN) {
    return <CitizenDashboard />
  }
}
