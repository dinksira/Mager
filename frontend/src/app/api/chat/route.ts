import { NextRequest } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const MODEL = 'nvidia/nemotron-3-ultra-550b-a55b:free';

const SYSTEM_PROMPT = `You are MagerBot, the official AI assistant for Mager Software Solution PLC, a dynamic software development company based in Addis Ababa, Ethiopia. You help website visitors learn about the company, its services, team, and expertise. Keep responses friendly, professional, and concise.

About Mager Software Solution PLC:
- Full-service software development company engineering the digital future of Africa
- Based in Addis Ababa, Ethiopia
- Services: custom software development, web & mobile apps, AI/ML solutions, cloud architecture, UI/UX design, IT consulting
- Known for modern, scalable, and beautiful digital products
- Team of skilled developers, designers, and engineers passionate about technology

When answering:
- Be helpful and knowledgeable about Mager's services and capabilities
- If asked about something outside your knowledge, politely suggest the visitor contact Mager directly
- Never make up specific facts about team members, pricing, or project details you aren't sure about
- Keep responses concise and friendly`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages: userMessages, model } = body;

    if (!userMessages || !Array.isArray(userMessages) || userMessages.length === 0) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...userMessages,
    ];

    const selectedModel = model || MODEL;
    const useStream = true;

    const openrouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://magersoft.com',
        'X-Title': 'Mager Software Chat',
      },
      body: JSON.stringify({
        model: selectedModel,
        messages,
        stream: useStream,
      }),
    });

    if (!openrouterRes.ok) {
      const errText = await openrouterRes.text();
      console.error('OpenRouter error:', openrouterRes.status, errText);
      return new Response(JSON.stringify({ error: 'Failed to get response from AI' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(openrouterRes.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err) {
    console.error('Chat API error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
