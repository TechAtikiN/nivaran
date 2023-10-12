import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useContract, useMintNFT } from "@thirdweb-dev/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  name: string
  email: string
  contact: string
  walletAddress: string
  description: string
  location: string
  idCard: FileList
}

const POLICE_THUMBNAIL = 'https://static.vecteezy.com/system/resources/thumbnails/000/242/730/small/police-officer-avatar-illustration.jpg'

export function AddOfficerForm() {
  const { contract: policeCollection } = useContract(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS)
  const { mutateAsync: mintNft, isLoading: isMinting } = useMintNFT(policeCollection)

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  const onSubmit = handleSubmit(async (data) => {
    const policeMetadata = {
      name: data.name,
      description: 'Police Officer',
      image: POLICE_THUMBNAIL,
      properties: {
        ...data,
      }
    }

    console.log('policeMetadata', policeMetadata)

    try {
      console.log('minting nft')
      await mintNft({
        to: data.walletAddress,
        metadata: policeMetadata,
      })
      toast.success('FIR created successfully')
    } catch (error) {
      alert('Error minting nft')
      console.log('error', error)
    }
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='add-officer-btn'>Add Police</button>
      </SheetTrigger>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>Add a police</SheetTitle>
          <SheetDescription>
            Create a new Police officer.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={onSubmit}>
          <div className='grid gap-4 py-4 overflow-x-hidden h-[500px] overflow-y-scroll text-gray-900 font-semibold'>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='name' className='text-xs'>
                Name:
              </label>
              <input
                {...register("name", { required: true })}
                id='name' className='form-input text-sm py-1' />
              {errors.name && <span className='text-red-500 text-xs'>Name is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='email' className='text-xs'>
                Email:
              </label>
              <input {...register("email", { required: true })} id='email' className='form-input text-sm py-1' />
              {errors.email && <span className='text-red-500 text-xs'>Email is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='contact' className='text-xs'>
                Contact:
              </label>
              <input {...register("contact", { required: true })} id='contact' className='form-input text-sm py-1' />
              {errors.contact && <span className='text-red-500 text-xs'>Contact is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='walletAddress' className='text-xs'>
                Wallet Address:
              </label>
              <input {...register("walletAddress", { required: true })} id='username' className='form-input text-sm py-1' />
              {errors.walletAddress && <span className='text-red-500 text-xs'>WalletA ddress is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='description' className='text-xs'>
                Description:
              </label>
              <textarea
                {...register("description", { required: true })}
                style={{ resize: 'none' }}
                rows={4} id='description' className='form-input text-sm py-1'></textarea>
              {errors.description && <span className='text-red-500 text-xs'>Description is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='location' className='text-xs'>
                Location:
              </label>
              <input
                {...register("location", { required: true })}
                style={{ resize: 'none' }}
                id='description' className='form-input text-sm py-1'
              />
              {errors.location && <span className='text-red-500 text-xs'>Location is required</span>}
            </div>
            <div className='flex flex-col space-y-1'>
              <label htmlFor='idCard' className='text-xs'>
                Attach ID Card
              </label>
              <input
                {...register("idCard", { required: true })}
                id='idCard'
                type='file'
                className='form-input text-sm py-1'
              />
              {errors.idCard && <span className='text-red-500 text-xs'>ID Card is required</span>}
            </div>
          </div>
          <button className='add-officer-btn' type='submit'>
            Create Police
          </button>
        </form>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type='submit'>Create Police</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
