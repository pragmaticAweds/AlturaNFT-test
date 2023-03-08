import { ChangeEvent, useCallback, useState } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import clsx from "clsx";

import {
  handleError,
  isValidContractAddress,
  shortText,
} from "./utils/helperFunction";
import { INFTResponse, NFT } from "./utils/types";
import Button from "./components/atoms/Button";
import Input from "./components/atoms/Input";
import Navbar from "./components/organisms/Navbar";
import NFTCard from "./components/molecules/NFTCard";
import { ALCHEMY_ACCESS_KEY } from "./utils/config";
import NFTSkeletonLoader from "./components/molecules/NFTSkeletonLoader";
import Modal from "./components/organisms/Modal";

const App = () => {
  const settings = {
    apiKey: ALCHEMY_ACCESS_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(settings);
  const [nfts, setNfts] = useState<INFTResponse>(null);
  const [nft, setNft] = useState<NFT | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState<string | null>("");
  const [isFetching, setIsFetching] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInputField = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWalletAddress(value);
  }, []);

  const handleClearInput = useCallback(() => {
    setWalletAddress("");
  }, []);

  const handleSubmit = useCallback(async () => {
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
  }, [walletAddress]);

  const handleDisplayNFT = useCallback(
    (nft: NFT) => {
      setNft(nft);
      setShowModal((prev) => !prev);
    },
    [showModal]
  );

  return (
    <div className="main-container">
      <Navbar />
      <div className="sub-main-container">
        <div className="search-container">
          <Input
            walletAddress={walletAddress}
            handleClearInput={handleClearInput}
            handleInputField={handleInputField}
          />
          <div
            className={clsx("w-[25%] flex", isFetching ? "" : "justify-center")}
          >
            <Button
              title="Fetch Nft"
              handleSubmit={handleSubmit}
              isLoading={isFetching}
            />
          </div>
        </div>
        {error ? (
          <p className="text-center text-red-700 w-full">{error}</p>
        ) : //@ts-ignore
        nfts !== null && nfts.length === 0 ? (
          <p className="text-center">There is no NFTs in this collection</p>
        ) : null}
        <div
          className={clsx(
            "card-display",
            isFetching
              ? "general-disp"
              : nfts !== null && nfts.length > 2
              ? "general-disp"
              : ""
          )}
        >
          {isFetching
            ? Array(16)
                .fill("")
                .map((_, i) => (
                  <NFTSkeletonLoader key={"#NftSkeletonLoader" + i + 1} />
                ))
            : nfts !== null
            ? nfts.map((nft) => (
                <NFTCard
                  nft={nft}
                  key={"#nft-item" + nft.title + nft.tokenId}
                  onClick={() => handleDisplayNFT(nft)}
                />
              ))
            : null}
        </div>
      </div>
      <Modal
        handleCloseModal={setShowModal}
        closeModal={showModal}
        modalTitle={
          nft !== null
            ? shortText(nft.title) || shortText(nft.contract.name)
            : ""
        }
      >
        {nft !== null ? (
          <div className="single-nft-container">
            <div className="flex gap-x-4">
              <div className="flex flex-col gap-y-2">
                <div className="w-full h-[20rem]">
                  <img
                    src={
                      nft.media[0] !== undefined
                        ? nft.media[0].gateway
                        : nft.contract.openSea.imageUrl
                    }
                    alt={nft.title || "nft-image"}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold">Owned by:</span>
                  <span className="text-sm">{nft.contract.address}</span>
                </div>
              </div>
              <div className=" flex flex-col gap-y-4 pr-2">
                <h1 className="text-sm text-[#3D00B7]">
                  {shortText(nft.contract.openSea.collectionName) ||
                    shortText(nft.contract.name)}
                </h1>
                <h1 className="text-2xl font-semibold">
                  {shortText(nft.rawMetadata.name)}
                </h1>
                <div className="flex gap-x-2">
                  <div className="flex flex-col px-2 py-2 border border-[#3D00B7] rounded-md max-w-max">
                    <span className="text-xs text-[#3D00B7]">Token Type</span>
                    <span className="text-sm font-semibold">
                      {nft.tokenType}
                    </span>
                  </div>

                  <div className="flex flex-col px-2 py-2 border border-[#3D00B7] rounded-md max-w-max">
                    <span className="text-xs text-[#3D00B7]">Total Supply</span>
                    <span className="text-sm font-semibold">
                      {nft.contract.totalSupply}
                    </span>
                  </div>
                </div>
                <a
                  href={`https://opensea.io/assets/ethereum/${walletAddress}/${nft.tokenId}`}
                >
                  <Button title="Purchase NFT" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Attributes:</h3>
              <div className="flex flex-wrap gap-y-3 gap-x-2 w-full pr-2">
                {nft.rawMetadata.attributes.length > 0
                  ? nft.rawMetadata.attributes.map((attr, i) => (
                      <div
                        className="flex flex-col items-center p-2 bg-[#263aed13] rounded-md"
                        key={"NFT-Attribute" + i}
                      >
                        <span className="text-xs text-[#3D00B7]">
                          {attr.trait_type}
                        </span>
                        <span className="text-xs font-medium">
                          {attr.value}
                        </span>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            {/*NFT Info*/}
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default App;
