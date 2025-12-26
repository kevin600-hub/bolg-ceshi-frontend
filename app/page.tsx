// 1. 删掉了 "use client"，这让它变成了一个服务端组件
// 2. 删掉了 useState 和 useEffect 的导入，因为服务器不需要它们

export default async function Home() {
  // --- 后端大脑逻辑搬到了这里 ---
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  // 这里的 fetch 是在服务器上执行的。
  // { cache: 'no-store' } 确保每次访问都去后端拿最新的，而不是看旧缓存。
  let posts = [];
  try {
    const res = await fetch(`${apiBaseUrl}/api/posts`, { cache: 'no-store' });
    if (res.ok) {
      posts = await res.json();
    }
  } catch (err) {
    console.error("连接 Render 后端失败:", err);
  }

  return (
    // 极简改动：背景改为极浅灰（zinc-50），文字主色调改为深灰（zinc-900）
    <main className="min-h-screen bg-[#fafafa] text-zinc-900 p-8 flex flex-col items-center selection:bg-zinc-200">
      <div className="max-w-2xl w-full py-20">
        
        {/* Header 改为中心对齐，极简主义标题 */}
        <header className="mb-24 text-center">
          <h1 className="text-4xl font-light tracking-[0.2em] text-zinc-900 uppercase">
            Script <span className="font-bold">Lion</span>
          </h1>
          <div className="h-px w-12 bg-zinc-300 mx-auto mt-6"></div>
          <p className="text-zinc-400 font-serif italic text-sm mt-6 tracking-wide">
            Linking Intelligence // Scripting Reality
          </p>
        </header>

        <section className="space-y-20">
          {posts.length === 0 ? (
            // 极简风格的加载态：细线条勾勒，无重阴影
            <div className="space-y-8">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-zinc-200 rounded w-1/3"></div>
                <div className="h-4 bg-zinc-100 rounded w-full"></div>
                <div className="h-4 bg-zinc-100 rounded w-5/6"></div>
              </div>
              <p className="text-zinc-300 font-mono text-[10px] uppercase tracking-widest text-center">System Initializing...</p>
            </div>
          ) : (
            posts.map((post: any) => (
              // 文章卡片：去掉沉重的背景和边框，改用无边框设计，只有悬停时有微妙的偏移
              <article key={post.id} className="group cursor-pointer">
                <div className="flex flex-col space-y-4">
                  {/* ID 编号改为上标形式，增加设计感 */}
                  <span className="text-[10px] font-mono text-zinc-400 tracking-tighter italic">
                    NO. {String(post.id).padStart(3, '0')}
                  </span>
                  
                  {/* 标题：加重字重，去掉琥珀色，改为纯黑，增加呼吸感 */}
                  <h2 className="text-2xl font-semibold text-zinc-900 leading-tight group-hover:text-zinc-500 transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  {/* 内容：字间距微调，行高增加，更易阅读 */}
                  <p className="text-zinc-500 leading-relaxed font-light text-base text-justify">
                    {post.content}
                  </p>
                  
                  {/* 底部装饰线：只有悬停时才会拉长 */}
                  <div className="pt-4">
                    <div className="h-[1px] w-8 bg-zinc-200 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        {/* 页脚极简装饰 */}
        <footer className="mt-40 text-center">
          <p className="text-zinc-300 text-[10px] tracking-[0.5em] uppercase">
            End of Line
          </p>
        </footer>
      </div>
    </main>
  );
}
