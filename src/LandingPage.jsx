import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FiTag, FiTruck, FiZap } from 'react-icons/fi';
import { MdOutlineBeachAccess, MdLocalShipping } from 'react-icons/md';
import { AiOutlinePercentage } from 'react-icons/ai';
import { RiVipCrownLine } from 'react-icons/ri';
import IconColdre from './icons/IconColdre';

const EMAILJS_SERVICE_ID  = 'service_ey7d2wg';
const EMAILJS_TEMPLATE_ID = 'template_qm0lefo';
const EMAILJS_PUBLIC_KEY  = 'fJfR6AZemIyTdUIOm';

// ── Máscara de telefone ──
const formatPhone = (digits) => {
  if (digits.length <= 2)  return digits;
  if (digits.length <= 7)  return `(${digits.slice(0,2)}) ${digits.slice(2)}`;
  if (digits.length <= 11) return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
  return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7,11)}`;
};

// ── Componente de formulário reutilizável ──
const InlineForm = ({ darkBg = false }) => {
  const [name, setName]                 = useState('');
  const [phone, setPhone]               = useState('');
  const [phoneDisplay, setPhoneDisplay] = useState('');
  const [email, setEmail]               = useState('');
  const [status, setStatus]             = useState(null);

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhone(digits);
    setPhoneDisplay(formatPhone(digits));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      alert('Por favor, informe o DDD + número completo do WhatsApp.');
      return;
    }
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: name, from_phone: phoneDisplay, from_email: email },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setName('');
      setPhone('');
      setPhoneDisplay('');
      setEmail('');
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    }
  };

  // ── Estilos condicionais: fundo escuro (CTA bronze) ou fundo claro ──
  const inputClass = darkBg
    ? "font-karla flex-none px-2 py-1 text-sm bg-white border-2 border-white/50 rounded-lg text-black-primary placeholder-gray-medium focus:outline-none focus:border-white transition-all duration-300 disabled:opacity-60"
    : "font-karla flex-none px-2 py-1 text-sm bg-off-white border-2 border-bronze/30 rounded-lg text-black-primary placeholder-gray-dark/50 focus:outline-none focus:border-bronze transition-all duration-300 disabled:opacity-60";

  const btnClass = darkBg
    ? "font-karla px-6 py-3 text-sm bg-black-primary text-white font-bold rounded-lg hover:bg-gray-dark hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
    : "font-karla px-6 py-3 text-sm bg-bronze-light text-black-primary font-bold rounded-lg hover:bg-copper/80 hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap";

  const feedbackColorSending = darkBg ? "text-white/80"   : "text-gray-dark";
  const feedbackColorSuccess = darkBg ? "text-green-300"  : "text-green-600";
  const feedbackColorError   = darkBg ? "text-red-300"    : "text-red-500";

  return (
    <div className="mt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch justify-center gap-2"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
          disabled={status === 'sending'}
          className={`${inputClass} w-32`}
        />
        <input
          type="tel"
          value={phoneDisplay}
          onChange={handlePhoneChange}
          placeholder="(DD) WhatsApp"
          required
          maxLength={15}
          disabled={status === 'sending'}
          className={`${inputClass} w-40`}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
          disabled={status === 'sending'}
          className={`${inputClass} w-32`}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className={btnClass}
        >
          {status === 'sending' ? 'Enviando...' : 'Entrar na Lista'}
        </button>
      </form>

      {/* Feedback */}
      {status === 'sending' && (
        <p className={`text-center text-sm mt-3 font-karla animate-pulse ${feedbackColorSending}`}>
          Enviando...
        </p>
      )}
      {status === 'success' && (
        <p className={`text-center text-sm mt-3 font-karla font-bold ${feedbackColorSuccess}`}>
          ✅ Cadastro realizado com sucesso! Em breve entraremos em contato.
        </p>
      )}
      {status === 'error' && (
        <p className={`text-center text-sm mt-3 font-karla font-bold ${feedbackColorError}`}>
          ❌ Erro ao cadastrar. Tente novamente.
        </p>
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
const FastClipLandingPage = () => {
  const [name, setName]                 = useState('');
  const [phone, setPhone]               = useState('');
  const [phoneDisplay, setPhoneDisplay] = useState('');
  const [email, setEmail]               = useState('');
  const [faqOpen, setFaqOpen]           = useState(null);
  const [status, setStatus]             = useState(null);

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhone(digits);
    setPhoneDisplay(formatPhone(digits));
  };

  const handleSubmitHero = async (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      alert('Por favor, informe o DDD + número completo do WhatsApp.');
      return;
    }
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: name, from_phone: phoneDisplay, from_email: email },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setName('');
      setPhone('');
      setPhoneDisplay('');
      setEmail('');
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    }
  };

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const testimonials = [
    {
      name: "João Silva",
      role: "Instrutor Tático",
      text: "O Fast Clip mudou completamente minha rotina. Ajuste instantâneo e segurança incomparável.",
      avatar: "https://ui-avatars.com/api/?name=João+Silva&background=8B6914&color=fff&size=128&bold=true&font-size=0.4"
    },
    {
      name: "Maria Santos",
      role: "Agente de Segurança",
      text: "Finalmente um cinto que acompanha minha agilidade. Praticidade e resistência em um só produto.",
      avatar: "https://ui-avatars.com/api/?name=Maria+Santos&background=8B6914&color=fff&size=128&bold=true&font-size=0.4"
    },
    {
      name: "Pedro Costa",
      role: "Profissional Outdoor",
      text: "Uso em trilhas e expedições. A durabilidade e o ajuste rápido fazem toda a diferença.",
      avatar: "https://ui-avatars.com/api/?name=Pedro+Costa&background=8B6914&color=fff&size=128&bold=true&font-size=0.4"
    }
  ];

  const specifications = [
    { title: "Sistema de Travamento", description: "Mecanismo de liberação rápida com trava de segurança certificada" },
    { title: "Material Premium",      description: "Nylon balístico 1050D com fivela de liga aeronáutica" },
    { title: "Ajuste Micro",          description: "Regulagem precisa a cada 5mm para conforto perfeito" },
    { title: "Resistência",           description: "Suporta até 180kg de carga com certificação militar" },
    { title: "Design Versátil",       description: "Visual discreto para uso tático e urbano" },
    { title: "Garantia Vitalícia",    description: "Cobertura total contra defeitos de fabricação" }
  ];

  const bonuses = [
    {
      title: "25% de Desconto",
      description: "Exclusivo para os primeiros cadastrados",
      icon: <AiOutlinePercentage size={48} className="text-bronze" />
    },
    {
      title: "Frete Grátis",
      description: "Entrega gratuita em todo o Brasil",
      icon: <MdLocalShipping size={48} className="text-bronze" />
    },
    {
      title: "Acesso Prioritário",
      description: "Receba antes do lançamento oficial",
      icon: <RiVipCrownLine size={48} className="text-bronze" />
    }
  ];

  const faqs = [
    { question: "Qual o tamanho disponível?",                   answer: "O Fast Clip possui ajuste universal de 70cm a 130cm de circunferência, atendendo a maioria dos biótipos." },
    { question: "Como funciona o sistema de liberação rápida?", answer: "Basta pressionar os dois botões laterais simultaneamente. O sistema trava automaticamente ao encaixar." },
    { question: "É resistente à água?",                         answer: "Sim, o material é resistente à água, suor e condições adversas. Ideal para uso outdoor e tático." },
    { question: "Qual o prazo de entrega?",                     answer: "Para quem entrar na lista de espera, o envio será feito assim que o produto for lançado, em até 60 dias." },
    { question: "Posso usar no dia a dia?",                     answer: "Absolutamente! O design discreto permite uso urbano, profissional e casual." },
    { question: "Tem garantia?",                                answer: "Sim, garantia vitalícia contra defeitos de fabricação." }
  ];

  return (
    <div className="font-karla">

      {/*  */}
      {/* HERO SECTION                                                 */}
      {/*  */}
      <section
        className="relative min-h-screen flex flex-col bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('/images/hero-background.jpeg')" }}
      >
        <div className="absolute inset-0 bg-obsidian/70"></div>

        <div className="relative z-20 w-full bg-bronze py-3 text-center mb-16">
          <span className="font-display text-ghost text-sm md:text-base uppercase tracking-wide underline">
            LANÇAMENTO EM 60 DIAS - ENTRE NA LISTA DE ESPERA
          </span>
        </div>

        <div className="relative z-20 flex flex-col items-center pt-8 px-6 text-center">
          <h1 className="font-display leading-tight">
            <span
              className="block text-8xl md:text-9xl text-ghost tracking-tight"
              style={{ WebkitTextStroke: '3px #F5F5F0' }}
            >
              FAST CLIP
            </span>
            <span className="block text-3xl md:text-4xl text-bronze-light tracking-tight mt-1">
              VOCÊ ESCOLHE A ROUPA - NÓS GARANTIMOS QUE FUNCIONE
            </span>
          </h1>
        </div>

        <div className="relative z-10 w-full mt-auto pb-10 px-6">
          <form
            onSubmit={handleSubmitHero}
            className="max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch justify-center gap-2"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
              required
              disabled={status === 'sending'}
              className="font-karla flex-none w-32 px-2 py-1 text-sm bg-off-white border-2 border-bronze/30 rounded-lg text-black-primary placeholder-gray-dark/50 focus:outline-none focus:border-bronze transition-all duration-300 disabled:opacity-60"
            />
            <input
              type="tel"
              value={phoneDisplay}
              onChange={handlePhoneChange}
              placeholder="(DD) WhatsApp"
              required
              maxLength={15}
              disabled={status === 'sending'}
              className="font-karla flex-none w-40 px-2 py-1 text-sm bg-off-white border-2 border-bronze/30 rounded-lg text-black-primary placeholder-gray-dark/50 focus:outline-none focus:border-bronze transition-all duration-300 disabled:opacity-60"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              disabled={status === 'sending'}
              className="font-karla flex-none w-32 px-2 py-1 text-sm bg-off-white border-2 border-bronze/30 rounded-lg text-black-primary placeholder-gray-dark/50 focus:outline-none focus:border-bronze transition-all duration-300 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="font-karla px-6 py-3 text-sm bg-bronze-light text-black-primary font-bold rounded-lg hover:bg-copper/80 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'sending' ? 'Enviando...' : 'Entrar na Lista'}
            </button>
          </form>

          {status === 'sending' && <p className="text-center text-sm mt-3 text-off-white/80 font-karla animate-pulse">Enviando...</p>}
          {status === 'success' && <p className="text-center text-sm mt-3 text-green-400 font-karla font-bold">✅ Cadastro realizado com sucesso! Em breve entraremos em contato.</p>}
          {status === 'error'   && <p className="text-center text-sm mt-3 text-red-400 font-karla font-bold">❌ Erro ao cadastrar. Tente novamente.</p>}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-4">
            <div className="flex items-center gap-2 text-off-white/80">
              <FiTag size={16} className="text-bronze-light flex-shrink-0" />
              <span className="font-karla text-sm tracking-wide">Desconto de 25%</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-off-white/30"></div>
            <div className="flex items-center gap-2 text-off-white/80">
              <FiTruck size={16} className="text-bronze-light flex-shrink-0" />
              <span className="font-karla text-sm tracking-wide">Frete Grátis</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-off-white/30"></div>
            <div className="flex items-center gap-2 text-off-white/80">
              <FiZap size={16} className="text-bronze-light flex-shrink-0" />
              <span className="font-karla text-sm tracking-wide">Acesso Prioritário</span>
            </div>
          </div>
        </div>
      </section>

      {/*  */}
      {/* PROBLEMA SECTION                                             */}
      {/*  */}
      <section className="py-20 bg-white-primary">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-16 text-black-primary tracking-tighter leading-snug">
            <span className="block uppercase">LIBERDADE DE VESTIR.</span>
            <span className="block uppercase">SEGURANÇA EM ESTAR PREPARADO.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <IconColdre size={48} className="text-bronze" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-black-primary uppercase tracking-tight">
                Funciona com o seu coldre
              </h3>
              <p className="text-gray-dark leading-relaxed">
                Funciona com os principais coldres disponíveis no mercado global.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FiZap size={48} className="text-bronze" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-black-primary uppercase tracking-tight">
                Clipagem em segundos
              </h3>
              <p className="text-gray-dark leading-relaxed">
                Você só precisa de 15 segundos. Simples. Rápido. Inovador.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <MdOutlineBeachAccess size={48} className="text-bronze" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-black-primary uppercase tracking-tight">
                Conforto 24/7
              </h3>
              <p className="text-gray-dark leading-relaxed">
                Você escolhe a roupa. Nós garantimos que funcione. Não é apenas tático. É a sua solução para a folga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*  */}
      {/* SOLUÇÃO SECTION                                              */}
      {/*  */}
      <section className="py-20 bg-gray-light">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-12 text-black-primary tracking-tighter leading-snug uppercase">
            FAST CLIP: SOLUÇÕES REAIS, EM OCASIÕES ESSENCIAIS, PARA PESSOAS ESPECIAIS.
          </h2>
          <div
            className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl"
            style={{ backgroundColor: '#0a0a0a' }}
          >
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55) 100%)',
              }}
            />
            <img
              src="/images/cinto-coldre-nevoa.jpeg"
              alt="Fast Clip Solução"
              className="relative z-0 w-full object-cover opacity-80"
            />
          </div>

          {/* ── Formulário na dobra inferior da Solução Section ── */}
          <InlineForm darkBg={false} />
        </div>
      </section>

      {/*  */}
      {/* DEPOIMENTOS SECTION                                          */}
      {/*  */}
      <section className="py-20 bg-white-primary">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display text-center mb-16 text-black-primary tracking-tighter">
            NÃO ACREDITE APENAS NA NOSSA PALAVRA
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-bronze"
                  />
                  <div>
                    <h4 className="font-karla font-bold text-lg text-black-primary">{testimonial.name}</h4>
                    <p className="text-sm text-gray-medium font-karla font-bold">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-dark italic leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  */}
      {/* ESPECIFICAÇÕES SECTION                                       */}
      {/*  */}
      <section className="py-20 bg-gray-light">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display text-center mb-16 text-black-primary tracking-tighter">
            ESPECIFICAÇÕES TÉCNICAS
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-karla font-bold mb-3 text-black-primary">{spec.title}</h3>
                <p className="text-gray-dark font-karla leading-relaxed">{spec.description}</p>
              </div>
            ))}
          </div>

          {/* ── Formulário na dobra inferior de Especificações ── */}
          <InlineForm darkBg={false} />
        </div>
      </section>

      {/*  */}
      {/* BÔNUS SECTION                                                */}
      {/*  */}
      <section className="py-20 bg-white-primary">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display text-center mb-6 text-black-primary tracking-tighter">
            BÔNUS EXCLUSIVO PARA LISTA DE ESPERA
          </h2>
          <p className="text-center text-gray-dark mb-16 text-lg max-w-2xl mx-auto font-karla">
            Cadastre seu e-mail agora e garanta vantagens únicas
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {bonuses.map((bonus, index) => (
              <div
                key={index}
                className="bg-gray-light border-2 border-bronze rounded-lg p-8 text-center hover:scale-105 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {bonus.icon}
                </div>
                <h3 className="text-2xl font-karla font-extrabold mb-3 text-gray-dark">{bonus.title}</h3>
                <p className="text-gray-dark font-karla">{bonus.description}</p>
              </div>
            ))}
          </div>

          {/* ── Formulário na dobra inferior de Bônus ── */}
          <InlineForm darkBg={false} />
        </div>
      </section>

      {/*  */}
      {/* FAQ SECTION                                                  */}
      {/*  */}
      <section className="py-20 bg-gray-light">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-display text-center mb-16 text-black-primary tracking-tighter">
            PERGUNTAS FREQUENTES
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-light transition-all duration-200"
                >
                  <span className="font-karla font-bold text-lg text-black-primary">{faq.question}</span>
                  <span className="text-2xl text-bronze font-light">
                    {faqOpen === index ? '−' : '+'}
                  </span>
                </button>
                {faqOpen === index && (
                  <div className="px-6 py-4 bg-gray-light border-t border-gray-300">
                    <p className="text-gray-dark leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  */}
      {/* CTA FINAL SECTION                                            */}
      {/*  */}
      <section className="py-20 bg-bronze">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display mb-3 text-white tracking-tighter">
            NÃO FIQUE DE FORA
          </h2>
          <p className="text-xl mb-4 text-white/90 max-w-2xl mx-auto font-karla leading-relaxed">
            Junte-se aos milhares de profissionais que já garantiram seu Fast Clip
          </p>

          {/* ── Formulário horizontal com tema escuro ── */}
          <InlineForm darkBg={true} />
        </div>
      </section>

      {/*  */}
      {/* FOOTER                                                       */}
      {/*  */}
      <footer className="bg-black-primary text-gray-medium py-12 border-t border-gray-dark">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="font-display text-3xl text-white mb-2 tracking-wide">
              FAST CLIP
            </h3>
            <p className="text-gray-medium font-karla tracking-wider text-sm uppercase">
              Liberdade em Movimento
            </p>
          </div>
          <div className="border-t border-gray-dark pt-6">
            <p className="text-sm font-karla">
              © 2025 Fast Clip. Todos os direitos reservados.
            </p>
            <p className="text-sm mt-2 text-gray-medium font-karla">
              Desenvolvido para profissionais que não aceitam limites
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default FastClipLandingPage;