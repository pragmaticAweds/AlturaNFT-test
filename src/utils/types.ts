export type INFTResponse = Array<NFT> | null;

export interface NFT {
  contract: Contract;
  tokenId: string;
  tokenType: string;
  title: string;
  description: string;
  timeLastUpdated: Date;
  rawMetadata: RawMetadata;
  tokenUri: TokenURI;
  media: Media[];
}

export interface Contract {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  tokenType: string;
  openSea: OpenSea;
  contractDeployer: string;
  deployedBlockNumber: number;
}

export interface OpenSea {
  floorPrice: number;
  collectionName: string;
  safelistRequestStatus: string;
  imageUrl: string;
  description: string;
  externalUrl: string;
  twitterUsername: string;
  discordUrl: string;
  lastIngestedAt: Date;
}

export interface Media {
  gateway: string;
  thumbnail: string;
  raw: string;
  format: string;
  bytes: number;
}

export interface RawMetadata {
  name: string;
  image: string;
  description: string;
  attributes: Record<string, string>;
}

export interface TokenURI {
  gateway: string;
  raw: string;
}
