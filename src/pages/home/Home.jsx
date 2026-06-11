import { useState } from "react";

const SIDEBAR_NAV = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "opportunities", label: "Opportunities", icon: "◈" },
  { id: "pipeline", label: "Pipeline", icon: "⊞" },
  { id: "interviews", label: "Interviews", icon: "◷" },
  { id: "followups", label: "Follow-Ups", icon: "↻" },
  { id: "offers", label: "Offers", icon: "✦" },
  { id: "analytics", label: "Analytics", icon: "◎" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

const ACTIONS = [
  {
    id: 1,
    urgency: "overdue",
    company: "Stripe",
    role: "Senior Product Designer",
    action: "Follow-up overdue",
    detail: "No response in 8 days",
    cta: "Send follow-up",
    avatar: "S",
    avatarColor: "#6772e5",
  },
  {
    id: 2,
    urgency: "today",
    company: "Linear",
    role: "Staff Engineer",
    action: "Technical interview today",
    detail: "3:00 PM — 90 min with Karri Saarinen",
    cta: "View prep",
    avatar: "L",
    avatarColor: "#5e6ad2",
  },
  {
    id: 3,
    urgency: "today",
    company: "Vercel",
    role: "Frontend Engineer",
    action: "Assignment due today",
    detail: "System design task — deadline 11:59 PM",
    cta: "Open task",
    avatar: "V",
    avatarColor: "#000000",
  },
  {
    id: 4,
    urgency: "upcoming",
    company: "Notion",
    role: "Product Manager",
    action: "Offer expires in 3 days",
    detail: "₹42L package — respond by Friday",
    cta: "Review offer",
    avatar: "N",
    avatarColor: "#000000",
  },
  {
    id: 5,
    urgency: "upcoming",
    company: "Figma",
    role: "Design Engineer",
    action: "Recruiter replied",
    detail: "Sarah Chen sent calendar invite",
    cta: "Respond",
    avatar: "F",
    avatarColor: "#f24e1e",
  },
];

const INTERVIEWS = [
  {
    id: 1,
    company: "Linear",
    role: "Staff Engineer",
    date: "Today",
    time: "3:00 PM",
    type: "Technical",
    priority: "high",
    avatar: "L",
    avatarColor: "#5e6ad2",
  },
  {
    id: 2,
    company: "Stripe",
    role: "Senior Product Designer",
    date: "Tomorrow",
    time: "11:00 AM",
    type: "HR Round",
    priority: "medium",
    avatar: "S",
    avatarColor: "#6772e5",
  },
  {
    id: 3,
    company: "Anthropic",
    role: "Product Designer",
    date: "Fri, Jun 6",
    time: "2:30 PM",
    type: "Assignment",
    priority: "medium",
    avatar: "A",
    avatarColor: "#cc785c",
  },
];

const FOLLOWUPS = [
  {
    id: 1,
    company: "Google",
    role: "UX Lead",
    daysAgo: 12,
    urgency: "overdue",
    contact: "Jamie T.",
  },
  {
    id: 2,
    company: "Airbnb",
    role: "Product Designer",
    daysAgo: 9,
    urgency: "overdue",
    contact: "Priya M.",
  },
  {
    id: 3,
    company: "Figma",
    role: "Design Engineer",
    daysAgo: 0,
    urgency: "today",
    contact: "Sarah C.",
  },
  {
    id: 4,
    company: "Shopify",
    role: "Staff Designer",
    daysAgo: 0,
    urgency: "today",
    contact: "Alex R.",
  },
  {
    id: 5,
    company: "Loom",
    role: "Frontend Eng",
    daysAgo: -2,
    urgency: "upcoming",
    contact: "Derek L.",
  },
];

const OPPORTUNITIES = [
  {
    id: 1,
    company: "Linear",
    role: "Staff Engineer",
    stage: "Technical Round",
    stageIndex: 4,
    avatar: "L",
    avatarColor: "#5e6ad2",
    lastActivity: "2h ago",
    priority: "high",
  },
  {
    id: 2,
    company: "Stripe",
    role: "Sr. Product Designer",
    stage: "HR Round",
    stageIndex: 5,
    avatar: "S",
    avatarColor: "#6772e5",
    lastActivity: "1d ago",
    priority: "high",
  },
  {
    id: 3,
    company: "Notion",
    role: "Product Manager",
    stage: "Offer Received",
    stageIndex: 6,
    avatar: "N",
    avatarColor: "#2eaadc",
    lastActivity: "3d ago",
    priority: "high",
  },
  {
    id: 4,
    company: "Vercel",
    role: "Frontend Engineer",
    stage: "Assignment",
    stageIndex: 3,
    avatar: "V",
    avatarColor: "#888",
    lastActivity: "5h ago",
    priority: "medium",
  },
  {
    id: 5,
    company: "Figma",
    role: "Design Engineer",
    stage: "Interview",
    stageIndex: 2,
    avatar: "F",
    avatarColor: "#f24e1e",
    lastActivity: "1d ago",
    priority: "medium",
  },
];

const ACTIVITY = [
  {
    id: 1,
    icon: "◷",
    text: "Interview scheduled with Linear",
    sub: "Technical Round — Today 3PM",
    time: "2h ago",
    type: "interview",
  },
  {
    id: 2,
    icon: "✦",
    text: "Offer received from Notion",
    sub: "₹42L — Expires in 3 days",
    time: "3d ago",
    type: "offer",
  },
  {
    id: 3,
    icon: "↑",
    text: "Status updated — Stripe",
    sub: "Applied → HR Round",
    time: "4d ago",
    type: "status",
  },
  {
    id: 4,
    icon: "↻",
    text: "Follow-up sent to Anthropic",
    sub: "via email",
    time: "5d ago",
    type: "followup",
  },
  {
    id: 5,
    icon: "◈",
    text: "Added Shopify opportunity",
    sub: "Staff Designer — Not Applied",
    time: "6d ago",
    type: "added",
  },
];

const STAGE_COLORS = {
  "Not Applied": "#888",
  Applied: "#5e6ad2",
  Interview: "#0ea5e9",
  Assignment: "#f59e0b",
  "Technical Round": "#8b5cf6",
  "HR Round": "#ec4899",
  "Offer Received": "#10b981",
  Selected: "#10b981",
  Rejected: "#ef4444",
};

const URGENCY = {
  overdue: {
    bar: "#ef4444",
    badge: "#3b0000",
    badgeText: "#ef4444",
    label: "Overdue",
  },
  today: {
    bar: "#f59e0b",
    badge: "#2d1f00",
    badgeText: "#f59e0b",
    label: "Today",
  },
  upcoming: {
    bar: "#5e6ad2",
    badge: "#0d1130",
    badgeText: "#818cf8",
    label: "Upcoming",
  },
};

function Avatar({ char, color, size = 32 }) {
  const bg = color + "22";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        border: `1px solid ${color}44`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.38,
        fontWeight: 500,
        color: color,
        flexShrink: 0,
      }}
    >
      {char}
    </div>
  );
}

function UrgencyBar({ urgency }) {
  return (
    <div
      style={{
        width: 3,
        alignSelf: "stretch",
        borderRadius: 99,
        background: URGENCY[urgency].bar,
        flexShrink: 0,
      }}
    />
  );
}

function Badge({ urgency }) {
  const u = URGENCY[urgency];
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: 99,
        background: u.badge,
        color: u.badgeText,
        letterSpacing: "0.03em",
      }}
    >
      {u.label}
    </span>
  );
}

function StagePill({ stage }) {
  const color = STAGE_COLORS[stage] || "#888";
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 500,
        padding: "2px 9px",
        borderRadius: 99,
        background: color + "18",
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      {stage}
    </span>
  );
}

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "#161616",
        border: "0.5px solid #2a2a2a",
        borderRadius: 12,
        padding: "16px 20px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 500,
        color: "#555",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

function ActionRow({ item, onDismiss }) {
  const u = URGENCY[item.urgency];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        borderRadius: 10,
        background: "#111",
        border: "0.5px solid #222",
        marginBottom: 6,
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#181818")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
    >
      <UrgencyBar urgency={item.urgency} />
      <Avatar char={item.avatar} color={item.avatarColor} size={34} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 3,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 500, color: "#f0f0f0" }}>
            {item.company}
          </span>
          <span style={{ fontSize: 12, color: "#555" }}>·</span>
          <span style={{ fontSize: 12, color: "#666" }}>{item.role}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Badge urgency={item.urgency} />
          <span style={{ fontSize: 12, color: "#888" }}>{item.action}</span>
          <span style={{ fontSize: 12, color: "#444" }}>—</span>
          <span style={{ fontSize: 12, color: "#555" }}>{item.detail}</span>
        </div>
      </div>
      <button
        onClick={() => onDismiss(item.id)}
        style={{
          fontSize: 12,
          fontWeight: 500,
          padding: "6px 14px",
          borderRadius: 7,
          border: "0.5px solid #333",
          background: "transparent",
          color: "#aaa",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#222";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#aaa";
        }}
      >
        {item.cta} →
      </button>
    </div>
  );
}

function InterviewRow({ item }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 0",
        borderBottom: "0.5px solid #1e1e1e",
      }}
    >
      <Avatar char={item.avatar} color={item.avatarColor} size={30} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#e8e8e8" }}>
          {item.company}
        </div>
        <div style={{ fontSize: 11, color: "#555" }}>{item.role}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontSize: 12,
            color: item.date === "Today" ? "#f59e0b" : "#aaa",
            fontWeight: item.date === "Today" ? 500 : 400,
          }}
        >
          {item.date} {item.time}
        </div>
        <div style={{ fontSize: 11, color: "#555" }}>{item.type}</div>
      </div>
    </div>
  );
}

function FollowUpRow({ item }) {
  const u = URGENCY[item.urgency];
  const label =
    item.urgency === "overdue"
      ? `${item.daysAgo}d overdue`
      : item.urgency === "today"
        ? "Due today"
        : `In ${Math.abs(item.daysAgo)}d`;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 0",
        borderBottom: "0.5px solid #1e1e1e",
      }}
    >
      <div
        style={{
          width: 2,
          height: 32,
          borderRadius: 99,
          background: u.bar,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#e8e8e8" }}>
          {item.company}
        </div>
        <div style={{ fontSize: 11, color: "#555" }}>
          {item.contact} · {item.role}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, color: u.badgeText }}>{label}</span>
        <button
          style={{
            fontSize: 11,
            padding: "4px 10px",
            borderRadius: 6,
            border: "0.5px solid #2a2a2a",
            background: "transparent",
            color: "#666",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

function OpportunityCard({ item }) {
  const stageMax = 7;
  const progress = Math.round((item.stageIndex / stageMax) * 100);
  const color = STAGE_COLORS[item.stage] || "#888";
  return (
    <div
      style={{
        background: "#111",
        border: "0.5px solid #222",
        borderRadius: 10,
        padding: "14px 16px",
        minWidth: 200,
        flex: "0 0 220px",
        cursor: "pointer",
        transition: "border-color 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3a3a3a")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#222")}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <Avatar char={item.avatar} color={item.avatarColor} size={28} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#e8e8e8" }}>
            {item.company}
          </div>
          <div style={{ fontSize: 11, color: "#555" }}>{item.role}</div>
        </div>
      </div>
      <StagePill stage={item.stage} />
      <div
        style={{
          marginTop: 12,
          height: 3,
          background: "#222",
          borderRadius: 99,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: color,
            borderRadius: 99,
            transition: "width 0.3s",
          }}
        />
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: "#444" }}>
        Last activity {item.lastActivity}
      </div>
    </div>
  );
}

function ActivityRow({ item }) {
  const typeColor = {
    interview: "#5e6ad2",
    offer: "#10b981",
    status: "#f59e0b",
    followup: "#888",
    added: "#888",
  };
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        paddingBottom: 14,
        borderLeft: "0.5px solid #222",
        marginLeft: 6,
        paddingLeft: 16,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -5,
          top: 3,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: typeColor[item.type] || "#333",
          border: "2px solid #0e0e0e",
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: "#d0d0d0" }}>{item.text}</div>
        <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>
          {item.sub}
        </div>
      </div>
      <span style={{ fontSize: 11, color: "#444", whiteSpace: "nowrap" }}>
        {item.time}
      </span>
    </div>
  );
}

function HealthStat({ label, value, sub, color = "#e8e8e8" }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        background: "#111",
        borderRadius: 10,
        border: "0.5px solid #1e1e1e",
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "#555",
          marginBottom: 6,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 500, color, lineHeight: 1 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>{sub}</div>
      )}
    </div>
  );
}

export default function CareerOSHome() {
  const [activeNav, setActiveNav] = useState("home");
  const [actions, setActions] = useState(ACTIONS);
  const [dismissed, setDismissed] = useState([]);

  const dismiss = (id) => {
    setDismissed((d) => [...d, id]);
    setActions((a) => a.filter((x) => x.id !== id));
  };

  const overdueCount = actions.filter((a) => a.urgency === "overdue").length;
  const todayCount = actions.filter((a) => a.urgency === "today").length;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0e0e0e",
        color: "#e8e8e8",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          borderRight: "0.5px solid #1e1e1e",
          display: "flex",
          flexDirection: "column",
          padding: "24px 0",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "0 20px 28px",
            borderBottom: "0.5px solid #1e1e1e",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "#5e6ad2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              C
            </div>
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#f0f0f0",
                letterSpacing: "-0.01em",
              }}
            >
              CareerOS
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0 10px" }}>
          {SIDEBAR_NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "9px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: activeNav === item.id ? "#1a1a2e" : "transparent",
                color: activeNav === item.id ? "#818cf8" : "#555",
                fontSize: 13,
                fontWeight: activeNav === item.id ? 500 : 400,
                marginBottom: 2,
                transition: "all 0.15s",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (activeNav !== item.id)
                  e.currentTarget.style.background = "#161616";
                e.currentTarget.style.color = "#aaa";
              }}
              onMouseLeave={(e) => {
                if (activeNav !== item.id) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#555";
                }
              }}
            >
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              {item.label}
              {item.id === "followups" && overdueCount > 0 && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 10,
                    fontWeight: 600,
                    background: "#3b0000",
                    color: "#ef4444",
                    padding: "1px 6px",
                    borderRadius: 99,
                  }}
                >
                  {overdueCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: "16px 20px", borderTop: "0.5px solid #1e1e1e" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#5e6ad222",
                border: "1px solid #5e6ad244",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 500,
                color: "#818cf8",
              }}
            >
              A
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#d0d0d0" }}>
                Arjun Sharma
              </div>
              <div style={{ fontSize: 10, color: "#444" }}>arjun@email.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "32px 40px",
          maxWidth: 960,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: "#f0f0f0",
                margin: "0 0 4px",
                letterSpacing: "-0.02em",
              }}
            >
              {greeting()}, Arjun
            </h1>
            <p style={{ fontSize: 13, color: "#555", margin: 0 }}>
              {overdueCount > 0 ? `${overdueCount} overdue · ` : ""}
              {todayCount} action{todayCount !== 1 ? "s" : ""} for today ·{" "}
              {INTERVIEWS.filter((i) => i.date === "Today").length} interview
              {INTERVIEWS.filter((i) => i.date === "Today").length !== 1
                ? "s"
                : ""}{" "}
              scheduled
            </p>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontSize: 13,
              fontWeight: 500,
              padding: "9px 16px",
              borderRadius: 9,
              border: "0.5px solid #333",
              background: "#5e6ad2",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 16 }}>+</span> Add opportunity
          </button>
        </div>

        {/* Action Center */}
        <section style={{ marginBottom: 32 }}>
          <SectionLabel>Action center</SectionLabel>
          {actions.length === 0 ? (
            <Card style={{ textAlign: "center", padding: "32px 20px" }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>✓</div>
              <div style={{ fontSize: 14, color: "#555" }}>
                All caught up — no actions needed right now.
              </div>
            </Card>
          ) : (
            <div>
              {actions.map((item) => (
                <ActionRow key={item.id} item={item} onDismiss={dismiss} />
              ))}
            </div>
          )}
        </section>

        {/* Interviews + Follow-ups */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 32,
          }}
        >
          <Card>
            <SectionLabel>Upcoming interviews</SectionLabel>
            {INTERVIEWS.map((item) => (
              <InterviewRow key={item.id} item={item} />
            ))}
            <button
              style={{
                marginTop: 12,
                fontSize: 12,
                color: "#555",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              View all interviews →
            </button>
          </Card>

          <Card>
            <SectionLabel>Follow-ups due</SectionLabel>
            {FOLLOWUPS.map((item) => (
              <FollowUpRow key={item.id} item={item} />
            ))}
            <button
              style={{
                marginTop: 12,
                fontSize: 12,
                color: "#555",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              View all follow-ups →
            </button>
          </Card>
        </div>

        {/* Active Opportunities */}
        <section style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <SectionLabel>Active opportunities</SectionLabel>
            <button
              style={{
                fontSize: 12,
                color: "#555",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              View all →
            </button>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              overflowX: "auto",
              paddingBottom: 8,
            }}
          >
            {OPPORTUNITIES.map((item) => (
              <OpportunityCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Activity + Health */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}
        >
          <Card>
            <SectionLabel>Recent activity</SectionLabel>
            {ACTIVITY.map((item) => (
              <ActivityRow key={item.id} item={item} />
            ))}
          </Card>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <SectionLabel style={{ marginBottom: 12 }}>
              Career health
            </SectionLabel>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              <HealthStat label="Active" value="12" sub="opportunities" />
              <HealthStat
                label="Interviews"
                value="4"
                sub="this month"
                color="#818cf8"
              />
              <HealthStat
                label="Offers"
                value="1"
                sub="pending review"
                color="#10b981"
              />
              <HealthStat
                label="Response"
                value="34%"
                sub="rate"
                color="#f59e0b"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
