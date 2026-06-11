import { useState, useRef, useEffect } from "react";

const STAGES = [
  { id: "bookmarked", label: "Bookmarked", short: "Saved" },
  { id: "applied", label: "Applied", short: "Applied" },
  { id: "recruiter", label: "Recruiter Contact", short: "Recruiter" },
  { id: "interview", label: "Interview", short: "Interview" },
  { id: "technical", label: "Technical Round", short: "Technical" },
  { id: "hr", label: "HR Round", short: "HR" },
  { id: "offer", label: "Offer Received", short: "Offer" },
  { id: "selected", label: "Selected", short: "Selected" },
];

const CURRENT_STAGE = 4; // Technical Round

const INTERVIEW_ROUNDS = [
  {
    id: 1, type: "Recruiter Screen", date: "May 12, 2025",
    interviewer: "Sarah Chen", result: "passed",
    duration: "30 min",
    notes: "Good culture fit discussion. Sarah mentioned the team is scaling fast. She seemed impressed with the Linear and Figma experience.",
    questions: ["Tell me about your background", "Why Google?", "What's your experience with large-scale systems?"],
    expanded: false,
  },
  {
    id: 2, type: "Technical Phone Screen", date: "May 19, 2025",
    interviewer: "Raj Patel", result: "passed",
    duration: "45 min",
    notes: "Two coding problems — array manipulation and a graph traversal. Solved both. Raj gave positive feedback on communication.",
    questions: ["Two Sum variant", "Number of Islands", "System design: URL shortener"],
    expanded: false,
  },
  {
    id: 3, type: "Technical Round", date: "Jun 3, 2025",
    interviewer: "Team Panel (3 engineers)", result: "pending",
    duration: "4 hours",
    notes: "Upcoming — prepare distributed systems, React performance, and behavioral questions.",
    questions: [],
    expanded: true,
  },
];

const CHECKLIST = [
  { id: 1, text: "Review Google's engineering blog", done: true },
  { id: 2, text: "Practice system design — feed ranking", done: true },
  { id: 3, text: "Prepare STAR stories for leadership principles", done: false },
  { id: 4, text: "Review React performance optimization patterns", done: false },
  { id: 5, text: "Research interviewer profiles on LinkedIn", done: false },
  { id: 6, text: "Prepare questions to ask the panel", done: false },
];

const ACTIVITY = [
  { id: 1, type: "interview", text: "Technical Round scheduled", sub: "Jun 3 · 4 hours · Panel of 3", time: "2h ago" },
  { id: 2, type: "status", text: "Stage advanced to Technical Round", sub: "from HR Screen", time: "2h ago" },
  { id: 3, type: "followup", text: "Follow-up sent to Sarah Chen", sub: "via email", time: "3d ago" },
  { id: 4, type: "interview", text: "Technical Phone Screen completed", sub: "Passed · Raj Patel", time: "May 19" },
  { id: 5, type: "note", text: "Research notes updated", sub: "Added salary benchmarks", time: "May 15" },
  { id: 6, type: "interview", text: "Recruiter Screen completed", sub: "Passed · Sarah Chen", time: "May 12" },
  { id: 7, type: "status", text: "Application submitted", sub: "via LinkedIn", time: "May 8" },
];

const RESEARCH_TABS = ["company", "salary", "team", "culture"];
const RESEARCH_NOTES = {
  company: "Google's infrastructure team is working on next-gen data center networking. The Frontend Platform team owns the component system used across all Google products — massive scale, huge impact.\n\nKey products to know: Search, Maps, YouTube, Gmail. The team uses React internally for many consumer products.\n\nRecent news: Q1 earnings beat expectations. AI integration across all products is the strategic priority.",
  salary: "L5 Frontend Engineer range: ₹85L – ₹1.2Cr (total comp)\nBase: ₹45–55L\nBonus: 15–20%\nRSU: ₹30–50L over 4 years\n\nBenchmarks from Levels.fyi:\n- P50: ₹95L TC\n- P75: ₹1.1Cr TC\n\nNegotiation notes: They usually come in at midpoint. Counter with competing offers if available.",
  team: "Hiring manager: Priya Nair (Director, Frontend Platform)\nTeam size: ~40 engineers, 8 on this immediate team\nWork style: Hybrid 3 days, very flexible\n\nSarah mentioned the team has strong culture of code review and design docs. Engineers own features end-to-end.",
  culture: "Strong emphasis on 'Googliness' — collaborative, humble, data-driven.\n20% time is real on this team per Sarah.\nPromotion cycle: every 18-24 months typically.\n\nPeople who thrive: those who can navigate ambiguity and write well (docs culture is strong).",
};

export default function OpportunityWorkspace() {
  const [activeSection, setActiveSection] = useState("overview");
  const [rounds, setRounds] = useState(INTERVIEW_ROUNDS);
  const [checklist, setChecklist] = useState(CHECKLIST);
  const [researchTab, setResearchTab] = useState("company");
  const [researchNotes, setResearchNotes] = useState(RESEARCH_NOTES);
  const [prepNotes, setPrepNotes] = useState("Key things to nail:\n- Distributed systems: consistent hashing, CAP theorem\n- React: reconciliation, fiber architecture, concurrent features\n- Behavioral: project ownership, conflict resolution, impact at scale\n\nMy strongest STAR story: Led migration of Stripe's design system to React 18. 40% perf improvement.");
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [priority, setPriority] = useState("high");
  const sectionRefs = useRef({});

  const scrollTo = (id) => {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleRound = (id) => {
    setRounds(r => r.map(x => x.id === id ? { ...x, expanded: !x.expanded } : x));
  };

  const toggleCheck = (id) => {
    setChecklist(c => c.map(x => x.id === id ? { ...x, done: !x.done } : x));
  };

  const doneCount = checklist.filter(x => x.done).length;

  const NAV_SECTIONS = [
    { id: "overview", label: "Overview" },
    { id: "timeline", label: "Timeline" },
    { id: "interviews", label: "Interviews" },
    { id: "prep", label: "Preparation" },
    { id: "recruiter", label: "Recruiter" },
    { id: "research", label: "Research" },
    { id: "documents", label: "Documents" },
    { id: "activity", label: "Activity" },
  ];

  return (
    <div style={{
      display: "flex", height: "100vh", background: "#0e0e0e",
      color: "#e0e0e0", fontFamily: "-apple-system, 'Segoe UI', sans-serif",
      overflow: "hidden",
    }}>

      {/* Left Navigator */}
      <aside style={{
        width: 176, flexShrink: 0,
        borderRight: "0.5px solid #1e1e1e",
        display: "flex", flexDirection: "column",
        padding: "24px 0", overflowY: "auto",
      }}>
        <div style={{ padding: "0 16px 20px", borderBottom: "0.5px solid #1a1a1a" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 26, height: 26, borderRadius: 6,
              background: "#5e6ad222", border: "1px solid #5e6ad244",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 600, color: "#818cf8",
            }}>G</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#d0d0d0", lineHeight: 1.2 }}>Google</div>
              <div style={{ fontSize: 10, color: "#444" }}>Frontend Engineer</div>
            </div>
          </div>
          <div style={{
            fontSize: 10, fontWeight: 500, padding: "3px 8px",
            borderRadius: 99, background: "#8b5cf618",
            color: "#8b5cf6", border: "1px solid #8b5cf630",
            display: "inline-block",
          }}>Technical Round</div>
        </div>

        <nav style={{ padding: "12px 8px", flex: 1 }}>
          {NAV_SECTIONS.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "7px 10px", borderRadius: 6, border: "none",
              background: activeSection === s.id ? "#1a1a2e" : "transparent",
              color: activeSection === s.id ? "#818cf8" : "#444",
              fontSize: 12, cursor: "pointer", fontFamily: "inherit",
              marginBottom: 1, transition: "all 0.15s",
            }}
              onMouseEnter={e => { if (activeSection !== s.id) e.currentTarget.style.color = "#888"; }}
              onMouseLeave={e => { if (activeSection !== s.id) e.currentTarget.style.color = "#444"; }}
            >{s.label}</button>
          ))}
        </nav>

        <div style={{ padding: "12px 16px", borderTop: "0.5px solid #1a1a1a" }}>
          <button style={{
            width: "100%", padding: "7px 0", borderRadius: 7,
            border: "0.5px solid #2a2a2a", background: "transparent",
            color: "#555", fontSize: 11, cursor: "pointer", fontFamily: "inherit",
          }}>← All opportunities</button>
        </div>
      </aside>

      {/* Center Workspace */}
      <main style={{
        flex: 1, overflowY: "auto", padding: "32px 48px 80px",
        minWidth: 0,
      }}
        onScroll={(e) => {
          const scrollTop = e.currentTarget.scrollTop;
          let current = "overview";
          NAV_SECTIONS.forEach(s => {
            const el = sectionRefs.current[s.id];
            if (el && el.offsetTop - 80 <= scrollTop) current = s.id;
          });
          setActiveSection(current);
        }}
      >

        {/* Header */}
        <div ref={el => sectionRefs.current["overview"] = el} style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "#5e6ad222", border: "1px solid #5e6ad244",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 600, color: "#818cf8",
                }}>G</div>
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 500, color: "#f0f0f0", margin: 0, letterSpacing: "-0.02em" }}>Google</h1>
                  <div style={{ fontSize: 13, color: "#555", marginTop: 1 }}>Frontend Engineer · L5</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{
                  fontSize: 11, fontWeight: 500, padding: "3px 10px",
                  borderRadius: 99, background: "#8b5cf618",
                  color: "#8b5cf6", border: "1px solid #8b5cf630",
                }}>Technical Round</span>
                <span style={{
                  fontSize: 11, padding: "3px 10px", borderRadius: 99,
                  background: "#ef444418", color: "#ef4444", border: "1px solid #ef444430",
                }}>High priority</span>
                <span style={{ fontSize: 11, color: "#444" }}>via LinkedIn · Applied May 8</span>
                <span style={{ fontSize: 11, color: "#333" }}>·</span>
                <span style={{ fontSize: 11, color: "#444" }}>Last activity 2h ago</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setRightPanelOpen(o => !o)} style={{
                fontSize: 12, padding: "7px 14px", borderRadius: 7,
                border: "0.5px solid #2a2a2a", background: "transparent",
                color: "#555", cursor: "pointer", fontFamily: "inherit",
              }}>Context {rightPanelOpen ? "↘" : "↗"}</button>
              <button style={{
                fontSize: 12, padding: "7px 14px", borderRadius: 7,
                border: "0.5px solid #2a2a2a", background: "#5e6ad2",
                color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
              }}>Send follow-up</button>
            </div>
          </div>
        </div>

        {/* Stage Timeline */}
        <div ref={el => sectionRefs.current["timeline"] = el} style={{ marginBottom: 48 }}>
          <SectionLabel>Journey</SectionLabel>
          <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 16 }}>
            {STAGES.map((stage, i) => {
              const done = i < CURRENT_STAGE;
              const current = i === CURRENT_STAGE;
              const future = i > CURRENT_STAGE;
              return (
                <div key={stage.id} style={{ display: "flex", alignItems: "center", flex: i < STAGES.length - 1 ? 1 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{
                      width: current ? 14 : 10, height: current ? 14 : 10,
                      borderRadius: "50%",
                      background: done ? "#5e6ad2" : current ? "#818cf8" : "#222",
                      border: current ? "2px solid #818cf8" : done ? "none" : "1px solid #333",
                      boxShadow: current ? "0 0 0 4px #818cf820" : "none",
                      transition: "all 0.2s", flexShrink: 0,
                    }} />
                    <span style={{
                      fontSize: 10, color: done ? "#5e6ad2" : current ? "#818cf8" : "#333",
                      fontWeight: current ? 500 : 400, whiteSpace: "nowrap",
                    }}>{stage.short}</span>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div style={{
                      flex: 1, height: 1, margin: "0 4px",
                      background: i < CURRENT_STAGE ? "#5e6ad2" : "#222",
                      marginBottom: 20,
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interview Journey */}
        <div ref={el => sectionRefs.current["interviews"] = el} style={{ marginBottom: 48 }}>
          <SectionLabel>Interview rounds</SectionLabel>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            {rounds.map(round => (
              <div key={round.id} style={{
                border: "0.5px solid #222", borderRadius: 10,
                overflow: "hidden", background: "#111",
              }}>
                <div
                  onClick={() => toggleRound(round.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "14px 16px", cursor: "pointer",
                  }}
                >
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                    background: round.result === "passed" ? "#10b981" : round.result === "failed" ? "#ef4444" : "#f59e0b",
                    boxShadow: round.result === "pending" ? "0 0 0 3px #f59e0b20" : "none",
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#e0e0e0" }}>{round.type}</span>
                      <span style={{ fontSize: 11, color: "#444" }}>·</span>
                      <span style={{ fontSize: 11, color: "#555" }}>{round.date}</span>
                      <span style={{ fontSize: 11, color: "#444" }}>·</span>
                      <span style={{ fontSize: 11, color: "#555" }}>{round.interviewer}</span>
                    </div>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 99,
                    background: round.result === "passed" ? "#10b98118" : round.result === "failed" ? "#ef444418" : "#f59e0b18",
                    color: round.result === "passed" ? "#10b981" : round.result === "failed" ? "#ef4444" : "#f59e0b",
                  }}>{round.result === "pending" ? "Upcoming" : round.result === "passed" ? "Passed" : "Failed"}</span>
                  <span style={{ fontSize: 12, color: "#333" }}>{round.expanded ? "↑" : "↓"}</span>
                </div>
                {round.expanded && (
                  <div style={{ padding: "0 16px 16px", borderTop: "0.5px solid #1a1a1a" }}>
                    <div style={{ paddingTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <div style={{ fontSize: 10, color: "#444", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Notes</div>
                        <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, margin: 0 }}>{round.notes}</p>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#444", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                          {round.questions.length > 0 ? "Questions asked" : "Expected topics"}
                        </div>
                        {round.questions.length > 0 ? (
                          <ul style={{ margin: 0, padding: "0 0 0 14px" }}>
                            {round.questions.map((q, i) => (
                              <li key={i} style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>{q}</li>
                            ))}
                          </ul>
                        ) : (
                          <p style={{ fontSize: 13, color: "#555", fontStyle: "italic", margin: 0 }}>Prepare distributed systems, React perf, and behavioral questions.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button style={{
              fontSize: 12, color: "#444", background: "none", border: "0.5px dashed #222",
              borderRadius: 8, padding: "10px", cursor: "pointer", fontFamily: "inherit",
              transition: "border-color 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#444"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#222"}
            >+ Add round</button>
          </div>
        </div>

        {/* Preparation Hub */}
        <div ref={el => sectionRefs.current["prep"] = el} style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <SectionLabel>Preparation</SectionLabel>
            <span style={{ fontSize: 11, color: "#444" }}>{doneCount}/{checklist.length} complete</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, color: "#444", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Checklist</div>
              {checklist.map(item => (
                <div key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "7px 0", cursor: "pointer",
                    borderBottom: "0.5px solid #161616",
                  }}>
                  <div style={{
                    width: 15, height: 15, borderRadius: 4, flexShrink: 0,
                    border: item.done ? "none" : "1px solid #333",
                    background: item.done ? "#5e6ad2" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, color: "#fff",
                  }}>{item.done ? "✓" : ""}</div>
                  <span style={{
                    fontSize: 13, color: item.done ? "#444" : "#ccc",
                    textDecoration: item.done ? "line-through" : "none",
                  }}>{item.text}</span>
                </div>
              ))}
              <button style={{
                fontSize: 12, color: "#444", background: "none", border: "none",
                padding: "8px 0", cursor: "pointer", fontFamily: "inherit",
              }}>+ Add item</button>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#444", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Prep notes</div>
              <textarea
                value={prepNotes}
                onChange={e => setPrepNotes(e.target.value)}
                style={{
                  width: "100%", minHeight: 200,
                  background: "#111", border: "0.5px solid #222",
                  borderRadius: 8, padding: "12px 14px",
                  color: "#ccc", fontSize: 13, lineHeight: 1.7,
                  fontFamily: "inherit", resize: "vertical",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Recruiter Hub */}
        <div ref={el => sectionRefs.current["recruiter"] = el} style={{ marginBottom: 48 }}>
          <SectionLabel>Recruiter</SectionLabel>
          <div style={{ marginTop: 16, display: "flex", alignItems: "flex-start", gap: 20 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "#ec489922", border: "1px solid #ec489944",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 500, color: "#ec4899", flexShrink: 0,
            }}>SC</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#e0e0e0", marginBottom: 2 }}>Sarah Chen</div>
              <div style={{ fontSize: 12, color: "#555", marginBottom: 12 }}>Technical Recruiter · Google · Last contact 3 days ago</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <InfoPill icon="✉" value="sarah.chen@google.com" />
                <InfoPill icon="📞" value="+1 (650) 555-0142" />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <ActionButton>Send email</ActionButton>
                <ActionButton>Log call</ActionButton>
                <ActionButton>Schedule follow-up</ActionButton>
              </div>
            </div>
          </div>
        </div>

        {/* Research Hub */}
        <div ref={el => sectionRefs.current["research"] = el} style={{ marginBottom: 48 }}>
          <SectionLabel>Research</SectionLabel>
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", gap: 0, marginBottom: 0, borderBottom: "0.5px solid #1e1e1e" }}>
              {RESEARCH_TABS.map(tab => (
                <button key={tab} onClick={() => setResearchTab(tab)} style={{
                  fontSize: 12, padding: "8px 16px",
                  background: "none", border: "none",
                  borderBottom: researchTab === tab ? "1px solid #5e6ad2" : "1px solid transparent",
                  color: researchTab === tab ? "#818cf8" : "#444",
                  cursor: "pointer", fontFamily: "inherit",
                  marginBottom: "-0.5px", transition: "all 0.15s",
                  textTransform: "capitalize",
                }}>{tab}</button>
              ))}
            </div>
            <textarea
              value={researchNotes[researchTab]}
              onChange={e => setResearchNotes(n => ({ ...n, [researchTab]: e.target.value }))}
              style={{
                width: "100%", minHeight: 180,
                background: "#0e0e0e", border: "none",
                borderBottom: "0.5px solid #1e1e1e",
                padding: "16px 0",
                color: "#888", fontSize: 13, lineHeight: 1.8,
                fontFamily: "inherit", resize: "vertical",
                outline: "none",
              }}
              placeholder={`Write ${researchTab} notes here...`}
            />
          </div>
        </div>

        {/* Documents */}
        <div ref={el => sectionRefs.current["documents"] = el} style={{ marginBottom: 48 }}>
          <SectionLabel>Documents</SectionLabel>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { name: "Resume_v4_Google.pdf", type: "Resume", size: "124 KB", date: "May 8" },
              { name: "Cover_Letter_Google.pdf", type: "Cover Letter", size: "48 KB", date: "May 8" },
              { name: "Portfolio_2025.pdf", type: "Portfolio", size: "2.4 MB", date: "Apr 30" },
            ].map((doc, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 14px", borderRadius: 8,
                border: "0.5px solid #1e1e1e", background: "#111",
              }}>
                <span style={{ fontSize: 16, color: "#444" }}>📄</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#ccc" }}>{doc.name}</div>
                  <div style={{ fontSize: 11, color: "#444" }}>{doc.type} · {doc.size} · Uploaded {doc.date}</div>
                </div>
                <button style={{
                  fontSize: 11, padding: "4px 10px", borderRadius: 6,
                  border: "0.5px solid #2a2a2a", background: "transparent",
                  color: "#555", cursor: "pointer", fontFamily: "inherit",
                }}>View</button>
              </div>
            ))}
            <button style={{
              fontSize: 12, color: "#444", background: "none",
              border: "0.5px dashed #222", borderRadius: 8,
              padding: "10px", cursor: "pointer", fontFamily: "inherit",
            }}>+ Attach document</button>
          </div>
        </div>

        {/* Activity Feed */}
        <div ref={el => sectionRefs.current["activity"] = el} style={{ marginBottom: 48 }}>
          <SectionLabel>Activity</SectionLabel>
          <div style={{ marginTop: 16, borderLeft: "0.5px solid #1e1e1e", paddingLeft: 18, marginLeft: 5 }}>
            {ACTIVITY.map(item => {
              const color = { interview: "#5e6ad2", status: "#f59e0b", followup: "#888", note: "#10b981" }[item.type] || "#444";
              return (
                <div key={item.id} style={{ position: "relative", paddingBottom: 16 }}>
                  <div style={{
                    position: "absolute", left: -22, top: 4,
                    width: 8, height: 8, borderRadius: "50%",
                    background: color, border: "2px solid #0e0e0e",
                  }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 13, color: "#ccc" }}>{item.text}</div>
                      <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{item.sub}</div>
                    </div>
                    <span style={{ fontSize: 11, color: "#333", whiteSpace: "nowrap", marginLeft: 16 }}>{item.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Right Context Panel */}
      {rightPanelOpen && (
        <aside style={{
          width: 272, flexShrink: 0,
          borderLeft: "0.5px solid #1e1e1e",
          overflowY: "auto", padding: "28px 20px",
          display: "flex", flexDirection: "column", gap: 28,
        }}>
          <div>
            <div style={{ fontSize: 10, color: "#333", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Next action</div>
            <div style={{
              padding: "14px 16px", borderRadius: 10,
              background: "#111", border: "0.5px solid #f59e0b33",
              borderLeft: "3px solid #f59e0b", borderRadius: "0 10px 10px 0",
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#e0e0e0", marginBottom: 4 }}>Prepare for Technical Round</div>
              <div style={{ fontSize: 11, color: "#666" }}>Jun 3 · 4 hours · Panel of 3 engineers</div>
              <div style={{ marginTop: 12, fontSize: 11, color: "#555" }}>
                {doneCount}/{checklist.length} prep tasks complete
              </div>
              <div style={{ marginTop: 6, height: 3, background: "#222", borderRadius: 99 }}>
                <div style={{
                  width: `${Math.round((doneCount / checklist.length) * 100)}%`,
                  height: "100%", background: "#5e6ad2", borderRadius: 99,
                }} />
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10, color: "#333", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Quick actions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["Send follow-up email", "Log a call", "Add interview round", "Update stage", "Add note"].map(action => (
                <button key={action} style={{
                  fontSize: 12, padding: "9px 12px", borderRadius: 7,
                  border: "0.5px solid #1e1e1e", background: "#111",
                  color: "#666", cursor: "pointer", fontFamily: "inherit",
                  textAlign: "left", transition: "all 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#aaa"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.color = "#666"; }}
                >{action} →</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10, color: "#333", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Stage</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {STAGES.map((s, i) => (
                <div key={s.id} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "5px 8px", borderRadius: 6,
                  background: i === CURRENT_STAGE ? "#1a1a2e" : "transparent",
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                    background: i < CURRENT_STAGE ? "#5e6ad2" : i === CURRENT_STAGE ? "#818cf8" : "#222",
                  }} />
                  <span style={{
                    fontSize: 11,
                    color: i < CURRENT_STAGE ? "#5e6ad2" : i === CURRENT_STAGE ? "#818cf8" : "#333",
                    fontWeight: i === CURRENT_STAGE ? 500 : 400,
                  }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10, color: "#333", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Details</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Source", value: "LinkedIn" },
                { label: "Applied", value: "May 8, 2025" },
                { label: "Location", value: "Bangalore · Hybrid" },
                { label: "Salary", value: "₹85L – ₹1.2Cr" },
                { label: "Priority", value: "High" },
              ].map(d => (
                <div key={d.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#444" }}>{d.label}</span>
                  <span style={{ fontSize: 11, color: "#888" }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 500, color: "#333",
      letterSpacing: "0.08em", textTransform: "uppercase",
    }}>{children}</div>
  );
}

function InfoPill({ icon, value }) {
  return (
    <span style={{
      fontSize: 12, color: "#666", padding: "4px 10px",
      borderRadius: 99, border: "0.5px solid #222",
      background: "#111", display: "inline-flex", alignItems: "center", gap: 5,
    }}>{icon} {value}</span>
  );
}

function ActionButton({ children }) {
  return (
    <button style={{
      fontSize: 12, padding: "6px 12px", borderRadius: 7,
      border: "0.5px solid #2a2a2a", background: "transparent",
      color: "#666", cursor: "pointer", fontFamily: "inherit",
      transition: "all 0.15s",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = "#161616"; e.currentTarget.style.color = "#aaa"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#666"; }}
    >{children}</button>
  );
}