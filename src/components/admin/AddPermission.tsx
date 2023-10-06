import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { BaseContractInterface, SmartContract, Web3Button, useContract, useGrantRole, useIsAddressRole } from '@thirdweb-dev/react'
import { useEffect } from 'react'

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

  const { mutateAsync: grantRole, error } = useGrantRole(createdFIRCollection)


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
              {contract.hasAccess ? <p className='px-3 py-2'>User already has access</p> :
                <Web3Button
                  theme={'light'}
                  className='permission-btn'
                  contractAddress={contract.contract as string}
                  action={() => {
                    try {
                      grantRole({
                        role: 'minter',
                        address: walletAddress || '',
                      })
                      alert('Role granted')
                    } catch (error) {
                      console.log('error', error)
                    }
                  }}
                >
                  Grant Role
                </Web3Button>
              }
            </div>
          ))}

          {/* {isMember ? <p className='px-3 py-2'>User already has access</p> :
              <Web3Button
                className='permission-btn'
                contractAddress={process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS as string}
                action={() => {
                  try {
                    grantRole({
                      role: 'minter',
                      address: walletAddress || '',
                    })
                    alert('Role granted')
                  } catch (error) {
                    console.log('error', error)
                  }
                }}
              >
                Grant Role
              </Web3Button>
            }
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <label htmlFor='description' className='form-label'>
              Update Status to pending
            </label>
            {isMember ? <p className='px-3 py-2'>User already has access</p> :
              <Web3Button
                className='permission-btn'
                contractAddress={process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS as string}
                action={() => {
                  try {
                    grantRole({
                      role: 'minter',
                      address: walletAddress || '',
                    })
                    alert('Role granted')
                  } catch (error) {
                    console.log('error', error)
                  }
                }}
              >
                Grant Role
              </Web3Button>
            }
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <label htmlFor='description' className='form-label'>
              Update Status to resolved
            </label>
            {isMember ? <p className='px-3 py-2'>User already has access</p> :
              <Web3Button
                className='permission-btn'
                contractAddress={process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS as string}
                action={() => {
                  try {
                    grantRole({
                      role: 'minter',
                      address: walletAddress || '',
                    })
                    alert('Role granted')
                  } catch (error) {
                    console.log('error', error)
                  }
                }}
              >
                Grant Role
              </Web3Button>
            } */}
        </div>
      </DialogContent>
    </>
  )
}

export default AddPermission