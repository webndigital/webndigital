import OpenAI from 'openai';
export { renderers } from '../../renderers.mjs';

const routes = [
  {
    path: "/about",
    description: "Şirket hakkında bilgi, ekip, vizyonumuz"
  },
  {
    path: "/services",
    description: "Sunduğumuz hizmetler ve çözümler"
  },
  {
    path: "/portfolio",
    description: "Geçmiş projelerimiz ve başarı hikayeleri"
  },
  {
    path: "/blog",
    description: "Blog yazıları ve içerikler"
  },
  {
    path: "/contact",
    description: "İletişim bilgileri ve iletişim formu"
  }
];
const prerender = false;
const POST = async ({ request }) => {
  try {
    const openai = new OpenAI({
      apiKey: "your-openai-api-key-here"
    });
    let query;
    try {
      const body = await request.text();
      console.log("📥 Raw body:", body);
      if (!body || body.trim() === "") {
        throw new Error("Empty body");
      }
      const data = JSON.parse(body);
      console.log("📦 Parsed data:", data);
      query = data.query;
    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError);
      return new Response(
        JSON.stringify({
          error: "Invalid request format",
          path: "/contact",
          suggestions: []
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    console.log("🔍 Query:", query);
    if (!query || query.trim().length < 3) {
      return new Response(
        JSON.stringify({
          error: "Lütfen en az 3 karakter girin",
          suggestions: []
        }),
        { status: 400 }
      );
    }
    if (query.trim().length > 200) {
      return new Response(
        JSON.stringify({
          error: "Sorgunuz çok uzun. Lütfen daha kısa bir soru sorun.",
          suggestions: []
        }),
        { status: 400 }
      );
    }
    try {
      const moderation = await openai.moderations.create({
        input: query
      });
      const flagged = moderation.results[0]?.flagged;
      if (flagged) {
        console.warn("🚫 Inappropriate content detected:", query);
        return new Response(
          JSON.stringify({
            error: "Lütfen uygun bir soru sorun.",
            suggestions: []
          }),
          { status: 400 }
        );
      }
    } catch (moderationError) {
      console.error("⚠️ Moderation check failed:", moderationError);
    }
    const systemPrompt = `You are a smart routing assistant for a digital agency website. 
Analyze the user's question and route them to the most appropriate page.

Available pages:
- /about: Company information, team, who we are (keywords: about, who, team, company, hakkımızda, ekip)
- /services: Our services, what we do, solutions (keywords: service, what do you do, solutions, hizmet, çözüm)
- /portfolio: Past projects, case studies, how we work (keywords: projects, portfolio, case, examples, how do you do, proje, nasıl)
- /blog: Blog posts, articles (keywords: blog, article, yazı)
- /contact: Contact us, quote, pricing (keywords: contact, quote, price, iletişim, fiyat)

User question: "${query}"

Analyze this question and return ONLY the most appropriate path.
If asking about "how" we do projects or our work process, return /portfolio.
If asking about our projects or examples, return /portfolio.
If none fit well, return /contact.

RETURN ONLY THE PATH, nothing else. Example: /portfolio`;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt }
      ],
      temperature: 0.2,
      max_tokens: 20
    });
    const aiResponse = completion.choices[0]?.message?.content?.trim() || "/contact";
    console.log("🤖 AI Response:", aiResponse);
    const matchedRoute = routes.find((r) => aiResponse.includes(r.path));
    const finalPath = matchedRoute ? matchedRoute.path : "/contact";
    console.log("✅ Final path:", finalPath);
    const suggestions = routes.filter((r) => r.path !== finalPath).slice(0, 2).map((r) => ({
      path: r.path,
      text: r.description
    }));
    return new Response(
      JSON.stringify({
        path: finalPath,
        suggestions,
        query
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("AI Search Error:", error);
    return new Response(
      JSON.stringify({
        error: "Arama sırasında bir hata oluştu",
        path: "/contact",
        suggestions: []
      }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
