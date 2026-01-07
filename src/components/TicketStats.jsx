export default function TicketStats({ total, remaining, quota }) {
    return (
      <div className="stats">
        <div>
          <strong>{quota}</strong>
          <span>Kuota</span>
        </div>
        <div>
          <strong>{total}</strong>
          <span>Terbit</span>
        </div>
        <div>
          <strong>{remaining}</strong>
          <span>Sisa</span>
        </div>
      </div>
    );
  }
  