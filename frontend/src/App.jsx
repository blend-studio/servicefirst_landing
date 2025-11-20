import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle, ArrowRight, Mail } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({ nome: '', email: '', azienda: '' });
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Sostituisci con l'URL del tuo backend PHP locale
      const response = await fetch('http://localhost/servicefirst_landing/backend/public/index.php?action=register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 fixed w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-sf-primary tracking-tighter">
            SERVICE<span className="text-sf-secondary">FIRST</span>
          </div>
          <a href="#catalogo" className="bg-sf-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition">
            Contattaci
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 bg-gradient-to-br from-sf-light to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-sf-primary mb-6 leading-tight">
              Il Partner Ideale per il tuo <span className="text-sf-secondary">Business</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Scopri il nostro catalogo completo di soluzioni IT, hardware ricondizionato e servizi di assistenza tecnica su misura.
            </p>
            <div className="flex gap-4">
              <a href="#form" className="flex items-center gap-2 bg-sf-secondary text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-orange-600 transition transform hover:-translate-y-1">
                <Download size={24} /> Scarica il Catalogo
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Placeholder per immagine hero */}
            <div className="bg-sf-primary rounded-2xl p-8 shadow-2xl text-white h-96 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-sf-primary to-blue-500 opacity-90"></div>
               <div className="relative z-10 text-center">
                 <h3 className="text-3xl font-bold mb-2">Hardware & Software</h3>
                 <p className="text-blue-100">Soluzioni Enterprise</p>
               </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full text-green-600">
                <CheckCircle />
              </div>
              <div>
                <p className="font-bold text-sf-primary">Garanzia 100%</p>
                <p className="text-xs text-gray-500">Su tutti i prodotti</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-sf-primary mb-4">Perché scegliere ServiceFirst?</h2>
            <div className="w-20 h-1 bg-sf-secondary mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Qualità Certificata", desc: "Processi di ricondizionamento rigorosi e test approfonditi." },
              { title: "Supporto Dedicato", desc: "Assistenza tecnica specializzata sempre al tuo fianco." },
              { title: "Sostenibilità", desc: "Riduci l'impatto ambientale scegliendo hardware ricondizionato." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition duration-300 group">
                <div className="w-12 h-12 bg-sf-light rounded-lg flex items-center justify-center text-sf-secondary mb-6 group-hover:bg-sf-secondary group-hover:text-white transition">
                  <CheckCircle />
                </div>
                <h3 className="text-xl font-bold text-sf-primary mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="py-20 bg-sf-primary text-white relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10 bg-sf-secondary flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-4">Ricevi il Catalogo</h3>
              <p className="mb-6 opacity-90">Compila il form per ricevere immediatamente il nostro catalogo prodotti aggiornato e accedere alle offerte esclusive.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><CheckCircle size={18} /> Listino prezzi riservato</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} /> Disponibilità in tempo reale</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} /> Consulenza gratuita</li>
              </ul>
            </div>
            
            <div className="md:w-1/2 p-10 text-sf-dark">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-sf-primary mb-2">Grazie!</h4>
                  <p className="text-gray-600">Ti abbiamo inviato il catalogo via email.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
                    <input 
                      type="text" 
                      name="nome"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sf-secondary focus:ring-2 focus:ring-orange-100 outline-none transition"
                      placeholder="Mario Rossi"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Aziendale</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sf-secondary focus:ring-2 focus:ring-orange-100 outline-none transition"
                      placeholder="mario@azienda.it"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Azienda</label>
                    <input 
                      type="text" 
                      name="azienda"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-sf-secondary focus:ring-2 focus:ring-orange-100 outline-none transition"
                      placeholder="Nome della tua azienda"
                      onChange={handleChange}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-sf-primary text-white font-bold py-4 rounded-lg hover:bg-opacity-90 transition flex justify-center items-center gap-2"
                  >
                    {status === 'loading' ? 'Invio in corso...' : <>Richiedi Ora <ArrowRight size={20} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sf-dark text-gray-400 py-12 text-center">
        <p>&copy; {new Date().getFullYear()} ServiceFirst. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}

export default App;