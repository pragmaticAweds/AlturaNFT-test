import { shortText } from "../../../utils/helperFunction";
import { NFT } from "../../../utils/types";

const NFTCard = ({ nft }: { nft: NFT }) => {
  return (
    <div className="flex flex-col h-[22rem] bg-white rounded-t-xl shadow-md w-full">
      <div className="h-[80%] w-full rounded-t-xl">
        <img
          src={nft.media[0].gateway}
          alt={nft.title}
          className="h-full w-full object-cover rounded-t-xl"
        />
      </div>
      <div className="h-[20%] flex flex-col justify-between w-full py-2 px-3 border border-t-[#EFEFEF]">
        <div className="flex justify-between">
          <h1 className="font-semibold">{shortText(nft.title)}</h1>
          <span>{nft.contract.symbol}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">{nft.contract.openSea.floorPrice} ETH</span>
          <span className="text-sm">{nft.tokenId}</span>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
