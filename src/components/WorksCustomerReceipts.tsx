"use client";
import {useEffect,useState} from "react";
import {subscribeToWorksCustomerPayments,type WorksPayment} from "@/lib/firebase/data";
import {worksBusinessLabel} from "@/lib/firebase/works-catalogue";
// from "@/lib/firebase/data";
export default function WorksCustomerReceipts({uid}:{uid:string}){
 const[items,setItems]=useState<WorksPayment[]>([]),[notice,setNotice]=useState("");
 useEffect(()=>subscribeToWorksCustomerPayments(uid,setItems,error=>setNotice(error.message)),[uid]);
 return <section className="works-receipt-list">{notice&&<p role="status">{notice}</p>}{!items.length&&!notice&&<div className="works-account-tab-empty"><span>03</span><div><strong>No payment records yet.</strong><p>When a participating business records a payment against one of your orders, its payment record will appear here.</p></div></div>}{items.map(item=><article key={item.id}><header><div><small>{worksBusinessLabel(item.business)}</small><strong>Payment record · {item.id.slice(0,8).toUpperCase()}</strong></div><b>{new Intl.NumberFormat("en-BW",{style:"currency",currency:"BWP"}).format(item.amount)}</b></header><p>Order: {item.enquiryId.slice(0,8).toUpperCase()} · {new Date(item.recordedAt).toLocaleString("en-BW",{dateStyle:"medium",timeStyle:"short"})}</p><p>Method: {item.method}{item.reference?" · Reference: "+item.reference:""}</p><small>This is a record entered by the business, not a tax invoice or confirmation from a payment provider.</small></article>)}</section>;
}