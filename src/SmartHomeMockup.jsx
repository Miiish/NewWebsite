import React from 'react';

export default function SmartHomeMockup() {
  const BRAND = '#22d3ee';
  const BRAND_INK = '#0e7490';

  // ====== Hero 燈光互動邏輯 ======
  const heroRef = React.useRef(null);
  const [light, setLight] = React.useState(1);
  React.useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    const thresholds = Array.from({ length: 51 }, (_, i) => i / 50);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          setLight(Math.max(0, Math.min(1, e.intersectionRatio || 0)));
        });
      },
      { threshold: thresholds }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // ====== 影片控制 ======
  const videoRef = React.useRef(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPaused(false));
    } else {
      v.pause();
      setIsPaused(true);
    }
  };

  // ====== 表單邏輯 (保持原樣但優化 UI) ======
  const [form, setForm] = React.useState({ name: '', contact: '', note: '' });
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('https://formspree.io/f/xzzkrovd', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) { setSent(true); setForm({ name: '', contact: '', note: '' }); }
    } finally { setSending(false); }
  };

  return (
    <>
      {/* 把這段放回 return 的最上方 */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "name": "沐沐智慧家庭 MuMu Smart Home",
          "description": "彰化在地 50 年工程背景，專業第三代轉型智慧家庭服務，專精 Apple HomeKit 燈光設計、智慧窗簾整合。",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Changhua",
            "addressCountry": "TW"
          },
          "telephone": "+886-975-090-703",
          "url": "您的網站網址",
          "services": [
            "智慧燈光設計",
            "HomeKit 系統整合",
            "智慧窗簾控制",
            "玻璃工程"
          ]
        })}
      </script>
      <div className="min-h-screen bg-neutral-950 text-slate-50 antialiased selection:bg-cyan-500/30">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap');
          :root { --brand: ${BRAND}; }
          html { scroll-behavior: smooth; font-family: 'Noto Sans TC', sans-serif; }
          .text-balance { text-wrap: balance; }
        `}</style>
  
        {/* SEO 隱藏標題 */}
        <h1 className="sr-only">沐沐智慧家庭 - 提供專業 智慧燈光設計與智慧家庭服務</h1>
  
        {/* Header */}
        <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-md">
          <nav className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-cyan-400 flex items-center justify-center font-bold text-black text-xs">MM</div>
              <span className="font-bold tracking-tight text-lg">沐沐智慧家庭</span>
            </div>
            <a href="#contact" className="bg-cyan-400 hover:bg-cyan-300 text-black px-5 py-2 rounded-full text-sm font-bold transition-all transform active:scale-95">
              立即諮詢
            </a>
          </nav>
        </header>
  
        <main>
          {/* Section 1: Hero (RWD 優化) */}
          <section 
            ref={heroRef}
            className="relative min-h-[70vh] md:h-[90vh] w-full flex flex-col items-center justify-center overflow-hidden"
          >
            {/* 背景圖層 */}
            <div 
              className="absolute inset-0 bg-[url('/first.png')] bg-cover bg-center transition-transform duration-[2s]"
              style={{ transform: `scale(${1.05 - light * 0.05})` }}
            />
            {/* 動態亮度遮罩 */}
            <div 
              className="absolute inset-0 transition-colors duration-300"
              style={{ backgroundColor: `rgba(0,0,0,${0.3 + (1 - light) * 0.6})` }}
            />
            
            <div className="relative z-10 px-6 text-center mt-20 md:mt-0">
              <h2 className="text-4xl md:text-7xl font-bold mb-4 tracking-tighter" style={{ color: 'var(--brand)' }}>
                智慧燈光控制
              </h2>
              <p className="text-lg md:text-2xl font-light tracking-widest text-white/90">
                讓光線成為空間的靈魂
              </p>
            </div>
          </section>
  
          {/* Slogan Barrier */}
          <section className="py-20 px-6 text-center bg-gradient-to-b from-neutral-950 to-neutral-900">
            <div className="max-w-3xl mx-auto border-y border-white/10 py-12">
              <p className="text-xl md:text-2xl font-medium leading-loose text-balance">
                「穩定，是智慧生活的底線；<br className="md:hidden" />
                氛圍，是我們的追求。」
              </p>
            </div>
          </section>

          {/* Section: Our Services */}
          <section id="services" className="py-24 px-6 bg-neutral-950">
            <div className="max-w-7xl mx-auto">
              {/* 標題區 */}
              <div className="text-center mb-16">
                <span className="text-cyan-400 text-sm tracking-[0.3em] font-medium uppercase">Our Services</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">全方位智慧服務</h2>
                <p className="max-w-2xl mx-auto text-neutral-400 text-lg leading-relaxed">
                  我們提供從規劃到安裝的完整解決方案，不論是新成屋裝潢還是舊屋升級，
                  沐沐智慧家庭都能為您打造最溫馨、穩定的系統。
                </p>
              </div>
          
              {/* 服務卡片網格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "智慧照明系統",
                    desc: "隨心所欲調整色溫與亮度，設定閱讀、觀影或派對模式，讓光線成為家中最美的裝潢。",
                    icon: "💡"
                  },
                  {
                    title: "電動窗簾整合",
                    desc: "早晨讓陽光喚醒你，離家自動關閉。支援語音控制與自動化場景連動，優雅生活從此開始。",
                    icon: "🪟"
                  },
                  {
                    title: "全屋網路覆蓋",
                    desc: "智慧家庭的基礎是穩定的網路。我們提供企業級 Wi-Fi 漫遊規劃，確保角落也能高速上網。",
                    icon: "📶"
                  },
                  {
                    title: "智慧安防監控",
                    desc: "智慧門鎖、攝影機與感測器聯動。異常入侵即時推播，外出也能隨時掌握家中狀況。",
                    icon: "🛡️"
                  },
                  {
                    title: "影音娛樂控制",
                    desc: "整合電視、音響與投影機，一鍵切換「劇院模式」，享受沉浸式視聽體驗，告別繁雜遙控器。",
                    icon: "🎬"
                  },
                  {
                    title: "語音聲控助理",
                    desc: "支援 Apple HomeKit, Google Home。動口不動手，讓房子聽懂你的指令，老人小孩都能輕鬆使用。",
                    icon: "🗣️"
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="group p-8 rounded-3xl bg-neutral-900 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 shadow-xl"
                  >
                    <div className="text-3xl mb-4 bg-neutral-800 w-14 h-14 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
  
          {/* Section 2: Video (智慧窗簾) */}
          <section className="py-24 px-6 bg-neutral-900">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div className="text-left">
                  <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Smart Control</span>
                  <h2 className="text-3xl font-bold mt-2">智慧窗簾系統</h2>
                </div>
                <p className="text-neutral-400 text-sm">點擊影片可切換播放狀態</p>
              </div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 cursor-pointer group" onClick={togglePlay}>
                <video 
                  ref={videoRef}
                  src="/video.mp4"
                  loop muted playsInline autoPlay
                  className="w-full aspect-video object-cover"
                />
                {isPaused && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                     <div className="w-20 h-20 bg-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                       <div className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[20px] border-l-black ml-1" />
                     </div>
                  </div>
                )}
              </div>
            </div>
          </section>
  
          {/* Section 3: About (第三代傳承優化) */}
          <section className="py-24 px-6 relative overflow-hidden">
            {/* 背景裝飾光暈 */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-block px-3 py-1 border border-cyan-500/30 rounded-full mb-8">
                <span className="text-cyan-400 text-xs tracking-[0.3em] uppercase font-medium">Legacy meets Future</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight leading-tight text-balance">
                五十載工藝底蘊，<br className="hidden md:block" />
                由<span className="text-cyan-400">第三代</span>賦予數位靈魂
              </h2>
          
              <div className="grid md:grid-cols-2 gap-12 text-left items-start leading-relaxed">
                {/* 左側：第一、二代的工藝 */}
                <div className="space-y-4 border-l-2 border-white/10 pl-6">
                  <h4 className="text-white font-bold text-lg">職人工藝的起點</h4>
                  <p className="text-neutral-400">
                    誕生於彰化，沐沐源自超過 50 年的玻璃工程家族。老一輩對建築結構的嚴謹要求，是我們血液裡的基因。我們深知：沒有穩定的工程基礎，再華麗的科技都是空談。
                  </p>
                </div>
          
                {/* 右側：第三代的科技 */}
                <div className="space-y-4 border-l-2 border-cyan-500/50 pl-6">
                  <h4 className="text-cyan-400 font-bold text-lg">智慧家庭的轉身</h4>
                  <p className="text-neutral-300">
                    現在，第三代將這份職人精神與智慧科技接軌。我們不只理解玻璃與光，更精通系統整合。將經典工程經驗轉化為專業的 <b>智慧燈光控制</b>。
                  </p>
                </div>
              </div>
              
              <p className="mt-12 text-neutral-500 max-w-2xl mx-auto text-sm tracking-widest">
                我們在傳統工法的基石上，為您打造最懂人心的智慧居家。
              </p>
            </div>
          </section>
  
          {/* Section 4: Contact Form */}
          <section id="contact" className="py-24 px-6 bg-neutral-900">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">預約規劃</h2>
                <p className="text-neutral-400">留下資料，由專業工程師為您提供建議</p>
              </div>
  
              {sent ? (
                <div className="bg-cyan-400/10 border border-cyan-400/50 p-8 rounded-3xl text-center">
                  <h4 className="text-cyan-400 text-xl font-bold mb-2">訊息已送出！</h4>
                  <p className="text-sm text-cyan-100/70 mb-6">我們將在 24 小時內聯繫您。</p>
                  <a href="https://line.me/ti/p/~mish0207" className="inline-block bg-cyan-400 text-black px-8 py-3 rounded-full font-bold">
                    直接透過 LINE 諮詢
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input name="name" required placeholder="姓名" className="w-full p-4 rounded-2xl bg-neutral-800 border border-white/5 focus:border-cyan-400 outline-none transition-colors" />
                  <input name="contact" required placeholder="電話或 LINE ID" className="w-full p-4 rounded-2xl bg-neutral-800 border border-white/5 focus:border-cyan-400 outline-none transition-colors" />
                  <textarea name="note" rows="4" placeholder="您感興趣的服務（如：全屋智慧燈光、電動窗簾...）" className="w-full p-4 rounded-2xl bg-neutral-800 border border-white/5 focus:border-cyan-400 outline-none transition-colors" />
                  <button disabled={sending} className="w-full bg-cyan-400 text-black font-bold py-4 rounded-2xl hover:bg-cyan-300 transition-all disabled:opacity-50">
                    {sending ? '傳送中...' : '送出需求'}
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>
  
        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5 text-center">
          <div className="flex justify-center gap-6 mb-8 text-neutral-400 text-sm">
            <span>LINE ID: mish0207</span>
            <span>電話: 0975-090-703</span>
          </div>
          <p className="text-neutral-600 text-xs">© 2025 沐沐智慧家庭 - 彰化專業智慧家居工程</p>
        </footer>
  
        {/* Floating Line CTA */}
        <a
          href="https://line.me/ti/p/~mish0207"
          className="fixed right-6 bottom-6 z-[100] bg-[#06C755] hover:scale-110 transition-transform flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" 
            alt="Line" 
            className="w-5 h-5" 
            loading="lazy" 
          />
          <span className="text-white font-bold text-sm">LINE 諮詢</span>
        </a>
      </div>
    </>
  );
}
