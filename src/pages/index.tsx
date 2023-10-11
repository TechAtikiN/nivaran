
// named imports
import { useEffect, useState } from 'react'
import { userUserStore } from '@/store/useUserStore'
import { useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react'
import { useRouter } from 'next/navigation'

// default imports
import NotAuthorized from '@/components/globals/NotAuthorized'
import Loading from '@/components/globals/Loading'

enum Role {
  POLICE = 'Police',
  ADMIN = 'Admin',
  NULL = 0 as const
}

export default function Home() {
  const address = useAddress()
  const router = useRouter()

  // user state from zustand store
  const [role, setRole] = userUserStore(state => [state.role, state.setRole])

  // define contracts for police and citizen NFTs
  const { contract: policeCollection } = useContract(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS)
  const { data: policeAccessNFTs, isLoading: policeAccessDataLoading } = useOwnedNFTs(policeCollection, address)

  // if (role === Role.NULL) {
  //   router.push('/login')
  // }

  // set role based on address
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS === address) {
      setRole(Role.ADMIN)
    } else if (policeAccessNFTs && policeAccessNFTs?.length > 0) {
      setRole(Role.POLICE)
    } else {
      setRole(Role.NULL)
    }

  }, [address, policeAccessNFTs])

  // if data is loading, show loading component
  if (policeAccessDataLoading || address === null) {
    return <Loading />
  }

  if (process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS === address) {
    router.push('/admin')
  }

  if (role === Role.POLICE) {
    router.push('/police')
  }

}