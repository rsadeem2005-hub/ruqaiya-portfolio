import{useEffect,useRef,useState}from"react";
import{Routes,Route,Link,NavLink,useParams,useLocation}from"react-router-dom";
import{ArrowUpRight,ArrowDownRight,ArrowLeft,Menu,X}from"lucide-react";
import{skills,projects,profile,featuredProjects}from"./data";

const SITE="Ruqaiya Sadeem";

function Reveal({children,as:Tag="div",className="",delay=0}){
  const ref=useRef(null);
  const[shown,setShown]=useState(false);
  useEffect(()=>{
    const el=ref.current;
    if(!el)return;
    if(!("IntersectionObserver" in window)){setShown(true);return}
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setShown(true);io.disconnect()}},{threshold:.12});
    io.observe(el);
    return()=>io.disconnect();
  },[]);
  return<Tag ref={ref} className={"reveal "+(shown?"in ":"")+className} style={{transitionDelay:delay+"ms"}}>{children}</Tag>;
}

function PageMeta(){
  const{pathname}=useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
    let t=SITE+" — Marketing, AI & Technology";
    if(pathname==="/about")t="About — "+SITE;
    else if(pathname==="/projects")t="Projects — "+SITE;
    else if(pathname==="/contact")t="Contact — "+SITE;
    else if(pathname.startsWith("/projects/")){
      const p=projects.find(x=>x.slug===pathname.split("/")[2]);
      t=p?p.title+" — "+SITE:"Project not found — "+SITE;
    }
    document.title=t;
  },[pathname]);
  return null;
}

function Nav(){
  const[open,setOpen]=useState(false);
  const{pathname}=useLocation();
  useEffect(()=>{setOpen(false)},[pathname]);
  useEffect(()=>{document.body.style.overflow=open?"hidden":""; return()=>{document.body.style.overflow=""}},[open]);
  return<header>
    <Link className="logo" to="/">RS<span>.</span></Link>
    <nav className={open?"open":""}>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <a className="navmail" href={"mailto:"+profile.email}>Email me</a>
    </nav>
    <a className="navbtn" href={"mailto:"+profile.email}>Let’s talk <ArrowUpRight size={15}/></a>
    <button className="menubtn" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button>
  </header>;
}

function Footer(){
  return<footer>
    <div><small>LET’S BUILD SOMETHING USEFUL</small><h2>Ideas are better when they become real.</h2></div>
    <div>
      <a href={"mailto:"+profile.email}>Email <ArrowUpRight size={15}/></a>
      <a href="https://github.com/rsadeem2005-hub" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15}/></a>
    </div>
    <p>© {new Date().getFullYear()} Ruqaiya Sadeem.</p>
  </footer>;
}

const Card=({p,i=0})=><Reveal as="article" delay={i*80} className={"card "+(featuredProjects[0]===p.slug?"featured":"")}>
  {p.image&&<Link className="cardimage" to={"/projects/"+p.slug} aria-label={"View "+p.title+" project"}><img src={p.image} alt={p.title+" project preview"} loading="lazy"/></Link>}
  <div className="cardbody"><small>{p.n} / {p.sub}</small><h3>{p.title}</h3><p>{p.desc}</p>
  <div className="tags">{p.tags.map(x=><span key={x}>{x}</span>)}</div>
  <div className="cardactions"><Link to={"/projects/"+p.slug}>View project <ArrowUpRight size={16}/></Link>{p.live&&<a href={p.live} target="_blank" rel="noreferrer">Live site <ArrowUpRight size={15}/></a>}</div></div>
</Reveal>;

function Home(){
  return<>
    <section className="hero">
      <small>● AVAILABLE FOR REMOTE OPPORTUNITIES</small>
      <h1>Digital marketing, email & <em>AI</em> — made practical.</h1>
      <div className="herofoot">
        <p>I build practical marketing systems across email, copywriting, campaigns and AI-assisted workflows — with the technical skills to turn ideas into usable digital experiences.</p>
        <Link className="circle" to="/projects" aria-label="View projects"><ArrowDownRight/></Link>
      </div>
    </section>
    <div className="marquee">DIGITAL MARKETING　✦　AI WORKFLOWS　✦　EMAIL MARKETING　✦　COPYWRITING　✦　WEB PROJECTS　✦</div>
    <section>
      <Reveal><small>01 / WHAT I DO</small><h2>A hybrid skill set for modern teams.</h2>
      <p className="lead">I combine creative marketing thinking with technical execution — from campaign copy and email automation to AI workflows, analytics and web experiences.</p></Reveal>
      <div className="skills">{skills.map((s,i)=><Reveal key={s} delay={(i%2)*70}><small>{String(i+1).padStart(2,"0")}</small><b>{s}</b></Reveal>)}</div>
    </section>
    <section className="cream">
      <Reveal className="row"><div><small>02 / SELECTED WORK</small><h2>Projects with a purpose.</h2></div><Link to="/projects">View all <ArrowUpRight size={16}/></Link></Reveal>
      <div className="grid selected">{featuredProjects.map((slug,i)=>{const p=projects.find(x=>x.slug===slug);return p&&<Card key={p.slug} p={p} i={i%2}/>})}</div>
    </section>
    <section className="split">
      <Reveal><small>03 / ABOUT</small><h2>Curious by nature. Practical by choice.</h2></Reveal>
      <Reveal delay={100}><p>I’m a BCA student interested in digital marketing, email marketing, copywriting, AI-assisted workflows, analytics, automation and web technologies.</p><Link to="/about">More about me <ArrowUpRight size={16}/></Link></Reveal>
    </section>
    <section className="cta"><Reveal><small>LET’S CONNECT</small><h2>Have a project, role or idea in mind?</h2><Link to="/contact">Start a conversation <ArrowUpRight size={18}/></Link></Reveal></section>
  </>;
}

const jobs=[
  {when:"2026",role:"IT Support Internship",org:"Shama Leathers",pts:[
    "Worked in an IT support role, getting practical exposure to technology operations.",
    "Helped with everyday technical issues and troubleshooting.",
    "Learned how support work fits into the day-to-day running of a business."]},
  {when:"Earlier",role:"IT Support",org:"Faheema Exim",pts:[
    "Worked in an IT support role at an export business.",
    "Helped with basic hardware, software and troubleshooting needs.",
    "Practiced communicating clearly with non-technical colleagues."]}
];

function About(){
  return<section className="page">
    <small>ABOUT / 01</small>
    <h1>A little more <em>about me.</em></h1>
    <div className="about">
      <div>
        <p>I’m a BCA final-year student and aspiring remote professional interested in digital marketing, email marketing, copywriting, AI-assisted workflows, analytics, automation and web technologies.</p>
        <p>I’m especially interested in remote opportunities where marketing, technology and AI overlap — roles where I can learn quickly, communicate clearly and contribute to real business goals.</p>
      </div>
      <aside><b>Based in</b><span>Tamil Nadu, India</span><b>Education</b><span>BCA</span><b>Focus</b><span>Marketing + AI + Web</span><b>Work style</b><span>Remote / Global</span></aside>
    </div>
    <h2>Experience</h2>
    {jobs.map(j=><Reveal className="timeline" key={j.org}>
      <small>{j.when}</small>
      <div><h3>{j.role} — {j.org}</h3><ul>{j.pts.map(t=><li key={t}>{t}</li>)}</ul></div>
    </Reveal>)}
    <h2>Education</h2>
    <Reveal className="timeline"><small>2026</small><div><h3>Bachelor of Computer Applications</h3><p>Islamiah Women’s Arts and Science College, affiliated with Thiruvalluvar University.</p></div></Reveal>
  </section>;
}

function Projects(){
  return<section className="page">
    <small>PROJECTS / 02</small>
    <h1>Work across marketing, AI and <em>technology.</em></h1>
    <p className="lead">A focused collection of marketing-led projects spanning lifecycle email, paid-media copy, conversion writing, campaign planning and AI-assisted workflows — with selected technical builds alongside them.</p>
    <div className="grid all">{projects.map((p,i)=><Card key={p.slug} p={p} i={i%2}/>)}</div>
  </section>;
}

function Detail(){
  const{slug}=useParams();
  const p=projects.find(x=>x.slug===slug);
  if(!p)return<section className="page"><h1>Project not found.</h1><Link to="/projects">Back to projects</Link></section>;
  return<section className="page detail">
    <Link to="/projects"><ArrowLeft size={16}/> All projects</Link>
    <small>{p.n} / PROJECT</small>
    {p.image&&<div className="detailimage"><img src={p.image} alt={p.title+" project preview"}/></div>}
    <h1>{p.title}</h1>
    <h3>{p.sub}</h3>
    <p className="lead">{p.desc}</p>
    <div className="tags">{p.tags.map(x=><span key={x}>{x}</span>)}</div>
    {p.sections.map(([a,b])=><Reveal className="detailrow" key={a}><h3>{a}</h3><p>{b}</p></Reveal>)}
    <div className="actions">
      {p.live&&<a href={p.live} target="_blank" rel="noreferrer">Open live project <ArrowUpRight size={17}/></a>}
      {p.github&&<a href={p.github} target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={17}/></a>}
    </div>
  </section>;
}

function Contact(){
  return<section className="contact">
    <small>CONTACT / 03</small>
    <h1>Let’s make something <em>useful.</em></h1>
    <p>I’m open to remote opportunities, freelance projects, marketing work, AI-assisted workflows and collaborations.</p>
    <a href={"mailto:"+profile.email}>Email me <ArrowUpRight size={18}/></a>
  </section>;
}

export default function App(){
  return<>
    <PageMeta/>
    <Nav/>
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/projects/:slug" element={<Detail/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<section className="page"><h1>Page not found.</h1><Link to="/">Go home</Link></section>}/>
      </Routes>
    </main>
    <Footer/>
  </>;
}
