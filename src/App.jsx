import { useEffect, useState } from "react";
import { readContract } from "./blockchain/contract";
import TicketForm from "./components/TicketForm";
import TicketStats from "./components/TicketStats";
import TicketList from "./components/TicketList";
import ViewOnBlockchain from "./components/ViewOnBlockchain";
import "./styles/app.css";

export default function App() {
  const [tickets, setTickets] = useState([]);
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

    setTickets(
      list.map((t) => ({
        id: Number(t.ticketId),
        nama: t.namaPeserta,
        tanggal: Number(t.tanggalTerbit),
      }))
    );

    setStats({ total, remaining, quota });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h1>🎓 InnoView Academy</h1>
      <p>Basic Programmer – Mengenal Teknologi Web</p>

      <TicketStats {...stats} />
      <TicketForm onSuccess={loadData} />
      <ViewOnBlockchain />
      <TicketList tickets={tickets} />
    </div>
  );
}
