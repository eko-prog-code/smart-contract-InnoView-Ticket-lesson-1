import { ethers } from "ethers";
import abi from "../abi/TicketABI.json";

export const CONTRACT_ADDRESS =
  "0xF837688DC6230a57fc2D6B6a26B044F352652C8A";

export const RPC_URL = "https://sepolia.drpc.org";

// Provider READ ONLY (tanpa wallet)
export const readProvider = new ethers.JsonRpcProvider(RPC_URL);

export const readContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  abi,
  readProvider
);

// Contract WRITE (pakai MetaMask)
export async function getWriteContract() {
  if (!window.ethereum) throw new Error("MetaMask tidak tersedia");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
}
