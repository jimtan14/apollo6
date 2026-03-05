export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
  }

  const { keywords } = await req.json();
  if (!keywords || !Array.isArray(keywords) || keywords.length < 3 || keywords.length > 5) {
    return new Response(JSON.stringify({ error: "Between 3 and 5 seed keywords required" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY not configured. Add it in Vercel project settings." }), { status: 500, headers: { "Content-Type": "application/json" } });
  }

  const count = keywords.length;
  const COLORS = ["#00e676", "#008c44", "#CCFFE0", "#005c2e", "#0a2e14"];
  const PRIORITIES = ["OWN THIS", "CLAIM EARLY", "CAPTURE + REDIRECT", "SUPPORT ONLY", "MID-FUNNEL BRIDGE"];
  const PRIORITY_CONFIGS = [
    { bg: "#00e676", text: "#000d05" },
    { bg: "#008c44", text: "#ffffff" },
    { bg: "#EEFF8C", text: "#000d05" },
    { bg: "#676c79", text: "#ffffff" },
    { bg: "#002910", text: "#00e676" },
  ];

  const clusterRules = keywords.map((_, i) =>
    `- Cluster ${i + 1} uses color "${COLORS[i]}", priority "${PRIORITIES[i]}", priorityBg "${PRIORITY_CONFIGS[i].bg}", priorityText "${PRIORITY_CONFIGS[i].text}"`
  ).join("\n");

  const recCount = Math.min(count, 4);
  const recColors = COLORS.slice(0, recCount).map(c => `"${c}"`).join(", ");
  const pagesPerWeek = Math.ceil(10 / 2);

  const prompt = `You are an expert SEO and content strategy analyst for a SaaS company that builds AI-powered content and visibility tools. Analyze the following ${count} seed keywords as keyword clusters and generate a comprehensive, data-informed analysis.

Seed Keywords:
${keywords.map((k, i) => `${i + 1}. ${k}`).join("\n")}

Use your knowledge of current SEO landscapes, search trends, and competitive dynamics to provide realistic estimates. Be specific with numbers, not vague. Write clearly so anyone can understand. Avoid em dashes. Use "." for empty data cells.

Return a JSON object with this EXACT structure (no markdown, no code fences, just raw JSON):

{
  "clusters": [
    {
      "id": "slug-id",
      "label": "UPPERCASE LABEL",
      "color": "#hex",
      "priority": "STRATEGIC PRIORITY",
      "priorityBg": "#hex",
      "priorityText": "#hex",
      "totalVolume": "108,030",
      "keywordCount": "7,365",
      "avgKD": "11",
      "avgCPC": "$1.10",
      "semSignal": "12 leads, 216 clicks, 3.6% CTR",
      "trend": "Accelerating",
      "competitorDensity": "Moderate",
      "airopsPosition": "Category leader",
      "rationale": "2-4 sentences. Clear and punchy. Explain what makes this cluster valuable with specific numbers.",
      "semInsight": "2-3 sentences on paid search validation with CPC, CTR, lead data.",
      "gscInsight": "2-3 sentences on Google Search Console signals.",
      "gongInsight": "2-3 sentences on how prospects describe this topic in sales calls.",
      "keywords": [
        {
          "term": "keyword phrase",
          "volume": "1,200",
          "kd": "24",
          "trend": "+3,267%",
          "semData": "2 clicks",
          "gsc": ".",
          "status": "Gap"
        }
      ]
    }
  ],
  "pagesToCreate": [
    {
      "n": 1,
      "title": "Full Page Title: With Subtitle",
      "cluster": "CLUSTER NAME",
      "clusterColor": "#hex",
      "keyword": "primary keyword",
      "kd": "11",
      "vol": "1,200",
      "signal": "data signal description",
      "week": "Week 1"
    }
  ],
  "pagesToRefresh": [
    {
      "page": "/blog/page-slug",
      "state": "current performance metrics",
      "opportunity": "specific optimization actions",
      "priority": "Critical"
    }
  ],
  "recommendation": {
    "headline": "One punchy sentence summarizing the strategy. Write it so a 5 year old could understand the gist.",
    "items": [
      {
        "title": "1. Cluster: Action Verb",
        "description": "2-3 sentence actionable recommendation. Simple, clear language. No jargon.",
        "color": "#00e676"
      }
    ]
  },
  "gongSignal": "2-3 sentences summarizing how prospects talk about these topics in sales conversations, noting which terms they use vs don't use"
}

RULES:
${clusterRules}
- You must produce exactly ${count} clusters (one per seed keyword)
- Each cluster must have 6-10 keywords
- pagesToCreate must have exactly 10 items (first ${pagesPerWeek} = Week 1, rest = Week 2). Distribute across all ${count} clusters.
- pagesToRefresh must have exactly 5 items
- recommendation.items must have exactly ${recCount} items (one for each of the top ${recCount} clusters)
- recommendation.items colors should be: ${recColors}
- Use realistic SEO metrics. Be specific with numbers.
- keyword status must be one of: "Ranking", "Opportunity", "Gap", "Hard to rank", "High priority", "Deprioritize", "Ambiguous", "SEM signal", "SEM: top converter", "SEM: high intent", "SEM: best CpL", "GSC signal", "GSC: performing", "GSC: traffic driver"
- pagesToRefresh priority must be one of: "Critical", "High", "Medium"
- Use "." for empty/unknown data cells. Use "SEM only" for vol when only SEM data exists.
- Do NOT use em dashes or "--" anywhere. Use "." for empty values.
- Return ONLY the JSON object. No explanation, no markdown.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 8000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return new Response(JSON.stringify({ error: `Anthropic API error: ${response.status} ${err}` }), { status: 502, headers: { "Content-Type": "application/json" } });
    }

    const result = await response.json();
    const text = result.content[0].text;

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        data = JSON.parse(jsonMatch[0]);
      } else {
        return new Response(JSON.stringify({ error: "Could not parse AI response" }), { status: 500, headers: { "Content-Type": "application/json" } });
      }
    }

    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Analysis failed" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
