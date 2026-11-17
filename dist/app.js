'use strict';

const themes = {
  mountains: {number:'01',name:'Mountains',short:'The ups and downs.',caption:'A reminder that the ups and downs are part of the journey.',meaning:'Room for the ups and downs.',description:'Some days feel like climbing. Others feel like a setback. The mountains remind me that both belong to the same journey.'},
  topographic: {number:'02',name:'Topography',short:'Progress, one contour at a time.',caption:'Progress is gradual. Every contour is another small step.',meaning:'A gradual process.',description:'Contour lines make small changes in elevation visible. They reflect the slow, layered work of building a healthier life, one step at a time.'},
  tunnel: {number:'03',name:'Tunnel',short:'There is a path forward.',caption:'Keep moving. There is a path forward.',meaning:'A way forward.',description:'The tunnel gives the journey a direction. It is a visual reminder to keep taking the next step, even when the end still feels far away.'}
};
const themeOrder = ['mountains','topographic','tunnel'];
let activeTheme = 'mountains';
let wallpaperView = 'lockscreen';
const chapterDialog = document.querySelector('#chapter-dialog');
const wallpaperDialog = document.querySelector('#wallpaper-dialog');
const chapterContent = document.querySelector('#chapter-content');
const escapeHTML = value => String(value).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

function selectTheme(key) {
  activeTheme = key;
  const others = themeOrder.filter(theme=>theme!==key);
  document.querySelectorAll('[data-phone]').forEach(phone=>{
    const selected=phone.dataset.phone===key;
    phone.className='phone '+(selected?'phone-center':phone.dataset.phone===others[0]?'phone-left':'phone-right');
    phone.setAttribute('aria-label',selected?`Enlarge the selected ${themes[key].name.toLowerCase()} wallpaper`:`Select the ${themes[phone.dataset.phone].name.toLowerCase()} wallpaper`);
  });
  document.querySelectorAll('[data-theme]').forEach(button=>{
    const selected=button.dataset.theme===key;
    button.classList.toggle('active',selected);
    button.setAttribute('aria-pressed',String(selected));
  });
  document.querySelector('#theme-caption').textContent=themes[key].caption;
  if(wallpaperDialog.open) renderWallpaper();
}

document.querySelectorAll('[data-theme]').forEach(button=>button.addEventListener('click',()=>selectTheme(button.dataset.theme)));
document.querySelectorAll('[data-phone]').forEach(phone=>phone.addEventListener('click',()=>{
  if(phone.dataset.phone===activeTheme) openWallpaper();
  else selectTheme(phone.dataset.phone);
}));

function renderWallpaper(){
  const theme=themes[activeTheme];
  const image=document.querySelector('#full-wallpaper');
  image.src=`./assets/${activeTheme}-${wallpaperView=== 'lockscreen'?'lockscreen.jpg':'template.png'}`;
  image.alt=`${theme.name} ${wallpaperView==='lockscreen'?'original iPhone lock screen':'blank wallpaper template'}`;
  document.querySelector('#viewer-number').textContent=`${theme.number} / ${theme.name.toUpperCase()}`;
  document.querySelector('#viewer-caption').textContent=theme.short;
  const download=document.querySelector('#download-wallpaper');
  download.href=`./assets/${activeTheme}-template.png`;
  download.download=`${activeTheme}-wallpaper.png`;
  download.setAttribute('aria-label',`Download the ${theme.name.toLowerCase()} wallpaper template`);
  document.querySelectorAll('[data-view]').forEach(button=>{
    const selected=button.dataset.view===wallpaperView;
    button.classList.toggle('active',selected);
    button.setAttribute('aria-pressed',String(selected));
  });
}

function openWallpaper(key=activeTheme){
  selectTheme(key);
  wallpaperView='lockscreen';
  renderWallpaper();
  if(!wallpaperDialog.open) wallpaperDialog.showModal();
}
document.querySelector('#enlarge').addEventListener('click',()=>openWallpaper());
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{wallpaperView=button.dataset.view;renderWallpaper();}));
function cycleWallpaper(direction){const index=themeOrder.indexOf(activeTheme);selectTheme(themeOrder[(index+direction+themeOrder.length)%themeOrder.length]);}
document.querySelector('#previous-wallpaper').addEventListener('click',()=>cycleWallpaper(-1));
document.querySelector('#next-wallpaper').addEventListener('click',()=>cycleWallpaper(1));
wallpaperDialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')cycleWallpaper(-1);if(event.key==='ArrowRight')cycleWallpaper(1);});

const heading=(number,label,title,intro)=>`<p class="modal-eyebrow">Chapter ${number} / ${label}</p><h2 class="modal-heading" id="chapter-heading">${title}</h2><p class="modal-intro">${intro}</p>`;
const step=(number,title,body)=>`<li><span class="step-number">${number}</span><div><h3>${title}</h3><p>${body}</p></div></li>`;

const chapters={
  story:()=>heading('01','The why','A healthier life.<br><em>A more personal reminder.</em>','This started with something I have found difficult: staying accountable to my own health goals.')+`
    <div class="prose"><p>For me, losing weight is about physical health and endurance. I want the energy to do more, enjoy activities, and feel happier in my everyday life.</p><p>That has not always been easy. Food can become a way for me to relieve stress. Knowing what I want and following through on it are two different things, and accountability has been a struggle.</p><p>I wanted to make a reminder that felt personal — something I would actually see throughout the day. My phone’s background became a place to keep my starting point, my current weight, my goal, and the time I have left in view.</p></div>
    <blockquote class="pullquote">What if a background could do a little more than just sit there?</blockquote>
    <div class="prose"><p>That question became this project. A wallpaper that changes with my journey, pairs encouragement with something actionable, and keeps the reason I started close by.</p></div>
    <div class="intentions"><div class="intention"><strong>Physical health</strong><p>Care for the body I live in, every day.</p></div><div class="intention"><strong>Endurance</strong><p>Have more energy for the things I want to do.</p></div><div class="intention"><strong>Accountability</strong><p>Keep my intention visible in a place I already look.</p></div></div>`,
  gemini:()=>heading('02','The idea','A conversation.<br><em>Then a creative possibility.</em>','I used Gemini as a creative partner to explore how a background could support my weight-loss goal.')+`
    <ol class="process-list">${step('01','Start with the real problem','I wanted a creative reminder that could help me stay accountable. The starting point was my own experience, rather than a wallpaper style.')}${step('02','Imagine something that changes','Together, we arrived at using Apple Shortcuts to make the background feel alive: something that reflects my progress instead of staying the same.')}${step('03','Pair a thought with an action','I also used Gemini to create a collection of motivational quotes paired with health and habit tips. Each note gives me a thought to carry and something concrete to do.')}${step('04','Give the journey a visual language','Mountains, topographic lines, and a tunnel each express a different part of the process. The result is three visual directions with the same personal purpose.')}</ol>
    <blockquote class="pullquote">The idea became useful when it became part of my everyday environment.</blockquote>`,
  automation:()=>heading('03','The system','The daily automation.','My scale syncs to its companion app, which updates Apple Health. Every day at 10:00 AM, usually after my morning weigh-in, the Shortcut rebuilds my wallpaper.')+window.renderAutomation()+`<p class="source-note">The progress shown on this site is a project snapshot: 225 lb initially, 223.2 lb currently, a 205 lb goal, and 87 days left. The daily data connection runs on my iPhone.</p>`,
  quotes:()=>heading('04','The daily nudge','A little perspective.<br><em>One thing to do.</em>','The original Gemini-generated collection: a motivational thought paired with a practical action, ready to become part of the wallpaper.')+`
    <div class="quote-toolbar"><label class="search-wrap"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></svg><input id="quote-search" type="search" placeholder="Search a quote, tip, or author…" aria-label="Search quotes, tips, and authors"></label><button class="shuffle-note" id="shuffle-note">Surprise me ↗</button></div>
    <div class="quote-filters" role="group" aria-label="Filter notes by topic">${['All notes','Habits','Mindset','Nourishment','Movement','Perspective'].map((category,index)=>`<button data-category="${category}" class="${index===0?'active':''}" aria-pressed="${index===0}">${category}</button>`).join('')}</div><p class="quote-count" id="quote-count" role="status" aria-live="polite"></p><div id="quote-grid" class="quote-grid"></div><p class="source-note">Original project archive. Wording and attributions are preserved as supplied; attributions have not been independently verified. These are personal motivational notes, not individualized medical guidance.</p>`,
  design:()=>heading('05','The visual language','Three backgrounds.<br><em>Three ways to see the journey.</em>','The emerald palette ties the collection together. Each landscape gives the same daily reminder a different meaning.')+`
    <div class="design-grid">${themeOrder.map(key=>{const theme=themes[key];return `<article class="design-item"><button class="design-image-button" data-preview="${key}" aria-label="View ${theme.name.toLowerCase()} wallpaper"><img class="design-image" src="./assets/${key}-template.png" alt="${theme.name} blank emerald wallpaper template" loading="lazy"></button><h3>${theme.number} / ${theme.name}</h3><p class="design-meaning">${theme.meaning}</p><p>${theme.description}</p><a class="template-link" href="./assets/${key}-template.png" download="${key}-wallpaper.png">Download template ↓</a></article>`;}).join('')}</div><p class="source-note">The three blank templates and the completed iPhone lock screens are the original project assets. Click a design to compare them.</p>`
};

function openChapter(key){
  chapterContent.innerHTML=chapters[key]();
  chapterDialog.setAttribute('aria-labelledby','chapter-heading');
  chapterDialog.showModal();
  chapterDialog.scrollTop=0;
  if(key==='quotes')setupQuotes();
  if(key==='automation')window.setupAutomation();
  if(key==='design')chapterContent.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{chapterDialog.close();openWallpaper(button.dataset.preview);}));
}
document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>openChapter(button.dataset.open)));
for(const dialog of [chapterDialog,wallpaperDialog]){
  dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
  dialog.addEventListener('close',()=>dialog.querySelectorAll('video').forEach(video=>video.pause()));
}

let quoteCategory='All notes';
let quoteQuery='';
const normalize=text=>text.normalize('NFKD').replace(/[’‘]/g,"'").toLowerCase();
function filteredNotes(){return window.projectNotes.filter(note=>(quoteCategory==='All notes'||note.category===quoteCategory)&&normalize(`${note.quote} ${note.tip} ${note.author}`).includes(normalize(quoteQuery)));}
function renderQuotes(){
  const notes=filteredNotes();
  document.querySelector('#quote-count').textContent=`${notes.length} of ${window.projectNotes.length} notes${quoteCategory!=='All notes'?' · '+quoteCategory:''}`;
  document.querySelector('#quote-grid').innerHTML=notes.length?notes.map(note=>`<article class="quote-item" id="note-${note.id}"><header><span>${String(note.id).padStart(2,'0')} / ${escapeHTML(note.category)}</span><span>Thought → action</span></header><blockquote>“${escapeHTML(note.quote)}”</blockquote><p class="quote-author">${note.author?'— '+escapeHTML(note.author):'From the original collection'}</p><p class="quote-tip"><b>The action</b>${escapeHTML(note.tip)}</p><button class="copy-note" data-copy="${note.id}">Copy this note ↗</button></article>`).join(''):'<p class="no-results">No notes match that search. Try another word or choose a different topic.</p>';
  document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
    const note=window.projectNotes.find(note=>note.id===Number(button.dataset.copy));
    const text=`“${note.quote}”${note.author?' — '+note.author:''}\n\n${note.tip}`;
    try{await navigator.clipboard.writeText(text);showToast('Note copied. One small action, ready to go.');}catch{button.textContent='Select the note text to copy';}
  }));
}
function setupQuotes(){
  quoteCategory='All notes';quoteQuery='';renderQuotes();
  document.querySelector('#quote-search').addEventListener('input',event=>{quoteQuery=event.target.value;renderQuotes();});
  document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{
    quoteCategory=button.dataset.category;
    document.querySelectorAll('[data-category]').forEach(other=>{const selected=other===button;other.classList.toggle('active',selected);other.setAttribute('aria-pressed',String(selected));});
    renderQuotes();
  }));
  document.querySelector('#shuffle-note').addEventListener('click',()=>{
    const notes=filteredNotes();
    if(!notes.length){showToast('Try another search to find a note.');return;}
    const note=notes[Math.floor(Math.random()*notes.length)];
    document.querySelectorAll('.quote-item.highlight').forEach(item=>item.classList.remove('highlight'));
    const item=document.querySelector(`#note-${note.id}`);item.classList.add('highlight');
    item.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
    item.setAttribute('tabindex','-1');item.focus({preventScroll:true});
  });
}
let toastTimer;
function showToast(message){const toast=document.querySelector('#toast');toast.textContent=message;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),3200);}
