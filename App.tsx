
import React, { useState } from 'react';
import { Section } from './types';
import { PROJECTS, EXPERIENCES, APPOINTMENT_SERVICES, TIME_SLOTS } from './constants';
import { Navigation } from './components/Navigation';
import { SectionModal } from './components/SectionModal';

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
    
    // Simulate API call
    setTimeout(() => {
      setSubmissionStatus({ type: 'success', message: 'Transmission received. We will connect soon.' });
      (e.target as HTMLFormElement).reset();
      setIsSubmitting(false);
    }, 1500);
  };

  const handleBookAppointment = async () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      alert("Please select service, date and time.");
      return;
    }
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Simulate API call
    setTimeout(() => {
      setSubmissionStatus({ type: 'success', message: 'Temporal slot secured. Simulation complete.' });
      setIsSubmitting(false);
    }, 1500);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case Section.ABOUT:
        return (
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3">
              <div className="aspect-square glass-card rounded-[2rem] p-4 rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://picsum.photos/seed/profile-sub/600/600" 
                  alt="About" 
                  className="w-full h-full object-cover rounded-[1.5rem]"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <h3 className="text-3xl font-bold text-blue-600">FUELING BRANDS IN THE DIGITAL AGE</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                With over 7 years of experience in Digital Marketing, I specialize in ROI-driven strategies that scale businesses. My approach combines data analytics with creative storytelling to capture attention in a crowded marketplace.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-white/40 border border-white/60">
                  <div className="text-3xl font-black text-blue-500">150+</div>
                  <div className="text-sm font-bold text-gray-500">PROJECTS COMPLETED</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/40 border border-white/60">
                  <div className="text-3xl font-black text-purple-500">98%</div>
                  <div className="text-sm font-bold text-gray-500">CLIENT SATISFACTION</div>
                </div>
              </div>
            </div>
          </div>
        );
      case Section.WORKING:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="glass-card p-8 rounded-3xl group hover:bg-white/80 transition-all hover:-translate-y-2">
                <div className="text-4xl mb-6 bg-indigo-100 w-16 h-16 flex items-center justify-center rounded-2xl">
                  {exp.icon}
                </div>
                <h4 className="text-xl font-black text-gray-800 mb-1">{exp.company}</h4>
                <p className="text-sm font-bold text-indigo-500 mb-6">{exp.role}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="px-4 py-2 bg-indigo-50 rounded-lg text-xs font-bold text-indigo-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    {exp.period}
                  </div>
                  <button className="p-2 rounded-full bg-gray-100 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
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
                <div className="aspect-[1.6/1] overflow-hidden rounded-[2rem] glass-card mb-4 relative">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-lg font-black text-gray-800 mb-2 uppercase tracking-tight">{proj.title}</h4>
                <div className="flex items-center gap-2 text-emerald-500 font-bold mb-1">
                  <span className="text-lg">🏆</span>
                  <span>{proj.metric}</span>
                </div>
                <p className="text-xs font-black text-gray-400 tracking-wider uppercase">{proj.subMetric}</p>
              </div>
            ))}
          </div>
        );
      case Section.APPOINTMENT:
        return (
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <div className="glass-card p-8 rounded-[2.5rem] bg-rose-50/30 h-full flex flex-col">
                <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-rose-200 mb-8">
                  🚀
                </div>
                <h3 className="text-4xl font-black text-gray-800 mb-4 leading-none">TEMPORAL SLOT</h3>
                <p className="text-gray-500 font-medium mb-8">SYNCHRONIZE WITH THE DIGITAL ARCHITECT.</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <span className="w-12 h-[1px] bg-gray-200" />
                    Operational Policy
                  </div>
                  <p className="text-sm text-gray-400 italic">"Time is the currency of creation. Choose wisely."</p>
                </div>

                {submissionStatus && (
                  <div className={`p-4 rounded-2xl mb-4 text-xs font-bold uppercase tracking-widest ${submissionStatus.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {submissionStatus.message}
                  </div>
                )}

                <button 
                  onClick={handleBookAppointment}
                  disabled={isSubmitting || !selectedService || !selectedDate || !selectedTime}
                  className="mt-auto w-full py-6 rounded-2xl bg-rose-500 text-white font-black tracking-[0.2em] uppercase shadow-xl hover:shadow-rose-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100"
                >
                  {isSubmitting ? 'SYNCHRONIZING...' : 'LOCK SLOT'}
                </button>
              </div>
            </div>
            
            <div className="lg:w-2/3 space-y-12">
              <div>
                <h4 className="text-xs font-black text-gray-300 tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                  <span className="text-rose-400">01.</span> CHOOSE OPERATIONAL CAPABILITY
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {APPOINTMENT_SERVICES.map(service => (
                    <button 
                      key={service.id} 
                      onClick={() => setSelectedService(service.id)}
                      className={`flex items-center gap-6 p-6 rounded-3xl transition-all text-left group border ${selectedService === service.id ? 'bg-rose-50 border-rose-200 ring-2 ring-rose-200 shadow-lg' : 'glass-card border-transparent hover:bg-white/90'}`}
                    >
                      <div className={`text-3xl transition-all ${selectedService === service.id ? 'scale-110 grayscale-0' : 'grayscale group-hover:grayscale-0'}`}>{service.icon}</div>
                      <div>
                        <div className={`font-black text-sm tracking-tight ${selectedService === service.id ? 'text-rose-600' : 'text-gray-800'}`}>{service.title}</div>
                        <div className="text-xs font-bold text-gray-400 mt-1">{service.time}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-xs font-black text-gray-300 tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                    <span className="text-rose-400">02.</span> SELECT TEMPORAL POINT
                  </h4>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-6 glass-card rounded-3xl font-bold text-gray-600 outline-none focus:ring-2 focus:ring-rose-400/50 transition-all"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-300 tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                    <span className="text-rose-400">03.</span> OPERATIONAL CLOCK
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {TIME_SLOTS.map(slot => (
                      <button 
                        key={slot} 
                        onClick={() => setSelectedTime(slot)}
                        className={`py-3 rounded-xl text-xs font-black transition-all shadow-sm ${selectedTime === slot ? 'bg-rose-500 text-white' : 'glass-bg text-gray-400 hover:bg-rose-100 hover:text-rose-600'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case Section.CONTACT:
        return (
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 space-y-8">
              <h3 className="text-xs font-black text-amber-500 tracking-[0.3em] uppercase">GLOBAL COMMS</h3>
              <div className="space-y-6">
                {[
                  { label: 'DIRECT CHANNEL', value: 'hello@shamimahmed.com', sub: 'E-mail Delivery' },
                  { label: 'PROFESSIONAL NODE', value: 'LinkedIn Connection', sub: 'Business Network' },
                  { label: 'INSTANT MATRIX', value: 'WhatsApp Secure Chat', sub: 'Fast Response' }
                ].map((item, idx) => (
                  <div key={idx} className="p-8 glass-card rounded-[2rem] hover:translate-x-2 transition-transform cursor-pointer">
                    <div className="text-[10px] font-black text-gray-400 tracking-[0.2em] mb-2">{item.label}</div>
                    <div className="text-xl font-black text-gray-800">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="glass-card p-10 rounded-[3rem] bg-gray-50/30">
                <h3 className="text-sm font-black text-gray-400 tracking-[0.3em] uppercase mb-8">SECURE PORTAL</h3>
                
                {submissionStatus && (
                  <div className={`p-4 rounded-2xl mb-8 text-xs font-bold uppercase tracking-widest ${submissionStatus.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {submissionStatus.message}
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmitContact}>
                  <input name="name" required placeholder="Temporal Name" className="w-full p-6 glass-bg rounded-2xl border-white/80 outline-none focus:bg-white transition-all font-bold text-gray-700" />
                  <input name="email" required type="email" placeholder="Digital Address" className="w-full p-6 glass-bg rounded-2xl border-white/80 outline-none focus:bg-white transition-all font-bold text-gray-700" />
                  <textarea name="message" required placeholder="Transmission details..." rows={4} className="w-full p-6 glass-bg rounded-2xl border-white/80 outline-none focus:bg-white transition-all font-bold text-gray-700 resize-none" />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black tracking-[0.2em] uppercase shadow-xl hover:shadow-amber-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getSectionColor = (section: Section | null) => {
    switch(section) {
      case Section.ABOUT: return 'bg-blue-500';
      case Section.WORKING: return 'bg-indigo-500';
      case Section.PORTFOLIO: return 'bg-cyan-500';
      case Section.APPOINTMENT: return 'bg-rose-500';
      case Section.CONTACT: return 'bg-amber-500';
      default: return 'bg-blue-500';
    }
  };

  const handleCloseModal = () => {
    setActiveSection(null);
    setSubmissionStatus(null);
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white selection:bg-blue-100">
      {/* Dynamic Animated Background Shapes */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[120px] -z-10 animate-pulse" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-rose-100/50 blur-[120px] -z-10 animate-pulse delay-700" />
      <div className="fixed top-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-purple-100/30 blur-[100px] -z-10 animate-bounce delay-1000" />

      {/* Main Content Layout */}
      <main className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
        
        {/* Profile Section */}
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom duration-1000">
          <div className="relative inline-block float-animation">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full glass-card p-2 border-2 border-white/80 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/shamim/800/800" 
                alt="Shamim Ahmed" 
                className="w-full h-full object-cover rounded-full border-2 border-white grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Pulsing Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin duration-[10s]" />
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 drop-shadow-sm">
              SHAMIM AHMED
            </h1>
            <div className="relative inline-block">
              <div className="px-8 py-3 glass-card rounded-2xl border border-white/80 shadow-lg">
                <span className="text-sm md:text-base font-black tracking-[0.5em] text-blue-600 uppercase">
                  DIGITAL ARCHITECT
                </span>
              </div>
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-[1px]" />
            </div>
          </div>
        </div>

        {/* Central Navigation */}
        <Navigation onSelect={(s) => setActiveSection(s)} />
      </main>

      {/* Modals for Sections */}
      <SectionModal 
        isOpen={activeSection !== null} 
        onClose={handleCloseModal}
        title={activeSection || ''}
        titleColor={getSectionColor(activeSection)}
      >
        {renderSectionContent()}
      </SectionModal>

      {/* Footer Branding */}
      <footer className="fixed bottom-8 left-0 right-0 text-center pointer-events-none opacity-40">
        <span className="text-[10px] font-black tracking-[1em] text-gray-400 uppercase">
          Precision Built Portfolio &copy; 2024
        </span>
      </footer>
    </div>
  );
};

export default App;
