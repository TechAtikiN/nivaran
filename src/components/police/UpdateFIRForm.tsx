import { useAddress, useContract, useMintNFT, useOwnedNFTs } from '@thirdweb-dev/react'
import { useForm } from 'react-hook-form'
import { DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'

interface Props {
  fir: FIR
  selectedStatus: string
}

type FormValues = {
  description: string
  remark: string
  documents: FileList
  status: string
}

const FIR_THUMBNAIL = 'https://e-gmat.com/blogs/wp-content/uploads/2021/04/f1-visa-documents.jpg'

const UpdateFIRForm = ({ fir, selectedStatus }: Props) => {
  const address = useAddress()
  const { contract: pendingFIRCollection } = useContract(process.env.NEXT_PUBLIC_FIR_PENDING_CONTRACT_ADDRESS)
  const { contract: resolvedFIRCollection } = useContract(process.env.NEXT_PUBLIC_FIR_RESOLVED_CONTRACT_ADDRESS)

  const { mutateAsync: mintPendingNft } = useMintNFT(pendingFIRCollection)
  const { mutateAsync: mintResolvedNft } = useMintNFT(resolvedFIRCollection)

  const { data: pendingFIRsData } = useOwnedNFTs(pendingFIRCollection, address)
  const { data: resolvedFIRsData } = useOwnedNFTs(resolvedFIRCollection, address)

  let pendingFIRsMetadata: FIR[] = []
  let resolvedFIRsMetadata: FIR[] = []

  pendingFIRsData?.map(async (fir: any) => {
    const data = fir.metadata
    pendingFIRsMetadata.push(data)
  })
  resolvedFIRsData?.map(async (fir: any) => {
    const data = fir.metadata
    resolvedFIRsMetadata.push(data)
  })

  console.log(pendingFIRsMetadata, resolvedFIRsMetadata)

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  const handleMailing = async (data: any, status: string, fir: FIR) => {
    try {
      const res = await fetch('/api/mailing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          email: fir.properties.email,
          firId: fir.properties.firId,
          status: status
        })
      })
      if (res.status === 200) {
        toast.success('Information mailed successfully')
      }
    } catch (err) {
      alert('Something went wrong, please try again later')
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    const firMetadata = {
      name: `Filing for ${fir.properties.name}`,
      description: 'NEW FIR',
      image: FIR_THUMBNAIL,
      properties: {
        ...fir.properties,
        description: data.description,
        remark: data.remark,
        documents: data.documents,
      }
    }

    // check if the FIR with the same FIR number already exists, check from the data object and the pendingFIRsMetadata and resolvedFIRsMetadata
    const alreadyExistsInPending = pendingFIRsMetadata.find((fir: FIR) => fir.properties.firId === firMetadata.properties.firId) ? true : false
    const alreadyExistsInResolved = resolvedFIRsMetadata.find((fir: FIR) => fir.properties.firId === firMetadata.properties.firId) ? true : false

    try {
      if (data.status === 'Pending') {
        if (alreadyExistsInPending) {
          toast.error('FIR already exists in pending')
          return
        }
        toast.loading('Changing FIR status to pending')
        await mintPendingNft({
          to: address || '',
          metadata: firMetadata,
        })
        handleMailing(data, 'Pending', fir)
        toast.dismiss()
        toast.success('FIR status changed to pending')
      } else {
        if (alreadyExistsInResolved) {
          toast.error('FIR is already resolved')
          return
        }
        toast.loading('Changing FIR status to resolved')
        await mintResolvedNft({
          to: address || '',
          metadata: firMetadata,
        })
        handleMailing(data, 'Resolved', fir)
        toast.dismiss()
        toast.success('FIR status changed to resolved')
      }
    } catch (isError) {
      toast.dismiss()
      toast.error('Error changing FIR status')
    }

  })

  return (
    <form onSubmit={onSubmit}>
      <div className='grid gap-4 py-4 text-sm'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <label htmlFor='remark'>
            Remark
          </label>
          <input
            {...register('remark', { required: true })}
            id='remark'
            className='form-input'
          />
        </div>
        {errors.remark && <p className='text-red-500 -my-3'>Remark is required</p>}
        <div className='grid grid-cols-4 items-center gap-4'>
          <label htmlFor='documents'>
            Documents
          </label>
          <input
            {...register('documents', { required: true })}
            id='documents'
            type='file'
            className='form-input'
          />
          {errors.documents && <p className='text-red-500 -my-3'>Documents are required</p>}
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <label htmlFor=''>Update Status:</label>
          <select
            className='form-input'
            {...register('status', { required: true })}
          >
            {selectedStatus === 'New' && <option value='Pending'>Pending</option>}
            <option value='Resolved'>Resolved</option>
          </select>
          {errors.status && <p className='text-red-500 -my-3'>Status is required</p>}
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <label htmlFor='description'>
            Description
          </label>
          <textarea
            {...register('description', { required: true })}
            rows={3}
            id='description'
            className='form-input'
          ></textarea>
          {errors.description && <p className='text-red-500 -my-3'>Description is required</p>}
        </div>
      </div>
      <DialogFooter>
        <Button type='submit'>Update FIR</Button>
      </DialogFooter>
    </form>
  )
}

export default UpdateFIRForm