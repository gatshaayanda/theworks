"use client";
import {addDoc,collection,deleteDoc,doc,getDocs,onSnapshot,query,updateDoc,where,writeBatch,type Unsubscribe} from "firebase/firestore";
import {db} from "@/lib/firebase/client";
export type WorksBusiness="PROSPEC"|"GALAXY LIQUIDS"|"KAVON GROUP";
export type WorksPriceMode="fixed"|"from"|"quote";
export type WorksService={id:string;business:WorksBusiness;name:string;category:string;description:string;price:number|null;priceMode:WorksPriceMode;unit:string;published:boolean;featured:boolean;sortOrder:number;createdAt:string;updatedAt:string};
export type WorksServiceDraft=Omit<WorksService,"id"|"createdAt"|"updatedAt">;
export const WORKS_BUSINESSES:WorksBusiness[]=["PROSPEC","GALAXY LIQUIDS","KAVON GROUP"];
// Stable internal business IDs are retained so existing request routing and records are unchanged.
export function worksBusinessLabel(business:string):string{return business==="PROSPEC"?"Example Company 1":business==="GALAXY LIQUIDS"?"Example Company 2":business==="KAVON GROUP"?"Example Company 3":business;}
export const DEFAULT_WORKS_CATALOGUE:WorksServiceDraft[]=[
{business:"PROSPEC",name:"Logo design",category:"Branding & design",description:"A professionally designed logo supplied in practical digital formats. Final deliverables confirmed in the quote.",price:450,priceMode:"from",unit:"per project",published:true,featured:true,sortOrder:1},
{business:"PROSPEC",name:"Business card design",category:"Branding & design",description:"Print-ready business card artwork. Printing and quantities quoted separately.",price:100,priceMode:"from",unit:"per design",published:true,featured:false,sortOrder:2},
{business:"PROSPEC",name:"Company profile design",category:"Branding & design",description:"A designed company profile. Final page count, copywriting and print requirements affect the quote.",price:450,priceMode:"from",unit:"per project",published:true,featured:true,sortOrder:3},
{business:"PROSPEC",name:"Letterhead design",category:"Branding & design",description:"Branded letterhead artwork supplied digitally.",price:100,priceMode:"from",unit:"per design",published:true,featured:false,sortOrder:4},
{business:"PROSPEC",name:"Complete brand identity",category:"Branding & design",description:"A coordinated identity package covering logo and selected business stationery. Deliverables confirmed before approval.",price:1500,priceMode:"from",unit:"per package",published:true,featured:true,sortOrder:5},
{business:"PROSPEC",name:"Corporate T-shirt branding",category:"Clothing & merchandise",description:"Branded apparel. Garment type, sizes, print method and quantity determine the final price.",price:180,priceMode:"from",unit:"per garment",published:true,featured:true,sortOrder:6},
{business:"PROSPEC",name:"Golf shirt branding",category:"Clothing & merchandise",description:"Branded golf shirts. Garment quality, sizes, branding method and quantity affect final price.",price:230,priceMode:"from",unit:"per garment",published:true,featured:false,sortOrder:7},
{business:"PROSPEC",name:"Printed banner",category:"Printing & signage",description:"Large-format banner printing. Final dimensions, material and finishing confirmed in quote.",price:350,priceMode:"from",unit:"per banner",published:true,featured:false,sortOrder:8},
{business:"PROSPEC",name:"Stickers & product labels",category:"Printing & signage",description:"Custom stickers and labels. Material, dimensions, finish and order quantity determine price.",price:0.95,priceMode:"from",unit:"per label",published:true,featured:false,sortOrder:9},
{business:"PROSPEC",name:"Promotional merchandise sourcing",category:"Products & supply",description:"Source branded gifts, uniforms and promotional products to your specification.",price:null,priceMode:"quote",unit:"per project",published:true,featured:false,sortOrder:10},
{business:"GALAXY LIQUIDS",name:"Mobile bar hire",category:"Mobile bars & drinks",description:"Mobile bar setup for private and corporate events. Duration, guest count, location and equipment affect the final quote.",price:2500,priceMode:"from",unit:"per event",published:true,featured:true,sortOrder:1},
{business:"GALAXY LIQUIDS",name:"Bartender service",category:"Mobile bars & drinks",description:"Professional bar service for your event. Staffing, hours and travel confirmed in the quote.",price:750,priceMode:"from",unit:"per bartender",published:true,featured:false,sortOrder:2},
{business:"GALAXY LIQUIDS",name:"Cocktail & mocktail menu",category:"Beverage experiences",description:"A tailored drinks menu for your occasion. Ingredients, serving quantities and presentation affect final price.",price:500,priceMode:"from",unit:"per menu",published:true,featured:true,sortOrder:3},
{business:"GALAXY LIQUIDS",name:"Drinks package",category:"Beverage experiences",description:"Beverage supply and service planned around guest numbers, menu and event duration.",price:null,priceMode:"quote",unit:"per guest / event",published:true,featured:true,sortOrder:4},
{business:"GALAXY LIQUIDS",name:"Glassware & bar accessories",category:"Bar equipment",description:"Glassware and bar equipment hire. Quantities, breakage terms and collection/delivery confirmed in quote.",price:500,priceMode:"from",unit:"per event",published:true,featured:false,sortOrder:5},
{business:"GALAXY LIQUIDS",name:"Corporate bar activation",category:"Beverage experiences",description:"A branded beverage experience for launches, activations and corporate functions.",price:null,priceMode:"quote",unit:"per activation",published:true,featured:false,sortOrder:6},
{business:"KAVON GROUP",name:"Event planning & coordination",category:"Events & experiences",description:"Planning and coordination from concept through event day. Guest count, complexity and deliverables determine final quote.",price:2500,priceMode:"from",unit:"per event",published:true,featured:true,sortOrder:1},
{business:"KAVON GROUP",name:"Event management",category:"Events & experiences",description:"On-the-ground event management and coordination. Duration, team size and scope confirmed in quote.",price:3500,priceMode:"from",unit:"per event",published:true,featured:false,sortOrder:2},
{business:"KAVON GROUP",name:"Stage hire",category:"Technical production",description:"Stage hire based on dimensions, configuration, access, transport and event duration.",price:1500,priceMode:"from",unit:"per event",published:true,featured:true,sortOrder:3},
{business:"KAVON GROUP",name:"Sound system hire",category:"Technical production",description:"Sound system package. Audience size, venue, equipment specification, operator and duration affect final price.",price:2300,priceMode:"from",unit:"per event",published:true,featured:true,sortOrder:4},
{business:"KAVON GROUP",name:"Event lighting",category:"Technical production",description:"Indoor or outdoor lighting packages. Venue, coverage, effects and operator requirements confirmed in quote.",price:1500,priceMode:"from",unit:"per event",published:true,featured:false,sortOrder:5},
{business:"KAVON GROUP",name:"Décor & styling",category:"Events & experiences",description:"Event styling and décor tailored to the theme, venue and guest count.",price:null,priceMode:"quote",unit:"per event",published:true,featured:true,sortOrder:6},
{business:"KAVON GROUP",name:"VIP hospitality & guest logistics",category:"Hospitality & logistics",description:"Guest coordination, VIP hosting and logistics support for events and activations.",price:null,priceMode:"quote",unit:"per event",published:true,featured:false,sortOrder:7}
];
const services=collection(db,"worksServices");
const sort=(items:WorksService[])=>items.sort((a,b)=>a.business.localeCompare(b.business)||a.sortOrder-b.sortOrder||a.name.localeCompare(b.name));
export function subscribeToWorksServices(onChange:(items:WorksService[])=>void,onError:(error:Error)=>void,publishedOnly=true):Unsubscribe{
 const source=publishedOnly?query(services,where("published","==",true)):services;
 return onSnapshot(source,s=>onChange(sort(s.docs.map(d=>({id:d.id,...d.data()} as WorksService)))),e=>onError(e instanceof Error?e:new Error("Catalogue unavailable.")));
}
export async function seedWorksCatalogue(){
 const existing=await getDocs(services);if(!existing.empty)throw new Error("Catalogue already has entries. Seeding stopped to protect existing prices and edits.");
 const batch=writeBatch(db),now=new Date().toISOString();
 DEFAULT_WORKS_CATALOGUE.forEach((item,index)=>batch.set(doc(db,"worksServices","works-"+String(index+1).padStart(3,"0")),{...item,createdAt:now,updatedAt:now}));
 await batch.commit();return DEFAULT_WORKS_CATALOGUE.length;
}
export async function createWorksService(data:WorksServiceDraft){const now=new Date().toISOString();const ref=await addDoc(services,{...data,createdAt:now,updatedAt:now});return ref.id}
export async function updateWorksService(id:string,data:WorksServiceDraft){await updateDoc(doc(db,"worksServices",id),{...data,updatedAt:new Date().toISOString()})}
export async function deleteWorksService(id:string){await deleteDoc(doc(db,"worksServices",id))}
