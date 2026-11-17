'use strict';

const shortcutIcon=(name,small=false)=>`<svg class="shortcut-icon${small?' small':''}" aria-hidden="true" viewBox="0 0 32 32"><use href="./assets/shortcut-icons.svg#${name}"></use></svg>`;
const variable=(label,icon)=>`<span class="shortcut-variable">${icon?shortcutIcon(icon,true):''}${label}</span>`;
const action=(icon,body,extra='')=>`<div class="shortcut-action"><div class="action-line">${shortcutIcon(icon)}<div>${body}</div><span class="action-dismiss" aria-hidden="true">×</span></div>${extra}</div>`;
const setting=(label,value)=>`<div class="shortcut-setting"><span>${label}</span><span>${value}</span></div>`;
const limit=label=>`<div class="shortcut-setting"><span>Limit</span><span class="ios-toggle" aria-label="Enabled"></span></div><div class="shortcut-setting limit-row"><span>${label}</span><span class="ios-stepper" aria-hidden="true">− <i></i> +</span></div>`;

window.shortcutStages=[
  {name:'Read my weight',summary:'Start with the most recent weight recorded in Apple Health.',icon:'health',actions:`
    ${action('health',`Find ${variable('Health Samples')}`,
    `<div class="action-detail"><p>where <span class="shortcut-blue">All</span> of the following are true</p><div class="shortcut-filter">Type <span>is</span> <b>Weight</b></div><div class="shortcut-filter">Start Date <span>is in the last</span> <b>7 days</b></div><div class="add-filter">⊕ Add Filter</div>${setting('Unit','None')}${setting('Group by','None')}${setting('Sort by','Start Date')}${setting('Order','Latest First')}${limit('Get 2 Health samples')}</div>`)}
    ${action('health',`Get ${variable('Value')} from ${variable('Health Samples','health')}`)}
    ${action('round',`Round ${variable('Value','health')} to ${variable('Tenths')}`)}
    ${action('text','Text',`<div class="action-detail shortcut-text">Current: ${variable('Weig…','value')}</div>`)}
  `},
  {name:'Choose a background',summary:'Pick a photo from the wallpaper template album at random.',icon:'photos',actions:`
    ${action('photos',`Find ${variable('Photos')} where`,
    `<div class="action-detail"><div class="shortcut-filter">Album <span>is</span> <b>Wallpaper template</b></div><div class="add-filter">⊕ Add Filter</div>${setting('Sort by','Random')}${limit('Get 1 Photo')}</div>`)}
    ${action('list',`Get ${variable('Random Item')} from ${variable('Photos','photos')}`)}
  `},
  {name:'Choose a daily note',summary:'Split the text collection into entries, then pick one at random.',icon:'text',actions:`
    ${action('text','Text',`<div class="action-detail shortcut-text original-text"><p>"Success is the sum of small efforts repeated daily." — Robert Collier<br>Swap your afternoon sugar soda for sparkling water with a splash of lemon!</p><p>"Do something today that your future self will thank you for." — Sean Patrick Flanery<br>Chop up fresh veggies right after grocery shopping so healthy snacks are ready to grab!</p></div>`)}
    ${action('text',`Split ${variable('Text','text')} by`, `<div class="action-detail"><span class="shortcut-blue">Custom&nbsp;&nbsp; !</span></div>`)}
    ${action('list',`Get ${variable('Random Item')} from ${variable('Split Text','text')}`)}
  `},
  {name:'Build the wallpaper',summary:'Pass the weight and selected note into the wallpaper routine, then turn its output into an image.',icon:'script',actions:`
    ${action('dictionary','Dictionary',`<div class="dictionary-rows"><div><span class="dictionary-minus" aria-hidden="true">−</span><span>weight</span>${variable('Weig…','value')}<span class="dictionary-handle" aria-hidden="true">☰</span></div><div><span class="dictionary-minus" aria-hidden="true">−</span><span>quote</span>${variable('Item from Li…','list')}<span class="dictionary-handle" aria-hidden="true">☰</span></div><div class="dictionary-add"><span aria-hidden="true">+</span>Add New Item</div></div>`)}
    ${action('script',`Run ${variable('Wallpaper')} with ${variable('Dictionary','dictionary')} <span class="shortcut-blue">⊙</span>`)}
    ${action('decode',`${variable('Decode')} ${variable('Output','script')} with base64`)}
    ${action('image',`Get images from ${variable('Base64 Encoded','decode')}`)}
  `},
  {name:'Refresh the lock screen',summary:'Use the finished image as the lock-screen wallpaper.',icon:'wallpaper',actions:`
    ${action('wallpaper',`Set ${variable('Wallpaper 6')} to ${variable('Images','image')} for ${variable('Lock Screen')} <span class="shortcut-blue">ⓘ</span>`)}
    <div class="shortcut-result"><img src="./assets/mountains-lockscreen.jpg" alt="Completed mountain lock-screen wallpaper showing the progress and daily note"><div><span class="tiny-caps">The result</span><h4>A familiar screen.<br>A fresh reminder.</h4><p>The original lock-screen snapshot from this project.</p></div></div>
  `}
];

window.renderAutomation=()=>`
  <div class="automation-trigger"><img src="./assets/art-automation.webp" alt=""><div><span class="tiny-caps">Personal automation / Time of day</span><h3>Every day at 10:00 AM</h3><p>Usually after my morning weigh-in.</p></div></div>
  <div class="walkthrough-toolbar"><span class="shortcut-title">${shortcutIcon('shortcut')}<span>Set Wallpaper wit…</span></span><span class="tiny-caps">The complete Shortcut</span></div>
  <div class="walkthrough-layout full-flow"><nav class="walkthrough-nav" aria-label="Shortcut stages">${window.shortcutStages.map((stage,index)=>`<button data-stage="${index}" aria-current="${index===0?'step':'false'}" class="${index===0?'active':''}"><span class="walkthrough-nav-number">0${index+1}</span><img class="stage-nav-image" src="./assets/art-${['story','design','quotes','gemini','automation'][index]}.webp" alt=""><span>${stage.name}</span><span class="walkthrough-nav-arrow" aria-hidden="true">↗</span></button>`).join('')}<p>Scroll through the full flow.<br>The steps follow along.</p></nav><div class="walkthrough-main"><div id="walkthrough-panels">${window.shortcutStages.map((stage,index)=>`<section class="shortcut-stage" aria-labelledby="stage-title-${index}"><div class="stage-heading"><span class="tiny-caps">0${index+1} / 05</span><h3 id="stage-title-${index}">${stage.name}</h3><p>${stage.summary}</p></div><div class="shortcut-stack">${stage.actions}</div></section>`).join('')}</div></div></div>
  <p class="source-note">Rebuilt from the actions, order, and visible settings in the recording. Variable names that were cut off remain shortened here. The last panel shows an original project lock screen.</p>`;

window.setupAutomation=()=>{
  const dialog=document.querySelector('#chapter-dialog');
  const nav=document.querySelector('.walkthrough-nav');
  const sections=Array.from(document.querySelectorAll('.shortcut-stage'));
  const buttons=Array.from(document.querySelectorAll('[data-stage]'));
  const controller=new AbortController();
  let ticking=false;
  const highlight=index=>buttons.forEach((button,i)=>{button.classList.toggle('active',i===index);button.setAttribute('aria-current',i===index?'step':'false');});
  const sync=()=>{
    const top=dialog.getBoundingClientRect().top;
    const threshold=matchMedia('(max-width:760px)').matches?Math.max(top+150,nav.getBoundingClientRect().bottom+45):top+95;
    let selected=0;
    sections.forEach((section,index)=>{if(section.getBoundingClientRect().top<=threshold)selected=index;});
    if(dialog.scrollTop+dialog.clientHeight>=dialog.scrollHeight-5)selected=sections.length-1;
    highlight(selected);ticking=false;
  };
  buttons.forEach((button,index)=>button.addEventListener('click',()=>{
    sections[index].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
    highlight(index);
  }));
  dialog.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(sync);}},{passive:true,signal:controller.signal});
  dialog.addEventListener('close',()=>controller.abort(),{once:true});
  sync();
};
