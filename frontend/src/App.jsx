import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, CheckCircle, ArrowRight, Zap, ShieldCheck, 
  Database, Layers, Smartphone, Search, Globe, 
  ShoppingCart, MousePointer, BarChart3, Users, Sparkles, 
  TrendingUp, X, Check, Building2, Crown, Briefcase, 
  Phone, User, MessageSquare, Lock, ChevronLeft, ChevronRight,
  Video, Package, Languages, Wrench, Boxes, Pencil,
  Bot, FileUp, ScanLine, Wand2, CalendarDays, Truck, ClipboardList, LifeBuoy,
  FileText, Bell, Paperclip // NUOVE ICONE AGGIUNTE
} from 'lucide-react';

// --- IMPORTAZIONE LOGHI ---
import cifaLogo from './assets/img/loghi aggiunti/cifa service first.png';
import energreenLogo from './assets/img/loghi aggiunti/energreen service first.png';
import geetitLogo from './assets/img/loghi aggiunti/geetit-service first.png';
import fiveLogo from './assets/img/loghi aggiunti/LOGO_FIVE_1.png';
import zoomlionLogo from './assets/img/loghi aggiunti/zoomlion-servicefirst.png';

// --- IMPORTAZIONE IMMAGINI CATALOGO ---
import iaImage from './assets/img/IA-Service-First.png';

// --- VARIANTI ANIMAZIONI ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.0 }
  }
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 800 : -800,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 800 : -800,
    opacity: 0
  })
};

const tabContentVariant = {
  hidden: { opacity: 0, x: 20, filter: "blur(5px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, filter: "blur(5px)", transition: { duration: 0.2 } }
};

const AnimatedCounter = ({ end, duration = 2500, suffix = '', prefix = '', color = 'text-sf-primary' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          let startTime = null;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(end * progress));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, [end, duration, isVisible]);

  return <span ref={ref} className={`${color}`}>{prefix}{count}{suffix}</span>;
};

function App() {
  const [formData, setFormData] = useState({ 
    nome: '', 
    email: '', 
    azienda: '', 
    telefono: '', 
    ruolo: '', 
    messaggio: '',
    privacy: false 
  });
  const [status, setStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('ia'); 
  
  // STATES PER LA SEZIONE FEATURES
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [featurePage, setFeaturePage] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [pricingPage, setPricingPage] = useState(0); // NUOVO STATE PER PRICING

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      
      if (mobile !== isMobile || tablet !== isTablet) {
        setIsMobile(mobile);
        setIsTablet(tablet);
        setFeaturePage(0);
        setPricingPage(0); // Reset pricing page
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, isTablet]);

  // SCROLL AUTOMATICO ALL'APERTURA DEL DETTAGLIO
  useEffect(() => {
    if (selectedFeature) {
      const element = document.getElementById('features');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedFeature]);
  
  const ITEMS_PER_PAGE = isMobile ? 1 : (isTablet ? 4 : 6);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('http://localhost:8080/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setStatus(result.success ? 'success' : 'error');
    } catch (error) {
      setTimeout(() => setStatus('success'), 1500); 
    }
  };

  const paginate = (newDirection) => {
    setSlideDirection(newDirection);
    setFeaturePage((prev) => {
      const nextPage = prev + newDirection;
      const maxPages = Math.ceil(features.length / ITEMS_PER_PAGE);
      if (nextPage < 0) return maxPages - 1;
      if (nextPage >= maxPages) return 0;
      return nextPage;
    });
  };

  // --- DATI PRICING ---
  const plans = [
    {
      name: "LIGHT",
      icon: <Zap size={24} />,
      tag: "IDEALE PER PMI",
      price: "€299",
      period: "/mese",
      billing: "Fatturato annualmente",
      features: [
        "Utenti, cataloghi e ricambi illimitati",
        "Tavole illimitate",
        "Editor & Gruppi",
        "Visibilità & Navigator",
        "Kit & Multimedia",
        "Multilingua & Multilistino",
        "Carrello, Preventivi, Pagamenti",
        "Ordini & Centro notifiche",
        "Multibrand & Stampa"
      ],
      services: "Assistenza e manutenzione; backup giornaliero; hosting 10GB",
      cta: "RICHIEDI ORA",
      highlight: false
    },
    {
      name: "BUSINESS",
      icon: <Briefcase size={24} />,
      tag: "POPOLARE",
      price: "€ 349",
      period: "/mese",
      billing: "Fatturato annualmente",
      features: [
        "Tutte le funzioni del piano LIGHT",
        "Intelligenza artificiale",
        "Statistiche con PowerBI",
        "Gestione Matricole",
        "Magazzino e fornitori",
        "Multivaluta"
      ],
      extensions: "Estensioni possibili: ServiceFirst Assistenza, ServiceFirst Noleggi",
      cta: "RICHIEDI ORA",
      highlight: true
    },
    {
      name: "ENTERPRISE",
      icon: <Crown size={24} />,
      tag: "SU MISURA PER LA TUA AZIENDA",
      price: "Contattaci",
      period: "",
      billing: "per informazioni",
      features: [
        "Tutte le funzioni del piano BUSINESS",
        "Servizi On Premise",
        "Personalizzazioni Avanzate",
        "Interfacciamenti Custom"
      ],
      cta: "CONTATTACI",
      highlight: false
    }
  ];

  const paginatePricing = (newDirection) => {
    setPricingPage((prev) => {
      const nextPage = prev + newDirection;
      if (nextPage < 0) return plans.length - 1;
      if (nextPage >= plans.length) return 0;
      return nextPage;
    });
  };

  // --- FEATURES (12 Card totali - rimosse alcune, aggiunte altre) ---
  const features = [
    { id: 1, icon: <Zap size={32} />, title: "Creazione con AI", desc: "Genera cataloghi multilingua in un click grazie all'Intelligenza Artificiale.", details: "Il nostro motore AI analizza i tuoi PDF tecnici, riconosce i codici e crea automaticamente le associazioni con la distinta base. Risparmia fino al 90% del tempo di data-entry manuale.", benefits: ["Riconoscimento automatico", "Importazione massiva", "Zero errori umani"] },
    { id: 2, icon: <MousePointer size={32} />, title: "Navigazione Interattiva", desc: "Esplosi 2D/3D interattivi per identificare i ricambi senza errori.", details: "Offri ai tuoi clienti un'esperienza visiva superiore. Cliccando sul componente nel disegno, questo viene evidenziato nella distinta e viceversa. Supportiamo SVG, PDF vettoriali e modelli 3D.", benefits: ["Zoom profondo", "Evidenziazione bidirezionale", "Mobile Touch"] },
    { id: 3, icon: <ShoppingCart size={32} />, title: "E-Commerce B2B", desc: "Trasforma il catalogo in un portale di vendita attivo 24/7.", details: "Gestisci listini personalizzati per cliente, sconti per quantità, diverse valute e metodi di pagamento sicuri direttamente nel portale ricambi.", benefits: ["Listini personalizzati", "Carrello persistente", "Gateway pagamenti integrati"] },
    { id: 7, icon: <Video size={32} />, title: "Contenuti Multimediali", desc: "Arricchisci il catalogo con video, foto e manuali tecnici.", details: "Collega video tutorial e schede tecniche direttamente al codice del ricambio.", benefits: ["Video Tutorial", "Schede PDF", "Foto dettagliate"] },
    { id: 8, icon: <Package size={32} />, title: "Gestione Kit", desc: "Vendi bundle di ricambi per aumentare il valore dell'ordine.", details: "Crea codici 'virtuali' che raggruppano più componenti (es. Kit Tagliando).", benefits: ["Cross-selling", "Kit pre-configurati", "Bundle virtuali"] },
    { id: 9, icon: <BarChart3 size={32} />, title: "Analytics & KPI", desc: "Analizza i dati per scoprire i trend di vendita e ricerca.", details: "Business Intelligence integrata per monitorare i ricambi più cercati e le performance di vendita.", benefits: ["Report vendite", "Analisi ricerche", "Monitoraggio rete"] },
    { id: 10, icon: <Languages size={32} />, title: "Supporto Multilingua", desc: "Vendi in tutto il mondo con cataloghi localizzati.", details: "Gestisci traduzioni centralizzate e supporta set di caratteri internazionali.", benefits: ["Traduzioni UI/Dati", "Supporto UTF-8", "Switch lingua"] },
    { id: 11, icon: <Pencil size={32} />, title: "Editor Grafico", desc: "Modifica disegni e pallinature direttamente nel browser.", details: "Non serve ricaricare il file per una piccola modifica. Con l'editor integrato puoi aggiungere, spostare o eliminare hotspot e codici direttamente sulle tavole.", benefits: ["Gestione Hotspot", "Correzioni Real-time", "Disegno su Tavola"] },
    { id: 13, icon: <Layers size={32} />, title: "Multibrand", desc: "Gestisci cataloghi di marchi diversi in un'unica piattaforma.", details: "Gestisci cataloghi, listini e reti di vendita separati per ogni marchio del tuo gruppo, tutto da un unico pannello di amministrazione centralizzato.", benefits: ["Gestione centralizzata", "Branding personalizzato", "Reti vendita separate"] },
    // --- NUOVE CARD AGGIUNTE ---
    { id: 14, icon: <FileText size={32} />, title: "Preventivi", desc: "Trasforma il carrello in una richiesta d’offerta.", details: "Questa transizione agevola la generazione e la gestione di preventivi, inclusi sconti e tariffe, direttamente all’interno del portale.", benefits: ["Gestione sconti", "Workflow approvazione", "Conversione in ordine"] },
    { id: 15, icon: <Bell size={32} />, title: "Centro Notifiche", desc: "Avvisa gli utenti di ogni aggiornamento di catalogo.", details: "Il centro notifiche garantisce un’informazione tempestiva e completa su nuovi cataloghi, promozioni o stato degli ordini. La tua segreteria digitale avanzata.", benefits: ["Aggiornamenti real-time", "Avvisi stato ordine", "Comunicazioni massive"] },
    { id: 16, icon: <Paperclip size={32} />, title: "Allegati", desc: "Arricchisci i cataloghi con file di approfondimento.", details: "Senza restrizioni. Gli utenti possono scaricare manuali di istruzioni, schemi, video tutorial, certificazioni e altro ancora direttamente dalla scheda prodotto.", benefits: ["Download manuali", "Schede tecniche", "Certificazioni"] }
  ];

  const currentFeatures = features.slice(featurePage * ITEMS_PER_PAGE, (featurePage + 1) * ITEMS_PER_PAGE);

  const brandLogos = [cifaLogo, energreenLogo, geetitLogo, fiveLogo, zoomlionLogo];

  return (
    <div className="min-h-screen flex flex-col bg-white text-sf-dark font-sans overflow-x-hidden selection:bg-sf-primary selection:text-white">
      
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="bg-white/90 backdrop-blur-md border-b border-gray-100 py-3 md:py-4 px-4 md:px-6 fixed w-full z-50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="w-24 md:w-32">
            <img src="https://servicefirst.it/wp-content/uploads/2025/08/s1.png" alt="Service First Logo" className="w-full h-auto object-contain" />
          </div>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#form" 
            className="hidden md:flex bg-sf-dark text-white px-6 py-2 rounded-md font-semibold hover:bg-sf-primary transition duration-300 items-center gap-2 text-sm md:text-base shadow-lg"
          >
            Richiedi Demo <ArrowRight size={18} />
          </motion.a>
          <a href="#form" className="md:hidden bg-sf-primary text-white p-2 rounded-md">
            <ArrowRight size={20} />
          </a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <header className="pt-36 md:pt-48 pb-12 md:pb-20 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid xl:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center xl:text-left"
          >
           
            <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-sf-dark mb-4 md:mb-6 leading-tight">
              Il tuo catalogo <br/>
              <span className="text-sf-primary">ricambi interattivo</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
              Crea e trasforma i tuoi cataloghi ricambi in un portale e-commerce B2B. Vendi i tuoi ricambi e potenzia il tuo business. Basta un click con l’intelligenza artificiale.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center xl:justify-start">
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#form" 
                className="flex justify-center items-center gap-2 bg-sf-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold text-base md:text-lg shadow-lg shadow-sf-primary/30 hover:bg-teal-600 transition"
              >
                <Zap size={20} /> Prova la Demo Gratuita
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#features" 
                className="flex justify-center items-center gap-2 bg-white border-2 border-gray-200 text-sf-dark px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold text-base md:text-lg hover:border-sf-primary hover:text-sf-primary transition"
              >
                Scopri le Funzioni
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.2 }}
            className="relative mt-8 xl:mt-0 perspective-1000"
          >
            {/* Floating animation per l'immagine Hero */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 bg-white rounded-2xl p-2 shadow-2xl border border-gray-100"
            >
            <div className="bg-black rounded-xl overflow-hidden w-full h-full shadow-2xl border border-gray-200 relative">
              {/* Container per aspect ratio 16:9 */}
              <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                <iframe 
                  src="https://player.vimeo.com/video/1139982611?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&playsinline=1" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                  title="Video Catalogo_ServiceFirst_Catalog_subENG"
                ></iframe>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      

      {/* Brand Strip */}
      <div className="py-8 md:py-10 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-4 md:mb-6">
          <p className="text-center text-gray-400 text-xs md:text-sm font-bold tracking-widest uppercase">Le aziende che utilizzano ServiceFirst</p>
        </div>
        
        <div className="relative w-full overflow-hidden group">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos].map((logo, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.1, opacity: 1, filter: "grayscale(0%)" }}
                className="mx-4 md:mx-8 w-28 md:w-40 h-16 md:h-24 flex items-center justify-center transition-all duration-300 opacity-60 grayscale cursor-pointer"
              >
                <img src={logo} alt="Partner Logo" className="max-w-full max-h-full object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us / Stats Section - MODIFICATA */}
      <section className="py-12 md:py-24 bg-sf-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-20 right-10 w-72 h-72 bg-sf-primary/10 rounded-full blur-3xl"></motion.div>
        <motion.div animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></motion.div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col gap-12 md:gap-16 items-center">
            
            {/* PART 1: Text and Numbers (SOPRA) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">I Numeri di ServiceFirst</h2>
                <p className="text-gray-400 text-base md:text-lg">
                  Le aziende che scelgono la nostra piattaforma ottengono risultati misurabili fin dai primi mesi di utilizzo.
                </p>
              </div>
              
              {/* Numbers List - Grid on desktop for top position */}
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {/* Metric 1 */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="group cursor-default bg-gray-800/30 p-6 rounded-2xl border border-gray-700/50 hover:bg-gray-800/60 transition duration-300"
                >
                  <div className="flex gap-4 items-start">
                    <div className="mt-2 bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-xl h-fit text-white shadow-lg shadow-green-500/30">
                      <TrendingUp size={24}/>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold mb-2 text-white group-hover:text-green-400 transition">Incremento Vendite</h4>
                      <div className="text-4xl lg:text-5xl font-black text-green-400 drop-shadow-lg flex items-center">
                        +<AnimatedCounter end={40} suffix="%" duration={2500} color="text-green-400" />
                      </div>
                      <p className="text-gray-400 text-sm mt-3">Grazie all'e-commerce integrato.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Metric 2 */}
                <motion.div 
                   whileHover={{ y: -5 }}
                   className="group cursor-default bg-gray-800/30 p-6 rounded-2xl border border-gray-700/50 hover:bg-gray-800/60 transition duration-300"
                >
                  <div className="flex gap-4 items-start">
                    <div className="mt-2 bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-xl h-fit text-white shadow-lg shadow-orange-500/30">
                      <Layers size={24}/>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold mb-2 text-white group-hover:text-orange-400 transition">Risparmio Tempo</h4>
                      <div className="text-4xl lg:text-5xl font-black text-orange-400 drop-shadow-lg flex items-center">
                         -<AnimatedCounter end={32} suffix="%" duration={2500} color="text-orange-400" />
                      </div>
                      <p className="text-gray-400 text-sm mt-3">Automatizza i processi manuali.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Metric 3 */}
                <motion.div 
                   whileHover={{ y: -5 }}
                   className="group cursor-default bg-gray-800/30 p-6 rounded-2xl border border-gray-700/50 hover:bg-gray-800/60 transition duration-300"
                >
                  <div className="flex gap-4 items-start">
                    <div className="mt-2 bg-gradient-to-br from-blue-400 to-cyan-500 p-3 rounded-xl h-fit text-white shadow-lg shadow-blue-500/30">
                      <Users size={24}/>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition">Fidelizzazione</h4>
                      <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg flex items-center">
                         +<AnimatedCounter end={85} suffix="%" duration={2500} color="text-blue-400" />
                      </div>
                      <p className="text-gray-400 text-sm mt-3">Esperienza post-vendita moderna.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* PART 2: Banner/Stats Box (SOTTO) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full max-w-4xl relative"
            >
              {/* Glow Background */}
              <motion.div animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-tr from-sf-primary via-teal-400 to-cyan-300 rounded-3xl blur-3xl"></motion.div>
              
              {/* Main Container */}
              <div className="bg-gradient-to-tr from-sf-primary to-teal-400 rounded-3xl p-1 shadow-2xl relative z-10 overflow-hidden">
                {/* Inner Content */}
                <div className="bg-gray-900 rounded-2xl p-6 md:p-10 h-full backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row items-center gap-8 justify-around">
                    {/* Stat 1 */}
                    <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                      <div className="text-5xl font-black text-green-400 mb-2 drop-shadow-glow">+40%</div>
                      <div className="text-sm text-gray-300 uppercase tracking-widest font-bold bg-gray-800/50 px-4 py-1 rounded-full">Vendite Ricambi</div>
                    </motion.div>

                    <div className="hidden md:block h-20 w-px bg-gray-700"></div>

                    {/* Stat 2 */}
                    <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                      <div className="text-5xl font-black text-orange-400 mb-2 drop-shadow-glow">-32%</div>
                      <div className="text-sm text-gray-300 uppercase tracking-widest font-bold bg-gray-800/50 px-4 py-1 rounded-full">Tempo Gestione</div>
                    </motion.div>

                     <div className="hidden md:block h-20 w-px bg-gray-700"></div>

                    {/* Stat 3 */}
                    <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                       <Sparkles className="w-10 h-10 text-blue-400 mx-auto mb-2 animate-pulse" />
                       <div className="text-xl font-black text-white">AI Integrata</div>
                       <div className="text-xs text-blue-400 font-bold mt-1">AUTOMAZIONE 100%</div>
                    </motion.div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
                    <p className="text-gray-500 text-xs italic">
                      ✓ Dati basati su studi di caso con clienti ServiceFirst nei primi 6 mesi
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center w-full"
            >
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#form" 
                className="flex justify-center items-center gap-2 bg-sf-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-sf-primary/30 hover:bg-teal-600 transition"
              >
                Richiedi una Demo <ArrowRight size={20} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - SLIDER VELOCE E INTERATTIVA */}
      <section id="features" className="scroll-mt-32 md:scroll-mt-40 py-8 md:py-24 bg-gray-50 min-h-auto md:min-h-[850px] transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          <AnimatePresence mode="wait">
            {/* VISTA 1: GRID CON SLIDER (Nessuna card selezionata) */}
            {!selectedFeature && (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-8 md:mb-12">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-sf-dark mb-3 md:mb-4"
                  >
                    Cosa ti offre ServiceFirst
                  </motion.h2>
                  <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
                    Una piattaforma completa per <strong>gestire e ottimizzare i servizi</strong>. Clicca sulle card per approfondire.
                  </p>
                </div>
                
                {/* CONTAINER DELLO SLIDER */}
                <div className="px-0 md:px-12">
                  <div className="relative">
                  {/* Pulsante Precedente */}
                  <div className="absolute top-1/2 left-1 md:-left-12 lg:-left-16 transform -translate-y-1/2 z-10">
                    <button 
                      onClick={() => paginate(-1)}
                      className="bg-white/90 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg border border-gray-100 text-sf-dark hover:text-sf-primary hover:scale-110 transition"
                    >
                      <ChevronLeft size={20} className="md:w-6 md:h-6" />
                    </button>
                  </div>

                  {/* Pulsante Successivo */}
                  <div className="absolute top-1/2 right-1 md:-right-12 lg:-right-16 transform -translate-y-1/2 z-10">
                    <button 
                      onClick={() => paginate(1)}
                      className="bg-white/90 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg border border-gray-100 text-sf-dark hover:text-sf-primary hover:scale-110 transition"
                    >
                      <ChevronRight size={20} className="md:w-6 md:h-6" />
                    </button>
                  </div>

                  {/* Griglia Animata */}
                  <div className="overflow-hidden min-h-[250px] md:min-h-[500px] py-2 md:py-4 flex items-center justify-center">
                    <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                      <motion.div
                        key={featurePage}
                        custom={slideDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "tween", ease: "easeInOut", duration: 0.25 }, // VELOCIZZATO
                          opacity: { duration: 0.2 }
                        }}
                        className={`${isMobile ? 'w-full flex justify-center items-center' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full'}`}
                      >
                        {currentFeatures.map((feat) => (
                          <motion.div 
                            key={feat.id}
                            layoutId={`card-${feat.id}`}
                            onClick={() => setSelectedFeature(feat)}
                            whileHover={{ y: -10, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
                            className={`group p-6 md:p-8 bg-white rounded-2xl border border-gray-100 transition duration-300 cursor-pointer h-full flex flex-col justify-center items-center text-center md:justify-start md:items-start md:text-left min-h-[220px] md:min-h-[250px] ${isMobile ? 'w-[75%] mx-auto shadow-lg' : 'w-full'}`}
                          >
                            <motion.div 
                              layoutId={`icon-${feat.id}`}
                              className="w-14 h-14 bg-sf-light rounded-xl flex items-center justify-center text-sf-primary mb-4 md:mb-6 group-hover:bg-sf-primary group-hover:text-white transition duration-300"
                            >
                              {feat.icon}
                            </motion.div>
                            <motion.h3 layoutId={`title-${feat.id}`} className="text-lg md:text-xl font-bold text-sf-dark mb-2 group-hover:text-sf-primary transition">{feat.title}</motion.h3>
                            <motion.p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{feat.desc}</motion.p>
                            <div className="text-sf-primary font-bold text-sm flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity mt-auto">
                              Scopri di più <ArrowRight size={16} />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  </div>

                  {/* Indicatori Paginazione (Pallini) */}
                  <div className="flex justify-center gap-2 mt-4 md:mt-8">
                    {Array.from({ length: Math.ceil(features.length / ITEMS_PER_PAGE) }).map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${featurePage === idx ? 'bg-sf-primary w-6' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>

                  {/* CTA Button sotto la griglia */}
                  <div className="mt-6 md:mt-12 flex justify-center">
                    <motion.a 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href="#form" 
                      className="flex justify-center items-center gap-2 bg-sf-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-sf-primary/30 hover:bg-teal-600 transition"
                    >
                      Richiedi una Demo <ArrowRight size={20} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VISTA 2: FOCUS (Card selezionata + Dettagli) */}
            {selectedFeature && (
              <motion.div 
                key="focus"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid lg:grid-cols-2 gap-8 items-start h-full"
              >
                {/* Colonna Sinistra: Card Selezionata (Espansa Visivamente) */}
                <motion.div 
                  layoutId={`card-${selectedFeature.id}`}
                  className="bg-white p-6 md:p-12 rounded-3xl border-2 border-sf-primary/20 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedFeature(null); }}
                      className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
                    >
                      <X size={24} className="text-gray-500" />
                    </button>
                  </div>

                  <motion.div 
                    layoutId={`icon-${selectedFeature.id}`}
                    className="w-20 h-20 bg-sf-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-sf-primary/30"
                  >
                    {React.cloneElement(selectedFeature.icon, { size: 40 })}
                  </motion.div>
                  
                  <motion.h3 layoutId={`title-${selectedFeature.id}`} className="text-3xl md:text-4xl font-bold text-sf-dark mb-6">
                    {selectedFeature.title}
                  </motion.h3>
                  
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {selectedFeature.desc}
                  </p>

                  <button 
                    onClick={() => setSelectedFeature(null)}
                    className="flex items-center gap-2 text-gray-400 hover:text-sf-dark transition font-bold"
                  >
                    <ChevronLeft size={20} /> Torna alla griglia
                  </button>
                </motion.div>

                {/* Colonna Destra: Dettagli Approfonditi (Apparizione) */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }} // Velocizzato
                  className="flex flex-col justify-center h-full space-y-8 py-4 px-4"
                >
                  <div>
                    <h4 className="text-sm font-bold text-sf-primary uppercase tracking-widest mb-4">APPROFONDIMENTO</h4>
                    <p className="text-lg md:text-xl text-sf-dark leading-relaxed">
                      {selectedFeature.details}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                    <h5 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Sparkles className="text-yellow-500" size={20} /> Vantaggi Chiave
                    </h5>
                    <ul className="space-y-4">
                      {selectedFeature.benefits.map((benefit, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + (i * 0.05) }} // Cascata più veloce
                          className="flex items-start gap-3"
                        >
                          <div className="mt-1 bg-green-100 p-1 rounded-full">
                            <Check size={14} className="text-green-600" />
                          </div>
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <a href="#form" className="inline-flex items-center gap-3 bg-sf-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-sf-primary transition shadow-lg shadow-gray-900/20">
                      Richiedi una Demo su questo <ArrowRight size={20} />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* SEZIONE INTELLIGENZA ARTIFICIALE */}
      <section id="ia" className="py-12 md:py-20 bg-[#1a1a1a] text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sf-ai/20 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sf-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               
               {/* Testo e Contenuto */}
               <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.6 }}
                 viewport={{ once: true }}
               >
                  <div className="inline-flex items-center gap-2 bg-sf-ai/20 text-sf-ai border border-sf-ai/30 px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
                    <Bot size={16} /> Intelligenza Artificiale
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                    Cataloghi digitali interattivi <span className="text-transparent bg-clip-text bg-gradient-to-r from-sf-ai to-purple-300">in un istante!</span>
                  </h2>
                  
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    Azzera i tempi di conversione. Scopri com’è facile trasformare il tuo catalogo ricambi in un portale e-commerce interattivo. 
                    <strong className="text-white block mt-2">Bastano davvero pochi secondi.</strong>
                  </p>

                  <div className="space-y-6">
                     <div className="flex gap-5">
                        <div className="mt-1 bg-gray-800 p-3 rounded-xl h-fit border border-gray-700">
                           <ScanLine size={24} className="text-sf-ai"/>
                        </div>
                        <div>
                           <h4 className="text-xl font-bold mb-2">Rende interattiva qualunque immagine</h4>
                           <p className="text-gray-400 text-sm leading-relaxed">
                             Dimenticati i limiti. L'IA rende interattivo qualsiasi disegno (anche raster/JPG) e assegna in automatico codici e descrizioni.
                           </p>
                        </div>
                     </div>

                     <div className="flex gap-5">
                        <div className="mt-1 bg-gray-800 p-3 rounded-xl h-fit border border-gray-700">
                           <Wand2 size={24} className="text-sf-ai"/>
                        </div>
                        <div>
                           <h4 className="text-xl font-bold mb-2">Abbina i ricambi in automatico</h4>
                           <p className="text-gray-400 text-sm leading-relaxed">
                             Lascia che l'IA crei le anagrafiche ricambi e le colleghi alle tavole. Risparmia ore di lavoro manuale.
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row gap-4 md:justify-center lg:justify-start">
                    <a href="#form" className="flex justify-center items-center gap-2 bg-sf-ai text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-sf-ai/30 hover:bg-[#a00fe0] transition transform hover:-translate-y-1">
                       Richiedi una demo
                    </a>
                  </div>
               </motion.div>

               {/* Visuale IA */}
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8 }}
                 viewport={{ once: true }}
                 className="relative md:w-[75%] md:mx-auto lg:w-full"
               >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-2 border border-gray-700 shadow-2xl relative overflow-hidden group">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                     <div className="absolute top-0 left-0 w-full h-1 bg-sf-ai/50 shadow-[0_0_20px_rgba(180,17,237,0.8)] animate-scan pointer-events-none"></div>
                     
                     <img 
                        src={iaImage} 
                        alt="AI Interface" 
                        className="w-full rounded-2xl shadow-inner relative z-10"
                     />

                    
                  </div>
               </motion.div>

            </div>
         </div>
      </section>

      {/* SEZIONE PRICING (Piani e Funzionalità) */}
      <section id="pricing" className="py-12 md:py-20 bg-gradient-to-b from-teal-600 to-teal-700 relative overflow-hidden">
        {/* ... (CONTENUTO IDENTICO A PRIMA) ... */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">PIANI E FUNZIONALITÀ</h2>
            <p className="text-teal-100 text-lg max-w-2xl mx-auto opacity-90">
              Scegli la soluzione perfetta per il tuo business. Scalabile, trasparente e completa.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative px-0 md:px-4"
          >
            {/* Mobile Navigation Buttons */}
            {(isMobile || isTablet) && (
              <>
                <button 
                  onClick={() => paginatePricing(-1)}
                  className="absolute top-1/2 left-0 md:left-8 z-20 bg-white shadow-xl p-2 rounded-full text-sf-primary hover:bg-gray-50 transition transform -translate-y-1/2 border border-gray-100"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => paginatePricing(1)}
                  className="absolute top-1/2 right-0 md:right-8 z-20 bg-white shadow-xl p-2 rounded-full text-sf-primary hover:bg-gray-50 transition transform -translate-y-1/2 border border-gray-100"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div className={`grid ${(isMobile || isTablet) ? 'grid-cols-1 place-items-center' : 'md:grid-cols-3 gap-8'} items-start`}>
            {((isMobile || isTablet) ? [plans[pricingPage]] : plans).map((plan, index) => (
              <motion.div 
                key={(isMobile || isTablet) ? plan.name : index} // Use name as key for mobile to force re-render/animation
                initial={(isMobile || isTablet) ? { opacity: 0, x: 20 } : { opacity: 0, y: 20 }}
                animate={(isMobile || isTablet) ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10 }}
                className={`relative bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col ${plan.highlight ? 'md:-mt-4 md:mb-4 z-10 border-4 border-yellow-400' : 'border border-gray-100'} ${isMobile ? 'w-[70%] mx-auto' : (isTablet ? 'w-full max-w-lg mx-auto' : 'w-full')}`}
              >
                <div className={`py-2 px-4 text-center text-xs font-bold tracking-widest uppercase ${plan.highlight ? 'bg-yellow-400 text-sf-dark' : 'bg-gray-100 text-gray-500'}`}>
                  {plan.tag}
                </div>

                <div className="p-8 flex-1 flex flex-col">
                   <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${plan.highlight ? 'bg-sf-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {plan.icon}
                      </div>
                      {plan.highlight && <div className="bg-sf-primary/10 text-sf-primary px-3 py-1 rounded-full text-xs font-bold">Consigliato</div>}
                   </div>

                   <h3 className="text-2xl font-bold text-sf-dark mb-2">{plan.name}</h3>
                   <div className="mb-1 flex items-baseline">
                      <span className="text-4xl font-extrabold text-sf-dark">{plan.price}</span>
                      <span className="text-gray-500 font-medium ml-1">{plan.period}</span>
                   </div>
                   <p className="text-sm text-gray-400 mb-6 font-medium">{plan.billing}</p>

                   <div className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                           <div className="mt-1 min-w-[18px]"><Check size={18} className="text-teal-500" strokeWidth={3} /></div>
                           <span className="text-gray-600 text-sm leading-snug">{feature}</span>
                        </div>
                      ))}
                      {plan.services && (
                         <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-start gap-3">
                               <div className="mt-1"><Building2 size={18} className="text-sf-primary" /></div>
                               <span className="text-xs text-gray-500 font-medium leading-snug">{plan.services}</span>
                            </div>
                         </div>
                      )}
                      {plan.extensions && (
                         <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-start gap-3">
                               <div className="mt-1"><Layers size={18} className="text-sf-primary" /></div>
                               <span className="text-xs text-gray-500 font-medium leading-snug">{plan.extensions}</span>
                            </div>
                         </div>
                      )}
                   </div>

                   <motion.a 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="#form" 
                      className={`w-full py-4 rounded-xl font-bold text-center transition-all shadow-lg ${
                        plan.highlight 
                          ? 'bg-sf-primary text-white hover:bg-teal-700 shadow-sf-primary/30' 
                          : 'bg-sf-dark text-white hover:bg-gray-800 shadow-gray-900/20'
                      }`}
                   >
                      {plan.cta}
                   </motion.a>
                </div>
              </motion.div>
            ))}
            </div>

            {/* Mobile Dots */}
            {(isMobile || isTablet) && (
               <div className="flex justify-center gap-2 mt-6">
                 {plans.map((_, idx) => (
                   <div 
                     key={idx}
                     className={`w-2 h-2 rounded-full transition-all ${idx === pricingPage ? 'bg-white w-4' : 'bg-white/40'}`}
                   />
                 ))}
               </div>
            )}
          </motion.div>
        </div>
      </section>


      {/* CTA / Form Section - MIGLIORATO (Campi, Animazioni, Stili) */}
      <section id="form" className="scroll-mt-32 md:scroll-mt-40 py-12 md:py-24 bg-sf-light relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100"
          >
            {/* Left Side: Information */}
            <div className="md:w-5/12 p-6 md:p-12 bg-gradient-to-br from-sf-primary to-teal-700 text-white flex flex-col justify-center relative overflow-hidden">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></motion.div>
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Richiedi una Demo</h3>
                <p className="mb-8 opacity-90 text-base md:text-lg leading-relaxed">
                  Scopri come il catalogo ServiceFirst può rivoluzionare il tuo service. Compila il modulo per una consulenza personalizzata.
                </p>
                
                <ul className="space-y-4">
                  <motion.li initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 font-medium">
                    <div className="bg-white/20 p-2 rounded-full"><Check size={18} className="text-white" /></div> Demo personalizzata
                  </motion.li>
                  <motion.li initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-3 font-medium">
                     <div className="bg-white/20 p-2 rounded-full"><Check size={18} className="text-white" /></div> Analisi dei processi
                  </motion.li>
                  <motion.li initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-3 font-medium">
                     <div className="bg-white/20 p-2 rounded-full"><Check size={18} className="text-white" /></div> Preventivo su misura
                  </motion.li>
                </ul>
              </div>
            </div>
            
            {/* Right Side: The Form */}
            <div className="md:w-7/12 p-6 md:p-12 bg-white">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle size={40} />
                  </motion.div>
                  <h4 className="text-3xl font-bold text-sf-dark mb-3">Richiesta Inviata!</h4>
                  <p className="text-gray-600 text-lg">Grazie per il tuo interesse.<br/>Un nostro consulente ti contatterà a breve.</p>
                  <button onClick={() => setStatus(null)} className="mt-8 text-sf-primary font-bold hover:underline">Invia nuova richiesta</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Nome */}
                    <div className="relative group">
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        <User size={14}/> Nome e Cognome *
                      </label>
                      <input 
                        type="text" name="nome" required
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-sf-primary focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                        placeholder="Mario Rossi" onChange={handleChange} 
                      />
                    </div>
                    
                    {/* Telefono */}
                    <div className="relative group">
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        <Phone size={14}/> Telefono
                      </label>
                      <input 
                        type="tel" name="telefono"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-sf-primary focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                        placeholder="+39 333 1234567" onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     {/* Email */}
                    <div className="relative group">
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        <Globe size={14}/> Email *
                      </label>
                      <input 
                        type="email" name="email" required
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-sf-primary focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                        placeholder="mario@azienda.it" onChange={handleChange} 
                      />
                    </div>

                    {/* Azienda */}
                    <div className="relative group">
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                         <Building2 size={14}/> Azienda *
                      </label>
                      <input 
                        type="text" name="azienda" required
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-sf-primary focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                        placeholder="Nome della tua azienda" onChange={handleChange} 
                      />
                    </div>
                  </div>

                  {/* Ruolo (Full width on mobile, standard elsewhere) */}
                   <div className="relative group">
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                         <Briefcase size={14}/> Ruolo in azienda
                      </label>
                      <input 
                        type="text" name="ruolo"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-sf-primary focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                        placeholder="Es. Responsabile Service, CEO..." onChange={handleChange} 
                      />
                    </div>

                   {/* Messaggio */}
                   <div className="relative group">
                      <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                         <MessageSquare size={14}/> Messaggio (Opzionale)
                      </label>
                      <textarea 
                        name="messaggio" rows="3"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-sf-primary focus:ring-4 focus:ring-teal-500/10 transition-all outline-none resize-none"
                        placeholder="Hai domande specifiche?" onChange={handleChange} 
                      ></textarea>
                    </div>

                  {/* Privacy Checkbox */}
                  <div className="flex items-start gap-3">
                    <div className="flex items-center h-5">
                      <input 
                        id="privacy" name="privacy" type="checkbox" required
                        className="w-4 h-4 text-sf-primary border-gray-300 rounded focus:ring-sf-primary cursor-pointer"
                        onChange={handleChange}
                      />
                    </div>
                    <label htmlFor="privacy" className="text-sm text-gray-500 cursor-pointer">
                      Ho letto e accetto la <a href="#" className="text-sf-primary underline decoration-dotted">Privacy Policy</a> e acconsento al trattamento dei dati.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-sf-dark text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl flex justify-center items-center gap-3 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Invio in corso...
                      </>
                    ) : (
                      <>PRENOTA DEMO <ArrowRight size={20} /></>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <motion.div whileHover={{ scale: 1.1, filter: "grayscale(0%)", opacity: 1 }} className="w-20 md:w-24 opacity-80 grayscale transition cursor-pointer">
             <img src="https://servicefirst.it/wp-content/uploads/2025/08/s1.png" alt="Service First" />
          </motion.div>
          <div className="flex gap-6 text-gray-400">
             <motion.div whileHover={{ color: "#0d9488", rotate: 15 }}><Globe size={20} className="cursor-pointer"/></motion.div>
             <div className="text-xs md:text-sm text-center md:text-left">&copy; {new Date().getFullYear()} ServiceFirst. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;