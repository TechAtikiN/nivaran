import { useEffect, useState } from "react";
import OfficerCard from "./OfficerCard";
import { NFT, useContract } from "@thirdweb-dev/react";

interface Props {
  policeOfficers: NFT[];
}

const OfficerListing = ({ policeOfficers }: Props) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_POLICE_NFT_CONTRACT_ADDRESS)
  let policeDetails: any = []
  policeOfficers?.map(async (officer) => {
    const data = officer.metadata
    policeDetails.push(data)
  })

  return (
    <>
      <div className="py-3 mt-5 rounded-md text-gray-800 ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-x-28">
          {policeDetails.map((officer: OfficerMetadata) => (
            <OfficerCard image={officer.image} officer={officer} key={officer.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OfficerListing;