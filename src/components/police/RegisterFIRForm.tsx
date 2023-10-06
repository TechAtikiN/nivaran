// named imports
import { useContract, useMintNFT } from '@thirdweb-dev/react'
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

type FormValues = {
  name: string
  email: string
  contact: string
  walletAddress: string
  description: string
  remark: string
  documents: FileList
}

const FIR_THUMBNAIL = 'https://e-gmat.com/blogs/wp-content/uploads/2021/04/f1-visa-documents.jpg'

const RegisterFIRForm = () => {
  const { contract: newFIRCollection } = useContract(process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS)
  const { mutateAsync: mintNft, isLoading: isMinting } = useMintNFT(newFIRCollection)

  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = handleSubmit(async (data) => {
    const firMetadata = {
      name: data.name,
      description: 'NEW FIR',
      image: FIR_THUMBNAIL,
      properties: {
        ...data,
      }
    }

    console.log('firMetadata', firMetadata)

    try {
      console.log('minting FIR')
      await mintNft({
        to: data.walletAddress,
        metadata: firMetadata,
      })
      alert('done minting FIR')
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
          <form onSubmit={onSubmit}>
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
              <label htmlFor='walletAddress' className='text-xs'>
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
              <label htmlFor='username' className='text-xs'>
                Remark:
              </label>
              <input {...register("name")} id='username' className='form-input text-sm py-1' />
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
