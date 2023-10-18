// named imports
import { NFT } from '@thirdweb-dev/react'
// default imports
import OfficerCard from './OfficerCard'

interface Props {
  policeOfficers: NFT[];
}

const OfficerListing = ({ policeOfficers }: Props) => {
  let policeDetails: any = []

  policeOfficers?.map(async (officer) => {
    const data = officer.metadata
    policeDetails.push(data)
  })

  return (
    <>
      <div className='py-3 mt-5 rounded-md text-gray-800 '>
        <div className='grid md:grid-cols-3 grid-cols-1 overflow-x-hidden overflow-y-scroll h-[510px] gap-y-5'>
          {policeDetails.map((officer: OfficerMetadata) => (
            <OfficerCard image={officer.image} officer={officer} key={officer.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OfficerListing;