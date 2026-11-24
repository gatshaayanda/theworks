"use client";

import {Children,cloneElement,isValidElement,useEffect,useState,type ReactNode,type ReactElement} from "react";

export type WorksLanguage="en"|"tn";
export const WORKS_LANGUAGE_KEY="theworks:language:v1";
export const WORKS_LANGUAGE_EVENT="theworks:language-changed";

const tn:Record<string,string>={
 "Language":"Puo","Display language":"Puo e e bontshiwang","there.":"tsala.","Clear filters":"Tlosa ditlhopho","Matching services":"Ditirelo tse di tshwanang","Explore services":"Lebelela ditirelo","available":"di teng","Price on request":"Tlhwatlhwa e tla itsisiwe","From ":"Go simolola ka ","Browse services & prices":"Lebelela ditirelo le ditlhwatlhwa","Search":"Batla",
 "Find a service":"Batla tirelo","Businesses":"Dikgwebo","My Account":"Akhaonto ya me","Back to THE WORKS":"Boela kwa THE WORKS",
 "YOUR CUSTOMER SPACE":"LEFELO LA GAGO LA MOREKI","THE WORKS / MY ACCOUNT":"THE WORKS / AKHAONTO YA ME",
 "Your selected services, orders, quotations, conversations and project updates—together in one place.":"Ditirelo tse o di tlhophileng, dikopo, ditlhwatlhwa, melaetsa le dikitsiso tsa diporojeke tsa gago di fano mmogo.",
 "ONE CUSTOMER ACCOUNT":"AKHAONTO E LE NNGWE YA MOREKI","YOUR WORK, TOGETHER":"DITIRO TSA GAGO, MMOGO","One place.":"Lefelo le le lengwe.","Clear next steps.":"Dikgato tse di latelang di a bonala.",
 "ORDERS":"DIKOPO","QUOTES":"DITLHWA TSHUPISO","PROJECTS":"DIPOROJEKE","Guest order session":"Tiriso ya moeng","Account connected":"Akhaonto e golagantswe",
 "Browse first · Connect when ready":"Lebelela pele · Golaganya fa o ipaakantse","Restoring your space…":"Akhaonto ya gago e a buselediwa…",
 "GET STARTED":"SIMOLOLA","Your space is ready":"Lefelo la gago le siame","when you are.":"fa o ipaakantse.",
 "Your selected items stay here. Connect with Google to keep your order history available across devices, or submit as a guest.":"Dilo tse o di tlhophileng di tla nna fano. Golaganya Google go bona hisitori ya dikopo mo didirisiweng tse dingwe, kgotsa romela kopo o le moeng.",
 "Connect your customer account":"Golaganya akhaonto ya gago ya moreki","Use Google sign-in to continue securely on this device.":"Dirisa Google go tswelela ka pabalesego mo sedirisiweng seno.",
 "Connecting…":"E a golaganya…","Continue with Google":"Tswelela ka Google","Explore services first →":"Lebelela ditirelo pele →",
 "YOUR SELECTION":"TSE O DI TLHOPHILENG","Review your":"Sekaseka","basket.":"seroto sa gago.",
 "These are the exact services and quantities you selected on THE WORKS. You can adjust them before submitting.":"Tseno ke ditirelo le dipalo tse o di tlhophileng mo THE WORKS. O ka di fetola pele o romela kopo.",
 "Add more services ↗":"Tsenya ditirelo tse dingwe ↗","Send your order request":"Romela kopo ya gago","Your name *":"Leina la gago *","WhatsApp / phone *":"WhatsApp / mogala *","Email":"Imeile","Location / venue":"Lefelo / boalo","Required date":"Letlha le o le tlhokang","Order notes":"Dintlha tsa kopo",
 "Submit order / quote request →":"Romela kopo / kopo ya tlhwatlhwa →","Saving your request…":"Kopo ya gago e a bolokwa…",
 "YOUR WORK, TOGETHER":"DITIRO TSA GAGO, MMOGO","Keep things":"Dira gore dilo di","moving.":"tswelele.",
 "Each business remains responsible for its own orders, quotations, messages and delivery.":"Kgwebo nngwe le nngwe e sa ntse e ikarabela ka dikopo, ditlhwatlhwa, melaetsa le thomelo ya yone.",
 "Overview":"Kakaretso","Orders":"Dikopo","Messages":"Melaetsa","Receipts":"Dirisiti","Your account activity":"Ditiragalo tsa akhaonto ya gago",
 "ACTIVE ORDERS":"DIKOPO TSE DI TSWELELANG","ALL ORDERS":"DIKOPO TSOTLHE","Being handled by a business":"Di samaganwa le tsone ke kgwebo","Your saved request history":"Hisitori ya dikopo tsa gago tse di bolokilweng",
 "Your next step starts here.":"Kgato ya gago e e latelang e simolola fano.","Your orders and quote requests from the participating businesses will appear here after submission.":"Dikopo tsa gago le dikopo tsa ditlhwatlhwa tse di rometsweng kwa dikgwebong di tla bonala fano.",
 "Choose products & services →":"Tlhopha dikumo le ditirelo →","Business conversations":"Melaetsa le dikgwebo","Receipts":"Dirisiti",
 "Messages will appear here when the participating businesses' customer conversations are connected.":"Melaetsa e tla bonala fano fa dikgwebo di golagantse puisano ya bareki.",
 "Receipts will appear here when a business records a payment against an approved quotation.":"Dirisiti di tla bonala fano fa kgwebo e kwadisa tuelo ya tlhwatlhwa e e amogetsweng.",
 "Handled by:":"E samaganwa le:","Price on request":"Tlhwatlhwa e tla itsisiwe","Price to be confirmed":"Tlhwatlhwa e tla tlhomamisiwa",
 "Your details.":"Dintlha tsa gago.","ACCOUNT DETAILS":"DINTLHA TSA AKHAONTO","Sign out":"Tswa mo akhaontong",
 "Everything you need to make things happen.":"Tsotlhe tse o di tlhokang go dira gore dilo di diragale.",
 "THREE SPECIALIST BUSINESSES · ONE PLACE TO START":"DIKGWEBO TSE THARO TSA BOKGONI · LEFELO LE LE LENGWE LA GO SIMOLOLA",
 "BOTSWANA":"BOTSWANA","Browse services & prices":"Lebelela ditirelo le ditlhwatlhwa","SERVICE DISCOVERY":"BATLA DITIRELO",
 "Find your":"Batla","next step.":"kgato e e latelang.","Explore services":"Lebelela ditirelo","All businesses":"Dikgwebo tsotlhe",
 "Clothing & merchandise":"Diaparo le dithoto","Printing & branding":"Go gatisa le go aga leina","Mobile bars":"Mobile bar","Events & production":"Ditiragalo le tlhagiso",
 "What do you need to make happen?":"O batla go dira eng?","Search products and services":"Batla dikumo le ditirelo",
 "No matching services. Try a broader search or choose another business.":"Ga go na ditirelo tse di tshwanang. Leka mafoko a mangwe kgotsa tlhopha kgwebo e nngwe.",
 "Add to basket +":"Tsenya mo serotong +","Continue with selected services ↗":"Tswelela ka ditirelo tse o di tlhophileng ↗",
 "Explore services & prices":"Lebelela ditirelo le ditlhwatlhwa","Meet the businesses":"Kopana le dikgwebo",
 "Find the products, services and people you need to bring your next project to life.":"Bona dikumo, ditirelo le batho ba o ba tlhokang go dira porojeke ya gago.",
 "Business gets":"Kgwebo e","done here.":"diragala fano."
};

export function useWorksLanguage(){
 const[language,setLanguage]=useState<WorksLanguage>("en");
 useEffect(()=>{
  const read=()=>{try{setLanguage(localStorage.getItem(WORKS_LANGUAGE_KEY)==="tn"?"tn":"en")}catch{setLanguage("en")}};
  read();window.addEventListener(WORKS_LANGUAGE_EVENT,read);window.addEventListener("storage",read);
  return()=>{window.removeEventListener(WORKS_LANGUAGE_EVENT,read);window.removeEventListener("storage",read)};
 },[]);
 useEffect(()=>{document.documentElement.lang=language==="tn"?"tn":"en"},[language]);
 function updateLanguage(next:WorksLanguage){setLanguage(next);try{localStorage.setItem(WORKS_LANGUAGE_KEY,next);window.dispatchEvent(new Event(WORKS_LANGUAGE_EVENT))}catch{}}
 return {language,setLanguage:updateLanguage};
}

export function localizeWorks(language:WorksLanguage,node:ReactNode):ReactNode{
 if(language!=="tn")return node;
 return Children.map(node,child=>{
  if(typeof child==="string"){const trimmed=child.trim();const translated=tn[trimmed];return translated===undefined?child:child.replace(trimmed,translated)}
  if(isValidElement(child)){const element=child as ReactElement<{children?:ReactNode}>;return cloneElement(element,{children:localizeWorks(language,element.props.children)})}
  return child;
 });
}
