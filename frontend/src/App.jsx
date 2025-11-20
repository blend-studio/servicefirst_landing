import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, CheckCircle, ArrowRight, Zap, ShieldCheck, 
  Database, Layers, Smartphone, Search, Globe, 
  ShoppingCart, MousePointer, BarChart3, Users, Sparkles, 
  TrendingUp, X, Check, Building2, Crown, Briefcase
} from 'lucide-react';

// --- IMPORTAZIONE LOGHI ---
import cifaLogo from './assets/img/loghi aggiunti/cifa service first.png';
import energreenLogo from './assets/img/loghi aggiunti/energreen service first.png';
import geetitLogo from './assets/img/loghi aggiunti/geetit-service first.png';
import fiveLogo from './assets/img/loghi aggiunti/LOGO_FIVE_1.png';
import zoomlionLogo from './assets/img/loghi aggiunti/zoomlion-servicefirst.png';

// --- IMPORTAZIONE IMMAGINI CATALOGO ---
import iaImage from './assets/img/IA-Service-First.png';
import generatorImage from './assets/img/EDITOR-catalogo-interattivo.webp';
import editorImage from './assets/img/CATALOGO-SF-TAB-EDITOR.webp';
import multilingueImage from './assets/img/CATALOGO-SF-TAB-MULTILINGUA.webp';

// --- IMPORTAZIONE IMMAGINI VENDI CON IL CATALOGO ---
import carrelloImage from './assets/img/CATALOGO-SF-CARRELLO-NUOVO.webp';
import preventiviImage from './assets/img/CATALOGO-SFTAB-PREVENTIVI.webp';
import pagamentiImage from './assets/img/CATALOGO-SF-TAB-PAGAMENTI.webp';
import ordiniImage from './assets/img/CATALOGO-SF-TAB-ORDINI.webp';

// --- VARIANTI ANIMAZIONI ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const tabContentVariant = {
  hidden: { opacity: 0, x: 20, filter: "blur(5px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -20, filter: "blur(5px)", transition: { duration: 0.3 } }
};

// --- COMPONENTI UTILITY ---
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
  const [formData, setFormData] = useState({ nome: '', email: '', azienda: '' });
  const [status, setStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('ia');
  const [activeVendiTab, setActiveVendiTab] = useState('carrello');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('http://localhost/servicefirst_landing/backend/public/index.php?action=register_demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setStatus(result.success ? 'success' : 'error');
    } catch (error) {
      setTimeout(() => setStatus('success'), 1000);
    }
  };

  // --- DATI PRICING (Dall'immagine fornita) ---
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

  const features = [
    { icon: <Zap size={32} />, title: "Creazione con AI", desc: "Genera cataloghi multilingua in un click grazie all'Intelligenza Artificiale." },
    { icon: <MousePointer size={32} />, title: "Navigazione Interattiva", desc: "Esplosi 2D/3D interattivi per identificare i ricambi senza errori." },
    { icon: <ShoppingCart size={32} />, title: "E-Commerce B2B", desc: "Trasforma il catalogo in un portale di vendita attivo 24/7." },
    { icon: <ShieldCheck size={32} />, title: "Zero Errori", desc: "Identificazione univoca per matricola: ordini sempre corretti." },
    { icon: <Smartphone size={32} />, title: "App Mobile", desc: "Accedi al catalogo e ordina direttamente dal campo, anche offline." },
    { icon: <Database size={32} />, title: "Integrazione ERP", desc: "Perfettamente integrato con il tuo gestionale aziendale." },
  ];

  const catalogTabs = {
    ia: {
      title: "L'AI che semplifica la creazione",
      desc: "Creare un catalogo ricambi non è mai stato così veloce. Carica a portale il tuo file di origine, a tutto il resto ci pensa l'Intelligenza Artificiale dall'interattività tavole all'abbinamento ricambi, passando per la compilazione di tutte le anagrafi che.",
      cta: "SCOPRI L'AI NEL CATALOGO RICAMBI →",
      image: iaImage
    },
    generator: {
      title: "Flessibilità assoluta",
      desc: "Vuoi usare un metodo di caricamento classico? L'interattività dei disegni viene generata automaticamente da algoritmi proprietari che rendono cliccabili le pallinature. I cataloghi possono essere abbinati indistintamente a prodotti o matricole.",
      cta: "SCOPRI LA FUNZIONE GENERATOR →",
      image: generatorImage
    },
    editor: {
      title: "Modifica online",
      desc: "Sfrutta i vantaggi di poter intervenire sui disegni direttamente a sistema. Una funzione di post-produzione consente di editare le pallinature, velocizzando e semplificando enormemente la gestione dell'esistente.",
      cta: "SCOPRI LA FUNZIONE EDITOR →",
      image: editorImage
    },
    multilingua: {
      title: "Cataloghi globali",
      desc: "Fai consultare al cliente il portale nella sua lingua. Questo ti consente di espandere subito le tue vendite a livello globale senza problemi di comunicazione.",
      cta: "SCOPRI LA FUNZIONE MULTILINGUA →",
      image: multilingueImage
    }
  };

  const vendiTabs = {
    carrello: {
      title: "Customer journey intuitiva",
      desc: "Facilita l'esperienza d'acquisto con l'assegnazione automatica di listino, sconti e IVA. L'utente può indicare il livello d'urgenza della spedizione e sfruttare la comoda opzione 'Salva per dopo', in grado di scorporare i ricambi dall'ordine senza cancellarli dal carrello.",
      cta: "SCOPRI LA FUNZIONE CARRELLO →",
      image: carrelloImage
    },
    preventivi: {
      title: "Acquisti istantanei",
      desc: "Sfrutta la comodità del gateway di pagamento integrato di ServiceFirst. L'utente può acquistare i ricambi istantaneamente, con la flessibilità di scegliere tra le vari metodi di pagamento e di indicare l'indirizzo di spedizione.",
      cta: "SCOPRI LA FUNZIONE PAGAMENTI →",
      image: preventiviImage
    },
    pagamenti: {
      title: "Modalità 'Richiesta' senza importi",
      desc: "Non vuoi mostrare gli importi a sistema? Nessun problema: trasforma il carrello in una richiesta d'offerta. Questa transizione agevola la generazione e la gestione di preventivi, inclusi sconti e tariffe, direttamente all'interno del portale.",
      cta: "SCOPRI LA FUNZIONE PREVENTIVI →",
      image: pagamentiImage
    },
    ordini: {
      title: "Tutte le info al loro posto",
      desc: "Monitora lo stato degli ordini, accedi ai dettagli e ottieni aggiornamenti in tempo reale. Non dovrai più impazzire per trovare le informazioni di cui hai bisogno.",
      cta: "SCOPRI LA FUNZIONE ORDINI →",
      image: ordiniImage
    }
  };

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
            <img src="./src/assets/img/s1.png" alt="Service First Logo" className="w-full h-auto object-contain" />
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
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
          >
            <motion.div variants={fadeInUp} className="inline-block bg-sf-primary/10 text-sf-primary px-3 py-1 md:px-4 md:py-1 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6 border border-sf-primary/20">
              🚀 LA RIVOLUZIONE DEL POST-VENDITA
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-sf-dark mb-4 md:mb-6 leading-tight">
              Il Tuo Catalogo Ricambi <br/>
              <span className="text-sf-primary">Potenziato dall'AI</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
              ServiceFirst trasforma i tuoi disegni tecnici in un <strong>catalogo interattivo e-commerce</strong>. 
              <br/><br/>
              Elimina gli errori di ordinazione, riduci i tempi di gestione e <strong>aumenta le vendite di ricambi</strong> con la piattaforma scelta dai leader del settore machinery.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
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
            className="relative mt-8 md:mt-0 perspective-1000"
          >
            {/* Floating animation per l'immagine Hero */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 bg-white rounded-2xl p-2 shadow-2xl border border-gray-100"
            >
               <div className="bg-gray-100 rounded-xl overflow-hidden h-64 md:h-80 lg:h-96 flex flex-col items-center justify-center text-center p-6 md:p-8 relative group">
                 <div className="absolute inset-0 bg-gradient-to-tr from-sf-light to-transparent opacity-50 transition group-hover:opacity-70"></div>
                 <div className="relative z-10">
                    <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.8 }}>
                      <Search size={48} className="text-sf-primary mb-3 md:mb-4 mx-auto md:w-16 md:h-16" />
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-bold text-sf-dark mb-2">Smart Catalog</h3>
                    <p className="text-gray-500 text-base md:text-lg">Click-to-Order Technology</p>
                 </div>
                 <motion.div 
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 1 }}
                   className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-sm flex items-center gap-3 text-left border border-gray-100"
                 >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><CheckCircle size={18} /></div>
                    <div>
                        <div className="text-xs text-gray-400 font-bold uppercase">Status Ordine</div>
                        <div className="font-bold text-sm text-sf-dark">Confermato via App</div>
                    </div>
                 </motion.div>
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

      {/* Features Section */}
      <section id="features" className="scroll-mt-32 md:scroll-mt-40 py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-sf-dark mb-3 md:mb-4"
            >
              Il Tuo Post-Vendita, Semplificato
            </motion.h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
              ServiceFirst non è solo un catalogo, è una suite completa per ottimizzare ogni aspetto del service e della vendita ricambi.
            </p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {features.map((feat, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                className="group p-6 md:p-8 bg-white rounded-2xl border border-gray-100 transition duration-300 cursor-default"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-sf-light rounded-xl flex items-center justify-center text-sf-primary mb-4 md:mb-6 group-hover:bg-sf-primary group-hover:text-white transition duration-300">
                  {feat.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-sf-dark mb-2 group-hover:text-sf-primary transition">{feat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CREA CATALOGHI Section */}
      <section className="scroll-mt-32 md:scroll-mt-40 py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <motion.div 
              initial={{ rotate: -2, scale: 0.9, opacity: 0 }}
              whileInView={{ rotate: -2, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-sf-primary text-white px-6 py-3 rounded-lg font-bold text-lg md:text-xl mb-6 transform -rotate-2 shadow-lg"
            >
              CREA CATALOGHI RICAMBI
            </motion.div>
            <h2 className="text-gray-700 text-lg md:text-xl font-bold mb-4">
              Digitalizzare i tuoi cataloghi ricambi non è mai stato così semplice.
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
              Convertí o crea i tuoi cataloghi ricambi interattivi con ServiceFirst, senza limiti. Ti basta un click per trasformare i tuoi cataloghi in un portale e-commerce, indipendentemente dal loro formato d'origine grazie all'Intelligenza Artificiale. Grazie ad un editor completo di tutte le funzionalità necessari puoi gestire e modificare i disegni caricati direttamente da sistema.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 border-b border-gray-200 pb-4">
            {['ia', 'generator', 'editor', 'multilingua'].map((tab) => {
              const labels = {
                ia: 'INTELLIGENZA ARTIFICIALE',
                generator: 'GENERATOR',
                editor: 'EDITOR',
                multilingua: 'MULTILINGUA'
              };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 md:px-6 py-2 md:py-3 font-bold text-xs md:text-sm transition-all whitespace-nowrap relative ${
                    activeTab === tab ? 'text-sf-primary' : 'text-gray-600 hover:text-sf-dark'
                  }`}
                >
                  {labels[tab]}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-sf-primary"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabContentVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
              >
                <div className="relative hidden md:block">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-100 rounded-2xl p-4 md:p-6 border-2 border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition"
                  >
                    <img 
                      src={catalogTabs[activeTab].image}
                      alt={`Tab ${activeTab}`}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </motion.div>
                </div>

                <div className="flex flex-col justify-center order-first md:order-last">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sf-dark mb-4 md:mb-6">
                    {catalogTabs[activeTab].title}
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                    {catalogTabs[activeTab].desc}
                  </p>
                  <a href="#form" className="inline-flex items-center gap-2 text-sf-primary font-bold hover:text-sf-dark transition text-sm md:text-base group">
                    {catalogTabs[activeTab].cta} <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>

                <div className="relative md:hidden order-last">
                  <div className="bg-gray-100 rounded-2xl p-4 border-2 border-gray-200 overflow-hidden shadow-lg">
                    <img 
                      src={catalogTabs[activeTab].image}
                      alt={`Tab ${activeTab}`}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* VENDI CON IL CATALOGO Section */}
      <section className="scroll-mt-32 md:scroll-mt-40 py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <motion.div 
              initial={{ rotate: 2, scale: 0.9, opacity: 0 }}
              whileInView={{ rotate: 2, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-sf-primary text-white px-6 py-3 rounded-lg font-bold text-lg md:text-xl mb-6 transform rotate-2 shadow-lg"
            >
              VENDI CON IL CATALOGO
            </motion.div>
            <h2 className="text-gray-700 text-lg md:text-xl font-bold mb-4">
              Il portale e-commerce B2B intuitivo e innovativo che incrementa la vendita dei ricambi.
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
              I tuoi clienti e rivenditori potranno <strong>accedere al portale da qualsiasi dispositivo</strong> e consultare i cataloghi ricambi attraverso l'intuitivo processo guidato di selezione miniature prodotti, cataloghi e tavole oppure con la ricerca diretta per matricola o codice ricambio.
              <br/><br/>
              L'albero da una chiara rappresentazione della struttura del catalogo per una migliore navigazione. L'interattività consente di identificare facilmente i ricambi da selezionare sia a livello di tavola che di elenco. Grazie al gateway di pagamento integrato, l'utente può <strong>acquistare i ricambi a carrello</strong> con qualsiasi metodo di pagamento e tenere monitorati i suoi ordini.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 border-b border-gray-200 pb-4">
            {['carrello', 'preventivi', 'pagamenti', 'ordini'].map((tab) => {
              const labels = {
                carrello: 'CARRELLO',
                preventivi: 'PREVENTIVI',
                pagamenti: 'PAGAMENTI',
                ordini: 'ORDINI'
              };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveVendiTab(tab)}
                  className={`px-4 md:px-6 py-2 md:py-3 font-bold text-xs md:text-sm transition-all whitespace-nowrap uppercase tracking-wide relative ${
                    activeVendiTab === tab ? 'text-sf-primary' : 'text-gray-600 hover:text-sf-dark'
                  }`}
                >
                  {labels[tab]}
                  {activeVendiTab === tab && (
                    <motion.div 
                      layoutId="activeVendiTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-sf-primary"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVendiTab}
                variants={tabContentVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
              >
                <div className="relative hidden md:block">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl p-4 md:p-6 border-2 border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition"
                  >
                    <img 
                      src={vendiTabs[activeVendiTab].image}
                      alt={`Tab ${activeVendiTab}`}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </motion.div>
                </div>

                <div className="flex flex-col justify-center order-first md:order-last">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sf-dark mb-4 md:mb-6">
                    {vendiTabs[activeVendiTab].title}
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                    {vendiTabs[activeVendiTab].desc}
                  </p>
                  <a href="#form" className="inline-flex items-center gap-2 text-sf-primary font-bold hover:text-sf-dark transition text-sm md:text-base group">
                    {vendiTabs[activeVendiTab].cta} <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>

                <div className="relative md:hidden order-last">
                  <div className="bg-white rounded-2xl p-4 border-2 border-gray-200 overflow-hidden shadow-lg">
                    <img 
                      src={vendiTabs[activeVendiTab].image}
                      alt={`Tab ${activeVendiTab}`}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- SEZIONE PRICING (Piani e Funzionalità) AGGIUNTA --- */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-teal-600 to-teal-700 relative overflow-hidden">
        {/* Pattern di sfondo */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">PIANI E FUNZIONALITÀ</h2>
            <p className="text-teal-100 text-lg max-w-2xl mx-auto opacity-90">
              Scegli la soluzione perfetta per il tuo business. Scalabile, trasparente e completa.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 items-start"
          >
            {plans.map((plan, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className={`relative bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col ${plan.highlight ? 'md:-mt-4 md:mb-4 z-10 border-4 border-yellow-400' : 'border border-gray-100'}`}
              >
                {/* Tag Popolare / Ideale */}
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
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us / Stats Section - (RIPRISTINATA ORIGINALE) */}
      <section className="py-16 md:py-24 bg-sf-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        
        {/* Animated Background Elements */}
        <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-20 right-10 w-72 h-72 bg-sf-primary/10 rounded-full blur-3xl"></motion.div>
        <motion.div animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></motion.div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">I Numeri di ServiceFirst</h2>
              <p className="text-gray-400 mb-6 md:mb-8 text-base md:text-lg">
                Le aziende che scelgono la nostra piattaforma ottengono risultati misurabili fin dai primi mesi di utilizzo.
              </p>
              
              <div className="space-y-6 md:space-y-8">
                {/* First Metric */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0 }}
                  viewport={{ once: true }}
                  className="group cursor-default hover:translate-x-2 transition duration-300"
                >
                  <div className="flex gap-4 items-start">
                    <div className="mt-2 bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-xl h-fit text-white shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 group-hover:scale-110 transition duration-300">
                      <TrendingUp size={28} className="md:w-8 md:h-8"/>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-green-400 transition">Incremento Vendite Ricambi</h4>
                      <div className="text-5xl md:text-6xl lg:text-7xl font-black text-green-400 drop-shadow-lg flex items-center">
                        +<AnimatedCounter end={40} suffix="%" duration={2500} color="text-green-400" />
                      </div>
                      <p className="text-gray-400 text-sm mt-3">Grazie all'e-commerce integrato e alla facilità di ordinazione per i clienti.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Second Metric */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="group cursor-default hover:translate-x-2 transition duration-300"
                >
                  <div className="flex gap-4 items-start">
                    <div className="mt-2 bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-xl h-fit text-white shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 group-hover:scale-110 transition duration-300">
                      <Layers size={28} className="md:w-8 md:h-8"/>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-orange-400 transition">Risparmio Tempi di Gestione</h4>
                      <div className="text-5xl md:text-6xl lg:text-7xl font-black text-orange-400 drop-shadow-lg flex items-center">
                         -<AnimatedCounter end={32} suffix="%" duration={2500} color="text-orange-400" />
                      </div>
                      <p className="text-gray-400 text-sm mt-3">Automatizza i processi manuali e libera il tuo team dal data-entry.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Third Metric */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="group cursor-default hover:translate-x-2 transition duration-300"
                >
                  <div className="flex gap-4 items-start">
                    <div className="mt-2 bg-gradient-to-br from-blue-400 to-cyan-500 p-3 rounded-xl h-fit text-white shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-110 transition duration-300">
                      <Users size={28} className="md:w-8 md:h-8"/>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition">Fidelizzazione Clienti</h4>
                      <div className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg flex items-center">
                         +<AnimatedCounter end={85} suffix="%" duration={2500} color="text-blue-400" />
                      </div>
                      <p className="text-gray-400 text-sm mt-3">Un'esperienza post-vendita moderna e veloce aumenta la retention dei clienti.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Stats Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative mt-8 md:mt-0"
            >
              {/* Glow Background */}
              <motion.div animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-tr from-sf-primary via-teal-400 to-cyan-300 rounded-3xl blur-3xl"></motion.div>
              
              {/* Main Container */}
              <div className="bg-gradient-to-tr from-sf-primary to-teal-400 rounded-3xl p-1 shadow-2xl relative z-10 overflow-hidden">
                {/* Inner Content */}
                <div className="bg-gray-900 rounded-2xl p-6 md:p-8 h-full backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                    {/* Stat 1 */}
                    <motion.div 
                      whileHover={{ scale: 1.05, borderColor: "rgba(74, 222, 128, 0.6)" }}
                      className="bg-gradient-to-br from-gray-800 to-gray-700 p-4 md:p-6 rounded-2xl text-center border border-green-500/30 transition-all hover:shadow-lg hover:shadow-green-500/30 group cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative z-10">
                        <div className="text-3xl md:text-4xl font-black text-green-400 mb-2">+40%</div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Vendite</div>
                      </div>
                    </motion.div>

                    {/* Stat 2 */}
                    <motion.div 
                      whileHover={{ scale: 1.05, borderColor: "rgba(251, 146, 60, 0.6)" }}
                      className="bg-gradient-to-br from-gray-800 to-gray-700 p-4 md:p-6 rounded-2xl text-center border border-orange-500/30 transition-all hover:shadow-lg hover:shadow-orange-500/30 group cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative z-10">
                        <div className="text-3xl md:text-4xl font-black text-orange-400 mb-2">-32%</div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Tempo</div>
                      </div>
                    </motion.div>

                    {/* Stat 3 - Full Width */}
                    <motion.div 
                      whileHover={{ scale: 1.02, borderColor: "rgba(96, 165, 250, 0.6)" }}
                      className="bg-gradient-to-br from-gray-800 to-gray-700 p-4 md:p-6 rounded-2xl text-center col-span-2 border border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/30 group cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative z-10">
                        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mx-auto mb-3 group-hover:animate-spin" />
                        <div className="text-xl md:text-2xl font-black text-blue-400 mb-1">AI Integrata</div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Generazione Automatica</div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-700/50">
                    <p className="text-center text-gray-500 text-xs md:text-sm italic font-medium">
                      ✓ Dati basati su studi di caso con clienti ServiceFirst nei primi 6 mesi
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA / Form Section */}
      <section id="form" className="scroll-mt-32 md:scroll-mt-40 py-16 md:py-24 bg-sf-light relative">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100"
          >
            <div className="md:w-5/12 p-6 md:p-10 bg-sf-primary text-white flex flex-col justify-center relative overflow-hidden">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></motion.div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 relative z-10">Richiedi una Demo</h3>
              <p className="mb-4 md:mb-6 opacity-90 relative z-10 text-sm md:text-base">
                Scopri come ServiceFirst può rivoluzionare il tuo service. Compila il modulo per una consulenza gratuita.
              </p>
              <ul className="space-y-2 md:space-y-3 relative z-10 text-sm">
                {[
                    'Demo personalizzata',
                    'Analisi dei processi attuali',
                    'Preventivo su misura'
                ].map((item, i) => (
                    <motion.li 
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-center gap-2"
                    >
                        <CheckCircle size={16} className="text-teal-300" /> {item}
                    </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="md:w-7/12 p-6 md:p-10">
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
                    className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckCircle size={32} />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-sf-dark mb-2">Richiesta Inviata!</h4>
                  <p className="text-gray-600">Un nostro consulente ti contatterà a breve per fissare la demo.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Nome e Cognome *</label>
                    <input 
                      type="text" 
                      name="nome"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-sf-primary focus:ring-2 focus:ring-teal-100 outline-none transition text-sm md:text-base"
                      placeholder="Mario Rossi"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email Aziendale *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-sf-primary focus:ring-2 focus:ring-teal-100 outline-none transition text-sm md:text-base"
                      placeholder="mario@azienda.it"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Azienda</label>
                    <input 
                      type="text" 
                      name="azienda"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-sf-primary focus:ring-2 focus:ring-teal-100 outline-none transition text-sm md:text-base"
                      placeholder="Nome della tua azienda"
                      onChange={handleChange}
                    />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-sf-dark text-white font-bold py-3 md:py-4 rounded-lg hover:bg-sf-primary transition flex justify-center items-center gap-2 shadow-lg mt-2 text-sm md:text-base disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Invio in corso...' : <>PRENOTA DEMO <ArrowRight size={20} /></>}
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
             <img src="./src/assets/img/s1.png" alt="Service First" />
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