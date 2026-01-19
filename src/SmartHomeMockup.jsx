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
      const res = await fetch('https://formspree.io/f/xzddbjjk', {
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
            "智能燈",
            "智慧燈光設計",
            "HomeKit 系統整合",
            "電動窗簾整合",
            "全屋網路覆蓋",
            "企業級 Wi-Fi 規劃",
            "智慧安防監控",
            "智慧門鎖",
            "全屋影音控制",
            "Google Home 語音聲控"
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
              <div className="w-8 h-8 rounded bg-cyan-400 flex items-center justify-center font-bold text-black text-xs">MU</div>
              <span className="font-bold tracking-tight text-lg">沐沐智慧家庭</span>
            </div>
            <a href="#contact" className="bg-cyan-400 hover:bg-cyan-300 text-black px-5 py-2 rounded-full text-sm font-bold transition-all transform active:scale-95">
              立即體驗
            </a>
          </nav>
        </header>
  
        <main>

          {/* 統一背景容器：確保 Section 1 與 2 視覺連貫 */}

          {/* Section 1: Hero 圖片區塊 */}
          <section 
            ref={heroRef}
            className="relative w-full aspect-video min-h-[400px] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* 背景圖片：RWD 縮放並置中 */}
            <div 
              className="absolute inset-0 bg-[url('/hero4.jpg')] bg-contain bg-center bg-no-repeat"
            />
          </section>
        
          {/* Section 2: 服務商定位標籤 (轉場區塊) */}
          <section className="relative z-10 w-full pb-16 pt-4 flex flex-col items-center justify-center">
            <div className="px-6 max-w-5xl">
              {/* 1. 服務商定位標籤 */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-6">
                <span className="px-6 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                  專業規劃
                </span>
                <span className="px-6 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                  精準安裝
                </span>
                <span className="px-6 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                  原廠保固
                </span>
              </div>
            </div>
          </section>
          
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
              <h2 className="text-2xl md:text-5xl mb-4 tracking-tighter" style={{ color: 'var(--brand)' }}>
                智慧燈光控制
              </h2>
              <p className="text-lg md:text-2xl font-light tracking-widest text-white/90">
                讓光線成為空間的靈魂
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
                  <h2 className="text-3xl font-bold mt-2">窗簾系統</h2>
                </div>
                <p className="text-neutral-400 text-sm">點擊影片可切換播放狀態</p>
              </div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 cursor-pointer group" onClick={togglePlay}>
                <video muted playsinline
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

          
          {/* Slogan Barrier */}
          <section className="py-20 px-6 text-center bg-gradient-to-b from-neutral-950 to-neutral-900">
            <div className="max-w-3xl mx-auto border-y border-white/10 py-12">
              <p className="text-xl md:text-2xl font-medium leading-loose text-balance">
                「穩定，是智慧生活的底線；<br className="md:hidden" />
                氛圍，是我們的追求。」
              </p>
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

          {/* Section: Pricing/Package */}
          <section className="py-24 px-6 bg-neutral-900">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-cyan-400 text-sm tracking-[0.3em] font-medium uppercase">Affordable Luxury</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">全屋氛圍規劃方案</h2>
                <p className="text-neutral-400 text-lg">
                  專為小資族設計，用最合理的預算，實現最完整的智慧生活體驗。
                </p>
              </div>
          
              {/* 方案卡片 */}
              <div className="relative group">
                {/* 背景發光效果 */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                
                <div className="relative bg-neutral-950 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                      <div>
                        <span className="inline-block px-4 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm font-bold mb-4 tracking-widest">
                          HOT ITEM
                        </span>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">小資輕奢組合</h3>
                        <p className="text-neutral-400 text-lg">適合 2 房 1 廳 / 3 房 2 廳配置</p>
                      </div>
                      {/*<div className="text-left md:text-right">
                        <span className="text-neutral-500 line-through text-lg block mb-1">原價 $185,000</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-cyan-400 text-2xl font-bold">NT$</span>
                          <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">170,000</span>
                        </div>
                      </div>*/}
                    </div>
          
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-12">
                      {[
                        { label: "燈光設計規劃", icon: "🎨" },
                        { label: "20盞燈具", icon: "💡" },
                        { label: "5組開關切換", icon: "🔘" },
                        { label: "1組電動窗簾", icon: "🪟" },
                        { label: "全屋網路設定", icon: "🛜" },
                        { label: "全屋智慧系統整合", icon: "🔗" },
                        { label: "專屬生活情境設定", icon: "🪄" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-neutral-300">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">
                            ✓
                          </span>
                          <span className="font-medium">{item.label}</span>
                        </div>
                      ))}
                    </div>
          
                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="text-sm text-neutral-500">
                        * 包含施工、設定及原廠一年保固服務
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Contact Form */}
          <section id="contact" className="py-24 px-6 bg-neutral-900">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">預約體驗</h2>
                {/* 新增：地點資訊 */}
                <div className="flex items-center justify-center gap-2 text-cyan-400 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium tracking-wide">體驗地點：台中市潭子區</span>
                </div>
                
                <p className="text-neutral-400">留下資料，由專人與您聯繫安排體驗時間</p>
              </div>
  
              {sent ? (
                <div className="bg-cyan-400/10 border border-cyan-400/50 p-8 rounded-3xl text-center">
                  <h4 className="text-cyan-400 text-xl font-bold mb-2">訊息已送出！</h4>
                  <p className="text-sm text-cyan-100/70 mb-6">我們將在 24 小時內聯繫您。</p>
                  <a href="https://line.me/ti/p/~@990hyion" className="inline-block bg-cyan-400 text-black px-8 py-3 rounded-full font-bold">
                    直接透過 LINE 諮詢
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input name="name" required placeholder="姓名" className="w-full p-4 rounded-2xl bg-neutral-800 border border-white/5 focus:border-cyan-400 outline-none transition-colors" />
                  <input name="contact" required placeholder="電話或 LINE ID" className="w-full p-4 rounded-2xl bg-neutral-800 border border-white/5 focus:border-cyan-400 outline-none transition-colors" />
                  <textarea name="note" rows="4" placeholder="留下有空的時間（如：平日早上、全天有空...）" className="w-full p-4 rounded-2xl bg-neutral-800 border border-white/5 focus:border-cyan-400 outline-none transition-colors" />
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
            <span>LINE ID: @990hyion</span>
            <span>Mail: service@mumusmart.com</span>
          </div>
          <p className="text-neutral-600 text-xs">© 2025 沐沐智慧家庭 - 彰化專業智慧家居工程</p>
        </footer>
  
        {/* Floating Line CTA */}
        <a
          href="https://line.me/ti/p/~@990hyion"
          className="fixed right-6 bottom-6 z-[100] bg-[#06C755] hover:scale-110 transition-transform flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" 
            alt="Line" 
            className="w-5 h-5" 
            loading="lazy" 
          />
          <span className="text-white font-bold text-sm">LINE 立即諮詢</span>
        </a>
      </div>
    </>
  );
}
