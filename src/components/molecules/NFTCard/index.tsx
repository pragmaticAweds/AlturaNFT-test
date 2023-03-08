import { shortText } from "../../../utils/helperFunction";
import { NFT } from "../../../utils/types";

const NFTCard = ({ nft, onClick }: { nft: NFT; onClick: () => void }) => {
  return (
    <div
      className="flex flex-col h-[22rem] bg-white rounded-t-xl shadow-md cursor-pointer hover:shadow-2xl"
      onClick={onClick}
    >
      <div className="h-[80%] w-full rounded-t-xl">
        <img
          src={
            nft.media.length >= 1
              ? nft.media[0].gateway
              : nft.contract.openSea.imageUrl
          }
          alt={nft.title}
          className="h-full w-full object-cover rounded-t-xl"
        />
      </div>
      <div className="h-[20%] flex flex-col justify-between w-full py-2 px-3 border border-t-[#EFEFEF]">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-base">
            {shortText(nft.title) || shortText(nft.contract.name)}
          </h1>
          <span className="text-xs">{nft.contract.symbol}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">
            {nft.contract.openSea.floorPrice
              ? nft.contract.openSea.floorPrice + "ETH"
              : "Total supply: " + nft.contract.totalSupply}
          </span>
          <span className="text-sm">{nft.tokenId}</span>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
