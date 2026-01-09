import { useEffect, useState, useMemo } from "react";
import { readContract } from "./blockchain/contract";
import TicketForm from "./components/TicketForm";
import TicketStats from "./components/TicketStats";
import TicketList from "./components/TicketList";
import ViewOnBlockchain from "./components/ViewOnBlockchain";
import "./styles/app.css";

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    remaining: 0,
    quota: 20,
  });

  const loadData = async () => {
    const list = await readContract.getAllTickets();
    const total = Number(await readContract.totalMinted());
    const remaining = Number(await readContract.remainingTickets());
    const quota = Number(await readContract.ticketQuota());

    // 🔥 MAP + SORT (TERBARU DI ATAS)
    const mappedTickets = list
      .map((t) => ({
        id: Number(t.ticketId),
        nama: t.namaPeserta,
        tanggal: Number(t.tanggalTerbit),
      }))
      .sort((a, b) => b.tanggal - a.tanggal);

    setTickets(mappedTickets);
    setStats({ total, remaining, quota });
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔍 FILTER BERDASARKAN NAMA
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) =>
      t.nama.toLowerCase().includes(search.toLowerCase())
    );
  }, [tickets, search]);

  return (
    <div className="container">
      <h1>🎓 InnoView Academy</h1>
      <p>Basic Programmer – Mengenal Teknologi Web</p>

      <TicketStats {...stats} />

      {/* SEARCH */}
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Cari nama peserta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <TicketForm onSuccess={loadData} />
      <ViewOnBlockchain />

      <TicketList tickets={filteredTickets} />
    </div>
  );
}
