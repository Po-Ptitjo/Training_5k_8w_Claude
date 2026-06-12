import { useState } from "react";

const VMA = 17; // km/h
const paces = {
  recup: "5'45–6'15/km",
  long: "5'15–5'45/km",
  tempo: "4'11–4'25/km",
  cinq: "3'31–3'45/km",
  frac: "3'12–3'21/km",
};

const plan = [
  // CYCLE 1 — Semaines 1-4
  {
    week: 1,
    cycle: 1,
    label: "Construction",
    days: [
      { day: "Lundi", type: "Fractionné", color: "orange", seance: "Échauffement 15min · 8×400m à 3'15/km · récup 1'30 trot · retour calme 10min", volume: "~7km", rpe: "7/10" },
      { day: "Mardi", type: "Footing récup", color: "green", seance: "5km très lent à 5'50-6'10/km. Jambes qui tournent, respiration nasale possible.", volume: "5km", rpe: "4/10" },
      { day: "Jeudi", type: "Tempo", color: "blue", seance: "Échauffement 10min · 20min à 4'20/km · retour calme 10min", volume: "~8km", rpe: "7/10" },
      { day: "Samedi", type: "Sortie longue", color: "purple", seance: "8km à 5'20-5'40/km. Allure conversation obligatoire.", volume: "8km", rpe: "5/10" },
    ],
    total: "28km",
    focus: "Prise de repères sur les allures",
  },
  {
    week: 2,
    cycle: 1,
    label: "Construction",
    days: [
      { day: "Lundi", type: "Fractionné", color: "orange", seance: "Échauffement 15min · 10×400m à 3'15/km · récup 1'30 trot · retour calme 10min", volume: "~8km", rpe: "7/10" },
      { day: "Mardi", type: "Footing récup", color: "green", seance: "6km très lent à 5'45-6'10/km.", volume: "6km", rpe: "4/10" },
      { day: "Jeudi", type: "Tempo", color: "blue", seance: "Échauffement 10min · 22min à 4'15/km · retour calme 10min", volume: "~9km", rpe: "7/10" },
      { day: "Samedi", type: "Sortie longue", color: "purple", seance: "9km à 5'20-5'40/km.", volume: "9km", rpe: "5/10" },
    ],
    total: "32km",
    focus: "Solidifier la base aérobie",
  },
  {
    week: 3,
    cycle: 1,
    label: "Charge",
    days: [
      { day: "Lundi", type: "Fractionné", color: "orange", seance: "Échauffement 15min · 4×1000m à 3'35-3'40/km · récup 2min trot · retour calme 10min", volume: "~9km", rpe: "8/10" },
      { day: "Mardi", type: "Footing récup", color: "green", seance: "6km très lent à 5'45/km. Obligatoire, ne pas zapper.", volume: "6km", rpe: "4/10" },
      { day: "Jeudi", type: "Tempo long", color: "blue", seance: "Échauffement 10min · 25min à 4'15/km · retour calme 10min", volume: "~10km", rpe: "8/10" },
      { day: "Samedi", type: "Sortie longue", color: "purple", seance: "10km à 5'15-5'30/km.", volume: "10km", rpe: "5/10" },
    ],
    total: "35km",
    focus: "Premier contact avec les 1000m",
  },
  {
    week: 4,
    cycle: 1,
    label: "⚡ Décharge",
    days: [
      { day: "Lundi", type: "Fractionné léger", color: "orange", seance: "Échauffement 15min · 6×400m à 3'15/km · récup 2min · retour calme 10min", volume: "~6km", rpe: "6/10" },
      { day: "Mardi", type: "Repos actif", color: "green", seance: "Marche 30min ou vélo très léger. Pas de course.", volume: "—", rpe: "2/10" },
      { day: "Jeudi", type: "Footing", color: "blue", seance: "5km à 5'30/km, jambes libres.", volume: "5km", rpe: "4/10" },
      { day: "Samedi", type: "Sortie longue courte", color: "purple", seance: "7km à 5'30/km.", volume: "7km", rpe: "4/10" },
    ],
    total: "~23km",
    focus: "Récupération — laisser le corps assimiler",
  },
  // CYCLE 2 — Semaines 5-8
  {
    week: 5,
    cycle: 2,
    label: "Intensification",
    days: [
      { day: "Lundi", type: "Fractionné", color: "orange", seance: "Échauffement 15min · 5×1000m à 3'33-3'38/km · récup 2min trot · retour calme 10min", volume: "~10km", rpe: "8/10" },
      { day: "Mardi", type: "Footing récup", color: "green", seance: "6km à 5'45/km. Indispensable après les 1000m.", volume: "6km", rpe: "4/10" },
      { day: "Jeudi", type: "Tempo + accélérations", color: "blue", seance: "Échauffement 10min · 25min à 4'10/km · 4×100m en foulées · retour calme", volume: "~10km", rpe: "8/10" },
      { day: "Samedi", type: "Sortie longue", color: "purple", seance: "11km à 5'15-5'30/km.", volume: "11km", rpe: "5/10" },
    ],
    total: "~37km",
    focus: "Hausser les curseurs d'intensité",
  },
  {
    week: 6,
    cycle: 2,
    label: "Intensification",
    days: [
      { day: "Lundi", type: "Fractionné mixte", color: "orange", seance: "Échauffement 15min · 3×1000m à 3'33/km + 4×400m à 3'12/km · récup 2min · retour calme", volume: "~10km", rpe: "8/10" },
      { day: "Mardi", type: "Footing récup", color: "green", seance: "6km à 5'45-6'00/km.", volume: "6km", rpe: "4/10" },
      { day: "Jeudi", type: "Tempo long", color: "blue", seance: "Échauffement 10min · 28min à 4'10/km · retour calme 10min", volume: "~11km", rpe: "8/10" },
      { day: "Samedi", type: "Sortie longue", color: "purple", seance: "12km à 5'15/km.", volume: "12km", rpe: "5/10" },
    ],
    total: "~39km",
    focus: "Séance mixte — qualité + vitesse",
  },
  {
    week: 7,
    cycle: 2,
    label: "⚡ Affûtage",
    days: [
      { day: "Lundi", type: "Fractionné qualitatif", color: "orange", seance: "Échauffement 15min · 4×1000m à 3'30/km (allure cible 5km) · récup 2'30 · retour calme", volume: "~9km", rpe: "8/10" },
      { day: "Mardi", type: "Footing récup", color: "green", seance: "5km à 5'50/km. Très lent.", volume: "5km", rpe: "3/10" },
      { day: "Jeudi", type: "Allure spécifique", color: "blue", seance: "Échauffement 15min · 2×2000m à 3'35/km · récup 3min · retour calme 10min", volume: "~8km", rpe: "7/10" },
      { day: "Samedi", type: "Sortie courte", color: "purple", seance: "6km à 5'30/km. Dernière sortie avant le test.", volume: "6km", rpe: "4/10" },
    ],
    total: "~28km",
    focus: "Conserver le tranchant, réduire le volume",
  },
  {
    week: 8,
    cycle: 2,
    label: "🏁 Test 5km",
    days: [
      { day: "Lundi", type: "Activation", color: "orange", seance: "20min footing très lent + 4×100m en accélérations progressives. Pas plus.", volume: "~3km", rpe: "3/10" },
      { day: "Mardi", type: "Repos complet", color: "green", seance: "Repos total. Marche légère si besoin.", volume: "—", rpe: "1/10" },
      { day: "Jeudi", type: "🏁 TEST 5KM", color: "red", seance: "Échauffement 15min trot + gammes · 5km à bloc sur piste · retour calme 10min. Objectif : sub-19' voire 18'30", volume: "~8km", rpe: "10/10" },
      { day: "Samedi", type: "Récup post-test", color: "purple", seance: "5km très lent à 6'00/km. Jambes libres, célébration.", volume: "5km", rpe: "3/10" },
    ],
    total: "~16km",
    focus: "Fraîcheur maximale — tout pour le test",
  },
];

const colorMap = {
  orange: { bg: "bg-orange-50", border: "border-orange-300", badge: "bg-orange-500", text: "text-orange-700" },
  green: { bg: "bg-emerald-50", border: "border-emerald-300", badge: "bg-emerald-500", text: "text-emerald-700" },
  blue: { bg: "bg-blue-50", border: "border-blue-300", badge: "bg-blue-500", text: "text-blue-700" },
  purple: { bg: "bg-violet-50", border: "border-violet-300", badge: "bg-violet-500", text: "text-violet-700" },
  red: { bg: "bg-red-50", border: "border-red-400", badge: "bg-red-600", text: "text-red-700" },
};

const typeIcons = {
  "Fractionné": "⚡",
  "Fractionné léger": "⚡",
  "Fractionné mixte": "⚡",
  "Fractionné qualitatif": "⚡",
  "Footing récup": "🟢",
  "Repos actif": "😴",
  "Repos complet": "😴",
  "Activation": "🔋",
  "Récup post-test": "🟢",
  "Tempo": "🔵",
  "Tempo long": "🔵",
  "Tempo + accélérations": "🔵",
  "Allure spécifique": "🔵",
  "Footing": "🟢",
  "Sortie longue": "🟣",
  "Sortie longue courte": "🟣",
  "Sortie courte": "🟣",
  "🏁 TEST 5KM": "🏁",
};



export default function App() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [showPaces, setShowPaces] = useState(false);

  const week = plan[selectedWeek - 1];
  const cycle1 = plan.slice(0, 4);
  const cycle2 = plan.slice(4, 8);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#0f0f13", minHeight: "100vh", color: "#e8e8f0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", padding: "28px 20px 20px", borderBottom: "1px solid #ffffff15" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#6c8ebf", textTransform: "uppercase", marginBottom: 6 }}>Plan 8 semaines</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px", color: "#f0f4ff" }}>Sub-19' sur 5km</h1>
          <div style={{ fontSize: 13, color: "#8899bb" }}>VMA 17 km/h · 4 séances/semaine · Piste disponible</div>

          {/* Paces toggle */}
          <button
            onClick={() => setShowPaces(!showPaces)}
            style={{ marginTop: 14, padding: "6px 14px", background: "#ffffff12", border: "1px solid #ffffff20", borderRadius: 8, color: "#a0b4d0", fontSize: 12, cursor: "pointer" }}
          >
            {showPaces ? "▲" : "▼"} Mes allures de référence
          </button>

          {showPaces && (
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Récup", value: paces.recup, color: "#22c55e" },
                { label: "Sortie longue", value: paces.long, color: "#8b5cf6" },
                { label: "Tempo / seuil", value: paces.tempo, color: "#3b82f6" },
                { label: "Allure 5km", value: paces.cinq, color: "#f97316" },
                { label: "Fractionné court", value: paces.frac, color: "#ef4444" },
              ].map(p => (
                <div key={p.label} style={{ background: "#ffffff08", borderRadius: 8, padding: "8px 12px", borderLeft: `3px solid ${p.color}` }}>
                  <div style={{ fontSize: 10, color: "#667799", marginBottom: 2 }}>{p.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: p.color }}>{p.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Week selector */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "16px 20px 0" }}>
        <div style={{ fontSize: 11, color: "#556688", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Cycle 1 — Base</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {cycle1.map(w => (
            <button
              key={w.week}
              onClick={() => setSelectedWeek(w.week)}
              style={{
                flex: 1, padding: "10px 4px", borderRadius: 10, border: "none", cursor: "pointer",
                background: selectedWeek === w.week ? "#3b82f6" : "#ffffff10",
                color: selectedWeek === w.week ? "#fff" : "#8899bb",
                fontWeight: selectedWeek === w.week ? 700 : 400,
                fontSize: 13, transition: "all 0.15s"
              }}
            >
              S{w.week}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 11, color: "#556688", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Cycle 2 — Intensification</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {cycle2.map(w => (
            <button
              key={w.week}
              onClick={() => setSelectedWeek(w.week)}
              style={{
                flex: 1, padding: "10px 4px", borderRadius: 10, border: "none", cursor: "pointer",
                background: selectedWeek === w.week ? (w.week === 8 ? "#ef4444" : "#3b82f6") : "#ffffff10",
                color: selectedWeek === w.week ? "#fff" : "#8899bb",
                fontWeight: selectedWeek === w.week ? 700 : 400,
                fontSize: 13, transition: "all 0.15s"
              }}
            >
              S{w.week}
            </button>
          ))}
        </div>

        {/* Week header */}
        <div style={{ background: "#ffffff08", borderRadius: 14, padding: "14px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#f0f4ff" }}>Semaine {week.week} — {week.label}</div>
            <div style={{ fontSize: 12, color: "#667799", marginTop: 3 }}>{week.focus}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#556688" }}>Volume total</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#6c8ebf" }}>{week.total}</div>
          </div>
        </div>

        {/* Sessions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 32 }}>
          {week.days.map((d, i) => {
            const c = colorMap[d.color];
            return (
              <div key={i} style={{
                background: "#ffffff06",
                border: `1px solid #ffffff12`,
                borderLeft: `4px solid ${d.color === "orange" ? "#f97316" : d.color === "green" ? "#22c55e" : d.color === "blue" ? "#3b82f6" : d.color === "red" ? "#ef4444" : "#8b5cf6"}`,
                borderRadius: 12, padding: "14px 16px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <span style={{ fontSize: 11, color: "#667799", textTransform: "uppercase", letterSpacing: "0.1em" }}>{d.day}</span>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#e0e8f8", marginTop: 2 }}>
                      {typeIcons[d.type] || "🏃"} {d.type}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: "#667799" }}>{d.volume}</div>
                    <div style={{ fontSize: 11, color: "#445566", marginTop: 2 }}>RPE {d.rpe}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#99aabb", lineHeight: 1.5 }}>{d.seance}</div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ borderTop: "1px solid #ffffff10", paddingTop: 16, paddingBottom: 32 }}>
          <div style={{ fontSize: 11, color: "#445566", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Légende RPE</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {[["3-4/10", "Très facile, conversation aisée"], ["5-6/10", "Modéré, légèrement essoufflé"], ["7-8/10", "Difficile, phrases courtes"], ["10/10", "Effort maximal — test"]].map(([rpe, desc]) => (
              <div key={rpe} style={{ background: "#ffffff05", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#6c8ebf" }}>{rpe}</div>
                <div style={{ fontSize: 11, color: "#556677", marginTop: 2 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
