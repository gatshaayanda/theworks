"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, BriefcaseBusiness, CalendarDays, Check, ChevronRight, Search, Shirt, Sparkles, Wine } from "lucide-react";
import "./works-landing.css";

type Service = { name: string; category: string; provider: string; id: string; description: string; keywords: string };
const services: Service[] = [
  { id: "brand", name: "Marketing & brand development", category: "Branding & creative", provider: "PROSPEC", description: "Strategy, advertising, public relations and creative direction.", keywords: "marketing advertising pr brand strategy creative" },
  { id: "clothing", name: "Corporate clothing & uniforms", category: "Clothing & merchandise", provider: "PROSPEC", description: "Branded clothing, uniforms and promotional merchandise.", keywords: "clothing shirts uniforms t-shirts apparel" },
  { id: "print", name: "Printing, signage & vehicle branding", category: "Printing & branding", provider: "PROSPEC", description: "Banners, stickers, large-format print and branded spaces.", keywords: "printing banner signage stickers vehicle branding" },
  { id: "sourcing", name: "Product sourcing & supplies", category: "Procurement", provider: "PROSPEC", description: "Sourcing, procurement and supply coordination.", keywords: "procurement sourcing supplies products" },
  { id: "bar", name: "Mobile bar hire", category: "Mobile bars & drinks", provider: "GALAXY LIQUIDS", description: "A mobile bar experience for private and corporate events.", keywords: "bar mobile drinks cocktails event hire" },
  { id: "menus", name: "Cocktail & mocktail menus", category: "Mobile bars & drinks", provider: "GALAXY LIQUIDS", description: "Bespoke beverage menus shaped around your occasion.", keywords: "cocktail mocktail menu beverage drinks" },
  { id: "planning", name: "Event planning & management", category: "Events & experiences", provider: "KAVON GROUP", description: "From concept development and coordination to execution.", keywords: "event planning management coordination" },
  { id: "production", name: "Stage, sound & lighting", category: "Production", provider: "KAVON GROUP", description: "Technical production and event infrastructure.", keywords: "stage sound lighting production technical" },
  { id: "hospitality", name: "Décor, VIP & guest logistics", category: "Hospitality & logistics", provider: "KAVON GROUP", description: "Styling, guest movement, hospitality and operational support.", keywords: "decor décor vip hospitality transfers transport logistics" },
];

const businesses = [
  { id: "prospec", number: "01", name: "PROSPEC", line: "Make your brand visible.", type: "Products, branding & supply", description: "Marketing, advertising, corporate clothing, printing, merchandise, signage and product sourcing.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1100&q=85", services: ["Corporate clothing", "Printing & signage", "Marketing & branding", "Product sourcing"] },
  { id: "galaxy", number: "02", name: "GALAXY LIQUIDS", line: "Bring the bar to your event.", type: "Mobile bars & hospitality", description: "Mobile bar hire, bespoke cocktail and mocktail menus, private events and corporate activations.", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1100&q=85", services: ["Mobile bar hire", "Cocktail menus", "Corporate activations", "Private celebrations"] },
  { id: "kavon", number: "03", name: "KAVON GROUP", line: "Your vision. Our execution.", type: "Events & production", description: "Event concepts, production, décor, VIP hospitality, guest logistics and coordinated execution.", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1100&q=85", services: ["Event management", "Stage & production", "Décor & styling", "VIP hospitality"] },
];

const shortcuts = [
  { label: "Clothing & merchandise", icon: Shirt, query: "clothing" },
  { label: "Printing & branding", icon: Sparkles, query: "printing" },
  { label: "Mobile bars", icon: Wine, query: "bar" },
  { label: "Events & production", icon: CalendarDays, query: "event" },
];

export default function WorksLanding() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return services.slice(0, 4);
    return services.filter(item => (item.name + " " + item.category + " " + item.provider + " " + item.description + " " + item.keywords).toLowerCase().includes(value));
  }, [query]);

  function findService(value = "") {
    setQuery(value);
    setShowResults(true);
    window.setTimeout(() => document.getElementById("works-discovery")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  return <main className="works-site">
    <div className="works-topline"><span>THREE SPECIALIST BUSINESSES · ONE PLACE TO START</span><span>BOTSWANA</span></div>
    <header className="works-header">
      <Link className="works-wordmark" href="/" aria-label="THE WORKS home"><span className="works-mark">W<span>·</span></span><span><strong>THE WORKS</strong><small>BUSINESS & EXPERIENCES</small></span></Link>
      <nav className="works-nav" aria-label="Main navigation">
        <a href="#works-discovery">Find a service</a>
        <a href="#works-businesses">Businesses</a>
        <Link href="/account">My Account <span aria-hidden="true">↗</span></Link>
      </nav>
      <Link className="works-mobile-account" href="/account" aria-label="My Account">Account <ArrowRight size={15}/></Link>
    </header>

    <section className="works-hero">
      <div className="works-hero-copy">
        <span className="works-eyebrow"><i/> YOUR NEXT PROJECT STARTS HERE</span>
        <h1>Business gets<br/><em>done here.</em></h1>
        <p>Find the products, services and people you need to bring your next project to life.</p>
        <div className="works-hero-actions">
          <a className="works-primary" href="#works-discovery">Find a service <ArrowDown size={17}/></a>
          <a className="works-secondary" href="#works-businesses">Browse businesses <ArrowRight size={16}/></a>
        </div>
        <form className="works-search works-hero-search" onSubmit={event => { event.preventDefault(); findService(query); }}>
          <Search size={20} aria-hidden="true"/>
          <input aria-label="Search products and services" placeholder="What do you need to make happen?" value={query} onChange={event => { setQuery(event.target.value); setShowResults(true); }}/>
          <button type="submit" aria-label="Search"><ArrowRight size={19}/></button>
        </form>
        <div className="works-shortcuts" aria-label="Popular service categories">
          {shortcuts.map(item => { const Icon=item.icon; return <button key={item.label} type="button" onClick={() => findService(item.query)}><Icon size={18}/><span>{item.label}</span><ChevronRight size={15}/></button>; })}
        </div>
        <div className="works-hero-foot"><span>One place to begin.</span><span>Three specialist teams to make it happen.</span></div>
      </div>
      <div className="works-hero-visual" aria-label="A glimpse of the products and experiences available through THE WORKS">
        <div className="works-photo works-photo-main"><img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85" alt="A beautifully arranged event space" fetchPriority="high"/><span>EVENTS & EXPERIENCES</span></div>
        <div className="works-photo works-photo-small"><img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80" alt="Branded clothing and apparel" loading="lazy"/><span>BRANDING</span></div>
        <div className="works-photo works-photo-drink"><img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80" alt="Cocktails prepared for an event" loading="lazy"/><span>HOSPITALITY</span></div>
        <div className="works-visual-stamp"><strong>MAKE<br/>IT HAPPEN.</strong><span>THE WORKS · BW</span></div>
      </div>
    </section>

    <section className="works-discovery" id="works-discovery">
      <div className="works-section-heading">
        <div><span className="works-eyebrow">START WITH WHAT YOU NEED</span><h2>What do you need<br/><em>to make happen?</em></h2></div>
        <p>You don't need to know which business to call. Tell us what you're looking for and we'll point you in the right direction.</p>
      </div>

      {showResults && <div className="works-results" aria-live="polite">
        <div className="works-results-head"><strong>{query.trim() ? "Matching services" : "Explore services"}</strong><button type="button" onClick={() => { setShowResults(false); setQuery(""); }}>Clear</button></div>
        {results.length ? <div className="works-results-grid">{results.map(item => <a className="works-result" key={item.id} href={"#"+(item.provider==="PROSPEC"?"prospec":item.provider==="GALAXY LIQUIDS"?"galaxy":"kavon")}><span>{item.category}</span><strong>{item.name}</strong><p>{item.description}</p><small>{item.provider} <ArrowRight size={13}/></small></a>)}</div> : <p className="works-no-results">No exact match yet. Try a broader term such as “event”, “branding” or “bar”.</p>}
      </div>}
    </section>

    <section className="works-businesses" id="works-businesses">
      <div className="works-section-heading works-business-heading">
        <div><span className="works-eyebrow">MEET THE SPECIALISTS</span><h2>Good people.<br/><em>Different strengths.</em></h2></div>
        <p>Explore each business directly. Every enquiry is handled by the business responsible for the service.</p>
      </div>
      <div className="works-business-grid">
        {businesses.map((business,index) => <article className={"works-business-card works-business-"+business.id} id={business.id} key={business.id}>
          <div className="works-business-image"><img src={business.image} alt={business.name+" service showcase"} loading="lazy"/><span>{business.number} / THE WORKS PARTNER</span><b>{business.type}</b></div>
          <div className="works-business-copy"><div className="works-business-title"><span>{business.name}</span><span>0{index+1}</span></div><h3>{business.line}</h3><p>{business.description}</p><div className="works-service-tags">{business.services.map(service=><span key={service}>{service}</span>)}</div><a href="#works-discovery" onClick={() => { setQuery(business.name); setShowResults(true); }}>Explore services <ArrowRight size={16}/></a></div>
        </article>)}
      </div>
    </section>

    <section className="works-how">
      <div className="works-how-heading"><span className="works-eyebrow">SIMPLE FROM THE START</span><h2>Three steps.<br/><em>One clear next move.</em></h2></div>
      <div className="works-steps">
        <article><span>01</span><h3>Find your fit</h3><p>Browse by service or go straight to the business you have in mind.</p></article>
        <article><span>02</span><h3>Tell us what you need</h3><p>Share the details that help the right team understand your project.</p></article>
        <article><span>03</span><h3>Keep things moving</h3><p>Follow the response, quotation and next steps through your customer account.</p></article>
      </div>
    </section>

    <section className="works-account" id="works-account">
      <div><span className="works-eyebrow">YOUR WORK, TOGETHER</span><h2>One account.<br/><em>All your activity.</em></h2><p>Keep your enquiries, quotations, messages and project updates organised across the participating businesses.</p></div>
      <div className="works-account-panel"><div className="works-account-panel-top"><span>THE WORKS / MY ACCOUNT</span><span><i/> CUSTOMER SPACE</span></div><div className="works-account-lines"><span><b>01</b> Enquiries & quotations <Check size={17}/></span><span><b>02</b> Conversations & updates <Check size={17}/></span><span><b>03</b> Projects & bookings <Check size={17}/></span></div><Link href="/account">Open My Account <ArrowRight size={16}/></Link><small>Browse first. Create or connect your account when you're ready to follow a request.</small></div>
    </section>

    <footer className="works-footer">
      <div className="works-footer-main"><Link className="works-wordmark works-footer-brand" href="/"><span className="works-mark">W<span>·</span></span><span><strong>THE WORKS</strong><small>BUSINESS & EXPERIENCES</small></span></Link><p>Everything you need to make things happen.</p><nav aria-label="Footer navigation"><a href="#works-discovery">Find a service</a><a href="#works-businesses">Businesses</a><Link href="/account">My Account</Link></nav><Link className="works-briefcase" href="/admin" aria-label="Open the Owner's Briefcase" title="Owner's Briefcase"><BriefcaseBusiness size={22}/></Link></div>
      <div className="works-footer-bottom"><span>THE WORKS · BOTSWANA</span><span>Three participating businesses. Distinct teams and responsibilities.</span></div>
    </footer>
  </main>;
}
