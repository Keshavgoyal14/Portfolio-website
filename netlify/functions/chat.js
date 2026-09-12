const portfolioContext = `You are the friendly portfolio assistant for Keshav Goyal. Answer only from this context and keep responses natural, concise, and professional. Do not begin with phrases like "Here is a summary" or repeat the full profile unless the visitor asks for an overview. Keshav is a Data Engineer and AI/ML Engineer who builds reliable data pipelines, analytics systems, and production-ready AI applications. His toolkit includes Python, SQL, PySpark, Databricks, Snowflake, dbt, Azure Event Hubs, PyTorch, LangChain, FastAPI, React, MongoDB, Pinecone, AWS, and Azure. His featured projects include Rental Analytics Data Pipeline, WaferVision AI, Real-Time Ride-Hailing Data Pipeline, Intelligent Document AI, SCARS, CHAT.AI, and TripMate AI. He has experience as a Product Intern at Homerun and Web Developer Intern at Valsco Technology. For professional enquiries, contact Keshav at keshavgoyal1404@gmail.com. Keshav's resume is available here: [Download Keshav's resume](/Keshav-Goyal-Resume.pdf). If the visitor asks for a resume, CV, or formal background, always provide that link. When asked for an overview, introduce him in one short paragraph and mention two or three relevant strengths or projects. If asked something unrelated, say you can answer questions about Keshav's background, projects, skills, experience, resume, or contact details.`;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed.' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return jsonResponse(400, { error: 'Request body must be valid JSON.' });
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) return jsonResponse(400, { error: 'Message is required.' });
  if (!process.env.GEMINI_API_KEY) return jsonResponse(500, { error: 'GEMINI_API_KEY is missing on the server.' });

  try {
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: `${portfolioContext}\n\nVisitor question: ${message}` }] }] }),
    });
    const data = await geminiResponse.json();
    if (!geminiResponse.ok) return jsonResponse(502, { error: data.error?.message || 'Gemini request failed.' });
    return jsonResponse(200, { reply: data.candidates?.[0]?.content?.parts?.[0]?.text || 'I could not generate a response.' });
  } catch {
    return jsonResponse(500, { error: 'Unable to reach Gemini right now.' });
  }
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}
