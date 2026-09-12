import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const app = express();
const port = Number(process.env.PORT || process.env.API_PORT || 3001);
const resumePath = path.resolve(process.cwd(), 'frontend/public/Keshav-Goyal-Resume.pdf');
let resumeText = '';
const portfolioContext = `You are the friendly portfolio assistant for Keshav Goyal. Answer only from this context and keep responses natural, concise, and professional. Do not begin with phrases like "Here is a summary" or repeat the full profile unless the visitor asks for an overview. Keshav is a Data Engineer and AI/ML Engineer who builds reliable data pipelines, analytics systems, and production-ready AI applications. His toolkit includes Python, SQL, PySpark, Databricks, Snowflake, dbt, Azure Event Hubs, PyTorch, LangChain, FastAPI, React, MongoDB, Pinecone, AWS, and Azure. His featured projects include Rental Analytics Data Pipeline, WaferVision AI, Real-Time Ride-Hailing Data Pipeline, Intelligent Document AI, SCARS, an LLM-powered document retrieval system, CHAT.AI, and TripMate AI. He has experience as a Product Intern at Homerun and Web Developer Intern at Valsco Technology. For professional enquiries, contact Keshav at keshavgoyal1404@gmail.com. Keshav's resume is available here: [Download Keshav's resume](/Keshav-Goyal-Resume.pdf). If the visitor asks for a resume, CV, or formal background, always provide that link. When asked for an overview, introduce him in one short paragraph and mention two or three relevant strengths or projects. If asked something unrelated, say you can answer questions about Keshav's background, projects, skills, experience, resume, or contact details.`;

app.use(cors());
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.resolve(process.cwd(), 'dist')));

app.post('/api/chat', async (request, response) => {
  const message = typeof request.body?.message === 'string' ? request.body.message.trim() : '';
  if (!message) return response.status(400).json({ error: 'Message is required.' });
  if (!process.env.GEMINI_API_KEY) return response.status(500).json({ error: 'GEMINI_API_KEY is missing on the server.' });

  try {
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: `${portfolioContext}\n\nFull resume context:\n${resumeText}\n\nVisitor question: ${message}` }] }] }),
    });
    const data = await geminiResponse.json();
    if (!geminiResponse.ok) return response.status(502).json({ error: data.error?.message || 'Gemini request failed.' });
    return response.json({ reply: data.candidates?.[0]?.content?.parts?.[0]?.text || 'I could not generate a response.' });
  } catch (error) {
    return response.status(500).json({ error: 'Unable to reach Gemini right now.' });
  }
});

app.get('*', (request, response, next) => {
  if (request.path.startsWith('/api/')) return next();
  return response.sendFile(path.resolve(process.cwd(), 'dist/index.html'));
});

async function start() {
  try {
    const resumeBuffer = await fs.readFile(resumePath);
    const pdfDocument = await getDocument({ data: new Uint8Array(resumeBuffer), useWorkerFetch: false, isEvalSupported: false }).promise;
    const pages = [];
    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
      const page = await pdfDocument.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => item.str).join(' '));
    }
    resumeText = pages.join('\n').replace(/\s+/g, ' ').trim();
    console.log(`Resume ingested: ${resumeText.length} characters`);
  } catch (error) {
    console.warn(`Resume ingestion skipped: ${error.message}`);
  }
  app.listen(port, () => console.log(`API server running at http://localhost:${port}`));
}

start();
