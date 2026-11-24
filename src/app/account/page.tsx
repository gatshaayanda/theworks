"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, browserLocalPersistence, onAuthStateChanged, setPersistence, signInWithPopup, signOut, type User } from "firebase/auth";
import { auth, hasFirebaseWebConfig } from "@/lib/firebase/client";
import { getCustomerProfile, saveCustomerProfile, type CustomerProfile } from "@/lib/firebase/data";
import "../works-account.css";

type AccountTab = "overview" | "enquiries" | "messages" | "receipts";

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<AccountTab>("overview");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let alive = true;
    let stop = () => {};
    const start = async () => {
      if (hasFirebaseWebConfig) {
        try { await setPersistence(auth, browserLocalPersistence); } catch {}
      }
      if (!alive) return;
      stop = onAuthStateChanged(auth, async (next) => {
        if (!alive) return;
        setUser(next);
        if (next) {
          const saved = await getCustomerProfile(next.uid).catch(() => null);
          if (!alive) return;
          setProfile(saved ?? {
            uid: next.uid, name: next.displayName ?? "", email: next.email ?? "",
            phone: "", preferredDeliveryLocation: "", notes: "",
            createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
          });
        } else setProfile(null);
        setReady(true);
      });
    };
    void start();
    return () => { alive = false; stop(); };
  }, []);

  async function connectGoogle() {
    if (!hasFirebaseWebConfig || busy) {
      setNotice("Account sign-in is not configured in this deployment yet.");
      return;
    }
    setBusy(true); setNotice("");
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const now = new Date().toISOString();
      const saved = await getCustomerProfile(result.user.uid).catch(() => null);
      if (!saved) {
        const next = {
          uid: result.user.uid, name: result.user.displayName ?? "",
          email: result.user.email ?? "", phone: "", preferredDeliveryLocation: "",
          notes: "", createdAt: now, updatedAt: now
        };
        await saveCustomerProfile(next);
        setProfile(next);
      } else setProfile(saved);
      setNotice("Your THE WORKS account is connected.");
    } catch (error) {
      const code = typeof error === "object" && error && "code" in error ? String((error as { code?: unknown }).code) : "";
      setNotice(code === "auth/popup-closed-by-user" ? "Sign-in was cancelled." : "We could not connect your account. Please try again.");
    } finally { setBusy(false); }
  }

  const greeting = profile?.name?.trim().split(/\s+/)[0] || user?.displayName?.trim().split(/\s+/)[0] || "there";

  return (
    <main className="works-account-page">
      <div className="works-account-topline"><span>THREE SPECIALIST BUSINESSES · ONE PLACE TO START</span><span>BOTSWANA</span></div>
      <header className="works-account-header">
        <Link href="/" className="works-account-brand"><span className="works-account-mark">W<span>·</span></span><span><b>THE WORKS</b><small>BUSINESS & EXPERIENCES</small></span></Link>
        <nav><Link href="/#works-discovery">Find a service</Link><Link href="/#works-businesses">Businesses</Link><Link href="/account" aria-current="page">My Account</Link></nav>
      </header>

      <div className="works-account-wrap">
        <div className="works-account-breadcrumb"><Link href="/">← Back to THE WORKS</Link><span>YOUR CUSTOMER SPACE</span></div>
        <section className="works-account-hero">
          <div className="works-account-hero-copy">
            <span className="works-account-eyebrow">THE WORKS / MY ACCOUNT</span>
            <h1>Dumela, <em>{greeting}.</em></h1>
            <p>Your enquiries, quotations, conversations and project updates—together in one place.</p>
            <div className="works-account-hero-meta"><span className={user ? "is-connected" : ""}><i />{ready ? (user ? "Account connected" : "Browse first · Connect when ready") : "Restoring your space…"}</span><span>ONE CUSTOMER ACCOUNT</span></div>
          </div>
          <div className="works-account-hero-art" aria-label="THE WORKS customer account"><div className="works-account-art-ring" /><div className="works-account-art-card"><small>YOUR WORK, TOGETHER</small><strong>One place.<br/>Clear next steps.</strong><div><span>ENQUIRIES</span><span>QUOTES</span><span>PROJECTS</span></div></div><span className="works-account-art-stamp">THE<br/>WORKS</span></div>
        </section>

        {!user && <section className="works-account-connect">
          <div><span className="works-account-eyebrow">GET STARTED</span><h2>Your space is ready<br/><em>when you are.</em></h2><p>Browse businesses first. Connect your account when you want to keep track of a request and the response from the business handling it.</p></div>
          <div className="works-account-connect-action"><span className="works-account-connect-icon">↗</span><strong>Connect your customer account</strong><small>Use Google sign-in to continue securely on this device.</small><button type="button" onClick={() => void connectGoogle()} disabled={!ready || busy || !hasFirebaseWebConfig}>{busy ? "Connecting…" : ready ? "Continue with Google" : "Restoring account…"}</button><Link href="/#works-discovery">Explore services first →</Link></div>
        </section>}

        <section className="works-account-work">
          <div className="works-account-section-heading"><div><span className="works-account-eyebrow">YOUR WORK, TOGETHER</span><h2>Keep things <em>moving.</em></h2></div><p>Each business remains responsible for its own enquiries, quotations, messages and delivery.</p></div>
          <div className="works-account-tabs" role="tablist" aria-label="Your account activity">
            {([["overview","Overview"],["enquiries","Enquiries"],["messages","Messages"],["receipts","Receipts"]] as [AccountTab,string][]).map(([key,label]) => <button key={key} type="button" role="tab" aria-selected={tab===key} onClick={() => setTab(key)}>{label}</button>)}
          </div>
          <div className="works-account-activity" role="tabpanel">
            {tab === "overview" ? <><div className="works-account-stat"><strong>—</strong><span>OPEN ENQUIRIES</span></div><div className="works-account-stat"><strong>—</strong><span>QUOTATIONS</span></div><div className="works-account-stat"><strong>—</strong><span>ACTIVE PROJECTS</span></div><div className="works-account-empty"><span>✳</span><div><strong>{user ? "Your THE WORKS activity will appear here." : "Your next step starts here."}</strong><p>{user ? "The shared activity timeline is being connected to the participating businesses. No company requests or history are being shown from another service." : "When you send an enquiry, it will be associated with the specialist business responsible for responding."}</p><Link href="/#works-discovery">Find a service →</Link></div></div></> :
              <div className="works-account-tab-empty"><span>{tab === "enquiries" ? "01" : tab === "messages" ? "02" : "03"}</span><div><strong>{tab === "enquiries" ? "Your enquiries" : tab === "messages" ? "Your conversations" : "Your receipts"}</strong><p>{tab === "enquiries" ? "Enquiries and quotations will be grouped by the business handling your request." : tab === "messages" ? "Messages from each participating business will stay in that business’s conversation." : "Receipts will be available here when a business records a payment."}</p></div></div>}
          </div>
        </section>

        <section className="works-account-businesses"><div><span className="works-account-eyebrow">THREE SPECIALIST TEAMS</span><h2>Different strengths.<br/><em>One place to begin.</em></h2></div><div className="works-account-business-links"><Link href="/#works-businesses">PROSPEC <span>Products, branding & supply ↗</span></Link><Link href="/#works-businesses">GALAXY LIQUIDS <span>Mobile bars & hospitality ↗</span></Link><Link href="/#works-businesses">KAVON GROUP <span>Events & production ↗</span></Link></div></section>

        {user && <section className="works-account-profile"><div><span className="works-account-eyebrow">ACCOUNT DETAILS</span><h2>Your details.</h2><p>{profile?.email || user.email || "Connected customer account"}</p></div><button type="button" onClick={() => void signOut(auth)}>Sign out</button></section>}
        {notice && <p className="works-account-notice" role="status">{notice}</p>}
      </div>
      <footer className="works-account-footer"><Link href="/" className="works-account-brand"><span className="works-account-mark">W<span>·</span></span><span><b>THE WORKS</b><small>BUSINESS & EXPERIENCES</small></span></Link><p>Everything you need to make things happen.</p><span>THE WORKS · BOTSWANA</span></footer>
    </main>
  );
}
