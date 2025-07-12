import { useState } from "react";
export default function NotificationBell({ count = 0 }) {
  const [show, setShow] = useState(false);
  // Dummy notifications
  const notifications = [
    { message: "Someone answered your question" },
    { message: "You were mentioned by @lakshya" }
  ];
  return (
    <div className="position-relative ms-3">
      <button
        className="btn btn-link p-0"
        type="button"
        onClick={() => setShow(!show)}
        style={{ fontSize: 22 }}
        title="Notifications"
      >
        🔔
        {count > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {count}
          </span>
        )}
      </button>
      {show && (
        <div className="dropdown-menu dropdown-menu-end show mt-2">
          {notifications.map((n, i) => (
            <span className="dropdown-item-text" key={i}>{n.message}</span>
          ))}
          <span className="dropdown-item-text text-secondary">No more notifications</span>
        </div>
      )}
    </div>
  );
}
