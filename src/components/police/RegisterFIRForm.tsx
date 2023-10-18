// named imports
import { useAddress, useContract, useMintNFT } from '@thirdweb-dev/react'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid';

interface Props {
  complaint: Complaint
}
type FormValues = {
  name: string
  email: string
  contact: string
  walletAddress: string
  description: string
  remark: string
  location: string
  time: string
  date: string
  documents: FileList
}

const FIR_THUMBNAIL = 'https://e-gmat.com/blogs/wp-content/uploads/2021/04/f1-visa-documents.jpg'

const RegisterFIRForm = ({ complaint }: Props) => {
  const address = useAddress()
  const { contract: newFIRCollection } = useContract(process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS)
  const { mutateAsync: mintNft } = useMintNFT(newFIRCollection)

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  function generateRandomId() {
    return uuidv4(); // Generate a random UUID (Universally Unique Identifier)
  }

  const onSubmit = handleSubmit(async (data) => {
    // generate FIR id
    const firId = generateRandomId();

    // create FIR metadata
    const firMetadata = {
      name: `Filing for ${data.name}`,
      description: 'NEW FIR',
      image: FIR_THUMBNAIL,
      properties: {
        ...data,
        firId: firId,
      }
    }

    // create FIR 
    try {
      toast.loading('Creating FIR')
      await mintNft({
        to: address || '',
        metadata: firMetadata,
      })
      toast.dismiss()
      toast.success('FIR created successfully')
    } catch (error) {
      alert('Error minting FIR')
      console.log('error', error)
    }

    // mail FIR to victim and admin
    try {
      const res = await fetch('/api/mailing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          firId: firId,
          status: 'New'
        })
      })
      if (res.status === 200) {
        toast.success('Mailed FIR to the victim successfully')
      }
    } catch (err) {
      alert('Something went wrong, please try again later')
    }
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='officer-btn text-sm'>Create FIR</button>
      </SheetTrigger>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>Add an FIR</SheetTitle>
          <SheetDescription>
            Create a new FIR for a case.
          </SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4 overflow-x-hidden h-[500px] overflow-y-scroll text-gray-900 font-semibold'>
          <form onSubmit={onSubmit} className='space-y-3'>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='name' className='text-xs'>
                Victim Name:
              </label>
              <input
                defaultValue={complaint?.name}
                {...register('name', { required: true })}
                id='name'
                className='form-input text-sm py-1'
              />
              {errors.name && <span className='text-red-500 text-xs'>Name is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='email' className='text-xs'>
                Victim Email:
              </label>
              <input
                defaultValue={complaint?.email}
                {...register('email', { required: true })}
                id='email'
                className='form-input text-sm py-1'
              />
              {errors.email && <span className='text-red-500 text-xs'>Email is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='contact' className='text-xs'>
                Victim Contact:
              </label>
              <input
                defaultValue={complaint?.contact}
                {...register('contact', { required: true })}
                id='contact'
                className='form-input text-sm py-1'
              />
              {errors.contact && <span className='text-red-500 text-xs'>Contact is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='location' className='text-xs'>
                Location:
              </label>
              <input
                defaultValue={complaint?.address}
                {...register('location', { required: true })}
                id='location'
                className='form-input text-sm py-1'
              />
              {errors.location && <span className='text-red-500 text-xs'>Location is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='date' className='text-xs'>
                Date:
              </label>
              <input
                {...register('date', { required: true })}
                id='date'
                type='date'
                className='form-input text-sm py-1'
              />
              {errors.date && <span className='text-red-500 text-xs'>Date is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='time' className='text-xs'>
                Time:
              </label>
              <input {...register('time', { required: true })} id='time' className='form-input text-sm py-1' />
              {errors.time && <span className='text-red-500 text-xs'>Time is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='time' className='text-xs'>
                Wallet Address:
              </label>
              <input
                defaultValue={complaint?.walletAddress}
                {...register('walletAddress', { required: true })}
                id='walletAddress'
                className='form-input text-sm py-1'
              />
              {errors.walletAddress && <span className='text-red-500 text-xs'>Wallet Address is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='description' className='text-xs'>
                Description:
              </label>
              <textarea
                defaultValue={complaint?.description}
                {...register('description', { required: true })}
                style={{ resize: 'none' }}
                rows={4} id='description' className='form-input text-sm py-1'></textarea>
              {errors.description && <span className='text-red-500 text-xs'>Description is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='remark' className='text-xs'>
                Remark:
              </label>
              <input {...register('remark', { required: true })} id='remark' className='form-input text-sm py-1' />
              {errors.remark && <span className='text-red-500 text-xs'>Remark is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='documents' className='text-xs'>
                Attach Documents
              </label>
              <input
                {...register('documents', { required: true })}
                id='documents'
                type='file'
                className='form-input  text-sm py-1'
              />
              {errors.documents && <span className='text-red-500 text-xs'>Documents are required</span>}
            </div>
            <SheetFooter>
              {/* <SheetClose asChild> */}
              <Button type='submit'>Create FIR</Button>
              {/* </SheetClose> */}
            </SheetFooter>
          </form>
        </div>

      </SheetContent>
    </Sheet>

  )
}

export default RegisterFIRForm
