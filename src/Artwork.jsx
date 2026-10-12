import { useId } from 'react';

export function Icon({ name = 'arrow', size = 20, ...props }) {
  const paths = {
    arrow: <path d="M19 12H5m6-6-6 6 6 6" />,
    diagonal: <path d="M17 7H7v10M7 7l10 10" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    chip: <><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/><rect x="9" y="9" width="6" height="6" rx="1"/></>,
    cube: <><path d="m12 3 9 5v9l-9 5-9-5V8Z M3 8l9 5 9-5M12 13v9M7.5 5.5l9 5v9"/></>,
    file: <><path d="M14 3H5v18h14V8Zm0 0v5h5M8 12h8m-8 4h6"/></>,
    people: <><circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-16a3 3 0 0 1 0 6m1 4a5 5 0 0 1 4 5"/></>,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}

export function PartArt({ type = 'flange', hero = false }) {
  const id = useId().replaceAll(':', '');
  return <svg className={`part-art ${hero ? 'hero-art' : ''}`} viewBox="0 0 500 350" role="img" aria-label="مدل مفهومی قطعهٔ صنعتی؛ نمونهٔ نمایشی">
    <defs>
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f7fafc"/><stop offset=".45" stopColor="#aebdd0"/><stop offset="1" stopColor="#e0e8f1"/></linearGradient>
      <linearGradient id={`${id}-side`}><stop stopColor="#506883"/><stop offset=".45" stopColor="#96abc3"/><stop offset="1" stopColor="#4b6382"/></linearGradient>
      <radialGradient id={`${id}-shadow`}><stop stopColor="#213a60" stopOpacity=".2"/><stop offset="1" stopColor="#213a60" stopOpacity="0"/></radialGradient>
    </defs>
    <ellipse cx="250" cy="288" rx="184" ry="33" fill={`url(#${id}-shadow)`}/>
    <g className="technical-guides"><path d="M57 282h371M68 273v18m351-18v18M437 92v172m-8-172h16m-16 172h16"/><path strokeDasharray="4 6" d="M35 183h426M250 44v274"/></g>
    {type === 'flange' ? <g stroke="#7187a2" strokeWidth="1">
      <path d="M99 166v48c0 49 68 88 151 88s151-39 151-88v-48" fill={`url(#${id}-side)`}/>
      <ellipse cx="250" cy="166" rx="151" ry="87" fill={`url(#${id}-metal)`}/>
      <ellipse cx="250" cy="166" rx="88" ry="51" fill="none" stroke="#8c9fb6"/>
      <ellipse cx="250" cy="166" rx="64" ry="37" fill="#344f72"/>
      <path d="M189 178c23-28 98-28 122 0" fill="none" stroke="#9eb1c7" strokeWidth="9"/>
      {[[143,166],[197,109],[302,109],[356,166],[302,225],[197,225]].map(([x,y])=><g key={x+','+y}><ellipse cx={x} cy={y} rx="12" ry="7" fill="#4d6685"/><path d={`M${x-9} ${y+3}q9 -7 18 0`} stroke="#b8c7d7" fill="none"/></g>)}
      <path d="M100 205c0 49 68 88 150 88s150-39 150-88" fill="none" stroke="#c1cfde" strokeOpacity=".55"/>
    </g> : type === 'shaft' ? <g stroke="#758ba5" strokeLinejoin="round">
      <path d="m105 204 216-124 51 30-217 127Z" fill={`url(#${id}-metal)`}/><path d="m155 237 217-127v44L155 279Z" fill={`url(#${id}-side)`}/><ellipse cx="129" cy="242" rx="28" ry="39" fill={`url(#${id}-metal)`}/><ellipse cx="129" cy="242" rx="12" ry="18" fill="#57718e"/>
      <path d="m220 138 36-21 46 27-35 21v70l-47 26Z" fill={`url(#${id}-metal)`}/><path d="m267 165 35-21v72l-35 19Z" fill={`url(#${id}-side)`}/>
    </g> : <g stroke="#7187a2" strokeLinejoin="round">
      <path d="m87 204 176-102 158 91-176 102Z" fill={`url(#${id}-metal)`}/><path d="M87 204v29l158 91v-29m0 29 176-102v-29" fill={`url(#${id}-side)`}/>
      <path d="m137 177 0-84 53-31 42 25v84l-53 31Z" fill={`url(#${id}-metal)`}/><path d="m137 93 42 25 53-31m-53 31v84" fill="none"/>
      <path d="m280 195 0-84 53-31 42 25v84l-53 31Z" fill={`url(#${id}-metal)`}/><path d="m280 111 42 25 53-31m-53 31v84" fill="none"/>
      <ellipse cx="250" cy="239" rx="29" ry="17" fill="#6f87a2"/><ellipse cx="250" cy="242" rx="22" ry="12" fill="#bdccdc"/>
    </g>}
    <text x="80" y="319" className="art-label">ISOMETRIC VIEW / CONCEPT</text>
    <text x="446" y="185" className="art-label" transform="rotate(90 446 185)">TECHNICAL STUDY</text>
  </svg>;
}

export function ControlArt() {
  return <svg className="control-art" viewBox="0 0 440 290" role="img" aria-label="تصویر مفهومی PLC و نمایشگر HMI">
    <g fill="none" stroke="#9badc4" strokeWidth="1.5"><path d="M114 217v26h225v-52M222 217v45H92"/><circle cx="92" cy="262" r="4" fill="#ccd9e8"/></g>
    <rect x="35" y="112" width="208" height="105" rx="7" fill="#334e72"/><rect x="44" y="121" width="46" height="86" rx="3" fill="#d4deea"/>
    {[100,128,156,184,212].map(x=><g key={x}><rect x={x} y="122" width="23" height="84" rx="2" fill="#8ea4bf"/>{[136,150,164,178,192].map(y=><path key={y} d={`M${x+5} ${y}h13`} stroke="#dae3ee"/>)}</g>)}
    <circle cx="55" cy="134" r="3" fill="#3159a0"/><circle cx="67" cy="134" r="3" fill="#698dbd"/><text x="52" y="177" fontSize="13" fill="#223e64">PLC</text>
    <rect x="271" y="58" width="135" height="138" rx="8" fill="#c0cede" stroke="#859bb6"/><rect x="280" y="67" width="117" height="103" rx="3" fill="#173255"/>
    <path d="M290 140h19v-31h18v42h17v-59h19v28h21" fill="none" stroke="#a4c4ee" strokeWidth="2"/><path d="M290 81h47M290 87h30" stroke="#6a88b1"/><circle cx="339" cy="182" r="4" fill="#486a99"/>
    <text x="280" y="43" className="art-label">HMI / PROCESS CONTROL</text>
  </svg>;
}
