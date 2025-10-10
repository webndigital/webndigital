import type { APIRoute } from 'astro';
import OpenAI from 'openai';

// Route definitions - AI will analyze the question and route to the best page
const routes = [
  {
    path: '/about',
    description: 'Şirket hakkında bilgi, ekip, vizyonumuz'
  },
  {
    path: '/services',
    description: 'Sunduğumuz hizmetler ve çözümler'
  },
  {
    path: '/portfolio',
    description: 'Geçmiş projelerimiz ve başarı hikayeleri'
  },
  {
    path: '/blog',
    description: 'Blog yazıları ve içerikler'
  },
  {
    path: '/contact',
    description: 'İletişim bilgileri ve iletişim formu'
  }
];

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY
});

// Prerender this route as server-rendered
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    let query: string;
    
    // Try to parse JSON
    try {
      const body = await request.text();
      console.log('📥 Raw body:', body);
      
      if (!body || body.trim() === '') {
        throw new Error('Empty body');
      }
      
      const data = JSON.parse(body);
      console.log('📦 Parsed data:', data);
      query = data.query;
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request format',
          path: '/contact',
          suggestions: []
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    console.log('🔍 Query:', query);

    // Basic validation
    if (!query || query.trim().length < 3) {
      return new Response(
        JSON.stringify({ 
          error: 'Lütfen en az 3 karakter girin',
          suggestions: []
        }),
        { status: 400 }
      );
    }

    if (query.trim().length > 200) {
      return new Response(
        JSON.stringify({ 
          error: 'Sorgunuz çok uzun. Lütfen daha kısa bir soru sorun.',
          suggestions: []
        }),
        { status: 400 }
      );
    }

    // OpenAI Moderation API - Check for inappropriate content
    try {
      const moderation = await openai.moderations.create({
        input: query
      });

      const flagged = moderation.results[0]?.flagged;
      
      if (flagged) {
        console.warn('🚫 Inappropriate content detected:', query);
        return new Response(
          JSON.stringify({ 
            error: 'Lütfen uygun bir soru sorun.',
            suggestions: []
          }),
          { status: 400 }
        );
      }
    } catch (moderationError) {
      console.error('⚠️ Moderation check failed:', moderationError);
      // Continue even if moderation fails - don't block legitimate queries
    }

    // OpenAI'ya soru analizi için prompt
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
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt }
      ],
      temperature: 0.2,
      max_tokens: 20
    });

    const aiResponse = completion.choices[0]?.message?.content?.trim() || '/contact';
    console.log('🤖 AI Response:', aiResponse);
    
    // Validate AI response
    const matchedRoute = routes.find(r => aiResponse.includes(r.path));
    const finalPath = matchedRoute ? matchedRoute.path : '/contact';
    
    console.log('✅ Final path:', finalPath);

    // Get related suggestions
    const suggestions = routes
      .filter(r => r.path !== finalPath)
      .slice(0, 2)
      .map(r => ({
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
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('AI Search Error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Arama sırasında bir hata oluştu',
        path: '/contact',
        suggestions: []
      }),
      { status: 500 }
    );
  }
};
