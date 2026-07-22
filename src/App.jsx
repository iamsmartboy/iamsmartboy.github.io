import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowUpRight, Mail, MapPin, Search, Sparkles } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categories, posts } from './content/posts'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: '01', type: '独立游戏 · 进行中', year: '2026', title: 'After Rain',
    copy: '一款关于记忆与城市漫游的叙事解谜游戏。从关卡原型、美术管线到交互叙事的完整开发记录。',
    tags: ['Unity', 'C#', 'Narrative'], className: 'project-rain', label: 'A quiet story after the rain'
  },
  {
    id: '02', type: 'AI 应用 · 实验', year: '2026', title: 'Local Mind',
    copy: '面向个人知识库的本地 AI 助手实验，关注可检索记忆、隐私保护和真正自然的人机交互。',
    tags: ['LLM', 'RAG', 'Python'], className: 'project-ai', label: 'Intelligence, kept close'
  },
  {
    id: '03', type: '数据研究 · 论文', year: '2025', title: 'Trace / 17',
    copy: '从复杂行为数据中寻找结构，用可复现的研究流程把统计结果转译为直观、可信的视觉叙事。',
    tags: ['Python', 'Analysis', 'Visualisation'], className: 'project-data', label: 'Signals inside the noise'
  }
]

const strengths = [
  ['01', '快速原型', '把模糊的想法压缩成可验证的最小原型，用真实反馈推动下一步，而不是停留在概念里。'],
  ['02', '跨域连接', '在游戏设计、AI 工程和数据研究之间建立连接，让技术服务于体验与表达。'],
  ['03', '研究思维', '重视问题定义、实验过程与结果复现，也愿意持续记录失败与不确定性。'],
  ['04', '长期主义', '用稳定、克制的节奏积累小作品。相信真正有价值的能力来自持续完成。']
]

function HomePage() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nav = root.current?.querySelector('.nav')
    const hero = root.current?.querySelector('.hero')
    const syncFloatingNav = () => nav?.classList.toggle('nav--floating', window.scrollY > (hero?.offsetHeight || window.innerHeight) - 110)
    window.addEventListener('scroll', syncFloatingNav, { passive: true })
    syncFloatingNav()
    if (reduced) return () => window.removeEventListener('scroll', syncFloatingNav)

    const ctx = gsap.context(() => {
      document.body.classList.add('is-animating')
      const opening = gsap.timeline({
        defaults: { ease: 'power4.inOut' },
        onComplete: () => document.body.classList.remove('is-animating')
      })
      opening
        .to('.opening-count', { textContent: 100, duration: 1.55, snap: { textContent: 1 }, ease: 'power2.inOut' })
        .to('.opening-line', { scaleX: 1, duration: 1.25 }, 0)
        .to('.opening-panel--top', { yPercent: -101, duration: 1.25 }, 1.62)
        .to('.opening-panel--bottom', { yPercent: 101, duration: 1.25 }, 1.62)
        .set('.opening', { display: 'none' })
        .from('.nav', { y: -35, opacity: 0, duration: .9 }, 2.05)
        .from('.hero-title-line > span', { yPercent: 110, rotate: 2, scaleX: .72, transformOrigin: 'left center', duration: 1.35, stagger: .11 }, 1.95)
        .from('.hero .eyebrow, .hero-foot, .hero-index', { opacity: 0, y: 26, duration: 1, stagger: .1 }, 2.55)

      gsap.utils.toArray('.section').forEach((section) => {
        const headline = section.querySelector('.section-motion-title')
        if (headline) gsap.from(headline, {
          xPercent: -24, scaleX: .7, opacity: 0, transformOrigin: 'left center',
          duration: 1.55, ease: 'power4.out',
          scrollTrigger: { trigger: headline, start: 'top 87%', once: true }
        })
      })

      gsap.from('.about-grid > *', { y: 110, opacity: 0, duration: 1.4, stagger: .18, ease: 'power4.out', scrollTrigger: { trigger: '.about-grid', start: 'top 78%', once: true } })
      gsap.utils.toArray('.project-card').forEach((card) => {
        const visual = card.querySelector('.project-visual')
        const content = card.querySelectorAll('.project-meta, .project-body')
        gsap.set(visual, { clipPath: 'inset(0 0 100% 0)' })
        gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 82%', once: true } })
          .to(visual, { clipPath: 'inset(0 0 0% 0)', duration: 1.55, ease: 'power4.inOut' })
          .from(content, { y: 55, opacity: 0, duration: 1, stagger: .12, ease: 'power3.out' }, '-=.65')
        const parallaxLayers = card.querySelectorAll('.orb, .visual-label, .visual-code')
        gsap.fromTo(parallaxLayers, { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
      })
      gsap.from('.strength-grid article', { y: 120, opacity: 0, duration: 1.25, stagger: .13, ease: 'power4.out', scrollTrigger: { trigger: '.strength-grid', start: 'top 82%', once: true } })
      gsap.from('.contact h2', { yPercent: 70, scaleX: .68, opacity: 0, transformOrigin: 'left center', duration: 1.6, ease: 'power4.out', scrollTrigger: { trigger: '.contact', start: 'top 68%', once: true } })
      gsap.from('.contact-bottom > *, .footer-bar > *', { y: 45, opacity: 0, stagger: .12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.contact-bottom', start: 'top 88%', once: true } })
    }, root)

    return () => {
      window.removeEventListener('scroll', syncFloatingNav)
      nav?.classList.remove('nav--floating')
      document.body.classList.remove('is-animating')
      ctx.revert()
    }
  }, [])

  return <main ref={root}>
    <div className="opening" aria-hidden="true">
      <div className="opening-panel opening-panel--top" />
      <div className="opening-panel opening-panel--bottom" />
      <div className="opening-core">
        <div className="opening-progress"><i className="opening-line"/><b className="opening-count">0</b><small>%</small></div>
      </div>
    </div>
    <section className="hero" id="home">
      <video className="hero-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2400&q=85">
        <source src="https://cdn.coverr.co/videos/coverr-a-programmer-working-on-his-laptop-1575/1080p.mp4" type="video/mp4" />
      </video>
      <div className="video-filter" />
      <nav className="nav shell">
        <a href="#home" className="brand" aria-label="返回首页">敏感小耗子</a>
        <div className="nav-links">
          <a href="#about">关于</a><a href="#work">项目</a><a href="#strengths">能力</a><a href="?page=archive">档案</a>
        </div>
        <a className="contact-pill" href="mailto:suyiming@hainanu.edu.cn">联系我 <ArrowUpRight size={16}/></a>
      </nav>
      <div className="hero-content shell">
        <p className="eyebrow"><span /> 研究 / 创作 / 持续构建</p>
        <h1><span className="hero-title-line"><span>BUILDING SMALL</span></span><span className="hero-title-line"><span>THINGS THAT <em>MATTER.</em></span></span></h1>
        <div className="hero-foot">
          <p>一名在读研究生，正在探索独立游戏、<br/>AI 技术落地与数据研究的交叉地带。</p>
          <a href="#about" className="scroll-link"><ArrowDown size={18}/> 向下探索</a>
        </div>
      </div>
      <span className="hero-index">PORTFOLIO / 2026</span>
    </section>

    <section className="about section shell" id="about">
      <header className="section-head"><span>01 / ABOUT</span><p>关于我</p></header>
      <div className="about-grid">
        <div className="portrait" role="img" aria-label="个人头像占位图"><div className="portrait-noise"/><span>YOUR<br/>PORTRAIT</span><small>替换为你的照片</small></div>
        <div className="about-copy">
          <p className="lead section-motion-title">你好，我是敏感小耗子<sup>*</sup>。<br/>一个在<span>研究</span>与<span>创造</span>之间，寻找自己坐标的人。</p>
          <div className="bio-row">
            <p>目前就读于一所 211 高校。我喜欢把问题拆开、做成原型，再诚实地记录它如何一步步生长。这里既是作品集，也是我的公开实验室。</p>
            <p>我正在学习独立游戏开发、探索 AI 的真实应用，并用数据理解复杂世界。期待认识同样好奇、愿意动手的人。</p>
          </div>
          <div className="mini-info">
            <span><MapPin size={15}/> 中国 · UTC+8</span><a href="mailto:suyiming@hainanu.edu.cn"><Mail size={15}/> suyiming@hainanu.edu.cn</a>
          </div>
          <div className="stats">
            <div><b>03</b><span>探索方向</span></div><div><b>12+</b><span>实验记录</span></div><div><b>∞</b><span>保持好奇</span></div>
          </div>
        </div>
      </div>
    </section>

    <section className="projects section shell" id="work">
      <header className="section-head"><span>02 / SELECTED WORK</span><p>精选项目</p></header>
      <div className="project-intro"><h2 className="section-motion-title">正在发生的<br/><i>探索与实验</i></h2><p>项目尚在生长。比结果更重要的，是我如何定义问题、做出选择，并把它真正完成。</p></div>
      <div className="project-list">
        {projects.map((p) => <article className="project-card" key={p.id}>
          <div className={`project-visual ${p.className}`}>
            <span className="visual-label">{p.label}</span><span className="visual-code">EXP_{p.id} / LAB</span><div className="orb" />
          </div>
          <div className="project-meta"><span>{p.id}</span><span>{p.type}</span><span>{p.year}</span></div>
          <div className="project-body"><h3>{p.title}</h3><p>{p.copy}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><button aria-label={`查看 ${p.title}`}><ArrowUpRight/></button></div>
        </article>)}
      </div>
    </section>

    <section className="strengths section shell" id="strengths">
      <header className="section-head"><span>03 / CAPABILITIES</span><p>个人优势</p></header>
      <div className="strength-title"><h2 className="section-motion-title">LEARN.<br/>MAKE.<br/><span>REFLECT.</span></h2><p>我的优势不是“全都会”，而是面对未知时，知道如何学习、实验，并形成自己的判断。</p></div>
      <div className="strength-grid">{strengths.map(([n,t,d])=><article key={n}><span>{n}</span><Sparkles size={22}/><h3>{t}</h3><p>{d}</p></article>)}</div>
    </section>

    <footer className="contact" id="contact">
      <div className="contact-inner shell">
        <p className="eyebrow"><span /> HAVE AN IDEA?</p>
        <h2>LET'S MAKE<br/><i>SOMETHING REAL.</i></h2>
        <div className="contact-bottom">
          <p>如果你有一个有趣的想法、合作机会，<br/>或者只是想聊聊，欢迎写信给我。</p>
          <a href="mailto:suyiming@hainanu.edu.cn" className="big-mail">suyiming@hainanu.edu.cn <ArrowUpRight/></a>
        </div>
      </div>
      <div className="footer-bar shell"><span>© 2026 敏感小耗子</span><span>BUILT WITH CURIOSITY</span><a href="https://github.com/" target="_blank" rel="noreferrer">↗ GITHUB</a></div>
    </footer>
  </main>
}

const archivePosts = [
  { date: '2026.07.22', category: '独立游戏', title: '从一个空场景开始：我的第一个游戏原型', excerpt: '记录一次从概念、机制验证到可玩原型的完整过程。', status: '即将发布' },
  { date: '2026.07.14', category: 'AI 实验', title: '让 AI 真正进入个人工作流', excerpt: '关于本地模型、知识检索和小型自动化工具的实践笔记。', status: '即将发布' },
  { date: '2026.06.28', category: '数据研究', title: '如何建立可复现的数据分析流程', excerpt: '从原始数据、探索分析到结果表达的一套个人方法。', status: '即将发布' },
  { date: '2026.06.02', category: '学习札记', title: '保持输出：把学习过程变成公开档案', excerpt: '为什么我决定持续记录尚未成熟的思考与实验。', status: '即将发布' },
]

function ArchivePage() {
  const archiveRoot = useRef(null)
  const [activeCategory, setActiveCategory] = useState('全部')
  const [query, setQuery] = useState('')
  const filteredPosts = useMemo(() => posts.filter((post) => {
    const matchesCategory = activeCategory === '全部' || post.category === activeCategory
    const keyword = query.trim().toLowerCase()
    const matchesQuery = !keyword || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(keyword)
    return matchesCategory && matchesQuery
  }), [activeCategory, query])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.archive-nav', { y: -35, opacity: 0, duration: .9 })
        .from('.archive-kicker', { y: 25, opacity: 0, duration: .8 }, '-=.45')
        .from('.archive-title-line span', { yPercent: 110, scaleX: .72, transformOrigin: 'left center', duration: 1.25, stagger: .1 }, '-=.5')
        .from('.archive-summary', { y: 35, opacity: 0, duration: .9 }, '-=.65')
      gsap.from('.archive-post', { y: 90, opacity: 0, duration: 1.15, stagger: .13, ease: 'power4.out', scrollTrigger: { trigger: '.archive-list', start: 'top 84%', once: true } })
    }, archiveRoot)
    return () => ctx.revert()
  }, [])

  return <main className="archive-page" ref={archiveRoot}>
    <nav className="archive-nav shell">
      <a href="./" className="brand" aria-label="返回首页">敏感小耗子</a>
      <span>ARCHIVE / 2026</span>
      <a href="./" className="archive-back">返回首页 <ArrowUpRight size={15}/></a>
    </nav>
    <header className="archive-hero shell">
      <p className="archive-kicker"><i/> NOTES, PROCESS & FINDINGS</p>
      <h1><span className="archive-title-line"><span>THINKING IN</span></span><span className="archive-title-line"><span>PUBLIC<span className="archive-dot">.</span></span></span></h1>
      <div className="archive-summary"><span>档案 / ARCHIVE</span><p>这里存放尚在生长的想法：独立游戏开发、AI 技术实践、数据研究，以及学习路上的阶段性记录。</p></div>
    </header>
    <section className="archive-content shell">
      <div className="archive-tools">
        <div className="archive-filter">{categories.map(category => <button className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)} key={category}>{category}</button>)}</div>
        <label className="archive-search"><Search size={16}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索标题、内容或分类" aria-label="搜索博客"/></label>
        <b>{String(filteredPosts.length).padStart(2, '0')} ENTRIES</b>
      </div>
      <div className="archive-list">
        {filteredPosts.map((post, index) => <a href={`?page=post&slug=${post.slug}`} className="archive-post" key={post.title}>
          <span className="archive-number">{String(index + 1).padStart(2, '0')}</span>
          <div className="archive-thumb"><img src={post.cover} alt="" loading="lazy"/></div>
          <div className="archive-post-meta"><time>{post.date.replaceAll('-', '.')}</time><span>{post.category}</span></div>
          <div className="archive-post-copy"><h2>{post.title}</h2><p>{post.excerpt}</p></div>
          <div className="archive-status">{post.readTime}</div>
          <ArrowUpRight className="archive-arrow"/>
        </a>)}
        {!filteredPosts.length && <div className="archive-empty">没有找到匹配的文章，试试其他关键词。</div>}
      </div>
    </section>
    <footer className="archive-footer shell"><span>© 2026 敏感小耗子</span><a href="mailto:suyiming@hainanu.edu.cn">SUYIMING@HAINANU.EDU.CN</a></footer>
  </main>
}

function PostPage({ slug }) {
  const post = posts.find(item => item.slug === slug)
  const postRoot = useRef(null)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    if (!post || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.post-nav', { y: -30, opacity: 0, duration: .8 })
        .from('.post-header-meta', { y: 25, opacity: 0, duration: .8 }, '-=.35')
        .from('.post-title', { y: 100, opacity: 0, scaleX: .78, transformOrigin: 'left center', duration: 1.25 }, '-=.45')
        .from('.post-cover', { clipPath: 'inset(0 0 100% 0)', duration: 1.35, ease: 'power4.inOut' }, '-=.55')
    }, postRoot)
    return () => ctx.revert()
  }, [post])

  if (!post) return <main className="post-page post-not-found"><h1>文章未找到</h1><a href="?page=archive">返回档案</a></main>

  return <main className="post-page" ref={postRoot}>
    <nav className="post-nav shell">
      <a href="./" className="brand">敏感小耗子</a>
      <span>{post.category} / {post.date.slice(0, 4)}</span>
      <a href="?page=archive" className="archive-back"><ArrowLeft size={15}/> 返回档案</a>
    </nav>
    <article>
      <header className="post-header shell">
        <div className="post-header-meta"><span>{post.category}</span><time>{post.date.replaceAll('-', '.')}</time><span>{post.readTime}</span></div>
        <h1 className="post-title">{post.title}</h1>
        <p>{post.excerpt}</p>
      </header>
      <figure className="post-cover"><img src={post.cover} alt={`${post.title}封面`}/></figure>
      <div className="post-layout shell">
        <aside><span>INDEX</span><p>{post.category}</p><p>{post.readTime}</p></aside>
        <div className="markdown-body"><ReactMarkdown>{post.body}</ReactMarkdown></div>
      </div>
    </article>
    <div className="post-next shell"><span>KEEP EXPLORING</span><a href="?page=archive">查看所有档案 <ArrowUpRight/></a></div>
    <footer className="archive-footer shell"><span>© 2026 敏感小耗子</span><a href="mailto:suyiming@hainanu.edu.cn">SUYIMING@HAINANU.EDU.CN</a></footer>
  </main>
}

function App() {
  const params = new URLSearchParams(window.location.search)
  const page = params.get('page')
  if (page === 'archive') return <ArchivePage />
  if (page === 'post') return <PostPage slug={params.get('slug')} />
  return <HomePage />
}

export default App
