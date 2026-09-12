import React, { useEffect, useMemo, useState } from 'react';
import ThreeBackground from './ThreeBackground.jsx';
import JourneyGuide from './JourneyGuide.jsx';
import './interactive.css';

const profile = {
  name: 'Keshav Goyal',
  email: 'keshavgoyal1404@gmail.com',
  github: 'https://github.com/Keshavgoyal14',
  linkedin: 'https://linkedin.com/in/keshavgoyal14',
  leetcode: 'https://leetcode.com/u/Keshav_goyal14/',
};

const projects = [
  { title: 'Rental Analytics Data Pipeline', date: 'May 2026 — Jun 2026', category: 'Data Engineering', description: 'Built an end-to-end ELT pipeline using Snowflake, dbt, AWS S3, Python, and SQL with a layered Bronze-Silver-Gold architecture. Transformed raw booking, host, and listing data into clean, analytics-ready datasets, added incremental loading and historical change tracking, and created reusable transformations with automated data quality checks for missing values, duplicates, and broken relationships.', tags: ['Snowflake', 'dbt', 'AWS S3', 'Python', 'SQL'], repo: 'https://github.com/Keshavgoyal14' },
  { title: 'WaferVision AI — Semiconductor Wafer Defect Inspection Platform', date: 'Feb 2026 — Mar 2026', category: 'Computer Vision', description: 'Built an end-to-end wafer defect inspection pipeline with grayscale and resizing preprocessing, then trained a CNN ensemble on 4K+ wafer images for defect classification, achieving 91.05% test accuracy, 0.89 weighted F1, and 0.90 macro recall. A FastAPI inference service processes wafer images in real time, stores artifacts in AWS S3, and saves predictions, metadata, and heatmap URLs in MongoDB. A React dashboard adds GenAI-powered insights for analyzing defects and tracing manufacturing root causes.', tags: ['CNN', 'YOLOv8', 'PyTorch', 'FastAPI', 'React', 'MongoDB', 'AWS'], repo: 'https://github.com/Keshavgoyal14/Wafer-Map-Pattern-System' },
  { title: 'Real-Time Ride-Hailing Data Pipeline', date: 'May 2026 — Jun 2026', category: 'Data Engineering', description: 'Built a real-time data pipeline using FastAPI, Azure Event Hubs, PySpark, Databricks, and SQL to collect and process ride events. Processed historical and streaming data through a Bronze-Silver-Gold architecture with cleaning, duplicate removal, joins, and validation, then designed organized datasets for passengers, drivers, vehicles, payments, bookings, and rides to support efficient analysis and reporting.', tags: ['FastAPI', 'Azure Event Hubs', 'PySpark', 'Databricks', 'SQL', 'Data Engineering'], repo: 'https://github.com/Keshavgoyal14' },
  { title: 'Intelligent Document AI', date: 'Jan 2026 — Feb 2026', category: 'Computer Vision', description: 'A multi-stage invoice extraction pipeline combining OCR and object detection, with validation logic and confidence scoring for noisy and handwritten documents.', tags: ['EasyOCR', 'YOLOv8', 'OpenCV', 'PyTorch'], repo: 'https://github.com/Keshavgoyal14/IDFC-DocAI-Intelligent-Invoice-Extraction-Validation-System' },
  { title: 'SCARS', date: 'Sep 2025 — Oct 2025', category: 'GenAI', description: 'A multi-agent advisory backend for farmers. LangGraph coordinates weather, market prices, crop health, lifecycle planning, and disease prediction into one context-aware recommendation.', tags: ['FastAPI', 'LangChain', 'LangGraph', 'Google Gemini'], repo: 'https://github.com/Keshavgoyal14/crop-chat-agent' },
  { title: 'LLM-Powered Intelligent Query Retrieval System', date: 'Jul 2025 — Aug 2025', category: 'GenAI', description: 'Built a FastAPI document Q&A system using Gemini, LangChain, Gemini Pro, and Hugging Face with OCR-based text extraction and multi-format document ingestion. Added semantic chunking, Pinecone vector indexing, contextual retrieval, caching, domain-specific prompting, and content moderation for efficient, context-grounded responses.', tags: ['FastAPI', 'LangChain', 'Gemini', 'Gemini Pro', 'Pinecone', 'EasyOCR', 'Hugging Face'], repo: 'https://github.com/Keshavgoyal14/LLM-Powered-Intelligent-Query-Retrieval-System' },
  { title: 'CHAT.AI', date: 'Jun 2025 — Jul 2025', category: 'Full Stack', description: 'A full-stack AI chatbot with multi-session history, document Q&A, semantic indexing, Razorpay premium access, and AssemblyAI transcription.', tags: ['React', 'Node.js', 'MongoDB', 'LangChain', 'Pinecone'], repo: 'https://github.com/Keshavgoyal14/Chatbot' },
  { title: 'TripMate AI', date: 'Apr 2025 — May 2025', category: 'Full Stack', description: 'An AI travel planner that generates and manages personalized itineraries with Gemini AI, Firebase persistence, Google Sign-In, and Razorpay premium features.', tags: ['React', 'Firebase', 'Gemini AI', 'Vite', 'Razorpay'], repo: 'https://github.com/Keshavgoyal14/Ai-Trip-Planner' },
];

const experience = [
  { date: 'May 2026 — Jun 2026', role: 'Product Intern', org: 'Homerun, Bengaluru', points: ['Ran funnel analysis and cohort studies to find conversion bottlenecks across platforms.', 'Traced recurring reporting discrepancies back to their source systems and fixed the root cause.', 'Defined product metrics and built automated dashboards for trusted stakeholder reporting.'] },
  { date: 'Jun 2025 — Sep 2025', role: 'Web Developer Intern', org: 'Valsco Technology Private Ltd, Vellore', points: ['Built and integrated REST APIs connecting frontend and backend systems via React.js.', 'Shipped frontend features with React.js and Node.js with a focus on performance and usability.'] },
];

const skills = {
  'Programming Languages': ['Python', 'C++', 'Java', 'JavaScript', 'R', 'SQL'],
  'Data Analytics & Engineering': ['PySpark', 'Databricks', 'Snowflake', 'NumPy', 'Pandas', 'Scikit-learn', 'Tableau', 'Excel', 'Data analysis', 'Real-time streaming', 'ETL / ELT', 'Azure Event Hubs', 'Data cleaning'],
  'AI / ML & GenAI': ['PyTorch', 'Deep learning', 'CNNs', 'RAG', 'LangChain', 'LangGraph', 'OCR'],
  'Frameworks & Libraries': ['FastAPI', 'React', 'Node.js'],
  'Databases & Vector Stores': ['MongoDB', 'Cloud Firestore', 'Pinecone'],
  'Tools & Platforms': ['Git', 'VS Code', 'Postman', 'AWS', 'Azure', 'Google Colab'],
};

function Arrow() { return <span aria-hidden="true">↗</span>; }
function SectionHeading({ label, title, detail }) { return <div className="section-head"><div className="eyebrow">{label}</div><h2>{title}</h2>{detail && <p className="section-sub">{detail}</p>}</div>; }
function Timeline({ items }) { return <div className="timeline">{items.map((item) => <article className="tl-item" key={`${item.date}-${item.role}`}><div className="tl-date">{item.date}</div><div className="tl-role">{item.role}</div><div className="tl-org">{item.org}</div><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div>; }
function ChatText({ text }) {
  const renderInline = (value) => value.split(/(\[[^\]]+\]\([^\)]+\)|\*\*[^*]+\*\*)/g).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
    if (link) return <a href={link[2]} key={`${link[2]}-${index}`} target="_blank" rel="noreferrer">{link[1]}</a>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    return part;
  });
  const blocks = text.split(/\n\s*\n/).filter(Boolean);
  return <>{blocks.map((block, index) => {
    const lines = block.split('\n').filter(Boolean);
    const isList = lines.every((line) => /^\s*[-*•]\s+/.test(line));
    if (isList) return <ul key={index}>{lines.map((line) => <li key={line}>{renderInline(line.replace(/^\s*[-*•]\s+/, ''))}</li>)}</ul>;
    return <p key={index}>{lines.map((line, lineIndex) => <React.Fragment key={`${line}-${lineIndex}`}>{lineIndex > 0 && <br />}{renderInline(line)}</React.Fragment>)}</p>;
  })}</>;
}

function App() {
  const [dark, setDark] = useState(() => {
    try {
      return window.localStorage.getItem('theme') === 'dark';
    } catch {
      return false;
    }
  });
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'assistant', text: 'Hi, I can answer questions about Keshav\'s projects, skills, and experience.' }]);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    try {
      window.localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      // Theme still works for the current session when storage is unavailable.
    }
  }, [dark]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id) setActiveSection(entry.target.id);
      }
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const categories = ['All', ...new Set(projects.map((project) => project.category))];
  const filteredProjects = useMemo(() => projects.filter((project) => (filter === 'All' || project.category === filter) && `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [filter, query]);

  function submitContact(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setStatus('Please fill out all fields.'); return; }
    setStatus('Opening your mail client...');
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Contact from ${form.name}`)}&body=${encodeURIComponent(body)}`;
  }

  async function askChat(event, suggestedQuestion = '') {
    event?.preventDefault();
    const message = (suggestedQuestion || chatInput).trim();
    if (!message || chatLoading) return;
    setChatMessages((current) => [...current, { role: 'user', text: message }]);
    setChatInput('');
    setChatLoading(true);
    try {
      const result = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }) });
      const data = await result.json();
      if (!result.ok) throw new Error(data.error || 'Chat request failed.');
      setChatMessages((current) => [...current, { role: 'assistant', text: data.reply }]);
    } catch (error) {
      setChatMessages((current) => [...current, { role: 'assistant', text: `The AI assistant is offline. Start the API with npm run dev:all. (${error.message})` }]);
    } finally {
      setChatLoading(false);
    }
  }

  return <>
    <JourneyGuide />
    <nav><div className="wrap nav-inner"><a className="brand" href="#top">KESHAV GOYAL</a><div className="nav-actions"><ul className="navlinks"><li><a className={activeSection === 'experience' ? 'active' : ''} href="#experience">Experience</a></li><li><a className={activeSection === 'projects' ? 'active' : ''} href="#projects">Projects</a></li><li><a className={activeSection === 'skills' ? 'active' : ''} href="#skills">Skills</a></li><li><a className={activeSection === 'contact' ? 'active' : ''} href="#contact">Contact</a></li></ul><button className="theme-toggle" onClick={() => setDark((value) => !value)} aria-label="Toggle dark mode" aria-pressed={dark}>{dark ? '☼' : '◐'}</button></div></div></nav>
    <main id="top">
      <header className="hero reveal"><ThreeBackground /><div className="wrap hero-grid"><div className="hero-left"><div className="name-block"><div className="avatar">KG</div><div><h1>Keshav Goyal</h1><div className="role">Data Engineer <span className="sep">/</span> AI & ML Engineer</div></div></div><p className="lede">I design reliable data pipelines and intelligent systems that turn complex information into useful decisions. My work spans data engineering, analytics, machine learning, and production-ready AI applications.</p><div className="hero-meta"><a className="pill" href={`mailto:${profile.email}`}>{profile.email}</a><a className="pill" href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a><a className="pill" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a className="pill" href={profile.leetcode} target="_blank" rel="noreferrer">250+ LeetCode solved <Arrow /></a></div></div><div className="hero-note"><span>Currently building</span><strong>intelligent data<br />systems with impact.</strong><i>01 — 06</i></div></div></header>
      <section id="experience" className="reveal"><div className="wrap"><SectionHeading label="Experience" title="Where I've worked" /><Timeline items={experience} /></div></section>
      <section id="projects" className="reveal"><div className="wrap"><SectionHeading label="Projects" title="Things I've built end-to-end" detail="Browse by discipline or search the work. Each project has a working pipeline behind it, from a raw request to something with a real interface." /><div className="project-tools"><div className="filters" role="group" aria-label="Filter projects">{categories.map((category) => <button className={filter === category ? 'active' : ''} key={category} onClick={() => setFilter(category)}>{category}</button>)}</div><label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" aria-label="Search projects" /></label></div><div className="projects">{filteredProjects.map((project) => <article className={`project ${expandedProject === project.title ? 'expanded' : ''}`} key={project.title}><div className="project-top"><div><span className="project-category">{project.category}</span><h3 className="project-title">{project.title}</h3></div><button className="project-expand" type="button" onClick={() => setExpandedProject(expandedProject === project.title ? null : project.title)} aria-expanded={expandedProject === project.title}>{expandedProject === project.title ? '−' : '+'}</button></div><p className="desc">{project.description}</p><div className="stack">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><div className="project-actions"><button className="details-button" type="button" onClick={() => setExpandedProject(expandedProject === project.title ? null : project.title)}>{expandedProject === project.title ? 'Collapse details' : 'Inspect build'}</button><a className="repo-link" href={project.repo} target="_blank" rel="noreferrer">View repository <Arrow /></a></div>{expandedProject === project.title && <div className="project-detail"><span>BUILD NOTE</span><p>Designed as a practical, end-to-end system with measurable outcomes, reusable components, and a clear path from raw input to user-facing insight.</p></div>}</article>)}</div>{filteredProjects.length === 0 && <p className="empty">No projects match that search yet.</p>}</div></section>
      <section id="skills" className="reveal"><div className="wrap"><SectionHeading label="Skills" title="What I work with" detail="A practical toolkit across data platforms, analytics, machine learning, and production application development." /><div className="skills-grid">{Object.entries(skills).map(([name, values]) => <div className="skill-cat" key={name}><h3>{name}</h3><div className="skill-list">{values.map((skill) => <span className="skill-item" key={skill}>{skill}</span>)}</div></div>)}</div></div></section>
      <section id="education" className="reveal"><div className="wrap"><SectionHeading label="Education" title="Background" /><div className="edu-list"><div className="edu-card"><div><div className="edu-name">Vellore Institute of Technology (VIT), Vellore</div><div className="edu-detail">B.Tech, Electronics and Communication Engineering</div></div><div className="edu-date">Aug 2023 — Present</div></div><div className="edu-card"><div><div className="edu-name">Shiv Jyoti Convent School, Kota</div><div className="edu-detail">Class XII, CBSE <span className="edu-score">85%</span></div></div><div className="edu-date">2023</div></div><div className="edu-card"><div><div className="edu-name">Shiv Jyoti Convent School, Kota</div><div className="edu-detail">Class X, CBSE <span className="edu-score">93.4%</span></div></div><div className="edu-date">2021</div></div></div></div></section>
      <section id="involvement" className="reveal"><div className="wrap"><SectionHeading label="Involvement" title="Clubs & chapters" /><Timeline items={[{ date: 'Apr 2024 — Mar 2025 · 1 yr', role: 'Core Member', org: 'roboVITics — The Official Robotics Club of VIT · Vellore, Tamil Nadu', points: ['Contributed to the club web presence and internal tools with a small core team.', <>Wrote <a className="inline-link" href="https://medium.com/@roboviticsvitvellore/connecting-the-dots-apis-for-smart-robotics-integration-a494c253dbb3" target="_blank" rel="noreferrer">Connecting the Dots: APIs for Smart Robotics Integration <Arrow /></a> for the club publication.</>] }]} /></div></section>
      <section id="achievements" className="reveal"><div className="wrap"><SectionHeading label="Recognition" title="Achievements & certificates" /><ul className="flat-list">{['250+ problems solved on LeetCode — view profile ↗', 'Smart India Hackathon (SIH) — official college representative', 'Bajaj HackRx 6.0 — top 50 out of 10,000+ registered teams', 'Oracle Cloud Infrastructure 2025 Generative AI Professional — certified', 'Oracle Cloud Infrastructure 2025 AI Foundations Associate — certified'].map((item, index) => <li key={item}><div className="fl-date">{index === 0 ? 'Ongoing' : index < 3 ? '2025' : 'Jun 2025'}</div><div className="fl-body">{item}</div></li>)}</ul></div></section>
      <button className={`chat-launcher ${chatOpen ? 'open' : ''}`} type="button" onClick={() => setChatOpen((value) => !value)} aria-label={chatOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'} aria-expanded={chatOpen}>{chatOpen ? '×' : '✦'}<span className="chat-launcher-label">Ask Keshav</span></button>
      {chatOpen && <aside className="chat-widget" aria-label="Keshav portfolio assistant"><div className="chat-widget-head"><div><strong>Ask Keshav</strong><span>Gemini portfolio assistant</span></div><button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat">×</button></div><div className="chat-messages" aria-live="polite">{chatMessages.map((message, index) => <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}><span>{message.role === 'assistant' ? 'KG' : 'You'}</span><div className="chat-message-content"><ChatText text={message.text} /></div></div>)}{chatLoading && <div className="chat-message assistant"><span>KG</span><div className="chat-message-content"><p className="chat-thinking">Thinking...</p></div></div>}</div><div className="chat-suggestions"><button type="button" onClick={() => askChat(null, 'What data engineering projects has Keshav built?')}>Data projects</button><button type="button" onClick={() => askChat(null, 'What are Keshav\'s main skills?')}>Skills</button><button type="button" onClick={() => askChat(null, 'How can I contact Keshav?')}>Contact</button></div><form className="chat-form" onSubmit={askChat}><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Ask about Keshav..." aria-label="Ask about Keshav" /><button type="submit" disabled={chatLoading}>Ask <Arrow /></button></form></aside>}
    </main>
    <footer id="contact" className="reveal"><div className="wrap footer-grid"><div><div className="eyebrow">Contact</div><h2>Let's talk.</h2><p className="section-sub">Have a product idea, an AI workflow to untangle, or a role that needs a builder? Send a note.</p><div className="contact-links"><a className="primary" href={`mailto:${profile.email}`} aria-label="Email">@</a><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">GH</a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a href="tel:+917300399959" aria-label="Phone">tel</a></div></div><form className="contact-form" onSubmit={submitContact} noValidate><label>Your name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label><label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label><label>Message<textarea rows="5" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Write a short message..." /></label><button type="submit" className="contact-submit">Send message <Arrow /></button><div className="cf-status" aria-live="polite">{status}</div></form></div><div className="wrap foot-note"><span>© 2026 Keshav Goyal</span><span>Built with React + Vite</span></div></footer>
  </>;
}

export default App;
