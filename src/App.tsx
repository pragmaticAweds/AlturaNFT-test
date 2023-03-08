import { ChangeEvent, useCallback, useState } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import clsx from "clsx";

import { handleError, isValidContractAddress } from "./utils/helperFunction";
import { INFTResponse } from "./utils/types";
import Button from "./components/atoms/Button";
import Input from "./components/atoms/Input";
import Navbar from "./components/organisms/Navbar";
import NFTCard from "./components/molecules/NFTCard";
import { ALCHEMY_ACCESS_KEY } from "./utils/config";

const App = () => {
  const settings = {
    apiKey: ALCHEMY_ACCESS_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);
  const [nfts, setNfts] = useState<INFTResponse>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState<string | null>("");
  const [isFetching, setIsFetching] = useState(false);

  const handleInputField = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWalletAddress(value);
  };

  const handleClearInput = () => {
    setWalletAddress("");
  };

  const handleSubmit = async () => {
    setIsFetching((prev) => !prev);
    const trimAdress = walletAddress.trim();

    if (!walletAddress) {
      handleError("You wallet address is misssing", setError);
      setNfts(null);
      setIsFetching((prev) => !prev);
      return;
    }

    const verifyAddress = isValidContractAddress(trimAdress);
    if (!verifyAddress) {
      handleError("You wallet address is invalid", setError);
      setWalletAddress("");
      setIsFetching((prev) => !prev);
      return;
    }

    try {
      const response = await alchemy.nft.getNftsForContract(trimAdress);
      setIsFetching((prev) => !prev);
      setNfts(response.nfts as []);
    } catch (error) {
      setIsFetching((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex-1 overflow-auto flex flex-col bg-[#F7F9FB] pt-8 gap-y-8">
        <div className="overflow-hidden flex items-center w-full mx-auto max-w-[60%] gap-x-4 ">
          <Input
            walletAddress={walletAddress}
            handleClearInput={handleClearInput}
            handleInputField={handleInputField}
          />
          <div
            className={clsx("w-[25%] flex", isFetching ? "" : "justify-center")}
          >
            {isFetching ? (
              <span className="btn-loader btn-loader-primary"></span>
            ) : (
              <Button title="Fetch Nft" handleSubmit={handleSubmit} />
            )}
          </div>
        </div>
        {error ? (
          <p className="text-center text-red-700 w-full">{error}</p>
        ) : //@ts-ignore
        nfts !== null && nfts.length === 0 ? (
          <p className="text-center">There is no NFTs in this collection</p>
        ) : null}
        <div className="flex-1 overflow-auto grid grid-cols-4 gap-8 justify-between px-8">
          {nfts !== null
            ? nfts.map((nft) => (
                <NFTCard
                  nft={nft}
                  key={"#nft-item" + nft.title + nft.tokenId}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default App;
