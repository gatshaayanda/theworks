"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { subscribeToWorksServices, DEFAULT_WORKS_CATALOGUE, WORKS_BUSINESSES, worksBusinessLabel, type WorksService } from "@/lib/firebase/works-catalogue";
import { ArrowDown, ArrowRight, BriefcaseBusiness, CalendarDays, Check, ChevronRight, Search, Shirt, Sparkles, Wine } from "lucide-react";
import "./works-landing.css";
import {localizeWorks,useWorksLanguage} from "@/lib/works-translations";

const businesses = [
  { id: "prospec", number: "01", name: "Example Company 1", line: "Make your brand visible.", type: "Products, branding & supply", description: "Marketing, advertising, corporate clothing, printing, merchandise, signage and product sourcing.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1100&q=85", services: ["Corporate clothing", "Printing & signage", "Marketing & branding", "Product sourcing"] },
  { id: "galaxy", number: "02", name: "Example Company 2", line: "Bring the bar to your event.", type: "Mobile bars & hospitality", description: "Mobile bar hire, bespoke cocktail and mocktail menus, private events and corporate activations.", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1100&q=85", services: ["Mobile bar hire", "Cocktail menus", "Corporate activations", "Private celebrations"] },
  { id: "kavon", number: "03", name: "Example Company 3", line: "Your vision. Our execution.", type: "Events & production", description: "Event concepts, production, décor, VIP hospitality, guest logistics and coordinated execution.", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1100&q=85", services: ["Event management", "Stage & production", "Décor & styling", "VIP hospitality"] },
];

const shortcuts = [
  { label: "Clothing & merchandise", icon: Shirt, query: "clothing" },
  { label: "Printing & branding", icon: Sparkles, query: "printing" },
  { label: "Mobile bars", icon: Wine, query: "bar" },
  { label: "Events & production", icon: CalendarDays, query: "event" },
];

const businessExperiences = [
  { id: "PROSPEC", key: "prospec", name: "Example Company 1", line: "Ideas made visible.", description: "Explore branding, printing, corporate clothing, merchandise, signage and business supplies.", image: businesses[0].image, cue: "CREATIVE · PRINT · SUPPLY" },
  { id: "GALAXY LIQUIDS", key: "galaxy", name: "Example Company 2", line: "A bar at your footsteps.", description: "Discover mobile bars, bespoke cocktail and mocktail menus, hospitality and event beverage experiences.", image: businesses[1].image, cue: "COCKTAILS · MOBILE BAR · HOSPITALITY" },
  { id: "KAVON GROUP", key: "kavon", name: "Example Company 3", line: "We envision. We create. We execute.", description: "Explore corporate events, event production, décor, VIP hospitality and guest logistics.", image: businesses[2].image, cue: "EVENTS · PRODUCTION · EXPERIENCES" },
];

export default function WorksLanding() {
  const {language,setLanguage}=useWorksLanguage();
  const [query, setQuery] = useState("");
  const [catalogue, setCatalogue] = useState<WorksService[]>(DEFAULT_WORKS_CATALOGUE.map((item,index)=>({...item,id:"starter-"+String(index+1).padStart(3,"0"),createdAt:"",updatedAt:""})));
  const [quantities, setQuantities] = useState<Record<string,number>>({});
  const [businessFilter, setBusinessFilter] = useState("All");
  const [searchFocused, setSearchFocused] = useState(false);
  useEffect(()=>subscribeToWorksServices(items=>setCatalogue(items.length?items:DEFAULT_WORKS_CATALOGUE.map((item,index)=>({...item,id:"starter-"+String(index+1).padStart(3,"0"),createdAt:"",updatedAt:""}))),()=>{}),[]);
  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    return catalogue.filter(item => (businessFilter==="All"||item.business===businessFilter) && (!value || (item.name+" "+item.category+" "+item.business+" "+item.description).toLowerCase().includes(value)));
  }, [catalogue,query,businessFilter]);
  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];
    const serviceMatches = catalogue.filter(item => (item.name+" "+item.category+" "+item.business+" "+item.description).toLowerCase().includes(value)).slice(0,6).map(item=>({kind:"service" as const,id:item.id,title:item.name,detail:worksBusinessLabel(item.business)+" · "+item.category,service:item}));
    const businessMatches = businesses.filter(item => (item.name+" "+item.type+" "+item.description+" "+item.services.join(" ")).toLowerCase().includes(value)).map(item=>({kind:"business" as const,id:item.id,title:item.name,detail:item.type,business:item}));
    return [...businessMatches,...serviceMatches].slice(0,7);
  },[catalogue,query]);
  const selected = catalogue.filter(item=>(quantities[item.id]||0)>0).map(service=>({service,quantity:quantities[service.id]}));
  const subtotal = selected.reduce((sum,item)=>sum+(item.service.priceMode==="quote"?0:(item.service.price??0)*item.quantity),0);
  const quoteCount = selected.filter(item=>item.service.priceMode==="quote").length;
  const money = (value:number)=>"P"+value.toLocaleString("en-BW",{maximumFractionDigits:2});
  const activeBrand = businessExperiences.find(item => item.id === businessFilter);
  const experienceClass = activeBrand ? " works-theme-"+activeBrand.key : "";
  function setQuantity(id:string,next:number){setQuantities(current=>{const updated={...current};if(next<=0)delete updated[id];else updated[id]=Math.min(10000,next);return updated;});}
  function continueToAccount(){const items=selected.map(item=>item.service.id+":"+item.quantity).join(",");window.location.assign("/account?request=1&items="+encodeURIComponent(items));}

  function findService(value = "") {
    setQuery(value);
    setSearchFocused(false);
    window.setTimeout(() => document.getElementById("works-discovery")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }
  function chooseBusiness(name:string) {
    setBusinessFilter(name);
    setQuery("");
    setSearchFocused(false);
    window.setTimeout(() => document.querySelector(".works-results")?.scrollIntoView({ behavior:"smooth", block:"start" }), 80);
  }
  function chooseSuggestion(item:(typeof suggestions)[number]) {
    if(item.kind==="business") chooseBusiness(item.business.id);
    else {
      setBusinessFilter(item.service.business);
      setQuery(item.service.name);
      setSearchFocused(false);
      window.setTimeout(() => document.querySelector(".works-results")?.scrollIntoView({behavior:"smooth",block:"start"}),80);
    }
  }


  return localizeWorks(language,<main className={"works-site"+experienceClass}>
    <div className="works-topline"><span>THREE SPECIALIST BUSINESSES · ONE PLACE TO START</span><span>BOTSWANA</span></div>
    <header className="works-header">
      <Link className="works-wordmark" href="/account" aria-label="THE WORKS home"><span className="works-mark">W<span>·</span></span><span><strong>THE WORKS</strong><small>BUSINESS & EXPERIENCES</small></span></Link>
      <nav className="works-nav" aria-label="Main navigation">
        <Link href="#works-discovery">Find a service</Link>
        <Link href="#works-businesses">Businesses</Link>
        <Link href="/account" aria-label="Open My Account">My Account <span aria-hidden="true">↗</span></Link>
        <label className="works-language-control"><span>Language</span><select aria-label="Display language" value={language} onChange={event=>setLanguage(event.target.value==="tn"?"tn":"en")}><option value="en">English</option><option value="tn">Setswana</option></select></label>
      </nav>
      <Link className="works-mobile-account" href="/account" aria-label="My Account">Account <ArrowRight size={15}/></Link><label className="works-language-control works-mobile-language"><span>Language</span><select aria-label="Display language" value={language} onChange={event=>setLanguage(event.target.value==="tn"?"tn":"en")}><option value="en">English</option><option value="tn">Setswana</option></select></label>
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
          <input aria-label="Search products and services" aria-autocomplete="list" aria-expanded={searchFocused && query.trim().length>0 && suggestions.length>0} placeholder={language==="tn"?"O batla go dira eng?":"What do you need to make happen?"} value={query} onFocus={()=>setSearchFocused(true)} onBlur={()=>window.setTimeout(()=>setSearchFocused(false),140)} onChange={event => { setQuery(event.target.value); setSearchFocused(true); }}/>
          <button type="submit" aria-label="Search"><ArrowRight size={19}/></button>
          {searchFocused && query.trim() && <div className="works-search-suggestions" role="listbox" aria-label="Search suggestions">{suggestions.length ? suggestions.map(item=><button type="button" role="option" key={item.kind+"-"+item.id} onMouseDown={event=>event.preventDefault()} onClick={()=>chooseSuggestion(item)}><span className="works-suggestion-kind">{item.kind==="business"?"BUSINESS":"SERVICE"}</span><strong>{item.title}</strong><small>{item.detail}</small><ArrowRight size={15}/></button>) : <p>No suggestions yet. Press Enter to search the full catalogue.</p>}</div>}
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
        <div><span className="works-eyebrow">{activeBrand ? activeBrand.name+" · SERVICE DISCOVERY" : "SERVICE DISCOVERY"}</span><h2>{activeBrand ? <>Explore<br/><em>{activeBrand.key === "prospec" ? "what's possible." : activeBrand.key === "galaxy" ? "the experience." : "the execution."}</em></> : <>Find your<br/><em>next step.</em></>}</h2></div>
        <p>{activeBrand ? "Browse this business's own products and services. Your THE WORKS basket and customer account stay the same." : "Choose from the catalogue, see indicative prices, adjust quantities and carry your selection into your customer account."}</p>
      </div>
      {activeBrand && <section className={"works-active-business works-active-"+activeBrand.key} aria-label={activeBrand.name+" storefront"}>
        <div className="works-active-business-image"><img src={activeBrand.image} alt={activeBrand.name+" brand experience"} loading="lazy" onError={event => { event.currentTarget.style.display = "none"; }}/></div>
        <div className="works-active-business-copy"><span className="works-active-kicker">THE WORKS STOREFRONT · {activeBrand.cue}</span><h3>{activeBrand.name}</h3><strong>{activeBrand.line}</strong><p>{activeBrand.description}</p><button type="button" onClick={() => setBusinessFilter("All")}>← View all businesses</button></div>
      </section>}
      <div className="works-results" aria-live="polite">
        <div className="works-results-head"><strong>{query.trim() ? "Matching services" : "Explore services"} · {results.length} available</strong><button type="button" onClick={() => { setQuery(""); setBusinessFilter("All"); }}>Clear filters</button></div><div className="works-catalogue-filters"><button type="button" aria-pressed={businessFilter==="All"} onClick={()=>chooseBusiness("All")}>All businesses</button>{WORKS_BUSINESSES.map(name=><button type="button" key={name} aria-pressed={businessFilter===name} onClick={()=>chooseBusiness(name)}>{worksBusinessLabel(name)}</button>)}</div>
        {results.length ? <div className="works-results-grid">{results.map(item => <article className="works-result works-catalogue-card" key={item.id}><span>{worksBusinessLabel(item.business)} · {item.category}</span><strong>{item.name}</strong><p>{item.description}</p><b className="works-catalogue-price">{item.priceMode==="quote"?"Price on request":(item.priceMode==="from"?"From ":"")+money(item.price??0)+(item.unit?" / "+item.unit:"")}</b><small>Indicative market-reference price. Final price depends on confirmed specifications.</small><div className="works-catalogue-controls">{(quantities[item.id]||0)>0?<><button type="button" aria-label={"Remove one "+item.name} onClick={()=>setQuantity(item.id,(quantities[item.id]||0)-1)}>−</button><strong>{quantities[item.id]}</strong><button type="button" aria-label={"Add one "+item.name} onClick={()=>setQuantity(item.id,(quantities[item.id]||0)+1)}>+</button></>:<button type="button" onClick={()=>setQuantity(item.id,1)}>Add to basket +</button>}</div></article>)}</div> : <p className="works-no-results">No matching services. Try a broader search or choose another business.</p>}
      {selected.length > 0 && <div className="works-selection-bar"><div><strong>{selected.reduce((n,item)=>n+item.quantity,0)} items selected</strong><span>Estimated total · {money(subtotal)}{quoteCount>0?" · "+quoteCount+" quote-priced item"+(quoteCount===1?"":"s"):""}</span><small>Indicative prices only. Final quotations are confirmed by each business.</small></div><button type="button" onClick={continueToAccount}>Continue with selected services ↗</button></div>}
      </div>
    </section>

    <details className="works-businesses-disclosure" id="works-businesses"><summary>Meet the businesses <span>Optional · learn more about each team</span></summary>
    <section className="works-businesses">
      <div className="works-section-heading works-business-heading">
        <div><span className="works-eyebrow">MEET THE SPECIALISTS</span><h2>Good people.<br/><em>Different strengths.</em></h2></div>
        <p>Explore each business directly. Every enquiry is handled by the business responsible for the service.</p>
      </div>
      <div className="works-business-grid">
        {businesses.map((business,index) => <article className={"works-business-card works-business-"+business.id} id={business.id} key={business.id}>
          <div className="works-business-image"><img src={business.image} alt={business.name+" service showcase"} loading="lazy" onError={event => { event.currentTarget.style.display = "none"; }}/><span>{business.number} / THE WORKS PARTNER</span><b>{business.type}</b></div>
          <div className="works-business-copy"><div className="works-business-title"><span>{business.name}</span><span>0{index+1}</span></div><h3>{business.line}</h3><p>{business.description}</p><div className="works-service-tags">{business.services.map(service=><span key={service}>{service}</span>)}</div><button type="button" onClick={()=>chooseBusiness(business.id)}>Explore services & prices <ArrowRight size={16}/></button></div>
        </article>)}
      </div>
    </section></details>

    <footer className="works-footer">
      <div className="works-footer-main"><Link className="works-wordmark works-footer-brand" href="/account"><span className="works-mark">W<span>·</span></span><span><strong>THE WORKS</strong><small>BUSINESS & EXPERIENCES</small></span></Link><p>Everything you need to make things happen.</p><nav aria-label="Footer navigation"><Link href="#works-discovery">Find a service</Link><Link href="#works-businesses">Businesses</Link><Link href="/account">My Account</Link><Link href="/games">Game Corner</Link></nav><Link className="works-briefcase" href="/admin" aria-label="Open the Owner's Briefcase" title="Owner's Briefcase"><BriefcaseBusiness size={22}/></Link></div>
      <div className="works-footer-bottom"><span>THE WORKS · BOTSWANA</span><span>Three participating businesses. Distinct teams and responsibilities.</span></div>
    </footer>
  </main>);
}
