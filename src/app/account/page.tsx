"use client";
import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {GoogleAuthProvider,browserLocalPersistence,linkWithPopup,onAuthStateChanged,setPersistence,signInAnonymously,signInWithPopup,signOut,type User} from "firebase/auth";
import {collection,doc,getDoc,onSnapshot,query,where,writeBatch} from "firebase/firestore";
import {auth,db,hasFirebaseWebConfig} from "@/lib/firebase/client";
import {getCustomerProfile,saveCustomerProfile,type CustomerProfile} from "@/lib/firebase/data";
import {DEFAULT_WORKS_CATALOGUE,subscribeToWorksServices,WORKS_BUSINESSES,type WorksService} from "@/lib/firebase/works-catalogue";
import "../works-account.css";
import "../works-request.css";
import {localizeWorks,useWorksLanguage} from "@/lib/works-translations";

type AccountTab="overview"|"orders"|"messages"|"receipts";
type WorksEnquiry={id:string;items:{business:string;name:string;priceLabel:string;price?:number|null;priceMode?:string;quantity:number}[];status:string;createdAt:string;brief?:string;businesses?:string[]};
const starter=DEFAULT_WORKS_CATALOGUE.map((item,index)=>({...item,id:"starter-"+String(index+1).padStart(3,"0"),createdAt:"",updatedAt:""} as WorksService));
const money=(value:number)=>"P"+value.toLocaleString("en-BW",{maximumFractionDigits:2});
const priceLabel=(service:WorksService)=>service.priceMode==="quote"?"Price on request":(service.priceMode==="from"?"From ":"")+money(service.price??0)+(service.unit?" / "+service.unit:"");

export default function AccountPage(){
 const {language,setLanguage}=useWorksLanguage();
 const[user,setUser]=useState<User|null>(null),[profile,setProfile]=useState<CustomerProfile|null>(null),[ready,setReady]=useState(false),[busy,setBusy]=useState(false),[tab,setTab]=useState<AccountTab>("overview"),[notice,setNotice]=useState("");
 const[services,setServices]=useState<WorksService[]>(starter),[quantities,setQuantities]=useState<Record<string,number>>({}),[enquiries,setEnquiries]=useState<WorksEnquiry[]>([]);
 const[name,setName]=useState(""),[phone,setPhone]=useState(""),[email,setEmail]=useState(""),[location,setLocation]=useState(""),[eventDate,setEventDate]=useState(""),[brief,setBrief]=useState("");
 useEffect(()=>subscribeToWorksServices(items=>setServices(items.length?items:starter),()=>setServices(starter)),[]);
 useEffect(()=>{
   const params=new URLSearchParams(window.location.search);
   if(params.get("submitted")==="1")setNotice("Your order/request has been saved and sent to the responsible business team.");
   const encoded=params.get("items");
   if(encoded){const parsed:Record<string,number>={};encoded.split(",").forEach(part=>{const [id,count]=part.split(":");const quantity=Math.max(1,Math.min(10000,Number(count)||1));if(id)parsed[id]=quantity;});setQuantities(parsed);}
 },[]);
 useEffect(()=>{
   let alive=true,stopAuth=()=>{},stopRequests=()=>{};
   void (async()=>{if(hasFirebaseWebConfig){try{await setPersistence(auth,browserLocalPersistence)}catch{}}if(!alive)return;
     stopAuth=onAuthStateChanged(auth,async next=>{
       if(!alive)return;setUser(next);stopRequests();
       if(next){
         stopRequests=onSnapshot(query(collection(db,"worksEnquiries"),where("customerId","==",next.uid)),snap=>setEnquiries(snap.docs.map(d=>({id:d.id,...d.data()} as WorksEnquiry)).sort((a,b)=>b.createdAt.localeCompare(a.createdAt))),()=>setNotice("Order history could not be refreshed. Check your connection."));
         const saved=await getCustomerProfile(next.uid).catch(()=>null);if(!alive)return;
         setProfile(saved??{uid:next.uid,name:next.displayName??"",email:next.email??"",phone:"",preferredDeliveryLocation:"",notes:"",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
         setName(saved?.name??next.displayName??"");setEmail(saved?.email??next.email??"");setPhone(saved?.phone??"");setLocation(saved?.preferredDeliveryLocation??"");
       }else{setProfile(null);setEnquiries([])}
       setReady(true);
     });
   })();
   return()=>{alive=false;stopAuth();stopRequests()};
 },[]);
 const selected=useMemo(()=>services.filter(service=>(quantities[service.id]||0)>0).map(service=>({service,quantity:quantities[service.id]})),[services,quantities]);
 const subtotal=selected.reduce((sum,item)=>sum+(item.service.priceMode==="quote"?0:(item.service.price??0)*item.quantity),0);
 const quoteCount=selected.filter(item=>item.service.priceMode==="quote").length;
 function quantity(id:string,next:number){setQuantities(current=>{const copy={...current};if(next<=0)delete copy[id];else copy[id]=Math.min(10000,next);return copy;});}
 async function connectGoogle(){
   if(!hasFirebaseWebConfig||busy){setNotice("Customer sign-in is not configured in this deployment.");return}
   setBusy(true);setNotice("");
   try{const provider=new GoogleAuthProvider();provider.setCustomParameters({prompt:"select_account"});const result=auth.currentUser?.isAnonymous?await linkWithPopup(auth.currentUser,provider):await signInWithPopup(auth,provider);const now=new Date().toISOString();const saved=await getCustomerProfile(result.user.uid).catch(()=>null);
     if(!saved){const next={uid:result.user.uid,name:result.user.displayName??name,email:result.user.email??email,phone,preferredDeliveryLocation:location,notes:"",createdAt:now,updatedAt:now};await saveCustomerProfile(next);setProfile(next)}else setProfile(saved);
     setNotice("Your THE WORKS customer account is connected.");
   }catch(error){const code=typeof error==="object"&&error&&"code"in error?String((error as {code?:unknown}).code):"";setNotice(code==="auth/popup-closed-by-user"?"Sign-in was cancelled.":"We could not connect your account. Please try again.");}finally{setBusy(false)}
 }
 async function submitOrder(event:React.FormEvent){
   event.preventDefault();if(busy)return;if(!selected.length||!name.trim()||!phone.trim()){setNotice("Keep at least one selected item and enter your name and phone number.");return}
   if(!hasFirebaseWebConfig){setNotice("The customer order service is not configured yet.");return}
   setBusy(true);setNotice("");
   try{
     let customer=auth.currentUser;if(!customer)customer=(await signInAnonymously(auth)).user;
     const now=new Date().toISOString(),profileRef=doc(db,"customers",customer.uid),existing=await getDoc(profileRef),old=existing.data()??{};
     const lines=selected.map(({service,quantity})=>({serviceId:service.id,business:service.business,name:service.name,category:service.category,price:service.price,priceMode:service.priceMode,priceLabel:priceLabel(service),unit:service.unit,quantity,details:""}));
     const enquiryRef=doc(collection(db,"worksEnquiries")),batch=writeBatch(db);
     batch.set(profileRef,{uid:customer.uid,name:name.trim(),email:email.trim(),phone:phone.trim(),preferredDeliveryLocation:location.trim(),notes:"",createdAt:old.createdAt||now,updatedAt:now},{merge:true});
     batch.set(enquiryRef,{customerId:customer.uid,customerName:name.trim(),email:email.trim(),phone:phone.trim(),location:location.trim(),eventDate,brief:brief.trim(),items:lines,businesses:[...new Set(lines.map(line=>line.business))],status:"new",createdAt:now,updatedAt:now});
     for(const company of WORKS_BUSINESSES.filter(company=>lines.some(line=>line.business===company))){const companyRef=doc(collection(db,"worksCompanyRequests"));batch.set(companyRef,{enquiryId:enquiryRef.id,customerId:customer.uid,business:company,customerName:name.trim(),phone:phone.trim(),email:email.trim(),location:location.trim(),eventDate,brief:brief.trim(),items:lines.filter(line=>line.business===company),status:"new",createdAt:now,updatedAt:now});}
     await batch.commit();setQuantities({});window.history.replaceState({}, "", "/account?submitted=1");setNotice("Your order/request has been saved and sent to the responsible business team.");
   }catch(error){setNotice(error instanceof Error?error.message:"Your order could not be saved. Please try again.");}finally{setBusy(false)}
 }
 const activeOrders=enquiries.filter(item=>!["completed","collected","delivered","cancelled","rejected"].includes((item.status||"").toLowerCase())).length;
 const greeting=profile?.name?.trim().split(/\s+/)[0]||user?.displayName?.trim().split(/\s+/)[0]||"there";
 return localizeWorks(language,<main className="works-account-page">
  <div className="works-account-topline"><span>THREE SPECIALIST BUSINESSES · ONE PLACE TO START</span><span>BOTSWANA</span></div>
  <header className="works-account-header"><Link href="/" className="works-account-brand"><span className="works-account-mark">W<span>·</span></span><span><b>THE WORKS</b><small>BUSINESS & EXPERIENCES</small></span></Link><nav><Link href="/#works-discovery">Find a service</Link><Link href="/#works-businesses">Businesses</Link><Link href="/account" aria-current="page">My Account</Link><label className="works-language-control"><span>Language</span><select aria-label="Display language" value={language} onChange={event=>setLanguage(event.target.value==="tn"?"tn":"en")}><option value="en">English</option><option value="tn">Setswana</option></select></label></nav></header>
  <div className="works-account-wrap">
   <div className="works-account-breadcrumb"><Link href="/">← Back to THE WORKS</Link><span>YOUR CUSTOMER SPACE</span></div>
   <section className="works-account-hero"><div className="works-account-hero-copy"><span className="works-account-eyebrow">THE WORKS / MY ACCOUNT</span><h1>Dumela, <em>{greeting}.</em></h1><p>Your selected services, orders, quotations, conversations and project updates—together in one place.</p><div className="works-account-hero-meta"><span className={user?"is-connected":""}><i/>{ready?(user?(user.isAnonymous?"Guest order session":"Account connected"):"Browse first · Connect when ready"):"Restoring your space…"}</span><span>ONE CUSTOMER ACCOUNT</span></div></div><div className="works-account-hero-art" aria-label="THE WORKS customer account"><div className="works-account-art-ring"/><div className="works-account-art-card"><small>YOUR WORK, TOGETHER</small><strong>One place.<br/>Clear next steps.</strong><div><span>ORDERS</span><span>QUOTES</span><span>PROJECTS</span></div></div><span className="works-account-art-stamp">THE<br/>WORKS</span></div></section>
   {!user&&<section className="works-account-connect"><div><span className="works-account-eyebrow">GET STARTED</span><h2>Your space is ready<br/><em>when you are.</em></h2><p>Your selected items stay here. Connect with Google to keep your order history available across devices, or submit as a guest.</p></div><div className="works-account-connect-action"><span className="works-account-connect-icon">↗</span><strong>Connect your customer account</strong><small>Use Google sign-in to continue securely on this device.</small><button type="button" onClick={()=>void connectGoogle()} disabled={!ready||busy||!hasFirebaseWebConfig}>{busy?"Connecting…":"Continue with Google"}</button><Link href="/#works-discovery">Explore services first →</Link></div></section>}
   {selected.length>0&&<section className="works-account-selected"><div className="works-account-section-heading"><div><span className="works-account-eyebrow">YOUR SELECTION</span><h2>Review your <em>basket.</em></h2></div><p>These are the exact services and quantities you selected on THE WORKS. You can adjust them before submitting.</p></div><div className="works-account-selected-list">{selected.map(({service,quantity:count})=><article key={service.id}><div><small>{service.business} · {service.category}</small><strong>{service.name}</strong><span>{priceLabel(service)}</span></div><div className="works-catalogue-controls"><button type="button" onClick={()=>quantity(service.id,count-1)}>−</button><b>{count}</b><button type="button" onClick={()=>quantity(service.id,count+1)}>+</button></div></article>)}</div><div className="works-account-basket-total"><div><strong>{selected.reduce((n,item)=>n+item.quantity,0)} items selected</strong><span>Indicative subtotal · {money(subtotal)}{quoteCount?" · "+quoteCount+" quote-priced item(s) to confirm":""}</span></div><Link href="/#works-discovery">Add more services ↗</Link></div>
    <form className="works-account-order-form" onSubmit={submitOrder}><h3>Send your order request</h3><p>Each business receives only the items assigned to its team. This submits an order/request; it does not take payment or confirm a paid purchase.</p><div className="works-account-order-fields"><label>Your name *<input required value={name} onChange={e=>setName(e.target.value)}/></label><label>WhatsApp / phone *<input required value={phone} onChange={e=>setPhone(e.target.value)}/></label><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Location / venue<input value={location} onChange={e=>setLocation(e.target.value)}/></label><label>Required date<input type="date" value={eventDate} onChange={e=>setEventDate(e.target.value)}/></label></div><label>Order notes<textarea rows={3} value={brief} onChange={e=>setBrief(e.target.value)} placeholder="Sizes, colours, guest count, venue or other details…"/></label><button type="submit" disabled={busy||!selected.length}>{busy?"Saving your request…":"Submit order / quote request →"}</button></form>
   </section>}
   <section className="works-account-work"><div className="works-account-section-heading"><div><span className="works-account-eyebrow">YOUR WORK, TOGETHER</span><h2>Keep things <em>moving.</em></h2></div><p>Each business remains responsible for its own orders, quotations, messages and delivery.</p></div><div className="works-account-tabs" role="tablist" aria-label="Your account activity">{([["overview","Overview"],["orders","Orders"],["messages","Messages"],["receipts","Receipts"]] as [AccountTab,string][]).map(([key,label])=><button key={key} type="button" role="tab" aria-selected={tab===key} onClick={()=>setTab(key)}>{label}</button>)}</div><div className="works-account-activity" role="tabpanel">
    {tab==="overview"||tab==="orders"?<>{tab==="overview"&&<div className="works-account-order-stats"><div><strong>{activeOrders}</strong><span>ACTIVE ORDERS</span><small>Being handled by a business</small></div><div><strong>{enquiries.length}</strong><span>ALL ORDERS</span><small>Your saved request history</small></div></div>}{enquiries.length?enquiries.map(item=><article className="works-account-order-card" key={item.id}><div className="works-account-order-card-head"><strong>ORDER · {item.id.slice(0,8).toUpperCase()}</strong><span>{item.status}</span></div><small>{new Intl.DateTimeFormat(language==="tn"?"tn-BW":"en-BW",{dateStyle:"medium",timeStyle:"short"}).format(new Date(item.createdAt))}</small><div className="works-account-order-lines">{item.items?.map((line,index)=><div key={index}><span>{line.quantity} × {line.name}</span><small>{line.business}</small><b>{line.priceMode==="quote"?"Price on request":line.priceLabel||"Price to be confirmed"}</b></div>)}</div><p>Handled by: {(item.businesses||[]).join(" · ")}</p></article>):<div className="works-account-empty"><span>✳</span><div><strong>Your next step starts here.</strong><p>Your orders and quote requests from the participating businesses will appear here after submission.</p><Link href="/#works-discovery">Choose products & services →</Link></div></div>}</>:<div className="works-account-tab-empty"><span>{tab==="messages"?"02":"03"}</span><div><strong>{tab==="messages"?"Business conversations":"Receipts"}</strong><p>{tab==="messages"?"Messages will appear here when the participating businesses' customer conversations are connected.":"Receipts will appear here when a business records a payment against an approved quotation."}</p></div></div>}
   </div></section>
   <section className="works-account-businesses"><div><span className="works-account-eyebrow">THREE SPECIALIST TEAMS</span><h2>Different strengths.<br/><em>One place to begin.</em></h2></div><div className="works-account-business-links"><Link href="/#works-businesses">PROSPEC <span>Products, branding & supply ↗</span></Link><Link href="/#works-businesses">GALAXY LIQUIDS <span>Mobile bars & hospitality ↗</span></Link><Link href="/#works-businesses">KAVON GROUP <span>Events & production ↗</span></Link></div></section>
   {user&&<section className="works-account-profile"><div><span className="works-account-eyebrow">ACCOUNT DETAILS</span><h2>Your details.</h2><p>{profile?.email||user.email||"Connected customer account"}</p></div><button type="button" onClick={()=>void signOut(auth)}>Sign out</button></section>}
   {notice&&<p className="works-account-notice" role="status">{notice}</p>}
  </div><footer className="works-account-footer"><Link href="/" className="works-account-brand"><span className="works-account-mark">W<span>·</span></span><span><b>THE WORKS</b><small>BUSINESS & EXPERIENCES</small></span></Link><p>Everything you need to make things happen.</p><span>THE WORKS · BOTSWANA</span></footer>
 </main>);
}
