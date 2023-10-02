import { useEffect } from "react"
import { useAddress, useContract, useMintNFT } from "@thirdweb-dev/react"
import { SubmitHandler, useForm } from "react-hook-form"

type FormValues = {
  name: string
  idCard: FileList
}

const AddPoliceForm = () => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS)
  const { mutateAsync: mintNft, isLoading: isMinting } = useMintNFT(contract)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()
  const address = useAddress()

  const handleMintNFT: SubmitHandler<FormValues> = async (data) => {
    const policeMetadata = {
      name: data.name,
      description: 'Police Officer',
      image: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg',
      properties: {
        ...data,
        policeId: address
      }
    }

    try {
      console.log('minting nft')
      await mintNft({
        to: '0x444e9B38161ed7AA43f22Ab81b21A5984F016F7e',
        metadata: policeMetadata,
      })
    } catch (error) {
      console.log('error', error)
    }
    console.log('done minting nft')
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleMintNFT)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="border border-black"
            type="text"
            id="name"
            {...register('name', { required: true })}
          />
        </div>

        <div>
          <label htmlFor='reports'>
            Attach a Report
          </label>
          <input
            multiple
            type='file'
            accept='.pdf'
            id='reports'
            placeholder='id card'
            {...register('idCard')}
            className=''
          />
        </div>
        <button
          type='submit'
          className='bg-indigo-500 hover:bg-indigo-600 animate text-white font-semibold py-2 px-4 rounded'
        >
          Create Police
        </button>

      </form>
    </div>
  )
}

export default AddPoliceForm
