// named imports
import { useAddress, useContract, useMintNFT } from '@thirdweb-dev/react'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetClose,
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

const RegisterFIRForm = () => {
  const address = useAddress()
  const { contract: newFIRCollection } = useContract(process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS)
  const { mutateAsync: mintNft, isLoading: isMinting } = useMintNFT(newFIRCollection)

  const { register, handleSubmit } = useForm<FormValues>()

  function generateRandomId() {
    return uuidv4(); // Generate a random UUID (Universally Unique Identifier)
  }

  const onSubmit = handleSubmit(async (data) => {

    // generate FIR id
    const firId = generateRandomId();

    const firMetadata = {
      name: `Filing for ${data.name}`,
      description: 'NEW FIR',
      image: FIR_THUMBNAIL,
      properties: {
        ...data,
        firId: firId
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
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='bg-sky-300 px-5 py-1 text-gray-700 font-semibold rounded-md'>Create FIR</button>
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
              <input {...register("name")} id='name' className='form-input text-sm py-1' />
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='email' className='text-xs'>
                Victim Email:
              </label>
              <input {...register("email")} id='email' className='form-input text-sm py-1' />
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='contact' className='text-xs'>
                Victim Contact:
              </label>
              <input {...register("contact")} id='contact' className='form-input text-sm py-1' />
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='location' className='text-xs'>
                Location:
              </label>
              <input {...register("location")} id='location' className='form-input text-sm py-1' />
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='date' className='text-xs'>
                Date:
              </label>
              <input {...register("date")} id='date' type='date' className='form-input text-sm py-1' />
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='time' className='text-xs'>
                Time:
              </label>
              <input {...register("time")} id='time' className='form-input text-sm py-1' />
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='time' className='text-xs'>
                Wallet Address:
              </label>
              <input {...register("walletAddress")} id='walletAddress' className='form-input text-sm py-1' />
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='description' className='text-xs'>
                Description:
              </label>
              <textarea
                {...register("description")}
                style={{ resize: 'none' }}
                rows={4} id='description' className='form-input text-sm py-1'></textarea>
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='remark' className='text-xs'>
                Remark:
              </label>
              <input {...register("remark")} id='remark' className='form-input text-sm py-1' />
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='documents' className='text-xs'>
                Attach Documents
              </label>
              <input
                {...register("documents")}
                id='documents'
                type='file'
                className='form-input  text-sm py-1'
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type='submit'>Create FIR</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </div>

      </SheetContent>
    </Sheet>

  )
}

export default RegisterFIRForm
