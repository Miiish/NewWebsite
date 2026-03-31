import React from 'react';

export default function SmartHomeMockup() {
  // 將品牌色替換為莫蘭迪藍色
  const BRAND = '#6F8F9D';
  const BRAND_LIGHT = '#84A3B1'; // 用於 hover 狀態

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

  // ====== 表單邏輯 ======
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
      if (res.ok) { 
        setSent(true); 
        setForm({ name: '', contact: '', note: '' }); 
      }
    } finally { 
      setSending(false); 
    }
  };

  const schemaData = {
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
    "url": "https://home.mumusmart.com",
    "services": [
      "智能燈", "智慧燈光設計", "HomeKit 系統整合", "電動窗簾整合", 
      "全屋網路覆蓋", "企業級 Wi-Fi 規劃", "智慧安防監控", 
      "智慧門鎖", "全屋影音控制", "Google Home 語音聲控"
    ]
  };

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-neutral-950 text-slate-50 antialiased selection:bg-[#6F8F9D]/30 font-sans">
        
        {/* Header */}
        <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-lg">
          <nav className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#6F8F9D] flex items-center justify-center font-bold text-white text-xs">MU</div>
              <span className="font-bold tracking-tight text-lg">沐沐智慧家庭</span>
            </div>
            <a href="#contact" className="bg-[#6F8F9D] hover:bg-[#84A3B1] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all transform active:scale-95 shadow-lg">
              立即體驗
            </a>
          </nav>
        </header>

        <main>
          {/* Section 1: Hero */}
          <section 
            ref={heroRef}
            className="relative min-h-[85vh] md:min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-16"
          >
            <img 
              src="/first.webp" 
              alt="沐沐智慧家庭 - 專業智慧燈光與窗簾控制整合"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s]"
              style={{ transform: `scale(${1.05 - light * 0.05})` }}
              fetchpriority="high"
            />
            
            <div 
              className="absolute inset-0 transition-colors duration-300"
              style={{ backgroundColor: `rgba(0,0,0,${0.4 + (1 - light) * 0.5})` }}
            />
            
            <div className="relative z-10 px-6 w-full max-w-5xl flex flex-col items-center mt-10">
              <p className="text-xl md:text-3xl font-light tracking-widest text-white/90 text-center mb-12 text-balance">
                讓光線成為空間的靈魂
              </p>

              <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full">
                {['專業規劃', '精準安裝', '原廠保固'].map((tag) => (
                  <span key={tag} className="px-5 py-2 rounded-full bg-[#6F8F9D] border border-[#6F8F9D]/30 text-[#6F8F9D] text-xs md:text-sm font-bold tracking-[0.2em] uppercase backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Our Services */}
          <section id="services" className="py-16 md:py-24 px-6 bg-neutral-950">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <span className="text-[#6F8F9D] text-xs md:text-sm tracking-[0.3em] font-medium uppercase">Our Services</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">全方位智慧服務</h2>
                <p className="max-w-2xl mx-auto text-neutral-400 text-base md:text-lg leading-relaxed text-balance">
                  我們提供從規劃到安裝的完整解決方案，不論是新成屋裝潢還是舊屋升級，
                  沐沐智慧家庭都能為您打造最溫馨、穩定的系統。
                </p>
              </div>
          
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { title: "智慧照明系統", desc: "隨心所欲調整色溫與亮度，設定閱讀、觀影或派對模式，讓光線成為家中最美的裝潢。", icon: "💡" },
                  { title: "電動窗簾整合", desc: "早晨讓陽光喚醒你，離家自動關閉。支援語音控制與自動化場景連動，優雅生活從此開始。", icon: "🪟" },
                  { title: "全屋網路覆蓋", desc: "智慧家庭的基礎是穩定的網路。我們提供企業級 Wi-Fi 漫遊規劃，確保角落也能高速上網。", icon: "📶" },
                  { title: "智慧安防監控", desc: "智慧門鎖、攝影機與感測器聯動。異常入侵即時推播，外出也能隨時掌握家中狀況。", icon: "🛡️" },
                  { title: "影音娛樂控制", desc: "整合電視、音響與投影機，一鍵切換「劇院模式」，享受沉浸式視聽體驗，告別繁雜遙控器。", icon: "🎬" },
                  { title: "語音聲控助理", desc: "支援 Apple HomeKit, Google Home。動口不動手，讓房子聽懂你的指令，老人小孩都能輕鬆使用。", icon: "🗣️" }
                ].map((item, idx) => (
                  <div key={idx} className="group p-6 md:p-8 rounded-3xl bg-neutral-900 border border-white/5 hover:border-[#6F8F9D]/30 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                    <div className="text-3xl mb-4 bg-neutral-800 w-14 h-14 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#6F8F9D] transition-colors">
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

          {/* Section 3: Video */}
          <section className="py-16 md:py-24 px-6 bg-neutral-900">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
                <div className="text-left">
                  <span className="text-[#6F8F9D] font-mono text-xs md:text-sm tracking-widest uppercase">Smart Control</span>
                  <h2 className="text-3xl font-bold mt-2">窗簾系統</h2>
                </div>
                <p className="text-neutral-400 text-sm">點擊影片可切換播放狀態</p>
              </div>
              
              <div 
                className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 cursor-pointer group bg-black" 
                onClick={togglePlay}
                role="button"
                aria-label="播放或暫停智慧窗簾展示影片"
              >
                <video 
                  ref={videoRef}
                  src="/video.mp4"
                  muted 
                  playsInline 
                  autoPlay 
                  loop
                  className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                {isPaused && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-[#6F8F9D] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(111,143,157,0.4)]">
                       <div className="w-0 h-0 border-y-[10px] md:border-y-[12px] border-y-transparent border-l-[16px] md:border-l-[20px] border-l-white ml-1 md:ml-2" />
                     </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Slogan Barrier */}
          <section className="py-16 md:py-20 px-6 text-center bg-gradient-to-b from-neutral-950 to-neutral-900">
            <div className="max-w-3xl mx-auto border-y border-white/10 py-10 md:py-12">
              <p className="text-lg md:text-2xl font-medium leading-loose text-balance">
                「穩定，是智慧生活的底線；<br className="md:hidden" />
                氛圍，是我們的追求。」
              </p>
            </div>
          </section>

          {/* Section 4: About */}
          <section className="py-16 md:py-24 px-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-96 bg-[#6F8F9D]/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-block px-4 py-1.5 border border-[#6F8F9D]/30 rounded-full mb-8">
                <span className="text-[#6F8F9D] text-xs tracking-[0.2em] uppercase font-medium">Legacy meets Future</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-10 md:mb-16 tracking-tight leading-tight text-balance">
                五十載工藝底蘊，<br className="hidden md:block" />
                由<span className="text-[#6F8F9D]">第三代</span>賦予數位靈魂
              </h2>
          
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-left items-start leading-relaxed">
                <div className="space-y-3 border-l-2 border-white/10 pl-5 md:pl-6">
                  <h3 className="text-white font-bold text-lg md:text-xl">職人工藝的起點</h3>
                  <p className="text-neutral-400 text-sm md:text-base">
                    誕生於彰化，沐沐源自超過 50 年的玻璃工程家族。老一輩對建築結構的嚴謹要求，是我們血液裡的基因。我們深知：沒有穩定的工程基礎，再華麗的科技都是空談。
                  </p>
                </div>
                <div className="space-y-3 border-l-2 border-[#6F8F9D]/50 pl-5 md:pl-6">
                  <h3 className="text-[#6F8F9D] font-bold text-lg md:text-xl">智慧家庭的轉身</h3>
                  <p className="text-neutral-300 text-sm md:text-base">
                    現在，第三代將這份職人精神與智慧科技接軌。我們不只理解玻璃與光，更精通系統整合。將經典工程經驗轉化為專業的 <b>智慧燈光控制</b>。
                  </p>
                </div>
              </div>
              
              <p className="mt-12 text-neutral-500 max-w-2xl mx-auto text-xs md:text-sm tracking-widest text-balance">
                我們在傳統工法的基石上，為您打造最懂人心的智慧居家。
              </p>
            </div>
          </section>

          {/* Section 5: Pricing */}
          <section className="py-16 md:py-24 px-4 md:px-6 bg-neutral-900">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <span className="text-[#6F8F9D] text-xs md:text-sm tracking-[0.3em] font-medium uppercase">Affordable Luxury</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4">全屋氛圍規劃方案</h2>
                <p className="text-neutral-400 text-base md:text-lg text-balance">
                  專為小資族設計，用最合理的預算，實現最完整的智慧生活體驗。
                </p>
              </div>
          
              <div className="relative group">
                {/* 方案卡片的莫蘭迪光暈 */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#6F8F9D] to-[#4F6F7C] rounded-[2rem] blur opacity-20 md:opacity-25 group-hover:opacity-40 transition duration-1000 hidden md:block"></div>
                
                <div className="relative bg-neutral-950 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl">
                  <div className="p-6 md:p-12">
                    <div className="flex flex-col mb-8 md:mb-12">
                      <span className="self-start px-4 py-1.5 rounded-full bg-[#6F8F9D]/10 border border-[#6F8F9D]/30 text-[#6F8F9D] text-xs font-bold mb-4 tracking-widest">
                        HOT ITEM
                      </span>
                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">小資輕奢組合</h3>
                      <p className="text-neutral-400 text-base md:text-lg">適合 2 房 1 廳 / 3 房 2 廳配置</p>
                    </div>
          
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-8 mb-8 md:mb-12">
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
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6F8F9D]/10 border border-[#6F8F9D]/30 flex items-center justify-center text-[#6F8F9D] text-sm">
                            ✓
                          </span>
                          <span className="font-medium text-sm md:text-base">{item.label}</span>
                        </div>
                      ))}
                    </div>
          
                    <div className="border-t border-white/5 pt-6 text-center md:text-left">
                      <p className="text-xs md:text-sm text-neutral-500">
                        * 包含施工、設定及原廠一年保固服務
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Contact Form */}
          <section id="contact" className="py-16 md:py-24 px-6 bg-neutral-950">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-10 md:mb-12">
                <h2 className="text-3xl font-bold mb-4">預約體驗</h2>
                <div className="flex items-center justify-center gap-2 text-[#6F8F9D] mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium tracking-wide text-sm md:text-base">體驗地點：台中市潭子區</span>
                </div>
                <p className="text-neutral-400 text-sm md:text-base">留下資料，由專人與您聯繫安排體驗時間</p>
              </div>
    
              {sent ? (
                <div className="bg-[#6F8F9D]/10 border border-[#6F8F9D]/50 p-6 md:p-8 rounded-[2rem] text-center shadow-lg">
                  <h4 className="text-[#6F8F9D] text-xl font-bold mb-2">訊息已送出！</h4>
                  <p className="text-sm text-[#D4E0E5]/70 mb-8">我們將在 24 小時內聯繫您。</p>
                  <a href="https://line.me/ti/p/~@990hyion" className="inline-block w-full md:w-auto bg-[#6F8F9D] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#84A3B1] transition-colors">
                    直接透過 LINE 諮詢
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    name="name" 
                    required 
                    autoComplete="name"
                    placeholder="姓名" 
                    className="w-full p-4 rounded-2xl bg-neutral-800 border border-white/5 focus:border-[#6F8F9D] outline-none transition-colors text-base" 
                  />
                  <input 
                    name="contact" 
                    type="tel"
                    inputMode="tel"
                    required 
                    autoComplete="tel"
                    placeholder="電話或 LINE ID" 
                    className="w-full p-4 rounded-2xl bg-neutral-800 border border-white/5 focus:border-[#6F8F9D] outline-none transition-colors text-base" 
                  />
                  <textarea 
                    name="note" 
                    rows="4" 
                    placeholder="留下有空的時間（如：平日早上、全天有空...）" 
                    className="w-full p-4 rounded-2xl bg-neutral-800 border border-white/5 focus:border-[#6F8F9D] outline-none transition-colors text-base resize-none" 
                  />
                  <button 
                    disabled={sending} 
                    className="w-full bg-[#6F8F9D] text-white font-bold py-4 rounded-2xl hover:bg-[#84A3B1] transition-all disabled:opacity-50 text-lg shadow-lg"
                  >
                    {sending ? '傳送中...' : '送出需求'}
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-10 px-6 border-t border-white/5 text-center bg-black">
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-6 text-neutral-400 text-sm">
            <span>LINE ID: @990hyion</span>
            <span>Mail: service@mumusmart.com</span>
          </div>
          <p className="text-neutral-600 text-xs">© 2026 沐沐智慧家庭</p>
        </footer>

        {/* Floating Line CTA */}
        <a
          href="https://line.me/ti/p/~@990hyion"
          className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-[100] bg-[#06C755] hover:scale-105 transition-transform flex items-center gap-2 px-4 py-3 md:px-5 md:py-3 rounded-full shadow-2xl"
          aria-label="透過 LINE 聯絡我們"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" 
            alt="LINE 官方帳號" 
            className="w-5 h-5 md:w-6 md:h-6" 
            loading="lazy" 
          />
          <span className="text-white font-bold text-sm md:text-base hidden sm:inline-block">LINE 立即諮詢</span>
        </a>
      </div>
    </>
  );
}
