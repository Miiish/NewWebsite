import React from 'react';

export default function SmartHomeMockup() {
  // ====== Brand System ======
  const BRAND = '#22d3ee';
  const BRAND_INK = '#0e7490';

  // ====== Hero light (依可視比例自動調整) ======
  const heroRef = React.useRef(null);
  const [light, setLight] = React.useState(1);
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
      v.play().catch(() => {});
      setIsPaused(false);
    } else {
      v.pause();
      setIsPaused(true);
    }
  };

  return (
    <div
      className="min-h-screen bg-neutral-950 text-white flex flex-col items-center"
      style={{
        fontFamily:
          "'Noto Sans TC', system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', 'Noto Sans TC', Helvetica, Arial",
      }}
    >
      {/* Font + Brand + Smooth Scroll */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;600;700&display=swap');
        :root{ --brand:${BRAND}; --brand-ink:${BRAND_INK}; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              alt="MuMu"
              className="h-7 w-auto"
            />
            <span className="text-white font-semibold">沐沐智慧家庭</span>
          </a>
          <a
            href="#contact"
            className="rounded-full px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition"
            style={{ background: 'var(--brand)' }}
          >
            與我聯絡
          </a>
        </div>
      </header>
      <div className="h-14 w-full" />

      {/* Hero */}
      <section
        ref={heroRef}
        className="w-full h-[90vh] relative bg-[url('/first.png')] bg-cover bg-center flex flex-col justify-end items-center text-center p-10 select-none"
      >
        {/* 亮度遮罩：light 越大越亮（降低遮罩不透明度） */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-150"
          style={{ background: `rgba(0,0,0,${0.1 + (1 - light) * 0.8})` }}
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-2" style={{ color: 'var(--brand)' }}>
            🌙 沐沐智慧家庭 MuMu Smart Home
          </h1>
          <p className="text-lg opacity-90">上下滑動，亮度依圖片在視窗內的比例自動調整</p>
          <p className="opacity-80">離開 30% → 亮度降 30%；回到 50% 可視 → 亮度為 50%。</p>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-5xl w-full py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6" style={{ color: 'var(--brand)' }}>
          我們的產品
        </h2>
        <p className="text-neutral-400 mb-10">讓家不只是住，更能思考與感受。</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '💡', title: '智慧電燈', desc: '調光、情境模式、遠端控制' },
            { icon: '🪟', title: '智慧窗簾', desc: '預約開關、日出日落自動化' },
            { icon: '🧱', title: '鐵捲門整合', desc: '到家自動開啟、地理圍欄' },
            { icon: '🍎', title: 'Apple HomeKit 連動', desc: 'Hey Siri 聲控全屋' },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-neutral-900 p-6 rounded-2xl shadow-lg hover:bg-neutral-800 transition text-left border border-neutral-800"
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="text-lg font-semibold" style={{ color: 'var(--brand)' }}>
                {item.title}
              </div>
              <div className="text-neutral-400 text-sm mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Curtain (Loop + Click-to-Pause/Play) */}
      <section className="w-full relative bg-neutral-900 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-3" style={{ color: 'var(--brand)' }}>
            窗簾開關
          </h2>
          <p className="opacity-80 mb-2">影片將持續循環播放。點一下影片可暫停/繼續。</p>

          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-800 group">
            <video
              ref={videoRef}
              src="/video.mp4"   // 將你的檔案放在 public/video.mp4（或改為你的檔名）
              loop
              muted
              playsInline
              autoPlay
              onClick={togglePlay}
              className="w-full aspect-video bg-black cursor-pointer"
            />
            {/* 暫停提示徽章 */}
            {isPaused && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-3 py-1 rounded-full text-xs bg-black/50 border border-white/10">
                  已暫停（點影片繼續）
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-4xl w-full py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4" style={{ color: 'var(--brand)' }}>
          我們是沐沐
        </h2>
        <p className="text-neutral-300 leading-relaxed">
          來自彰化，擁有 50+ 年玻璃工程行，<br />
          以專業施工背景，結合智慧家庭技術，打造{' '}
          <span className="font-semibold" style={{ color: 'var(--brand)' }}>
            生活的智慧家
          </span>
          。
        </p>
      </section>

      {/* HomeKit */}
      <section className="w-full bg-neutral-900 py-20 flex flex-col items-center text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4e/HomeKit_logo.svg"
          alt="HomeKit"
          className="h-20 mb-6 opacity-90"
        />
        <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--brand)' }}>
          支援 Apple HomeKit
        </h2>
        <p className="text-neutral-400">「嘿 Siri，打開客廳燈」——如此簡單。</p>
      </section>

      {/* Contact */}
      <section id="contact" className="w-full py-20 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4" style={{ color: 'var(--brand)' }}>
          聯絡我們
        </h2>
        <div className="text-neutral-300 mb-6">
          📱 LINE：<span className="font-mono">mumuhouse</span> ｜ 📞 電話：
          <a href="tel:0975090703" className="underline decoration-dotted">
            0975-090-703
          </a>
        </div>
        <p className="text-neutral-500 mb-8">或留下你的聯絡方式，我們將盡快與你聯繫！</p>
        <form className="max-w-md mx-auto flex flex-col gap-4">
          <input type="text" placeholder="姓名" className="p-3 rounded-xl bg-neutral-800 border border-neutral-700" />
          <input type="text" placeholder="電話或 LINE 帳號" className="p-3 rounded-xl bg-neutral-800 border border-neutral-700" />
          <textarea placeholder="備註" className="p-3 rounded-xl bg-neutral-800 border border-neutral-700" rows="3" />
          <button
            className="mt-4 text-black font-semibold py-3 rounded-xl hover:opacity-90 transition"
            style={{ background: 'var(--brand)' }}
          >
            送出
          </button>
        </form>
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
