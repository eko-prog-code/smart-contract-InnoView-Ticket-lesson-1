export default function TicketList({ tickets }) {
  if (!tickets.length) {
    return <p>Belum ada peserta</p>;
  }

  return (
    <div className="card">
      <h3>📋 Daftar Peserta</h3>
      <ul className="ticket-list">
        {tickets.map((t) => (
          <li key={t.id} className="ticket-item">
            <strong>#{t.id}</strong> — {t.nama}
            <br />
            <small>
              🕒 {new Date(t.tanggal * 1000).toLocaleString("id-ID")}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
