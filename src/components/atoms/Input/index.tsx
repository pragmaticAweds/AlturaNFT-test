import clsx from "clsx";
import { ChangeEvent } from "react";
import CloseIcon from "../vectors/CloseIcon";
import SearchIcon from "../vectors/Search-Icon";

const Input = ({
  walletAddress,
  handleInputField,
  handleClearInput,
}: {
  walletAddress: string;
  handleInputField: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClearInput: () => void;
}) => {
  return (
    <div
      className={clsx(
        "input-wrapper",
        walletAddress !== "" ? "border-[#3D00B7]" : "border-[#EFEFEF]"
      )}
    >
      <input
        type="text"
        placeholder="Enter collection address to display NFTs."
        onChange={handleInputField}
        value={walletAddress}
      />
      {walletAddress !== "" ? (
        <CloseIcon
          className="hover:cursor-pointer"
          onClick={handleClearInput}
        />
      ) : (
        <SearchIcon />
      )}
    </div>
  );
};

export default Input;
