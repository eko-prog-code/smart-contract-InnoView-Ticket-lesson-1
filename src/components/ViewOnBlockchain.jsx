import { FaHandPointer } from "react-icons/fa";

const CONTRACT_URL =
  "https://eth-sepolia.blockscout.com/address/0xF837688DC6230a57fc2D6B6a26B044F352652C8A?tab=contract_code";

export default function ViewOnBlockchain() {
  return (
    <a
      href={CONTRACT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="blockchain-link"
    >
      <FaHandPointer size={18} />
      <span>View on Blockchain</span>
    </a>
  );
}
