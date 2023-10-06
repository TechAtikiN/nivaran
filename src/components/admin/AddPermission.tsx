import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Web3Button, useContract, useGrantRole, useIsAddressRole } from '@thirdweb-dev/react'

interface Props {
  walletAddress: string
}

const AddPermission = ({ walletAddress }: Props) => {
  const roleName = 'minter'

  const { contract: createdFIRCollection } = useContract(process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS)
  const { contract: pendingFIRCollection } = useContract(process.env.NEXT_PUBLIC_FIR_PENDING_CONTRACT_ADDRESS)
  const { contract: resolvedFIRCollection } = useContract(process.env.NEXT_PUBLIC_FIR_RESOLVED_CONTRACT_ADDRESS)

  const hasAccessToCreateFIR = useIsAddressRole(createdFIRCollection, roleName, walletAddress)
  const hasAccessToUpdateFIR = useIsAddressRole(pendingFIRCollection, roleName, walletAddress)
  const hasAccessToResolveFIR = useIsAddressRole(resolvedFIRCollection, roleName, walletAddress)

  const { mutateAsync: grantRoleToNewFIRCollection } = useGrantRole(createdFIRCollection)
  const { mutateAsync: grantRoleToPendingFIRCollection } = useGrantRole(pendingFIRCollection)
  const { mutateAsync: grantRoleToResolvedFIRCollection } = useGrantRole(resolvedFIRCollection)

  const collectionOfFIRs = [
    {
      label: 'Created FIRs',
      contract: process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS,
      hasAccess: hasAccessToCreateFIR
    },
    {
      label: 'Change Status to pending',
      contract: process.env.NEXT_PUBLIC_FIR_PENDING_CONTRACT_ADDRESS,
      hasAccess: hasAccessToUpdateFIR
    },
    {
      label: 'Change Status to resolved',
      contract: process.env.NEXT_PUBLIC_FIR_RESOLVED_CONTRACT_ADDRESS,
      hasAccess: hasAccessToResolveFIR
    }
  ]

  return (
    <>
      <DialogContent>
        <DialogHeader>
          {/* <DialogTitle>Update Status</DialogTitle> */}
        </DialogHeader>
        <DialogDescription>
          {/* Update the status of FIR with id {fir.id} */}
        </DialogDescription>
        <h2 className='font-bold text-xl text-center -mt-4'>Give Access for</h2>
        <div className='mx-auto flex flex-col space-y-3 text-sm'>

          {collectionOfFIRs.map((contract, index) => (
            <div
              key={index}
              className='flex justify-between items-center space-x-8 '>
              <label htmlFor='description' className='form-label'>
                {contract.label}
              </label>
              {!contract.hasAccess ?
                <Web3Button
                  theme={'light'}
                  className='permission-btn'
                  contractAddress={contract.contract as string}
                  action={() => {
                    if (contract.contract === process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS) {
                      grantRoleToNewFIRCollection({
                        address: walletAddress,
                        role: roleName
                      })
                    } else if (contract.contract === process.env.NEXT_PUBLIC_FIR_PENDING_CONTRACT_ADDRESS) {
                      grantRoleToPendingFIRCollection({
                        address: walletAddress,
                        role: roleName
                      })
                    } else {
                      grantRoleToResolvedFIRCollection({
                        address: walletAddress,
                        role: roleName
                      })
                    }
                  }}
                >
                  Grant Role
                </Web3Button> : (
                  <p className='px-3 py-2'>User already has access</p>
                )
              }
            </div>
          ))}
        </div>
      </DialogContent>
    </>
  )
}

export default AddPermission