import { useState } from "react";
import { getWriteContract } from "../blockchain/contract";

export default function TicketForm({ onSuccess }) {
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(false);

  const mint = async () => {
    if (!nama) return alert("Nama wajib diisi");

    try {
      setLoading(true);
      const contract = await getWriteContract();
      const tx = await contract.mintTicket(nama);
      await tx.wait();
      setNama("");
      onSuccess();
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>🎟️ Daftar Webinar</h3>
      <input
        placeholder="Nama Peserta"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />
      <button onClick={mint} disabled={loading}>
        {loading ? "Processing..." : "Mint Ticket"}
      </button>
    </div>
  );
}
