import { useState } from "react";

const NAV_LINKS = ["Serviços", "Como Funciona", "Depoimentos", "Contato"];

const SERVICES = [
    {
        name: "Currículo Essencial",
        price: "R$ 30",
        description: "Para quem está começando ou quer renovar o currículo.",
        items: ["1 versão revisada", "Formatação profissional", "Entrega em até 3 dias", "1 rodada de ajustes em até 7 dias"],
        highlight: false,
    },
    {
        name: "Currículo Completo",
        price: "R$ 60",
        description: "O pacote mais escolhido — currículo.",
        items: [ "Adaptação por vaga", "Entrega em até 2 dias", "2 rodadas de ajustes em até 10 dias"," Formatação profissional"],
        highlight: true,
    },
    {
        name: "Pacote Carreira",
        price: "R$ 120",
        description: "Tudo que você precisa para se destacar no mercado.",
        items: [,"LinkedIn", "Estratégia personalizada", "Revisões ilimitadas por 15 dias", "Entrega em até 2 dias do currículo", "Formatação profissional", "Adaptação por vaga"],
        highlight: false,
    },
];

const STEPS = [
    { n: "01", title: "Conta pra mim", body: "Você preenche um formulário simples sobre sua trajetória, objetivos e a vaga dos seus sonhos." },
    { n: "02", title: "Eu escrevo", body: "Crio um currículo pensado para você — linguagem certa, formato que chama atenção e sem erros." },
    { n: "03", title: "A gente afina", body: "Você revisa, sugere mudanças e eu ajusto até ficar perfeito para enviar." },
];

const TESTIMONIALS = [
    {
        name: "Camila Rocha",
        role: "Designer Gráfica",
        text: "Eu tinha vergonha do meu currículo antigo. Com a ajuda dela fui chamada para 3 entrevistas na mesma semana!",
        avatar: "CR",
    },
    {
        name: "Rafael Lucenna",
        role: "Assitente de qualidade",
        text: "A consulturia da Kevelyn fez toda a diferença. O ajuste no currículo deixou minha apresentação muito mais alinhada e as dicas de entrevista me deram a confiança necessária para o processo. consegui a vaga! Valeu super a pena. A entrega foi rápida.",
        avatar: "RM",
    },
    {
        name: "Juliana Costa",
        role: "Professora",
        text: "Nunca pensei que minha experiência pudesse parecer tão valiosa no papel. Valeu cada centavo.",
        avatar: "JC",
    },
];

const WHATSAPP_NUMBER = "5511969941274";
const WHATSAPP_MESSAGE = encodeURIComponent("Olá! Gostaria de saber mais sobre os serviços de currículo.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
    const [sent, setSent] = useState(false);
    const [additionalComments, setAdditionalComments] = useState<typeof TESTIMONIALS>([]);
    const [showAllComments, setShowAllComments] = useState(false);
    const [showTestimonialModal, setShowTestimonialModal] = useState(false);
    const [testimonialForm, setTestimonialForm] = useState({ name: "", role: "", text: "" });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSent(true);
    }

    function addComment() {
        const newComment = {
            name: "Novo Cliente",
            role: "Profissional Satisfeito",
            text: "Que serviço incrível! Muito profissional e atenciosa. Recomendo!",
            avatar: "NC",
        };
        setAdditionalComments([...additionalComments, newComment]);
    }

    function submitTestimonial() {
        if (!testimonialForm.name.trim() || !testimonialForm.text.trim()) return;
        
        const initials = testimonialForm.name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
        
        const newComment = {
            name: testimonialForm.name,
            role: testimonialForm.role || "Cliente Satisfeito",
            text: testimonialForm.text,
            avatar: initials,
        };
        
        setAdditionalComments([...additionalComments, newComment]);
        setTestimonialForm({ name: "", role: "", text: "" });
        setShowTestimonialModal(false);
    }

    function openWhatsApp() {
        window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
    }

    function scrollTo(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    }

    const sectionId = (label: string) =>
        ({ Serviços: "servicos", "Como Funciona": "como", Depoimentos: "depoimentos", Contato: "contato" }[label] ?? "");

    return (
        <div className="min-h-full" style={{ fontFamily: "var(--font-body)" }}>
            {/* NAV */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "var(--color-background)", borderColor: "var(--color-border)" }}>
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <span style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)", fontSize: "1.25rem", fontWeight: 600 }}>
                        K.Currículos
                    </span>
                    <div className="hidden md:flex gap-8">
                        {NAV_LINKS.map((l) => (
                            <button
                                key={l}
                                onClick={() => scrollTo(sectionId(l))}
                                className="text-sm transition-colors"
                                style={{ color: "var(--color-muted-foreground)", fontWeight: 500 }}
                                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--color-accent)")}
                                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--color-muted-foreground)")}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={openWhatsApp}
                        className="hidden md:block text-sm px-5 py-2 transition-opacity hover:opacity-80"
                        style={{ background: "var(--color-primary)", color: "var(--color-primary-foreground)", borderRadius: "var(--radius)", fontWeight: 500 }}
                    >
                        Fale Comigo
                    </button>
                    <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--color-foreground)" }}>
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                            {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
                {menuOpen && (
                    <div className="md:hidden px-6 pb-4 flex flex-col gap-4 border-t" style={{ borderColor: "var(--color-border)", background: "var(--color-background)" }}>
                        {NAV_LINKS.map((l) => (
                            <button key={l} onClick={() => scrollTo(sectionId(l))} className="text-left text-sm" style={{ color: "var(--color-muted-foreground)", fontWeight: 500 }}>
                                {l}
                            </button>
                        ))}
                        <button onClick={openWhatsApp} className="text-sm px-5 py-2 self-start transition-opacity hover:opacity-80" style={{ background: "var(--color-primary)", color: "var(--color-primary-foreground)", borderRadius: "var(--radius)", fontWeight: 500 }}>
                            Fale Comigo
                        </button>
                    </div>
                )}
            </nav>

            {/* HERO */}
            <section className="relative overflow-hidden pt-24" style={{ background: "var(--color-background)" }}>
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, var(--color-secondary) 0%, transparent 60%)", opacity: 0.6 }}
                />
                <div className="max-w-6xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center relative">
                    <div>
                        <span
                            className="inline-block text-xs uppercase tracking-widest mb-6 px-3 py-1"
                            style={{ background: "var(--color-secondary)", color: "var(--color-accent)", borderRadius: "var(--radius)", fontWeight: 600, letterSpacing: "0.15em" }}
                        >
                            Currículos Profissionais
                        </span>
                        <h1
                            className="mb-6 leading-tight"
                            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "var(--color-foreground)", fontWeight: 600 }}
                        >
                            Seu currículo merece{" "}
                            <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>contar a sua história</em>{" "}
                            do jeito certo.
                        </h1>
                        <p className="mb-8 leading-relaxed" style={{ color: "var(--color-muted-foreground)", fontSize: "1.1rem", maxWidth: "480px" }}>
                            Me chamo Kevelyn e ajudo profissionais a transformar experiências reais em currículos que abrem portas. Cada palavra escolhida com cuidado.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => scrollTo("servicos")}
                                className="px-7 py-3 text-sm transition-opacity hover:opacity-85"
                                style={{ background: "var(--color-primary)", color: "var(--color-primary-foreground)", borderRadius: "var(--radius)", fontWeight: 600 }}
                            >
                                Ver Pacotes
                            </button>
                            <button
                                onClick={() => scrollTo("como")}
                                className="px-7 py-3 text-sm border transition-colors"
                                style={{ borderColor: "var(--color-border)", color: "var(--color-foreground)", borderRadius: "var(--radius)", fontWeight: 500 }}
                            >
                                Como Funciona
                            </button>
                        </div>
                        <div className="mt-10 flex gap-8">
                            {[[""], ["98%", "Aprovação nas revisões"], ["3 dias", "Prazo máximo de entrega"]].map(([n, l]) => (
                                <div key={l}>
                                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-primary)" }}>{n}</div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--color-muted-foreground)", marginTop: "2px" }}>{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative hidden md:block">
                        <div
                            className="absolute -top-4 -left-4 w-full h-full"
                            style={{ border: "2px solid var(--color-border)", borderRadius: "var(--radius)" }}
                        />
                        <div className="relative overflow-hidden" style={{ borderRadius: "var(--radius)", background: "var(--color-card)", aspectRatio: "4/5" }}>
                            <img
                                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=600&h=750&fit=crop&auto=format"
                                alt="Profissional trabalhando em currículo"
                                className="w-full h-full object-cover"
                            />
                            <div
                                className="absolute bottom-6 left-6 right-6 p-4"
                                style={{ background: "rgba(250,248,244,0.95)", borderRadius: "var(--radius)", backdropFilter: "blur(4px)" }}
                            >
                                <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--color-foreground)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                                    "Um bom currículo não é sobre parecer mais do que você é — é sobre mostrar quem você realmente é."
                                </p>
                                <p style={{ fontSize: "0.75rem", color: "var(--color-accent)", marginTop: "8px", fontWeight: 600 }}>— Kevelyn</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section id="servicos" className="py-24" style={{ background: "var(--color-secondary)" }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="mb-14 text-center">
                        <span className="text-xs uppercase tracking-widest" style={{ color: "var(--color-accent)", fontWeight: 600, letterSpacing: "0.15em" }}>Pacotes</span>
                        <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, color: "var(--color-foreground)" }}>
                            Escolha o que faz sentido pra você
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {SERVICES.map((s) => (
                            <div
                                key={s.name}
                                className="relative flex flex-col p-8"
                                style={{
                                    background: s.highlight ? "var(--color-primary)" : "var(--color-background)",
                                    color: s.highlight ? "var(--color-primary-foreground)" : "var(--color-foreground)",
                                    borderRadius: "var(--radius)",
                                    border: s.highlight ? "none" : "1px solid var(--color-border)",
                                    transition: "transform 0.2s ease",
                                }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-4px)")}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
                            >
                                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, marginBottom: "4px" }}>{s.name}</div>
                                <div style={{ fontSize: "0.875rem", opacity: 0.75, marginBottom: "20px" }}>{s.description}</div>
                                <div style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, marginBottom: "24px" }}>{s.price}</div>
                                <ul className="flex flex-col gap-3 mb-8 flex-1">
                                    {s.items.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-sm">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: "2px", flexShrink: 0 }}>
                                                <circle cx="8" cy="8" r="7" stroke={s.highlight ? "rgba(255,255,255,0.5)" : "var(--color-accent)"} strokeWidth="1" />
                                                <path d="M5 8l2 2 4-4" stroke={s.highlight ? "white" : "var(--color-accent)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => scrollTo("contato")}
                                    className="w-full py-3 text-sm font-semibold transition-opacity hover:opacity-80"
                                    style={{
                                        background: s.highlight ? "rgba(255,255,255,0.15)" : "var(--color-primary)",
                                        color: s.highlight ? "white" : "var(--color-primary-foreground)",
                                        borderRadius: "var(--radius)",
                                        border: s.highlight ? "1px solid rgba(255,255,255,0.3)" : "none",
                                    }}
                                >
                                    Quero esse pacote
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="como" className="py-24" style={{ background: "var(--color-background)" }}>
                <div className="max-w-5xl mx-auto px-6">
                    <div className="mb-14 text-center">
                        <span className="text-xs uppercase tracking-widest" style={{ color: "var(--color-accent)", fontWeight: 600, letterSpacing: "0.15em" }}>Processo</span>
                        <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, color: "var(--color-foreground)" }}>
                            Simples, rápido e sem complicação
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {STEPS.map((step, i) => (
                            <div key={step.n} className="relative">
                                {i < STEPS.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-full w-10 h-px" style={{ background: "var(--color-border)", transform: "translateX(-50%)" }} />
                                )}
                                <div className="mb-5 w-14 h-14 flex items-center justify-center" style={{ background: "var(--color-secondary)", borderRadius: "50%", border: "1px solid var(--color-border)" }}>
                                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "var(--color-accent)" }}>{step.n}</span>
                                </div>
                                <h3 className="mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-foreground)" }}>
                                    {step.title}
                                </h3>
                                <p style={{ color: "var(--color-muted-foreground)", lineHeight: 1.65, fontSize: "0.95rem" }}>{step.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS MODAL */}
            {showTestimonialModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: "rgba(0, 0, 0, 0.5)" }}
                    onClick={() => setShowTestimonialModal(false)}
                >
                    <div
                        className="w-full max-w-md p-8 flex flex-col gap-5"
                        style={{ background: "var(--color-background)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--color-foreground)" }}>
                            Compartilhe seu depoimento
                        </h3>
                        <div className="flex flex-col gap-2">
                            <label style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-foreground)" }}>Seu nome</label>
                            <input
                                type="text"
                                placeholder="João Silva"
                                value={testimonialForm.name}
                                onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                                style={{ padding: "10px 14px", background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", color: "var(--color-foreground)", fontSize: "0.95rem", outline: "none", fontFamily: "var(--font-body)" }}
                                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                                onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-foreground)" }}>Sua profissão (opcional)</label>
                            <input
                                type="text"
                                placeholder="ex: Designer, Desenvolvedor..."
                                value={testimonialForm.role}
                                onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                                style={{ padding: "10px 14px", background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", color: "var(--color-foreground)", fontSize: "0.95rem", outline: "none", fontFamily: "var(--font-body)" }}
                                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                                onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-foreground)" }}>Seu depoimento</label>
                            <textarea
                                placeholder="Conte sua experiência com nossos serviços..."
                                rows={4}
                                value={testimonialForm.text}
                                onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                                style={{ padding: "10px 14px", background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", color: "var(--color-foreground)", fontSize: "0.95rem", outline: "none", fontFamily: "var(--font-body)", resize: "vertical" }}
                                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                                onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setShowTestimonialModal(false)}
                                className="flex-1 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
                                style={{ background: "var(--color-card)", color: "var(--color-foreground)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={submitTestimonial}
                                disabled={!testimonialForm.name.trim() || !testimonialForm.text.trim()}
                                className="flex-1 py-2 text-sm font-semibold transition-opacity hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ background: "var(--color-primary)", color: "var(--color-primary-foreground)", borderRadius: "var(--radius)" }}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TESTIMONIALS */}
            <section id="depoimentos" className="py-24" style={{ background: "var(--color-muted)" }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="mb-14 text-center">
                        <span className="text-xs uppercase tracking-widest" style={{ color: "var(--color-accent)", fontWeight: 600, letterSpacing: "0.15em" }}>Depoimentos</span>
                        <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, color: "var(--color-foreground)" }}>
                            O que dizem quem já passou por aqui
                        </h2>
                        <button
                            onClick={() => setShowTestimonialModal(true)}
                            className="mt-8 px-6 py-2 text-sm font-semibold transition-opacity hover:opacity-85"
                            style={{ background: "var(--color-accent)", color: "var(--color-accent-foreground)", borderRadius: "var(--radius)" }}
                        >
                            + Adicionar Comentário
                        </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {(() => {
                            const allComments = [...TESTIMONIALS, ...additionalComments];
                            const visibleComments = showAllComments ? allComments : allComments.slice(0, 3);
                            return (
                                <>
                                    {visibleComments.map((t) => (
                                        <div key={`${t.name}-${t.avatar}`} className="p-8 flex flex-col" style={{ background: "var(--color-background)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)" }}>
                                            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" className="mb-4">
                                                <path d="M0 18V11C0 7.8 1.8 4.8 5.4 2L7.2 4C5.4 5.2 4.4 6.8 4.2 8.8H7.2V18H0ZM13.2 18V11C13.2 7.8 15 4.8 18.6 2L20.4 4C18.6 5.2 17.6 6.8 17.4 8.8H20.4V18H13.2Z" fill="var(--color-accent)" opacity="0.3" />
                                            </svg>
                                            <p className="flex-1 mb-6 leading-relaxed" style={{ color: "var(--color-foreground)", fontSize: "0.95rem", fontStyle: "italic" }}>{t.text}</p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "var(--color-primary)", borderRadius: "50%", color: "var(--color-primary-foreground)", fontSize: "0.75rem", fontWeight: 700 }}>
                                                    {t.avatar}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--color-foreground)" }}>{t.name}</div>
                                                    <div style={{ fontSize: "0.75rem", color: "var(--color-muted-foreground)" }}>{t.role}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {allComments.length > 3 && !showAllComments && (
                                        <div className="col-span-full flex justify-center mt-8">
                                            <button
                                                onClick={() => setShowAllComments(true)}
                                                className="px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-85"
                                                style={{ background: "var(--color-primary)", color: "var(--color-primary-foreground)", borderRadius: "var(--radius)" }}
                                            >
                                                Ver mais ({allComments.length - 3} ocultos)
                                            </button>
                                        </div>
                                    )}
                                    {showAllComments && allComments.length > 3 && (
                                        <div className="col-span-full flex justify-center mt-8">
                                            <button
                                                onClick={() => setShowAllComments(false)}
                                                className="px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-85"
                                                style={{ background: "var(--color-accent)", color: "var(--color-accent-foreground)", borderRadius: "var(--radius)" }}
                                            >
                                                Mostrar menos
                                            </button>
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contato" className="py-24" style={{ background: "var(--color-background)" }}>
                <div className="max-w-3xl mx-auto px-6">
                    <div className="mb-12 text-center">
                        <span className="text-xs uppercase tracking-widest" style={{ color: "var(--color-accent)", fontWeight: 600, letterSpacing: "0.15em" }}>Contato</span>
                        <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, color: "var(--color-foreground)" }}>
                            Vamos começar?
                        </h2>
                        <p className="mt-3" style={{ color: "var(--color-muted-foreground)", fontSize: "1rem" }}>
                            Me conta um pouco sobre você e o que você está buscando. Responderei em até 24h.
                        </p>
                    </div>
                    {sent ? (
                        <div className="text-center py-16" style={{ background: "var(--color-secondary)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)" }}>
                            <div className="text-4xl mb-4">✉️</div>
                            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600, color: "var(--color-foreground)", marginBottom: "8px" }}>
                                Mensagem enviada!
                            </h3>
                            <p style={{ color: "var(--color-muted-foreground)" }}>Obrigada pelo contato. Responderei em breve.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10" style={{ background: "var(--color-card)", borderRadius: "var(--radius)", border: "1px solid var(--color-border)" }}>
                            {[
                                { label: "Seu nome completo", key: "nome", type: "text", placeholder: "Maria Silva" },
                                { label: "E-mail", key: "email", type: "email", placeholder: "maria@email.com" },
                                { label: "Número de telefone", key: "telefone", type: "tel", placeholder: "(11) 91234-5678" },
                            ].map(({ label, key, type, placeholder }) => (
                                <div key={key} className="flex flex-col gap-2">
                                    <label style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-foreground)" }}>{label}</label>
                                    <input
                                        required type={type} placeholder={placeholder}
                                        value={form[key as keyof typeof form]}
                                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                        style={{ padding: "10px 14px", background: "var(--color-background)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", color: "var(--color-foreground)", fontSize: "0.95rem", outline: "none", fontFamily: "var(--font-body)" }}
                                        onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                                        onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                                    />
                                </div>
                            ))}
                            <div className="flex flex-col gap-2">
                                <label style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-foreground)" }}>Mensagem</label>
                                <textarea
                                    required rows={5}
                                    placeholder="Me conta um pouco sobre sua experiência, área de atuação, cursos, e o que está buscando..."
                                    value={form.mensagem}
                                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                                    style={{ padding: "10px 14px", background: "var(--color-background)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", color: "var(--color-foreground)", fontSize: "0.95rem", outline: "none", fontFamily: "var(--font-body)", resize: "vertical" }}
                                    onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                                    onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                                />
                            </div>
                            <button type="submit" className="py-3 text-sm font-semibold transition-opacity hover:opacity-85 mt-2" style={{ background: "var(--color-primary)", color: "var(--color-primary-foreground)", borderRadius: "var(--radius)" }}>
                                Enviar mensagem
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-10 border-t" style={{ borderColor: "var(--color-border)" }}>
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <span style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)", fontWeight: 600 }}>K.Currículos</span>
                    <p style={{ fontSize: "0.8rem", color: "var(--color-muted-foreground)" }}>
                        © {new Date().getFullYear()} · Feito com carinho para ajudar profissionais a brilharem.
                    </p>
                    <div className="flex gap-5">
                        {["Instagram", "WhatsApp", "LinkedIn"].map((l) => (
                            <span key={l} style={{ fontSize: "0.8rem", color: "var(--color-accent)", cursor: "pointer", fontWeight: 500 }}>{l}</span>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}