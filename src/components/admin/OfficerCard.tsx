// named imports
import { Web3Button, useContract, useGrantRole } from "@thirdweb-dev/react";
// default imports
import React from "react";
import Image from "next/image";
import Link from "next/link";
import AddPermission from "./AddPermission";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

interface OfficerProps {
  officer: OfficerMetadata
  image: string
}

const OfficerCard: React.FC<OfficerProps> = ({ officer, image }) => {
  const idCard = officer.properties.idCard[0].toString()

  return (
    <div className="bg-white rounded-lg h-[300px] w-[250px] shadow-md p-5 mx-auto border border-gray-100">
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
        <Link target='_blank' href={idCard} className='text-xs p-1 hover:underline'>View ID Card</Link>
        <div className="flex items-center justify-center gap-2 mt-2 ">

          <Dialog>
            <DialogTrigger className='add-officer-btn'>
              Grant Permission
            </DialogTrigger>

            <AddPermission walletAddress={officer.properties.walletAddress} />
          </Dialog>

          <Link href={`/admin/listing/${officer.properties.id}`}>
            <button className="add-officer-btn">View Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfficerCard;
