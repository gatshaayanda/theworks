"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { subscribeToWorksServices, DEFAULT_WORKS_CATALOGUE, WORKS_BUSINESSES, type WorksService } from "@/lib/firebase/works-catalogue";
import { ArrowDown, ArrowRight, BriefcaseBusiness, CalendarDays, Check, ChevronRight, Search, Shirt, Sparkles, Wine } from "lucide-react";
import "./works-landing.css";

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
  const [catalogue, setCatalogue] = useState<WorksService[]>(DEFAULT_WORKS_CATALOGUE.map((item,index)=>({...item,id:"starter-"+String(index+1).padStart(3,"0"),createdAt:"",updatedAt:""})));
  const [quantities, setQuantities] = useState<Record<string,number>>({});
  const [businessFilter, setBusinessFilter] = useState("All");
  useEffect(()=>subscribeToWorksServices(items=>setCatalogue(items.length?items:DEFAULT_WORKS_CATALOGUE.map((item,index)=>({...item,id:"starter-"+String(index+1).padStart(3,"0"),createdAt:"",updatedAt:""}))),()=>{}),[]);
  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    return catalogue.filter(item => (businessFilter==="All"||item.business===businessFilter) && (!value || (item.name+" "+item.category+" "+item.business+" "+item.description).toLowerCase().includes(value)));
  }, [catalogue,query,businessFilter]);
  const selected = catalogue.filter(item=>(quantities[item.id]||0)>0).map(service=>({service,quantity:quantities[service.id]}));
  const subtotal = selected.reduce((sum,item)=>sum+(item.service.priceMode==="quote"?0:(item.service.price??0)*item.quantity),0);
  const quoteCount = selected.filter(item=>item.service.priceMode==="quote").length;
  const money = (value:number)=>"P"+value.toLocaleString("en-BW",{maximumFractionDigits:2});
  function setQuantity(id:string,next:number){setQuantities(current=>{const updated={...current};if(next<=0)delete updated[id];else updated[id]=Math.min(10000,next);return updated;});}
  function continueToAccount(){const items=selected.map(item=>item.service.id+":"+item.quantity).join(",");window.location.assign("/account?request=1&items="+encodeURIComponent(items));}

  function findService(value = "") {
    setQuery(value);
    window.setTimeout(() => document.getElementById("works-discovery")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  return <main className="works-site">
    <div className="works-topline"><span>THREE SPECIALIST BUSINESSES · ONE PLACE TO START</span><span>BOTSWANA</span></div>
    <header className="works-header">
      <Link className="works-wordmark" href="/account" aria-label="THE WORKS home"><span className="works-mark">W<span>·</span></span><span><strong>THE WORKS</strong><small>BUSINESS & EXPERIENCES</small></span></Link>
      <nav className="works-nav" aria-label="Main navigation">
        <Link href="#works-discovery">Find a service</Link>
        <Link href="#works-businesses">Businesses</Link>
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
          <Link className="works-primary" href="#works-discovery">Browse services & prices <ArrowDown size={17}/></Link>
          <Link className="works-secondary" href="#works-businesses">Browse businesses <ArrowRight size={16}/></Link>
        </div>
        <form id="works-search" className="works-search works-hero-search" onSubmit={event => { event.preventDefault(); findService(query); }}>
          <Search size={20} aria-hidden="true"/>
          <input aria-label="Search products and services" placeholder="What do you need to make happen?" value={query} onChange={event => { setQuery(event.target.value);  }}/>
          <button type="submit" aria-label="Search"><ArrowRight size={19}/></button>
        </form>
        <div className="works-shortcuts" aria-label="Popular service categories">
          {shortcuts.map(item => { const Icon=item.icon; return <button key={item.label} type="button" onClick={() => findService(item.query)}><Icon size={18}/><span>{item.label}</span><ChevronRight size={15}/></button>; })}
        </div>
        <div className="works-hero-foot"><span>One place to begin.</span><span>Three specialist businesses to help make it happen.</span></div>
      </div>
      <div className="works-hero-visual" aria-label="A glimpse of the products and experiences available through THE WORKS">
        <div className="works-photo works-photo-main"><img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85" alt="A beautifully arranged event space" fetchPriority="high" onError={event => { event.currentTarget.style.display = "none"; }}/><span>EVENTS & EXPERIENCES</span></div>
        <div className="works-photo works-photo-small"><img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80" alt="Branded clothing and apparel" loading="lazy" onError={event => { event.currentTarget.style.display = "none"; }}/><span>BRANDING</span></div>
        <div className="works-photo works-photo-drink"><img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80" alt="Cocktails prepared for an event" loading="lazy" onError={event => { event.currentTarget.style.display = "none"; }}/><span>HOSPITALITY</span></div>
        <div className="works-visual-stamp"><strong>MAKE<br/>IT HAPPEN.</strong><span>THE WORKS · BW</span></div>
      </div>
    </section>

    <section className="works-discovery" id="works-discovery">
      <div className="works-section-heading">
        <div><span className="works-eyebrow">SERVICE DISCOVERY</span><h2>Find your<br/><em>next step.</em></h2></div>
        <p>Choose from the seeded catalogue, see indicative market prices, adjust quantities and carry your selection into your customer account.</p>
      </div>
      <div className="works-results" aria-live="polite">
        <div className="works-results-head"><strong>{query.trim() ? "Matching services" : "Explore services"} · {results.length} available</strong><button type="button" onClick={() => { setQuery(""); setBusinessFilter("All"); }}>Clear filters</button></div><div className="works-catalogue-filters"><button type="button" aria-pressed={businessFilter==="All"} onClick={()=>setBusinessFilter("All")}>All businesses</button>{WORKS_BUSINESSES.map(name=><button type="button" key={name} aria-pressed={businessFilter===name} onClick={()=>setBusinessFilter(name)}>{name}</button>)}</div>
        {results.length ? <div className="works-results-grid">{results.map(item => <article className="works-result works-catalogue-card" key={item.id}><span>{item.business} · {item.category}</span><strong>{item.name}</strong><p>{item.description}</p><b className="works-catalogue-price">{item.priceMode==="quote"?"Price on request":(item.priceMode==="from"?"From ":"")+money(item.price??0)+(item.unit?" / "+item.unit:"")}</b><small>Indicative market-reference price. Final price depends on confirmed specifications.</small><div className="works-catalogue-controls">{(quantities[item.id]||0)>0?<><button type="button" aria-label={"Remove one "+item.name} onClick={()=>setQuantity(item.id,(quantities[item.id]||0)-1)}>−</button><strong>{quantities[item.id]}</strong><button type="button" aria-label={"Add one "+item.name} onClick={()=>setQuantity(item.id,(quantities[item.id]||0)+1)}>+</button></>:<button type="button" onClick={()=>setQuantity(item.id,1)}>Add to basket +</button>}</div></article>)}</div> : <p className="works-no-results">No matching services. Try a broader search or choose another business.</p>}
      <div className="works-selection-bar"><div><strong>{selected.reduce((n,item)=>n+item.quantity,0)} items selected</strong><span>Estimated total · {money(subtotal)}{quoteCount>0?" · "+quoteCount+" quote-priced item"+(quoteCount===1?"":"s"):""}</span><small>Indicative prices only. Final quotations are confirmed by each business.</small></div><button type="button" disabled={!selected.length} onClick={continueToAccount}>Continue with selected services ↗</button></div>
      </div>
    </section>

    <section className="works-businesses" id="works-businesses">
      <div className="works-section-heading works-business-heading">
        <div><span className="works-eyebrow">MEET THE SPECIALISTS</span><h2>Good people.<br/><em>Different strengths.</em></h2></div>
        <p>Explore each business directly. Every enquiry is handled by the business responsible for the service.</p>
      </div>
      <div className="works-business-grid">
        {businesses.map((business,index) => <article className={"works-business-card works-business-"+business.id} id={business.id} key={business.id}>
          <div className="works-business-image"><img src={business.image} alt={business.name+" service showcase"} loading="lazy" onError={event => { event.currentTarget.style.display = "none"; }}/><span>{business.number} / THE WORKS PARTNER</span><b>{business.type}</b></div>
          <div className="works-business-copy"><div className="works-business-title"><span>{business.name}</span><span>0{index+1}</span></div><h3>{business.line}</h3><p>{business.description}</p><div className="works-service-tags">{business.services.map(service=><span key={service}>{service}</span>)}</div><button type="button" onClick={()=>{setBusinessFilter(business.name);setShowResults(true);document.getElementById("works-discovery")?.scrollIntoView({behavior:"smooth"});}}>Explore services & prices <ArrowRight size={16}/></button></div>
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
      <div className="works-account-panel"><div className="works-account-panel-top"><span>THE WORKS / MY ACCOUNT</span><span><i/> CUSTOMER SPACE</span></div><div className="works-account-lines"><span><b>01</b> Enquiries & quotations <Check size={17}/></span><span><b>02</b> Conversations & updates <Check size={17}/></span><span><b>03</b> Projects & bookings <Check size={17}/></span></div><Link href="/account">Open My Account <ArrowRight size={16}/></Link><small>Browse first. Create or connect your account when you are ready to follow a request.</small></div>
    </section>

    <footer className="works-footer">
      <div className="works-footer-main"><Link className="works-wordmark works-footer-brand" href="/account"><span className="works-mark">W<span>·</span></span><span><strong>THE WORKS</strong><small>BUSINESS & EXPERIENCES</small></span></Link><p>Everything you need to make things happen.</p><nav aria-label="Footer navigation"><Link href="#works-discovery">Find a service</Link><Link href="#works-businesses">Businesses</Link><Link href="/account">My Account</Link></nav><Link className="works-briefcase" href="/admin" aria-label="Open the Owner's Briefcase" title="Owner's Briefcase"><BriefcaseBusiness size={22}/></Link></div>
      <div className="works-footer-bottom"><span>THE WORKS · BOTSWANA</span><span>Three participating businesses. Distinct teams and responsibilities.</span></div>
    </footer>
  </main>;
}
