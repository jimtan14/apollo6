import Anthropic from "@anthropic-ai/sdk";

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { keywords } = req.body;
  if (!keywords || !Array.isArray(keywords) || keywords.length !== 5) {
    return res.status(400).json({ error: "Exactly 5 seed keywords required" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const COLORS = ["#00e676", "#008c44", "#CCFFE0", "#005c2e", "#0a2e14"];
  const PRIORITIES = ["OWN THIS", "CLAIM EARLY", "CAPTURE + REDIRECT", "SUPPORT ONLY", "MID-FUNNEL BRIDGE"];
  const PRIORITY_CONFIGS = [
    { bg: "#00e676", text: "#000d05" },
    { bg: "#008c44", text: "#ffffff" },
    { bg: "#EEFF8C", text: "#000d05" },
    { bg: "#676c79", text: "#ffffff" },
    { bg: "#002910", text: "#00e676" },
  ];

  const prompt = `You are an expert SEO and content strategy analyst for a SaaS company called AirOps that builds AI-powered content and visibility tools. Analyze the following 5 seed keywords as keyword clusters and generate a comprehensive, data-informed analysis.

Seed Keywords:
${keywords.map((k, i) => `${i + 1}. ${k}`).join("\n")}

Use your knowledge of current SEO landscapes, search trends, and competitive dynamics to provide realistic estimates. Be specific with numbers, not vague.

Return a JSON object with this EXACT structure (no markdown, no code fences, just raw JSON):

{
  "clusters": [
    {
      "id": "slug-id",
      "label": "UPPERCASE LABEL",
      "color": "${COLORS[0]}",
      "priority": "${PRIORITIES[0]}",
      "priorityBg": "${PRIORITY_CONFIGS[0].bg}",
      "priorityText": "${PRIORITY_CONFIGS[0].text}",
      "totalVolume": "108,030",
      "keywordCount": "7,365",
      "avgKD": "11",
      "avgCPC": "$1.10",
      "semSignal": "12 leads, 216 clicks, 3.6% CTR",
      "trend": "Accelerating",
      "competitorDensity": "Moderate",
      "airopsPosition": "Category leader",
      "rationale": "2-4 sentences explaining organic opportunity with specific data points",
      "semInsight": "2-3 sentences on paid search validation with CPC, CTR, lead data",
      "gscInsight": "2-3 sentences on Google Search Console signals for airops.com",
      "gongInsight": "2-3 sentences on how prospects describe this topic in sales calls",
      "keywords": [
        {
          "term": "keyword phrase",
          "volume": "1,200",
          "kd": "24",
          "trend": "+3,267%",
          "semData": "2 clicks",
          "gsc": "--",
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
    "headline": "One punchy sentence summarizing the strategy across all 5 clusters",
    "items": [
      {
        "title": "1. Cluster: Action Verb",
        "description": "2-3 sentence actionable recommendation",
        "color": "#00e676"
      }
    ]
  },
  "gongSignal": "2-3 sentences summarizing how prospects talk about these topics in sales conversations, noting which terms they use vs don't use"
}

RULES:
- Cluster 1 uses color ${COLORS[0]}, priority "${PRIORITIES[0]}", priorityBg "${PRIORITY_CONFIGS[0].bg}", priorityText "${PRIORITY_CONFIGS[0].text}"
- Cluster 2 uses color ${COLORS[1]}, priority "${PRIORITIES[1]}", priorityBg "${PRIORITY_CONFIGS[1].bg}", priorityText "${PRIORITY_CONFIGS[1].text}"
- Cluster 3 uses color ${COLORS[2]}, priority "${PRIORITIES[2]}", priorityBg "${PRIORITY_CONFIGS[2].bg}", priorityText "${PRIORITY_CONFIGS[2].text}"
- Cluster 4 uses color ${COLORS[3]}, priority "${PRIORITIES[3]}", priorityBg "${PRIORITY_CONFIGS[3].bg}", priorityText "${PRIORITY_CONFIGS[3].text}"
- Cluster 5 uses color ${COLORS[4]}, priority "${PRIORITIES[4]}", priorityBg "${PRIORITY_CONFIGS[4].bg}", priorityText "${PRIORITY_CONFIGS[4].text}"
- Each cluster must have 6-10 keywords
- pagesToCreate must have exactly 10 items (first 5 = Week 1, last 5 = Week 2)
- pagesToRefresh must have exactly 5 items
- recommendation.items must have exactly 4 items (for the top 4 clusters)
- recommendation.items colors should be: ${COLORS[0]}, ${COLORS[1]}, ${COLORS[2]}, ${COLORS[3]}
- Use realistic SEO metrics based on your knowledge. Be specific, not generic.
- keyword status must be one of: "Ranking", "Opportunity", "Gap", "Hard to rank", "High priority", "Deprioritize", "Ambiguous", "SEM signal", "SEM: top converter", "SEM: high intent", "SEM: best CpL", "GSC signal", "GSC: performing", "GSC: traffic driver"
- pagesToRefresh priority must be one of: "Critical", "High", "Medium"
- Volume and KD can be "--" if unknown. Use "SEM only" for vol when only SEM data exists.
- Return ONLY the JSON object. No explanation, no markdown.`;

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].text;

    // Try to extract JSON from the response
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      // Try to find JSON in the text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        data = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse response as JSON");
      }
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Analysis error:", error);
    return res.status(500).json({ error: error.message || "Analysis failed" });
  }
}
