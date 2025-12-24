"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 部署到 Vercel 后，我们在后台设置这个地址指向 Render 后端
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    fetch(`${apiBaseUrl}/api/posts`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.log("正在等待 Render 后端大脑响应..."));
  }, []);

  return (
    <main className="min-h-screen bg-black text-zinc-100 p-8 flex flex-col items-center selection:bg-amber-500 selection:text-black">
      <div className="max-w-3xl w-full">
        <header className="mb-16 border-l-4 border-amber-500 pl-6">
          <h1 className="text-6xl font-black text-white tracking-tighter">
            SCRIPT <span className="text-amber-500">LION</span>
          </h1>
          <p className="text-zinc-500 font-mono text-sm mt-2 uppercase tracking-[0.3em]">
            Linking Intelligence // Scripting Reality
          </p>
        </header>

        <section className="grid gap-8">
          {posts.length === 0 ? (
            <div className="p-10 border border-zinc-800 rounded-3xl bg-zinc-900/30 backdrop-blur-sm shadow-2xl">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-zinc-800 rounded"></div>
                    <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
              <p className="text-zinc-500 mt-6 font-mono text-xs text-center">STATUS: STANDBY_FOR_BACKEND_SIGNAL</p>
            </div>
          ) : (
            posts.map((post: any) => (
              <article key={post.id} className="group p-8 border border-zinc-800 rounded-3xl bg-zinc-900/20 hover:bg-zinc-900/50 hover:border-amber-500/50 transition-all duration-500 cursor-pointer">
                <h2 className="text-3xl font-bold text-amber-400 mb-4 group-hover:translate-x-2 transition-transform">{post.title}</h2>
                <p className="text-zinc-400 leading-relaxed text-lg">{post.content}</p>
                <div className="mt-6 flex items-center text-xs font-mono text-zinc-600">
                  <span className="mr-4">ENTRY_ID: {post.id}</span>
                  <span className="h-px flex-1 bg-zinc-800"></span>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}