// named imports
import { useEffect, useState } from 'react'
import { userUserStore } from '@/store/useUserStore'
import { NFT, useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react'

// default imports
import AdminDashboard from '../components/admin/AdminDashboard'
import PoliceDashboard from '../components/police/PoliceDashboard'

enum Role {
  POLICE = 'Police',
  ADMIN = 'Admin',
  NULL = 0 as const

}

export default function Home() {
  const address = useAddress()

  // user state from zustand store
  const [role, setRole] = userUserStore(state => [state.role, state.setRole])
  const [nfts, setNfts] = useState<NFT[]>([])

  // define contracts for police and citizen NFTs
  const { contract: policeCollection } = useContract(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS)
  // const { contract: citizenCollection } = useContract(process.env.CITIZEN_NFT_CONTRACT_ADDRESS)

  // fetch nfts owned by police and citizen
  const { data: policeAccessNFTs, isLoading: policeAccessDataLoading } = useOwnedNFTs(policeCollection, address)
  // const { data: citizenAccessNFTs, isLoading: citizenAccessDataLoading } = useOwnedNFTs(citizenCollection, address)

  //  fetch FIR NFTs from three collections
  // const { contract } = useContract(process.env.NEXT_PUBLIC_COLLECTION_CONTRACT)
  // const { data: ownedNFTs, isLoading: userDataLoading } = useOwnedNFTs(contract, address)

  // set role based on address
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS === address) {
      setRole(Role.ADMIN)
    } else if (policeAccessNFTs?.length! > 0) {
      setRole(Role.POLICE)
    } else {
      setRole(Role.NULL)
    }
  }, [address, policeAccessNFTs])

  const fetchNFTs = async () => {
    try {
      const nftsData: NFT[] | undefined =
        await policeCollection?.erc721.getAll();
      setNfts(nftsData || []);
    } catch (error) {
      console.error("Error fetching NFTs", error);
    }
  };

  // useEffect(() => {
  //   fetchNFTs();
  // }, []);

  // if not connected to wallet
  if (!address) return <p>Not connected...</p>

  // if admin
  if (process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS === address) return <AdminDashboard />

  if (policeAccessDataLoading) {
    return <p>Loading...</p>
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
  } else {
    return <p>Not authorized</p>
  }
}
