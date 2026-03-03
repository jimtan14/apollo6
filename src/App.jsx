import { useState } from "react";

const CLUSTERS = [
  {
    id: "aeo",
    label: "AEO",
    color: "#00e676",
    priority: "OWN THIS",
    priorityBg: "#00e676",
    priorityText: "#000d05",
    totalVolume: "108,030",
    keywordCount: "7,365",
    avgKD: "11",
    avgCPC: "$1.10",
    semSignal: "12 leads, 216 clicks, 3.6% CTR",
    trend: "Accelerating",
    competitorDensity: "Moderate",
    airopsPosition: "Category leader",
    rationale:
      "Largest cluster by keyword count (7,365) and second in total volume (108K). Average KD of 11 means most terms are winnable. AirOps brand guidelines mandate AEO as the preferred term. 'aeo vs seo' grew from 12/mo to 2,032/mo in two years. 'aeo agency' from zero to 1,524/mo. 'aeo tools' from zero to 1,268/mo. The parent keyword for 'aeo' is still 'american eagle' in Semrush -- the category definition window is open.",
    semInsight: "SEM confirms buyer intent: 12 leads across 75 search terms. 'aeo software' drove 3 leads at $7.08 CPC. 'how to do aeo' drove 2 leads at $28.79 CpL. Commercial terms are converting, not just researchers.",
    gscInsight: "GSC shows AirOps' AEO content footprint is real but early. The pillar page (/blog/aeo-answer-engine-optimization) drove 61 clicks from 22K impressions in Feb -- but avg position is 21.8, meaning it ranks on page 2-3 and has significant upside with optimization. The AEO vs SEO page is surging: clicks up 600%, impressions up 778%, citations up 1,565%. The answer-engine-optimization-tools page exploded: clicks up 440%, citations up 2,156%. Total AEO citations across all pages: 2,800+.",
    gongInsight: "In the Ownwell demo (Feb 2), the prospect (Chi) specifically asked about 'optimizing for both AEO and SEO,' used 'prompt visibility in LLMs and ChatGPT' as natural language, and asked about GSC integration for triggering refreshes when metrics drop. Prospects are already using AEO terminology in conversations. They frame the problem as 'content creation + refresh for AEO/SEO' and want automated triggers based on visibility loss.",
    keywords: [
      { term: "aeo", volume: "7,300", kd: "61", trend: "+24%", semData: "--", gsc: "22K impressions", status: "Ranking" },
      { term: "answer engine optimization", volume: "3,200", kd: "37", trend: "+3,100%", semData: "16 clicks, 2 leads", gsc: "61 clicks, pos 21.8", status: "Ranking" },
      { term: "aeo vs seo", volume: "1,300", kd: "12", trend: "+16,833%", semData: "4 clicks", gsc: "+600% clicks", status: "Opportunity" },
      { term: "aeo tools", volume: "600", kd: "10", trend: "0 → 1,268", semData: "37 clicks, 1 lead", gsc: "+440% clicks", status: "Ranking" },
      { term: "answer engine optimization tools", volume: "600", kd: "10", trend: "0 → 1,350", semData: "--", gsc: "27 clicks, +2,156% cit.", status: "Ranking" },
      { term: "aeo agency", volume: "800", kd: "1", trend: "0 → 1,524", semData: "--", gsc: "--", status: "Opportunity" },
      { term: "aeo software", volume: "--", kd: "--", trend: "Not in Semrush", semData: "12 clicks, 3 leads", gsc: "--", status: "SEM signal" },
      { term: "aeo content structure", volume: "--", kd: "--", trend: "--", semData: "--", gsc: "17 clicks, +1,421% cit.", status: "GSC signal" },
      { term: "aeo marketing", volume: "700", kd: "--", trend: "+21,320%", semData: "4 clicks, 1 lead", gsc: "--", status: "Opportunity" },
      { term: "aeo services", volume: "700", kd: "1", trend: "0 → 1,188", semData: "--", gsc: "--", status: "Opportunity" },
      { term: "aeo strategy", volume: "--", kd: "--", trend: "--", semData: "3 clicks, 1 lead", gsc: "--", status: "SEM signal" },
    ],
  },
  {
    id: "llm",
    label: "LLM OPTIMIZATION",
    color: "#008c44",
    priority: "CLAIM EARLY",
    priorityBg: "#008c44",
    priorityText: "#ffffff",
    totalVolume: "36,380",
    keywordCount: "1,075",
    avgKD: "7.6",
    avgCPC: "$4.38",
    semSignal: "5 leads, 86 clicks, 5.5% CTR",
    trend: "Accelerating",
    competitorDensity: "Low",
    airopsPosition: "Wide open",
    rationale:
      "Lowest average KD in the dataset (7.6). Highest average CPC ($4.38). 'llm seo' grew from 45/mo to 1,515/mo. 'llm seo tool' spiked to 7,105 searches in one month. No single platform owns this cluster. AirOps has direct product alignment via LLM citation tracking.",
    semInsight: "SEM validates conversion: 5 leads from 86 clicks at 5.5% CTR. 'how to improve llm visibility' converted at $3.90 CpL -- lowest in the entire SEM dataset. 'llm tracking tools,' 'llm seo report,' and 'llm monitoring tools' each drove a lead.",
    gscInsight: "AirOps' LLM brand citation tracking page (/blog/llm-brand-citation-tracking) is already performing: 35 clicks, 23.5K impressions, 827 citations in Feb. Clicks up 218%, citations up 316%. This is the only meaningful LLM-cluster page on airops.com -- massive headroom to build 3-5 more pillar pieces around 'llm seo,' 'llm visibility,' and 'llm ranking.'",
    gongInsight: "In the Ownwell call, the prospect asked specifically about 'prompt visibility in LLMs and ChatGPT' as a feature request. Rose confirmed AirOps benchmarks against SEO data and offers 'prompt volume data' with high/medium/low indicators. Prospects frame LLM visibility as the next thing they need tracked after GSC -- they want automated alerts when LLM citation drops.",
    keywords: [
      { term: "llm seo", volume: "1,200", kd: "24", trend: "+3,267%", semData: "2 clicks", gsc: "--", status: "Gap" },
      { term: "llm ranking", volume: "1,100", kd: "79", trend: "+233%", semData: "--", gsc: "--", status: "Ambiguous" },
      { term: "llm seo tool", volume: "900", kd: "27", trend: "Spiked to 7K", semData: "--", gsc: "--", status: "High priority" },
      { term: "llmo", volume: "700", kd: "22", trend: "+135%", semData: "--", gsc: "--", status: "Opportunity" },
      { term: "llm brand citation tracking", volume: "--", kd: "--", trend: "--", semData: "--", gsc: "35 clicks, +316% cit.", status: "GSC signal" },
      { term: "llm visibility", volume: "--", kd: "--", trend: "--", semData: "17 clicks", gsc: "--", status: "SEM signal" },
      { term: "llm seo tools", volume: "--", kd: "--", trend: "--", semData: "8 clicks, 11.8% CTR", gsc: "--", status: "SEM signal" },
      { term: "how to improve llm visibility", volume: "--", kd: "--", trend: "--", semData: "1 lead, $3.90 CpL", gsc: "--", status: "SEM: best CpL" },
    ],
  },
  {
    id: "geo",
    label: "GEO",
    color: "#CCFFE0",
    priority: "CAPTURE + REDIRECT",
    priorityBg: "#EEFF8C",
    priorityText: "#000d05",
    totalVolume: "57,100",
    keywordCount: "1,983",
    avgKD: "19",
    avgCPC: "$3.50",
    semSignal: "5 leads, 139 clicks, 2.9% CTR",
    trend: "Peak hype, stabilizing",
    competitorDensity: "High",
    airopsPosition: "Strategic redirect",
    rationale:
      "GEO has the single highest-volume keyword in the dataset (8,300/mo) but KD 69 and owned by Semrush, Search Engine Land, and a16z. Long tail is thinner than AEO (1,983 vs 7,365 keywords). Cover GEO to capture organic demand, redirect to AEO.",
    semInsight: "SEM reinforces the redirect. GEO has the lowest CTR (2.9%) and worst lead efficiency. 'generative engine optimization' drove 42 clicks but only 1 lead at $367 CpL -- worst in the dataset. Researchers click, buyers don't convert.",
    gscInsight: "AirOps has no dedicated GEO landing page in GSC data. The AEO pillar page captures some GEO-adjacent impressions (22K) but doesn't explicitly target 'generative engine optimization.' A bridge page ('GEO vs AEO') could capture the 8,300/mo head term without competing directly on KD 69.",
    gongInsight: "Prospects don't use the term 'GEO' in calls. They say 'AEO,' 'AI search,' 'LLM visibility,' or 'prompt visibility.' GEO is an industry/media term, not a buyer term. This further supports the redirect strategy -- capture the search demand, route to the language buyers actually use.",
    keywords: [
      { term: "generative engine optimization", volume: "8,300", kd: "69", trend: "+8,532%", semData: "42 clicks, $367 CpL", gsc: "No dedicated page", status: "Hard to rank" },
      { term: "GEO services", volume: "1,600", kd: "10", trend: "0 → 2,598", semData: "--", gsc: "--", status: "Opportunity" },
      { term: "generative engine optimization tools", volume: "1,000", kd: "14", trend: "0 → 1,524", semData: "3 clicks", gsc: "--", status: "Opportunity" },
      { term: "generative engine optimization agency", volume: "700", kd: "2", trend: "0 → 1,270", semData: "3 clicks", gsc: "--", status: "Opportunity" },
      { term: "geo seo", volume: "--", kd: "--", trend: "--", semData: "5 clicks, 1 lead", gsc: "--", status: "SEM signal" },
    ],
  },
  {
    id: "ai-seo",
    label: "AI SEO / VISIBILITY",
    color: "#005c2e",
    priority: "SUPPORT ONLY",
    priorityBg: "#676c79",
    priorityText: "#ffffff",
    totalVolume: "71,510",
    keywordCount: "2,600",
    avgKD: "24.6",
    avgCPC: "$2.84",
    semSignal: "25 leads (combined), 369 clicks, 6.2% CTR",
    trend: "Stable-high",
    competitorDensity: "Very high",
    airopsPosition: "Paid viable, organic difficult",
    rationale:
      "Second-largest cluster by volume (71.5K) but dominated by Semrush, Ahrefs, and established SEO publishers. Use as secondary targets within AEO and LLM content. Don't build standalone landing pages for generic AI SEO terms.",
    semInsight: "SEM tells a split story. Generic 'ai seo' terms convert at middling rates (8 leads, 130 clicks). But the 'ai visibility' sub-cluster (17 leads, 239 clicks, 7.0% CTR) is the highest lead-density in the dataset. 'ai visibility tools' alone drove 5 leads. For paid: invest in 'ai visibility' variants. For organic: secondary keywords only.",
    gscInsight: "AirOps' Webflow case study targets 'ai search optimization' as its primary keyword (31 clicks, 1.3K impressions). The content-refresh-strategy-guide (30 clicks, 6.3K impressions, 659 citations) performs well on adjacent terms. Content engineering page (139 clicks, 8K impressions) is the strongest non-AEO page. These pages absorb AI SEO traffic organically without dedicated targeting.",
    gongInsight: "In calls, prospects describe their problem as 'AI visibility' or 'AI search visibility,' not 'AI SEO.' The Ownwell prospect asked about 'prompt visibility in LLMs.' This maps directly to the 'ai visibility tools' SEM cluster. Product landing pages should use 'AI visibility' language, not generic 'AI SEO.'",
    keywords: [
      { term: "ai search optimization", volume: "2,000", kd: "60", trend: "+9,385%", semData: "4 clicks", gsc: "Via case studies", status: "Deprioritize" },
      { term: "ai visibility tools", volume: "--", kd: "--", trend: "--", semData: "56 clicks, 5 leads", gsc: "--", status: "SEM: top converter" },
      { term: "ai visibility tracker", volume: "--", kd: "--", trend: "--", semData: "16 clicks, 2 leads", gsc: "--", status: "SEM: high intent" },
      { term: "content engineering", volume: "--", kd: "--", trend: "--", semData: "--", gsc: "139 clicks, 599 cit.", status: "GSC: performing" },
      { term: "content refresh strategy", volume: "--", kd: "--", trend: "--", semData: "--", gsc: "30 clicks, 659 cit.", status: "GSC: performing" },
    ],
  },
  {
    id: "chatgpt",
    label: "CHATGPT SEO",
    color: "#0a2e14",
    priority: "MID-FUNNEL BRIDGE",
    priorityBg: "#002910",
    priorityText: "#00e676",
    totalVolume: "~3,000",
    keywordCount: "~50",
    avgKD: "Medium",
    avgCPC: "--",
    semSignal: "2 leads, 53 clicks, 4.4% CTR",
    trend: "Stable",
    competitorDensity: "Medium",
    airopsPosition: "Strong potential",
    rationale:
      "Most keywords in this cluster have zero Semrush volume -- they're emerging patterns not yet indexed. People searching 'how to rank on chatgpt' are the exact audience for AEO. Build mid-funnel bridge content linking ChatGPT-specific intent to the AEO framework.",
    semInsight: "SEM validates demand: 'chatgpt seo' drove 12 clicks, 'rank on chatgpt' drove 9 clicks and 1 lead. 'how to get ranked in chatgpt' converted at $5.45 CpL.",
    gscInsight: "AirOps already has GSC traction on ChatGPT-adjacent content. 'does chatgpt give the same answers to everyone' drove 96 clicks from 35K impressions. 'what model does chatgpt use' drove 49 clicks. These informational pages generate traffic but aren't conversion-oriented. A 'how to rank on ChatGPT' page connecting to AEO could bridge this gap.",
    gongInsight: "In the Ownwell call, the prospect specifically mentioned 'prompt visibility in LLMs and ChatGPT' as paired concepts. Prospects don't separate ChatGPT from the broader AEO story -- they see it as one surface within the AI answer ecosystem. Content should mirror this framing.",
    keywords: [
      { term: "chatgpt seo", volume: "--", kd: "--", trend: "Not in Semrush", semData: "12 clicks", gsc: "--", status: "SEM signal" },
      { term: "rank on chatgpt", volume: "--", kd: "--", trend: "--", semData: "9 clicks, 1 lead", gsc: "--", status: "SEM signal" },
      { term: "does chatgpt give same answers", volume: "--", kd: "--", trend: "--", semData: "--", gsc: "96 clicks, 35K imp.", status: "GSC: traffic driver" },
      { term: "how to show up in ai search", volume: "--", kd: "--", trend: "--", semData: "5 clicks, 11.1% CTR", gsc: "--", status: "SEM signal" },
    ],
  },
];

const STATUS_COLORS = {
  Ranking: "#00e676", Opportunity: "#EEFF8C", Gap: "#ff6b6b", "Hard to rank": "#ff4444",
  "High priority": "#00ff64", Deprioritize: "#333", Ambiguous: "#555",
  "SEM signal": "#008c44", "SEM: top converter": "#00ff64", "SEM: high intent": "#00e676",
  "SEM: best CpL": "#00ff64", "GSC signal": "#CCFFE0", "GSC: performing": "#CCFFE0",
  "GSC: traffic driver": "#CCFFE0",
};
const STATUS_TEXT = {
  Ranking: "#000d05", Opportunity: "#000d05", Gap: "#fff", "Hard to rank": "#fff",
  "High priority": "#000d05", Deprioritize: "#777", Ambiguous: "#aaa",
  "SEM signal": "#fff", "SEM: top converter": "#000d05", "SEM: high intent": "#000d05",
  "SEM: best CpL": "#000d05", "GSC signal": "#000d05", "GSC: performing": "#000d05",
  "GSC: traffic driver": "#000d05",
};

export default function App() {
  const [activeCluster, setActiveCluster] = useState("aeo");
  const active = CLUSTERS.find((c) => c.id === activeCluster);

  const Section = ({ label, color, children }) => (
    <div style={{ background: "#ffffff06", padding: 14, marginBottom: 10, borderLeft: `2px solid ${color}` }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: color, marginBottom: 6 }}>{label}</div>
      <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, color: "#ccc" }}>{children}</p>
    </div>
  );

  return (
    <div style={{ background: "#0b0e16", minHeight: "100vh", color: "#fff", fontFamily: "'Helvetica Neue', sans-serif", padding: "32px 24px" }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#00ff64", marginBottom: 12 }}>
          KEYWORD CLUSTER ANALYSIS
        </div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0, marginBottom: 8 }}>
          Which clusters does AirOps need to own
        </h1>
        <p style={{ color: "#a5aab6", fontSize: 13, margin: 0, maxWidth: 700, lineHeight: 1.5 }}>
          Four data layers: Semrush organic (20K keywords), Google Ads SEM (968 search terms), Google Search Console (airops.com), and Gong call transcripts. Organic drives strategy. SEM, GSC, and Gong validate.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 1, marginBottom: 28, background: "#ffffff06" }}>
        {CLUSTERS.map((c) => (
          <button key={c.id} onClick={() => setActiveCluster(c.id)} style={{
            background: activeCluster === c.id ? "#ffffff0a" : "#0b0e16", border: "none",
            borderLeft: activeCluster === c.id ? `3px solid ${c.color}` : "3px solid transparent",
            padding: "14px 12px", cursor: "pointer", textAlign: "left",
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: c.color, marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 18, fontWeight: 600, fontFamily: "Georgia, serif", color: "#fff", marginBottom: 2 }}>{c.totalVolume}</div>
            <div style={{ fontSize: 10, color: "#676c79", marginBottom: 6 }}>{c.keywordCount} kws · KD {c.avgKD}</div>
            <div style={{ display: "inline-block", background: c.priorityBg, color: c.priorityText, fontFamily: "'DM Mono', monospace", fontSize: 8, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 6px" }}>{c.priority}</div>
          </button>
        ))}
      </div>

      {active && (
        <div style={{ border: "1px solid #ffffff12", padding: 24, marginBottom: 24 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 14 }}>{active.label}</div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(105px, 1fr))", gap: 8, marginBottom: 16 }}>
            {[["Organic Vol", active.totalVolume], ["Keywords", active.keywordCount], ["Avg KD", active.avgKD], ["Org CPC", active.avgCPC], ["Trend", active.trend], ["Competition", active.competitorDensity]].map(([l, v]) => (
              <div key={l} style={{ background: "#ffffff06", padding: "6px 10px" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "0.06em", textTransform: "uppercase", color: "#676c79", marginBottom: 2 }}>{l}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{v}</div>
              </div>
            ))}
          </div>

          <Section label="ORGANIC RATIONALE" color={active.color}>{active.rationale}</Section>
          <Section label={`SEM VALIDATION · ${active.semSignal}`} color="#00ff64">{active.semInsight}</Section>
          <Section label="GSC SIGNAL (airops.com)" color="#CCFFE0">{active.gscInsight}</Section>
          <Section label="GONG: PROSPECT LANGUAGE" color="#EEFF8C">{active.gongInsight}</Section>

          <div style={{ overflowX: "auto", marginTop: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #ffffff15" }}>
                  {["Keyword", "Org Vol", "KD", "Org Trend", "SEM Signal", "GSC Signal", "Status"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "6px 7px", fontFamily: "'DM Mono', monospace", fontSize: 8, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#676c79", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {active.keywords.map((kw, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #ffffff06" }}>
                    <td style={{ padding: "7px 7px", color: "#fff", fontWeight: 500, fontSize: 12 }}>{kw.term}</td>
                    <td style={{ padding: "7px 7px", color: "#a5aab6", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{kw.volume}</td>
                    <td style={{ padding: "7px 7px", color: "#a5aab6", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{kw.kd}</td>
                    <td style={{ padding: "7px 7px", color: kw.trend.includes("+") || kw.trend.includes("→") ? "#00e676" : "#a5aab6", fontSize: 11 }}>{kw.trend}</td>
                    <td style={{ padding: "7px 7px", fontSize: 11, color: kw.semData.includes("lead") ? "#00ff64" : kw.semData.includes("click") ? "#CCFFE0" : "#555" }}>{kw.semData}</td>
                    <td style={{ padding: "7px 7px", fontSize: 11, color: kw.gsc.includes("click") || kw.gsc.includes("cit") ? "#CCFFE0" : "#555" }}>{kw.gsc}</td>
                    <td style={{ padding: "7px 7px" }}>
                      <span style={{ display: "inline-block", background: STATUS_COLORS[kw.status] || "#444", color: STATUS_TEXT[kw.status] || "#fff", fontFamily: "'DM Mono', monospace", fontSize: 8, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 6px", whiteSpace: "nowrap" }}>{kw.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div style={{ border: "1px solid #00ff6425", padding: 24, background: "#00ff6406" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#00ff64", marginBottom: 12 }}>RECOMMENDATION</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.3 }}>
          AEO is the cluster. LLM is the gap. GEO is the redirect. All four data layers confirm.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 5, color: "#00e676" }}>1. AEO: Defend and expand</div>
            <p style={{ fontSize: 12, color: "#a5aab6", margin: 0, lineHeight: 1.55 }}>
              7,365 organic keywords, 12 SEM leads, 2,800+ GSC citations, prospects using "AEO" in Gong calls. The pillar page ranks at position 21.8 -- move it to page 1 and organic clicks multiply. Prioritize commercial terms: "aeo tools," "aeo services," "aeo agency" (all KD 1-10). Build "aeo software" and "aeo strategy" pages based on SEM lead signals.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 5, color: "#008c44" }}>2. LLM Optimization: Fastest ROI</div>
            <p style={{ fontSize: 12, color: "#a5aab6", margin: 0, lineHeight: 1.55 }}>
              Avg KD 7.6, $3.90 CpL in SEM, one GSC page already driving 35 clicks with 316% citation growth. Prospects ask about "prompt visibility in LLMs" on calls. Build 3-5 pillar pieces: "llm seo," "llm visibility tools," "llm ranking." AirOps has only one LLM page -- the upside is enormous.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 5, color: "#CCFFE0" }}>3. GEO: Organic redirect only</div>
            <p style={{ fontSize: 12, color: "#a5aab6", margin: 0, lineHeight: 1.55 }}>
              $367 CpL, 2.9% CTR, no dedicated GSC page, prospects don't use the term "GEO" on calls. Build a "GEO vs AEO" bridge page (captures 8,300/mo head term) and a "generative engine optimization tools" page (KD 14). Route traffic to AEO. Reduce paid.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 5, color: "#676c79" }}>4. AI Visibility: Paid + product pages</div>
            <p style={{ fontSize: 12, color: "#a5aab6", margin: 0, lineHeight: 1.55 }}>
              17 SEM leads, 7.0% CTR, prospects say "AI visibility" on Gong calls. Organic is hard (KD 25+, Profound owns). Build dedicated product landing pages for "ai visibility tools," "ai visibility tracker." Let AEO pillar content link down. Invest paid budget here.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, padding: 14, background: "#ffffff06", borderLeft: "2px solid #EEFF8C" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#EEFF8C", marginBottom: 6 }}>GONG SIGNAL WORTH NOTING</div>
        <p style={{ fontSize: 12, lineHeight: 1.6, margin: 0, color: "#ddd" }}>
          Prospects don't say "GEO." They say "AEO," "AI visibility," "prompt visibility," and "LLM citations." They frame their need as: content creation + refresh for AEO/SEO, automated triggers when visibility drops, and tracking across ChatGPT/Perplexity/AI Overviews. The Ownwell prospect specifically asked for GSC integration that signals when prompt visibility drops in LLMs -- a feature AirOps doesn't yet have but directly validates the LLM visibility cluster as a product and content priority.
        </p>
      </div>

      {/* NEXT STEPS: 10 PAGES TO CREATE */}
      <div style={{ marginTop: 28, border: "1px solid #00ff6430", padding: 24, background: "#00ff6408" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#00ff64", marginBottom: 8 }}>NEXT 2 WEEKS</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.3 }}>10 pages to create</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <a href="https://app.airops.com/workflows" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#00ff64", color: "#000d05", fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "10px 18px", textDecoration: "none", border: "none", cursor: "pointer" }}>
              Kickstart Research in Workflow
              <span style={{ fontSize: 14 }}>&#8599;</span>
            </a>
            <a href="https://app.airops.com/grids" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", color: "#00ff64", fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "9px 17px", textDecoration: "none", border: "1px solid #00ff6450", cursor: "pointer" }}>
              Scale Writing in Grid
              <span style={{ fontSize: 14 }}>&#8599;</span>
            </a>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #ffffff15" }}>
                {["#", "Page Title", "Cluster", "Primary Keyword", "KD", "Volume", "Signal", "Week"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 7px", fontFamily: "'DM Mono', monospace", fontSize: 8, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#676c79", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { n: 1, title: "AEO Software: The Complete Platform Guide", cluster: "AEO", clusterColor: "#00e676", keyword: "aeo software", kd: "--", vol: "SEM only", signal: "3 leads, $7.08 CPC", week: "Week 1" },
                { n: 2, title: "AEO Strategy: How to Build Your 2026 Playbook", cluster: "AEO", clusterColor: "#00e676", keyword: "aeo strategy", kd: "--", vol: "SEM only", signal: "1 lead via SEM", week: "Week 1" },
                { n: 3, title: "AEO Services: What to Look For in a Partner", cluster: "AEO", clusterColor: "#00e676", keyword: "aeo services", kd: "1", vol: "700", signal: "0 → 1,188/mo trend", week: "Week 1" },
                { n: 4, title: "AEO Agency: How to Choose the Right One", cluster: "AEO", clusterColor: "#00e676", keyword: "aeo agency", kd: "1", vol: "800", signal: "0 → 1,524/mo trend", week: "Week 1" },
                { n: 5, title: "LLM SEO: The Complete Guide to LLM Optimization", cluster: "LLM", clusterColor: "#008c44", keyword: "llm seo", kd: "24", vol: "1,200", signal: "+3,267% trend", week: "Week 1" },
                { n: 6, title: "LLM Visibility Tools: Track Your AI Citations", cluster: "LLM", clusterColor: "#008c44", keyword: "llm visibility tools", kd: "--", vol: "SEM only", signal: "17 clicks in SEM", week: "Week 2" },
                { n: 7, title: "Best LLM SEO Tools for Brand Monitoring", cluster: "LLM", clusterColor: "#008c44", keyword: "llm seo tools", kd: "--", vol: "SEM only", signal: "8 clicks, 11.8% CTR", week: "Week 2" },
                { n: 8, title: "GEO vs AEO: What's the Difference (and Which Matters)", cluster: "GEO", clusterColor: "#CCFFE0", keyword: "geo vs aeo", kd: "~15", vol: "Bridge for 8.3K", signal: "Redirect to AEO pillar", week: "Week 2" },
                { n: 9, title: "Generative Engine Optimization Tools (2026)", cluster: "GEO", clusterColor: "#CCFFE0", keyword: "generative engine optimization tools", kd: "14", vol: "1,000", signal: "0 → 1,524/mo trend", week: "Week 2" },
                { n: 10, title: "How to Rank on ChatGPT: An AEO Guide", cluster: "ChatGPT", clusterColor: "#0a2e14", keyword: "rank on chatgpt", kd: "--", vol: "SEM only", signal: "9 clicks, 1 lead", week: "Week 2" },
              ].map((p) => (
                <tr key={p.n} style={{ borderBottom: "1px solid #ffffff08" }}>
                  <td style={{ padding: "9px 7px", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#676c79" }}>{p.n}</td>
                  <td style={{ padding: "9px 7px", color: "#fff", fontWeight: 500, fontSize: 12, minWidth: 220 }}>{p.title}</td>
                  <td style={{ padding: "9px 7px" }}>
                    <span style={{ display: "inline-block", background: p.clusterColor, color: p.clusterColor === "#CCFFE0" || p.clusterColor === "#00e676" ? "#000d05" : "#fff", fontFamily: "'DM Mono', monospace", fontSize: 8, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 6px", whiteSpace: "nowrap" }}>{p.cluster}</span>
                  </td>
                  <td style={{ padding: "9px 7px", color: "#a5aab6", fontSize: 11 }}>{p.keyword}</td>
                  <td style={{ padding: "9px 7px", color: "#a5aab6", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{p.kd}</td>
                  <td style={{ padding: "9px 7px", color: "#a5aab6", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{p.vol}</td>
                  <td style={{ padding: "9px 7px", fontSize: 11, color: p.signal.includes("lead") ? "#00ff64" : p.signal.includes("click") || p.signal.includes("CTR") ? "#CCFFE0" : "#00e676" }}>{p.signal}</td>
                  <td style={{ padding: "9px 7px" }}>
                    <span style={{ display: "inline-block", background: p.week === "Week 1" ? "#00ff6420" : "#ffffff0a", color: p.week === "Week 1" ? "#00ff64" : "#a5aab6", fontFamily: "'DM Mono', monospace", fontSize: 8, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 6px", whiteSpace: "nowrap" }}>{p.week}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGES TO REFRESH */}
      <div style={{ marginTop: 16, border: "1px solid #EEFF8C30", padding: 24, background: "#EEFF8C06" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#EEFF8C", marginBottom: 8 }}>REFRESH QUEUE</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.3 }}>5 existing pages to optimize</div>
          </div>
          <a href="https://app.airops.com/workflows" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EEFF8C", color: "#000d05", fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "10px 18px", textDecoration: "none", border: "none", cursor: "pointer" }}>
            Run Refresh Workflow
            <span style={{ fontSize: 14 }}>&#8599;</span>
          </a>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #ffffff15" }}>
                {["Page", "Current State", "Opportunity", "Priority"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 7px", fontFamily: "'DM Mono', monospace", fontSize: 8, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "#676c79", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { page: "/blog/aeo-answer-engine-optimization", state: "61 clicks, 22K imp, pos 21.8", opportunity: "Ranking page 2-3. Move to page 1 and clicks multiply 5-10x. Add structured data, update for 2026 stats, internal link from all new AEO pages.", priority: "Critical" },
                { page: "/blog/aeo-vs-seo", state: "Clicks +600%, citations +1,565%", opportunity: "Momentum is surging. Expand with comparison tables, add 'aeo vs geo' section to capture adjacent queries, update competitive data.", priority: "High" },
                { page: "/blog/answer-engine-optimization-tools", state: "Clicks +440%, citations +2,156%", opportunity: "Best citation growth on the site. Add AirOps product screenshots, comparison with competitors, structured FAQ schema for AI answers.", priority: "High" },
                { page: "/blog/llm-brand-citation-tracking", state: "35 clicks, 23.5K imp, +316% cit.", opportunity: "Only LLM page on the site. Expand to cover 'llm seo' and 'llm visibility' keywords. Add how-to sections. Internal link to new LLM pillar pages.", priority: "High" },
                { page: "/blog/content-refresh-strategy-guide", state: "30 clicks, 6.3K imp, 659 cit.", opportunity: "Strong citation performance. Update with AEO-specific refresh methodology. Add data from GSC showing refresh impact on AI visibility.", priority: "Medium" },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #ffffff08" }}>
                  <td style={{ padding: "9px 7px", color: "#fff", fontWeight: 500, fontSize: 12, minWidth: 240 }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{r.page}</span>
                  </td>
                  <td style={{ padding: "9px 7px", color: "#CCFFE0", fontSize: 11, minWidth: 160 }}>{r.state}</td>
                  <td style={{ padding: "9px 7px", color: "#a5aab6", fontSize: 12, lineHeight: 1.5, minWidth: 280 }}>{r.opportunity}</td>
                  <td style={{ padding: "9px 7px" }}>
                    <span style={{ display: "inline-block", background: r.priority === "Critical" ? "#ff4444" : r.priority === "High" ? "#EEFF8C" : "#ffffff15", color: r.priority === "Critical" ? "#fff" : r.priority === "High" ? "#000d05" : "#a5aab6", fontFamily: "'DM Mono', monospace", fontSize: 8, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 6px", whiteSpace: "nowrap" }}>{r.priority}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 28, paddingTop: 14, borderTop: "1px solid #ffffff10", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#676c79" }}>AIROPS COMPETITIVE INTELLIGENCE</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#676c79" }}>SEMRUSH + GOOGLE ADS + GSC + GONG · MARCH 2026</div>
      </div>
    </div>
  );
}
