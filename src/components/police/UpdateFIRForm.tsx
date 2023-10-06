import { useAddress, useContract, useMintNFT } from "@thirdweb-dev/react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { DialogFooter } from "../ui/dialog"
import { Button } from "../ui/button"

interface Props {
  fir: FIR
}

type FormValues = {
  description: string
  remark: string
  documents: FileList
  status: string
}

const FIR_THUMBNAIL = 'https://e-gmat.com/blogs/wp-content/uploads/2021/04/f1-visa-documents.jpg'

const UpdateFIRForm = ({ fir }: Props) => {
  const address = useAddress()
  const { contract: pendingFIRCollection } = useContract(process.env.NEXT_PUBLIC_FIR_PENDING_CONTRACT_ADDRESS)
  const { contract: resolvedFIRCollection } = useContract(process.env.NEXT_PUBLIC_FIR_RESOLVED_CONTRACT_ADDRESS)

  const { mutateAsync: mintPendingNft, isLoading: isMintingPendingNFT, isError } = useMintNFT(pendingFIRCollection)
  const { mutateAsync: mintResolvedNft, isLoading: isMintingResolvedNFT } = useMintNFT(resolvedFIRCollection)

  const { register, handleSubmit } = useForm<FormValues>()


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

    try {
      if (data.status === 'Pending') {
        toast.loading('Changing FIR status to pending')
        await mintPendingNft({
          to: address || '',
          metadata: firMetadata,
        })
        toast.dismiss()
        toast.success('FIR status changed to pending')
      } else {
        toast.loading('Changing FIR status to resolved')
        await mintResolvedNft({
          to: address || '',
          metadata: firMetadata,
        })
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
            {...register('remark')}
            id='remark'
            className='form-input'
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <label htmlFor='documents'>
            Documents
          </label>
          <input
            {...register('documents')}
            id='documents'
            type='file'
            className='form-input'
          />
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <label htmlFor="">Update Status:</label>
          <select
            className='form-input'
            {...register('status')}
          >
            <option value='Pending'>Pending</option>
            <option value='Resolved'>Resolved</option>
          </select>
        </div>
        <div className='grid grid-cols-4 items-center gap-4'>
          <label htmlFor='description'>
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            id='description'
            className='form-input'
          ></textarea>
        </div>
      </div>
      <DialogFooter>
        <Button type='submit'>Update FIR</Button>
      </DialogFooter>
    </form>
  )
}

export default UpdateFIRForm