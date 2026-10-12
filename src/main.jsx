import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/estedad';
import './styles.css';
import { data, documents } from './data';
import { Icon, PartArt, ControlArt } from './Artwork';

const sections = {
  automation: { name: 'PLC و HMI', description: 'برنامه‌نویسی و اتوماسیون صنعتی', action: 'خدمات و تجهیزات', icon: 'chip' },
  manufacturing: { name: 'محمد کسایی', description: 'طراحی و تولید قطعات صنعتی', action: 'نمونه‌کارها', icon: 'cube' },
};
const SectionContext = createContext(null);
const getRoute = () => {
  const hash = window.location.hash.slice(1);
  const [section, page, extra] = hash.split('/');
  return sections[section] && !extra && (!page || ['partners', 'about'].includes(page)) ? hash : 'home';
};

function Brand() {
  const section = useContext(SectionContext);
  const name = section === 'manufacturing' ? 'محمد کسایی' : 'مهیار خرده‌فروش';
  return <a href={section ? `#${section}` : '#home'} className="brand" aria-label={`${name}، صفحهٔ اصلی`}><span className="brand-mark"><Icon name={section ? sections[section].icon : 'cube'} size={29}/></span><span>{name}</span></a>;
}

function Header({ route }) {
  const section = useContext(SectionContext);
  const navigation = [[section, sections[section].action], [`${section}/partners`, 'همکاران این بخش'], [`${section}/about`, 'دربارهٔ این بخش']];
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  useEffect(() => { setOpen(false); }, [route]);
  useEffect(() => {
    const escape = event => { if (event.key === 'Escape' && open) { setOpen(false); toggleRef.current?.focus(); } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [open]);
  return <header className="site-header"><div className="container header-inner"><Brand/><button className="menu-toggle" ref={toggleRef} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'بستن منو' : 'باز کردن منو'}><Icon name={open ? 'close' : 'menu'}/></button><nav id="main-navigation" className={open ? 'is-open' : ''} aria-label="منوی اصلی">{navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={route === id ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>)}</nav><a href="#home" className="header-cta section-switch">تغییر بخش <Icon name="diagonal" size={17}/></a></div></header>;
}

function Footer() {
  const section = useContext(SectionContext);
  const info = sections[section];
  return <footer className="site-footer"><div className="container"><div className="footer-top"><div><span className="overline">{section === 'automation' ? 'INDUSTRIAL AUTOMATION' : 'MECHANICAL ENGINEERING'}</span><h2>{info.name}<br/><span>دقت در جزئیات، تفاوت در نتیجه.</span></h2></div><a href={`#${section}`} className="button button-light">{info.action} <Icon/></a></div><div className="footer-columns"><div className="footer-description"><Brand/><p>{info.description}</p><small>نام و نشان نهایی شرکت در حال تکمیل است.</small></div><div><h3>دسترسی سریع</h3><a href={`#${section}`}>{info.action}</a><a href={`#${section}/partners`}>شرکت‌های همکار این بخش</a></div><div><h3>دربارهٔ مجموعه</h3><a href={`#${section}/about`}>معرفی این بخش</a><a href="#home">تغییر بخش</a></div><div><h3>اطلاعات تماس</h3><p>نشانی و راه‌های ارتباطی پس از نهایی‌شدن در این بخش درج می‌شود.</p><span className="footer-status">در حال تکمیل</span></div></div><div className="footer-bottom"><span>نسخهٔ نمایشی · اطلاعات این بخش نمونه است.</span><a href={`#${section}`}>بازگشت به ابتدای بخش <Icon size={14}/></a></div></div></footer>;
}

function SectionTitle({ eyebrow, title, children }) {
  return <div className="section-title"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{children}</div>;
}
function TextLink({ href, children }) { return <a className="text-link" href={href}>{children}<Icon size={18}/></a>; }
function SampleNote() {
  const section = useContext(SectionContext);
  return <p className="sample-note"><Icon name="file" size={18}/><span>{section === 'automation' ? 'برندها و مدل‌های تجهیزات' : 'قطعات و پروژه‌ها'} در این نسخه نمونهٔ نمایشی‌اند؛ اطلاعات نهایی پس از تأیید مجموعه جایگزین می‌شود.</span></p>;
}

function Entry() {
  return <div className="entry-page"><header className="container entry-header" aria-hidden="true"/><section className="container entry-content"><div className="entry-options">{Object.entries(sections).map(([id, info], index) => <a href={`#${id}`} key={id} className="entry-option"><div className="entry-option-top"><span className="icon-box"><Icon name={info.icon} size={26}/></span><span className="index-label">0{index + 1} / {id === 'automation' ? 'AUTOMATION' : 'MANUFACTURING'}</span></div><div className="entry-art">{id === 'automation' ? <ControlArt/> : <PartArt/>}</div><h2>{id === 'manufacturing' ? 'طراحی و ساخت قطعات' : info.name}</h2><p>{id === 'automation' ? 'خدمات برنامه‌نویسی، برندها و مدل‌های تجهیزات کنترل و رابط‌های اپراتوری.' : 'نمونه‌کارها، مشخصات فنی قطعات، فرایند ساخت و مستندات پروژه‌ها.'}</p><div className="entry-action"><span>ورود به بخش {id === 'automation' ? 'اتوماسیون' : 'قطعات'}</span><span className="arrow-box"><Icon/></span></div></a>)}</div></section><footer className="container entry-footer" aria-hidden="true"/></div>;
}
function ProjectCard({ project, onSelect }) {
  return <button className="project-card" onClick={() => onSelect(project)} aria-label={`مشخصات ${project.name}`}><div className="project-image"><span className="sample-tag">طرح نمایشی</span><PartArt type={project.shape}/></div><div className="project-info"><span className="eyebrow">{project.label}</span><h3>{project.name}</h3><div className="project-meta"><span>مشاهدهٔ مشخصات فنی</span><Icon size={19}/></div></div></button>;
}
function PageHeading({ title, description }) {
  return <div className="page-heading"><h1>{title}</h1><p>{description}</p></div>;
}
function Filters({ options, value, onChange, label }) { return <div className="filters" role="group" aria-label={label}>{options.map(([id, text]) => <button key={id} className={value === id ? 'active' : ''} aria-pressed={value === id} onClick={() => onChange(id)}>{text}</button>)}</div>; }
function Documents() { return <section className="documents-panel"><span className="icon-box"><Icon name="file" size={28}/></span><div><h2>کاتالوگ و مستندات فنی</h2><p>فایل‌های معرفی مجموعه و مدارک قابل انتشار پروژه‌ها.</p>{documents.length > 0 && <div className="document-links">{documents.map(d => <a key={d.file} href={d.file} target="_blank" rel="noreferrer">{d.title} <Icon name="diagonal" size={16}/></a>)}</div>}</div>{documents.length === 0 && <span className="status-label">هنوز فایلی اضافه نشده</span>}</section>; }
function Manufacturing({ onSelect }) {
  const [filter, setFilter] = useState('all');
  const projects = data.projects.filter(p => filter === 'all' || p.type === filter);
  return <section className="container inner-page"><PageHeading label="طراحی و تولید قطعات" title="هر قطعه، پاسخ یک نیاز." description="از مدل‌سازی و نقشهٔ فنی تا فرایند ساخت؛ جزئیات هر پروژه را دنبال کنید."/><SectionTitle eyebrow="نمونه‌کارها" title="نمونه‌کارها"><Filters label="فیلتر نمونه‌کارها" options={[["all","همه"],["machining","ماشین‌کاری"],["design","طراحی و ساخت"]]} value={filter} onChange={setFilter}/></SectionTitle><div className="projects-grid" aria-live="polite">{projects.map(p => <ProjectCard key={p.id} project={p} onSelect={onSelect}/>)}</div><Documents/></section>;
}
function Automation() {
  const [filter, setFilter] = useState('all');
  const brands = data.brands.filter(b => filter === 'all' || b[filter].length);
  return <section className="container inner-page"><PageHeading label="PLC و HMI" title="منطق دقیق. کنترل یکپارچه." description="خدمات اتوماسیون صنعتی و خانواده‌های محصول، به تفکیک برند و نوع تجهیزات."/><div className="automation-intro"><div><span className="icon-box"><Icon name="chip"/></span><h2>برنامه‌نویسی PLC</h2><p>معرفی خدمات منطق کنترل، راه‌اندازی و عیب‌یابی؛ جزئیات خدمات پس از تأیید مجموعه تکمیل می‌شود.</p></div><div><span className="icon-box"><Icon name="cube"/></span><h2>طراحی و برنامه‌نویسی HMI</h2><p>معرفی رابط‌های اپراتوری، نمایش وضعیت دستگاه و مدیریت هشدارها؛ دامنهٔ خدمات در حال تکمیل است.</p></div><ControlArt/></div><SectionTitle eyebrow="برندها و خانواده‌های محصول" title="تجهیزات و مدل‌ها"><Filters label="فیلتر تجهیزات" options={[["all","همه"],["plc","PLC"],["hmi","HMI"]]} value={filter} onChange={setFilter}/></SectionTitle><div className="brand-list" aria-live="polite">{brands.map(b => <article className="brand-row" key={b.name}><div className="equipment-brand"><h3 dir="ltr">{b.name}</h3></div><div className="brand-models">{['plc','hmi'].filter(t => (filter === 'all' || filter === t) && b[t].length).map(t => <div className="model-row" key={t}><b>{t.toUpperCase()}</b>{b[t].map(model => <span key={model} dir="ltr">{model}</span>)}</div>)}</div><Icon name="chip" size={25}/></article>)}</div></section>;
}
function Partners() {
  const section = useContext(SectionContext);
  const info = sections[section];
  const partners = [
    { name: 'فراز کنترل', field: 'اتوماسیون صنعتی', product: 'تابلوهای کنترل و تجهیزات PLC', image: '/images/partner-automation.png' },
    { name: 'صنعت‌سازان نوین', field: 'ساخت و ماشین‌کاری', product: 'قطعات دقیق و مجموعه‌های صنعتی', image: '/images/partner-machining.png' },
    { name: 'پارس ابزار دقیق', field: 'ابزار دقیق و کنترل', product: 'HMI، سنسور و تجهیزات مانیتورینگ', image: '/images/partner-controls.png' },
  ];
  return <section className="container inner-page"><PageHeading label="شرکت‌های همکار" title="همکاران منتخب" description={`نمونه‌ای از همکاران فعال در حوزهٔ ${info.name}.`}/>{section === 'manufacturing' ? <div className="manufacturing-partner-grid">{partners.map(partner => <article className="manufacturing-partner-card" key={partner.name}><img src={partner.image} alt={`محیط کاری ${partner.name}`} loading="lazy"/><div><span className="eyebrow">{partner.field}</span><h2>{partner.name}</h2><p>{partner.product}</p></div></article>)}</div> : <div className="partner-grid">{partners.map(partner => <article className="partner-card" key={partner.name}><div className="partner-details"><span className="eyebrow">{partner.field}</span><h2>{partner.name}</h2><dl><div><dt>حوزهٔ فعالیت</dt><dd>{partner.field}</dd></div><div><dt>محصولات و خدمات</dt><dd>{partner.product}</dd></div></dl></div><img src={partner.image} alt={`محیط کاری ${partner.name}`} loading="lazy"/></article>)}</div>}</section>;
}
function About() {
  const section = useContext(SectionContext);
  const automation = section === 'automation';
  return <section className="container inner-page"><PageHeading label="دربارهٔ این بخش" title={sections[section].name} description={sections[section].description}/><div className="about-panel"><div><p className="eyebrow">از شناخت تا اجرا</p><h2>{automation ? 'منطق کنترل، در خدمت صنعت.' : 'از نقشهٔ فنی تا قطعهٔ نهایی.'}</h2><p>{automation ? 'در این بخش با خدمات برنامه‌نویسی PLC و طراحی رابط‌های HMI و خانواده‌های تجهیزات کنترل آشنا می‌شوید.' : 'این بخش به معرفی طراحی و ساخت قطعات، نمونه‌کارها، مشخصات فنی و مستندات پروژه‌های تولید اختصاص دارد.'}</p><p className="subtle">نام نهایی شرکت، سابقهٔ فعالیت و اطلاعات تماس پس از دریافت اطلاعات تکمیل خواهد شد.</p><TextLink href={`#${section}`}>{sections[section].action}</TextLink></div>{automation ? <ControlArt/> : <PartArt type="fixture"/>}</div></section>;
}
function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => { if (project && !ref.current.open) ref.current.showModal(); else if (!project && ref.current.open) ref.current.close(); }, [project]);
  return <dialog ref={ref} aria-labelledby="project-title" onClose={onClose} onClick={event => { if (event.target === ref.current) { const rect = ref.current.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) ref.current.close(); } }}>
    {project && <><div className="dialog-top"><span className="eyebrow">نمونهٔ نمایشی · پروژهٔ واقعی نیست</span><button className="icon-button" onClick={() => ref.current.close()} aria-label="بستن مشخصات"><Icon name="close"/></button></div><h2 id="project-title">{project.name}</h2><div className="dialog-art"><PartArt type={project.shape}/></div><p>{project.description}</p><dl><dt>شرکت سفارش‌دهنده</dt><dd>در انتظار اطلاعات واقعی</dd><dt>جنس قطعه</dt><dd>{project.material}</dd><dt>فرایند ساخت</dt><dd>{project.process}</dd><dt>ابعاد و تلرانس</dt><dd>پس از دریافت نقشهٔ فنی تکمیل می‌شود</dd></dl><p className="subtle">تصاویر واقعی و فایل PDF پروژه هنوز اضافه نشده‌اند.</p></>}
  </dialog>;
}
function App() {
  const [route, setRoute] = useState(getRoute);
  const [project, setProject] = useState(null);
  const main = useRef(null);
  const [section, page] = route === 'home' ? [null, null] : route.split('/');
  useEffect(() => {
    const navigate = () => { setRoute(getRoute()); setProject(null); };
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${section ? sections[section].name : 'انتخاب بخش'} | مجموعهٔ مهندسی`;
  }, [route, section]);
  let content = <Entry/>;
  if (section) {
    content = page === 'partners' ? <Partners/> : page === 'about' ? <About/> : section === 'automation' ? <Automation/> : <Manufacturing onSelect={setProject}/>;
  }
  return <SectionContext.Provider value={section}><a className="skip-link" href="#content" onClick={event => { event.preventDefault(); main.current.focus(); main.current.scrollIntoView(); }}>رفتن به محتوای اصلی</a>{section && <Header route={route}/>}<main id="content" ref={main} tabIndex={-1} key={route}>{content}</main><ProjectDialog project={project} onClose={() => setProject(null)}/></SectionContext.Provider>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
