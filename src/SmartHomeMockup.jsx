import React from 'react';

export default function SmartHomeMockup() {
  // ====== Brand System ======
  const BRAND = '#22d3ee';
  const BRAND_INK = '#0e7490';

  // ====== Hero light (依可視比例自動調整) ======
  const heroRef = React.useRef(null);
  const [light, setLight] = React.useState(1); // 0 (暗) ~ 1 (亮)
  React.useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const ratio = Math.max(0, Math.min(1, e.intersectionRatio || 0));
          setLight(ratio);
        });
      },
      { threshold: thresholds }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // ====== Curtain: simple looping video with click-to-pause/play ======
  const videoRef = React.useRef(null);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => {
      v.loop = true;
      v.muted = true;
      v.play().catch(() => {});
    };
    v.addEventListener('loadedmetadata', onMeta);
    return () => v.removeEventListener('loadedmetadata', onMeta);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.muted = true; // 確保不被瀏覽器阻擋
      v.play().then(() => setIsPaused(false)).catch(() => {});
    } else {
      v.pause();
      setIsPaused(true);
    }
  };

  // ====== Contact Form (Formspree) ======
  const [form, setForm] = React.useState({ name: '', contact: '', note: '' });
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    setErr('');
    try {
      const ENDPOINT = 'https://formspree.io/f/xzzkrovd'; // ✅ 已替換為你的表單
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('contact', form.contact);
      fd.append('note', form.note);

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok || data.ok) {
        setSent(true);
        setForm({ name: '', contact: '', note: '' });
      } else {
        setErr('送出失敗，稍後再試試看看。');
      }
    } catch (e2) {
      setErr('網路連線異常，請稍後再試。');
    } finally {
      setSending(false);
    }
  };


  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center selection:bg-cyan-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;600;700&display=swap');
        :root{ --brand:${BRAND}; --brand-ink:${BRAND_INK}; }
        html { scroll-behavior: smooth; }
        
        /* 讓進入視線的動畫更平滑 */
        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s ease-out; }
        .reveal.active { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* Sticky Header - 增加更細緻的毛玻璃 */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-lg">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
               <span className="text-black font-bold text-xs">M</span>
            </div>
            <span className="text-white font-bold tracking-wider text-lg">沐沐智慧家庭</span>
          </a>
          <a
            href="#contact"
            className="rounded-full px-5 py-2 text-sm font-bold text-black hover:scale-105 active:scale-95 transition"
            style={{ background: 'var(--brand)' }}
          >
            免費諮詢
          </a>
        </div>
      </header>

      {/* Hero - 增加文字陰影提高可讀性 */}
      <section
        ref={heroRef}
        className="w-full h-screen relative bg-[url('/first.png')] bg-cover bg-center flex flex-col justify-center items-center text-center p-10"
      >
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ background: `rgba(0,0,0,${0.2 + (1 - light) * 0.7})` }}
        />
        <div className="relative z-10 space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter" style={{ color: 'var(--brand)', textShadow: '0 0 20px rgba(34,211,238,0.5)' }}>
            燈光設計
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light">讓光線跟隨你的情緒，點亮生活的每一刻</p>
        </div>
        <div className="absolute bottom-10 animate-bounce text-white/30">↓</div>
      </section>

      {/* Feature Section - 增加漸層背景 */}
      <section className="w-full relative bg-neutral-900 py-24 overflow-hidden">
        {/* 裝飾性背景光 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-8 italic" style={{ color: 'var(--brand)' }}>智能窗簾</h2>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer" onClick={togglePlay}>
            <video
              ref={videoRef}
              src="/video.mp4"
              loop muted playsInline autoPlay
              className="w-full aspect-video object-cover"
            />
            {/* 播放按鈕提示 */}
            {isPaused && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                   <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[18px] border-l-white ml-1" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Floating CTA */}
      <a
        href="https://line.me/R/ti/p/@mumuhouse"
        aria-label="加入 LINE 與我們聯絡"
        className="fixed md:hidden right-4 bottom-6 inline-flex items-center gap-2 px-4 py-3 rounded-full shadow-lg"
        style={{ background: 'var(--brand)', color: '#0b1220' }}
      >
        <span className="text-xl">💬</span>
        <span className="text-sm font-semibold">LINE 立即諮詢</span>
      </a>

      <footer className="py-12 text-neutral-500 text-sm">
        © 2025 沐沐智慧家庭 MuMu Smart Home
      </footer>
    </div>
  );
}
