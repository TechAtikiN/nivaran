import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Web3Button, useContract, useGrantRole } from "@thirdweb-dev/react";

interface OfficerProps {
  officer: OfficerMetadata
  image: string
}

const OfficerCard: React.FC<OfficerProps> = ({ officer, image }) => {
  const idCard = officer.properties.idCard[0].toString()

  const { contract: createdFIRCollection } = useContract(process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS)

  const { mutateAsync: grantRole, error } = useGrantRole(createdFIRCollection);

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mx-auto w-full border border-gray-100">
      <Image
        width={100}
        height={100}
        src={image}
        className="rounded-full w-32 h-32 mx-auto hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
        alt={`${officer.properties.name}'s profile`}
      />
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">{officer.properties.name}</p>
        <p className="text-gray-500 text-xs">{officer.properties.email}</p>
        <p className="text-gray-500 text-xs">{officer.properties.contact}</p>
        <Link target='_blank' href={idCard} className='font-semibold px-2 border border-gray-700 rounded-full hover:underline'>View ID Card</Link>
        <div className="flex gap-2 mt-2 justify-center">

          <Web3Button
            className="permission-btn"
            contractAddress={process.env.NEXT_PUBLIC_FIR_CREATED_CONTRACT_ADDRESS as string}
            action={() => {
              try {
                grantRole({
                  role: "minter",
                  address: officer.properties.walletAddress || "",
                })
                alert('Role granted')
              } catch (error) {
                console.log('error', error)
              }
            }}
          >
            Grant Role
          </Web3Button>

          <Link href={`/admin/listing/${officer.properties.id}`}>
            <button className="officer-btn">View Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfficerCard;
