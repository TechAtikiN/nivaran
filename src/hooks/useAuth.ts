import { useContract, useOwnedNFTs } from "@thirdweb-dev/react";

export const useAuth = (contractAddress: string, address: string) => {
    const { contract } = useContract(contractAddress);
    const { data } = useOwnedNFTs(contract, address);

    if (!data) return false;
    if (data.length === 0) return false;
    return true;
};
