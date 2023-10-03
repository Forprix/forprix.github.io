import{$,$1,$el,$url,$hsv2rgb,$shuffle,$download}from"/util.mjs";(async()=>{const t=new Map,e=await(await fetch("https://raw.githubusercontent.com/Forprix/Meme-Sounds/main/chunks.json")).json(),o=$1(".sound-list"),i=$1("body"),n=()=>{const t=$hsv2rgb([performance.now()/1e3*360%360,50,100]);i.style=`--rainbow: rgb(${Math.floor(t[0])}, ${Math.floor(t[1])}, ${Math.floor(t[2])})`,requestAnimationFrame(n)};requestAnimationFrame(n);let d=!1,r=0,s=0,a=0,l=0,c=0,h=0,u=0,f=0,m=0,g=0,p=!1;function v(){const t=i.getBoundingClientRect(),e=c+u,o=h+f,n={left:0,right:0,top:0,bottom:0},d=c+u+150*m-t.width,r=h+f+200*g-t.height,s=Math.floor(d/150);s>0&&(n.right-=s);const a=Math.floor(r/200);a>0&&(n.bottom-=a);const l=Math.floor(-e/150);l>0&&(n.left-=l);const p=Math.floor(-o/200);p>0&&(n.top-=p);const v=Math.ceil(e/150);v>0&&(n.left+=v);const w=Math.ceil(o/200);w>0&&(n.top+=w);const $=Math.ceil(-d/150);$>0&&(n.right+=$);const y=Math.ceil(-r/200);y>0&&(n.bottom+=y),E(n)}o.addEventListener("mousedown",(t=>{d&&(a+=t.clientX-r,l+=t.clientY-s),r=t.clientX,s=t.clientY,d=!0})),i.addEventListener("mousemove",(t=>{d&&(p=!0,c=t.clientX-r+a,h=t.clientY-s+l,o.style.transform=`translate(${Math.round(c+u)}px, ${Math.round(h+f)}px)`)}));const w=t=>{d&&(d=!1,a+=t.clientX-r,l+=t.clientY-s,v())};i.addEventListener("mouseup",w),i.addEventListener("mouseleave",w);class ${constructor(t,e=!0){this.src=t,e||(this.audio=new Audio(this.src))}onEnded(t){this.onended=t,this.audio&&(this.audio.onended=this.onended)}play(){this.audio||(this.audio=new Audio(this.src),this.audio.onended=this.onended),this.audio?.play()}pause(){this.audio?.pause()}isPaused(){return this.audio?.paused??!0}setCurrentTime(t){this.audio&&(this.audio.currentTime=t)}}function y(){const i=Math.floor(Math.random()*e.totalItemsCount),n=i%e.chunkSize,d=`https://raw.githubusercontent.com/Forprix/Meme-Sounds/main/${`${Math.floor(i/e.chunkSize)}/${n}`}`,r=document.createElement("div");r.innerHTML="\n        <div class=sound>\n            <div><div><div>MEME</div></div><div><div></div></div><div></div></div>\n            <div><div>Loading...</div></div>\n            <div></div>\n        </div>\n    ".trim();const s=r.firstChild,a=s.children[1].children[0],l=s.children[0].children[0],c=l.children[0],h=s.children[0].children[1].children[0],u=s.children[0].children[2];return s.setAttribute("data-sndidx",i),(async()=>{t.get(i)||t.set(i,new Promise((async n=>{const r={config:null,audio:null,image:null};r.config=await(await fetch(`${d}/meme.json`)).json(),r.audio=new $(`${d}/${r.config.audio}`),r.audio.onEnded((()=>{o.querySelectorAll(`[data-sndidx="${i}"]`).forEach((t=>t.classList.remove("playing")))})),r.image=new Image,r.image.onload=()=>{o.querySelectorAll(`[data-sndidx="${i}"]`).forEach((t=>{const o=t.children[0].children[0];o.children[0].innerText="",o.style=`background: url("${e.image.src}") center center no-repeat`,t.classList.contains("loaded")||t.classList.add("loaded")}))},r.image.src=`${d}/${r.config.image}`,t.set(i,r),n()})));let e=t.get(i);e instanceof Promise&&await e,e=t.get(i),e.audio.isPaused()||s.classList.add("playing"),a.innerText=e.config.name,e.image.complete&&(c.innerText="",l.style=`background: url("${e.image.src}") center center no-repeat`,setTimeout((()=>s.classList.add("loaded")),0)),h.addEventListener("mousedown",(()=>p=!1)),h.addEventListener("click",(()=>{if(p)return;const t=!e.audio.isPaused(),n=o.querySelectorAll(`[data-sndidx="${i}"]`);t?(n.forEach((t=>t.classList.remove("playing"))),e.audio.pause()):(n.forEach((t=>t.classList.add("playing"))),e.audio.setCurrentTime(0),e.audio.play())})),u.addEventListener("mousedown",(()=>p=!1)),u.addEventListener("click",(()=>{p||$download(`${d}/${e.config.audio}`,e.config.name)}))})(),r.firstChild}async function b(e){const i=Number(e.getAttribute("data-sndidx"));let n=t.get(i);if(n instanceof Promise&&(await n,n=t.get(i)),n&&!n.audio.isPaused()){o.querySelectorAll(`[data-sndidx="${i}"]`).forEach((t=>t.classList.remove("playing"))),n.audio.pause()}}function E(t){if(t.bottom>0)for(let e=0;e<t.bottom;++e){const t=document.createElement("div");t.classList.add("sound-list-row");for(let e=0;e<m;++e)t.appendChild(y());o.appendChild(t)}else if(t.bottom<0)for(let e=0;e<-t.bottom;++e){for(const t of o.lastChild.children)b(t);o.lastChild.remove()}if(t.top>0)for(let e=0;e<t.top;++e){const t=document.createElement("div");t.classList.add("sound-list-row");for(let e=0;e<m;++e)t.appendChild(y());o.insertBefore(t,o.firstChild),f-=200}else if(t.top<0)for(let e=0;e<-t.top;++e){for(const t of o.firstChild.children)b(t);o.firstChild.remove(),f+=200}if(t.right>0)for(let e=0;e<t.right;++e)document.querySelectorAll(".sound-list-row").forEach((t=>t.appendChild(y())));else if(t.right<0)for(let e=0;e<-t.right;++e)document.querySelectorAll(".sound-list-row").forEach((t=>{b(t.lastChild),t.lastChild.remove()}));if(t.left>0)for(let e=0;e<t.left;++e)document.querySelectorAll(".sound-list-row").forEach((t=>t.insertBefore(y(),t.firstChild))),u-=150;else if(t.left<0)for(let e=0;e<-t.left;++e)document.querySelectorAll(".sound-list-row").forEach((t=>{b(t.firstChild),t.firstChild.remove()})),u+=150;o.style.transform=`translate(${Math.round(c+u)}px, ${Math.round(h+f)}px)`,m+=t.left+t.right,g+=t.top+t.bottom,m<0&&(m=0),g<0&&(g=0)}addEventListener("keydown",(t=>{"KeyW"==t.code&&E({left:0,top:1,right:0,bottom:0}),"KeyA"==t.code&&E({left:1,top:0,right:0,bottom:0}),"KeyS"==t.code&&E({left:0,top:0,right:0,bottom:1}),"KeyD"==t.code&&E({left:0,top:0,right:1,bottom:0}),"ArrowUp"==t.code&&E({left:0,top:-1,right:0,bottom:0}),"ArrowLeft"==t.code&&E({left:-1,top:0,right:0,bottom:0}),"ArrowDown"==t.code&&E({left:0,top:0,right:0,bottom:-1}),"ArrowRight"==t.code&&E({left:0,top:0,right:-1,bottom:0})})),new ResizeObserver(v).observe(i)})();