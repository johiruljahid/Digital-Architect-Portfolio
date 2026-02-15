
import React, { useState } from 'react';
import { Section } from './types.ts';
import { PROJECTS, EXPERIENCES, APPOINTMENT_SERVICES, TIME_SLOTS } from './constants.tsx';
import { Navigation } from './components/Navigation.tsx';
import { SectionModal } from './components/SectionModal.tsx';
import { supabase } from './supabase.ts';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Form states for Appointment
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleSubmitContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      created_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase.from('contacts').insert([payload]);
      
      if (error) throw error;

      setSubmissionStatus({ type: 'success', message: 'Transmission received. Data synced to Supabase.' });
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      console.error('Supabase Error:', err);
      setSubmissionStatus({ type: 'error', message: `Sync failed: ${err.message || 'Unknown error'}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      alert("Please select service, date and time.");
      return;
    }
    setIsSubmitting(true);
    setSubmissionStatus(null);

    const serviceName = APPOINTMENT_SERVICES.find(s => s.id === selectedService)?.title || selectedService;

    try {
      const { error } = await supabase.from('appointments').insert([{
        service: serviceName,
        date: selectedDate,
        time: selectedTime,
        created_at: new Date().toISOString(),
      }]);

      if (error) throw error;

      setSubmissionStatus({ type: 'success', message: 'Temporal slot secured in database. Simulation complete.' });
    } catch (err: any) {
      console.error('Supabase Error:', err);
      setSubmissionStatus({ type: 'error', message: `Booking failed: ${err.message || 'Unknown error'}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case Section.ABOUT:
        return (
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3">
              <div className="aspect-square glass-card rounded-[2.5rem] p-4 rotate-2 hover:rotate-0 transition-all duration-700 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=600&auto=format&fit=crop" 
                  alt="About" 
                  className="w-full h-full object-cover rounded-[2rem]"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">ENGINEERING DIGITAL EXPERIENCES</h3>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                I am a Digital Architect focused on building high-performance marketing ecosystems. My work bridges the gap between complex data analytics and impactful creative strategy.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-6 rounded-3xl glass-bg border-white">
                  <div className="text-4xl font-black text-blue-600">150+</div>
                  <div className="text-xs font-bold text-slate-400 tracking-widest uppercase mt-1">Global Deployments</div>
                </div>
                <div className="p-6 rounded-3xl glass-bg border-white">
                  <div className="text-4xl font-black text-indigo-600">7+ YRS</div>
                  <div className="text-xs font-bold text-slate-400 tracking-widest uppercase mt-1">Industry Mastery</div>
                </div>
              </div>
            </div>
          </div>
        );
      case Section.WORKING:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="glass-card p-8 rounded-[2.5rem] group hover:bg-white transition-all hover:-translate-y-2 border-white/50">
                <div className="text-4xl mb-6 bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner">
                  {exp.icon}
                </div>
                <h4 className="text-xl font-black text-slate-800 mb-1">{exp.company}</h4>
                <p className="text-sm font-bold text-blue-500 mb-6 uppercase tracking-wider">{exp.role}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="px-4 py-2 bg-slate-100/50 rounded-xl text-[10px] font-black text-slate-500 tracking-widest uppercase">
                    {exp.period}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case Section.PORTFOLIO:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden rounded-[2.5rem] glass-card mb-5 relative border-white/80 p-3">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-black text-slate-800 mb-2 uppercase tracking-[0.2em] px-2">{proj.title}</h4>
                <div className="flex items-center gap-2 text-blue-600 font-bold px-2">
                  <span className="text-xs uppercase tracking-widest">{proj.metric}</span>
                </div>
              </div>
            ))}
          </div>
        );
      case Section.APPOINTMENT:
        return (
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <div className="glass-card p-10 rounded-[3rem] bg-white/40 h-full flex flex-col border-white">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl mb-8 shadow-xl">
                  📅
                </div>
                <h3 className="text-4xl font-black text-slate-900 mb-4 leading-none tracking-tighter">SECURE A SLOT</h3>
                <p className="text-slate-500 font-medium mb-10 text-sm tracking-wide">Select a temporal window for your architectural consultation.</p>

                {submissionStatus && (
                  <div className={`p-5 rounded-2xl mb-6 text-xs font-black uppercase tracking-widest text-center ${submissionStatus.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {submissionStatus.message}
                  </div>
                )}

                <button 
                  onClick={handleBookAppointment}
                  disabled={isSubmitting || !selectedService || !selectedDate || !selectedTime}
                  className="mt-auto w-full py-6 rounded-2xl bg-slate-900 text-white font-black tracking-[0.2em] uppercase shadow-2xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-30"
                >
                  {isSubmitting ? 'PROCESSING...' : 'CONFIRM SLOT'}
                </button>
              </div>
            </div>
            
            <div className="lg:w-2/3 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {APPOINTMENT_SERVICES.map(service => (
                  <button 
                    key={service.id} 
                    onClick={() => setSelectedService(service.id)}
                    className={`flex items-center gap-6 p-6 rounded-[2rem] transition-all text-left group border ${selectedService === service.id ? 'bg-white border-blue-200 shadow-xl scale-[1.02]' : 'glass-card border-transparent hover:border-white'}`}
                  >
                    <div className="text-3xl">{service.icon}</div>
                    <div>
                      <div className={`font-black text-xs tracking-widest uppercase ${selectedService === service.id ? 'text-blue-600' : 'text-slate-800'}`}>{service.title}</div>
                      <div className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-tighter">{service.time}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-6 glass-card rounded-[1.5rem] font-black text-xs tracking-widest text-slate-600 outline-none focus:ring-2 focus:ring-slate-200 border-white uppercase"
                />
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button 
                      key={slot} 
                      onClick={() => setSelectedTime(slot)}
                      className={`py-4 rounded-xl text-[10px] font-black tracking-widest transition-all ${selectedTime === slot ? 'bg-slate-900 text-white shadow-lg' : 'glass-bg text-slate-400 hover:text-slate-800'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case Section.CONTACT:
        return (
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 space-y-6">
              {[
                { label: 'EMAIL NODE', value: 'hello@shamim.dev', icon: '✉️' },
                { label: 'INSTANT COMMS', value: '+880 1700 000000', icon: '💬' },
                { label: 'WORK PORTAL', value: 'Upwork Top Rated', icon: '⭐' }
              ].map((item, idx) => (
                <div key={idx} className="p-8 glass-card rounded-[2rem] flex items-center gap-6 group hover:translate-x-2 transition-all cursor-pointer border-white">
                  <div className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mb-1">{item.label}</div>
                    <div className="text-lg font-black text-slate-800 tracking-tight">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-1/2">
              <form className="glass-card p-10 rounded-[3rem] space-y-4 border-white" onSubmit={handleSubmitContact}>
                <h3 className="text-xs font-black text-slate-400 tracking-[0.3em] uppercase mb-6">Encrypted Channel</h3>
                <input name="name" required placeholder="Full Name" className="w-full p-5 glass-bg rounded-2xl border-white outline-none focus:bg-white transition-all font-bold text-slate-700 text-sm" />
                <input name="email" required type="email" placeholder="Email Address" className="w-full p-5 glass-bg rounded-2xl border-white outline-none focus:bg-white transition-all font-bold text-slate-700 text-sm" />
                <textarea name="message" required placeholder="Project specifics..." rows={4} className="w-full p-5 glass-bg rounded-2xl border-white outline-none focus:bg-white transition-all font-bold text-slate-700 text-sm resize-none" />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black tracking-[0.2em] uppercase shadow-lg hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'SENDING...' : 'INITIALIZE CONTACT'}
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative bg-[#f8fafc] selection:bg-blue-100 text-slate-900 overflow-hidden">
      {/* Mesh Gradients Background */}
      <div className="fixed top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-100/40 blur-[120px] -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-100/30 blur-[120px] -z-10" />
      
      <main className="container mx-auto px-6 py-12 min-h-screen flex flex-col items-center justify-center">
        
        <div className="text-center space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
          <div className="relative inline-block float-animation">
            <div className="w-44 h-44 md:w-52 md:h-52 rounded-full glass-card p-2 border-white shadow-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519085175641-591d830462f4?q=80&w=400&h=400&auto=format&fit=crop" 
                alt="Shamim Ahmed" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#f8fafc]">
              <span className="text-xl">✨</span>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-tight">
              SHAMIM AHMED
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-slate-300" />
              <span className="text-xs md:text-sm font-black tracking-[0.6em] text-blue-600 uppercase">
                Digital Architect
              </span>
              <div className="h-[1px] w-8 bg-slate-300" />
            </div>
          </div>
        </div>

        <Navigation onSelect={(s) => setActiveSection(s)} />
      </main>

      <SectionModal 
        isOpen={activeSection !== null} 
        onClose={() => {
          setActiveSection(null);
          setSubmissionStatus(null);
        }}
        title={activeSection || ''}
        titleColor="bg-slate-900"
      >
        {renderSectionContent()}
      </SectionModal>

      <footer className="fixed bottom-8 left-0 right-0 text-center pointer-events-none">
        <span className="text-[10px] font-black tracking-[1.2em] text-slate-300 uppercase">
          EST. 2017 &bull; BUILT FOR SCALE
        </span>
      </footer>
    </div>
  );
};

export default App;
