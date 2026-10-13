// A living topography: one field, three intersecting orientations.
// No imagery or network dependency; animation pauses when it leaves the viewport.
export function mountArt(canvas) {
 const ctx=canvas.getContext('2d');
 if(!ctx)return()=>{};
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0, visible=true, t=0, width=0,height=0, mouseX=0,mouseY=0, last=0, disposed=false;
 const ro=new ResizeObserver(()=>{const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=width*d;canvas.height=height*d;ctx.setTransform(d,0,0,d,0,0);draw();});ro.observe(canvas);
 const io=new IntersectionObserver(e=>{visible=e[0].isIntersecting;});io.observe(canvas);
 function point(u,v,phase){
  const ripple=1+.055*Math.sin(3*u+4*v+phase)+.035*Math.cos(7*u-3*v);
  let x=Math.sin(v)*Math.cos(u)*ripple,y=Math.cos(v)*ripple,z=Math.sin(v)*Math.sin(u)*ripple;
  const ay=.35+t*.035+mouseX*.12,az=-.31+mouseY*.07;
  let xx=x*Math.cos(ay)+z*Math.sin(ay),zz=-x*Math.sin(ay)+z*Math.cos(ay);
  const yy=y*Math.cos(az)+xx*Math.sin(az);xx=xx*Math.cos(az)-y*Math.sin(az);
  return [xx,yy,zz];
 }
 function draw(){
  if(!width)return;ctx.clearRect(0,0,width,height);
  let scale=Math.min(width*.40,height*.39),cx=width*.51,cy=height*.48;
  // Fine cartographic grid gives the object a precise, navigable character.
  ctx.strokeStyle='rgba(192,181,153,.065)';ctx.lineWidth=.6;
  for(let i=1;i<8;i++){ctx.beginPath();ctx.moveTo(width*i/8,0);ctx.lineTo(width*i/8,height);ctx.stroke();}
  for(let i=1;i<8;i++){ctx.beginPath();ctx.moveTo(0,height*i/8);ctx.lineTo(width,height*i/8);ctx.stroke();}
  // Batch strokes by depth: retain the fine contour without thousands of draw calls.
  const contours=Array.from({length:24},()=>new Path2D());
  for(let ring=0;ring<76;ring++){
   const v=(ring+.5)/76*Math.PI;let prev=null;
   for(let j=0;j<=170;j++){
    const u=j/170*Math.PI*2,p=point(u,v,t*.09);
    const sx=cx+p[0]*scale,sy=cy+p[1]*scale;
    if(prev){const bucket=Math.max(0,Math.min(11,Math.floor((p[2]+1)*6)))+(ring%8===0?12:0);contours[bucket].moveTo(prev[0],prev[1]);contours[bucket].lineTo(sx,sy);}
    prev=[sx,sy];
   }
  }
  contours.forEach((path,i)=>{const major=i>=12,alpha=.075+((i%12)+.5)/12*.4;ctx.strokeStyle=`rgba(${major?'212,173,121':'213,210,188'},${alpha})`;ctx.lineWidth=major?.7:.48;ctx.stroke(path);});
  const angles=[-.6,.48,1.7];
  angles.forEach((a,k)=>{
   ctx.save();ctx.translate(cx,cy);ctx.rotate(a);ctx.lineWidth=.65;ctx.strokeStyle=`rgba(202,168,115,${k===1?.5:.27})`;ctx.beginPath();ctx.ellipse(0,0,scale*1.2,scale*(.22+k*.12),0,0,Math.PI*2);ctx.stroke();
   const r=t*.11+k*2.1,x=Math.cos(r)*scale*1.2,y=Math.sin(r)*scale*(.22+k*.12);ctx.fillStyle='#e0c6a0';ctx.beginPath();ctx.arc(x,y,2.8,0,Math.PI*2);ctx.fill();ctx.restore();
  });
  ctx.strokeStyle='rgba(221,202,167,.5)';ctx.lineWidth=.7;
  [[.13,.20],[.83,.76],[.77,.18]].forEach(([x,y])=>{ctx.beginPath();ctx.moveTo(width*x-4,height*y);ctx.lineTo(width*x+4,height*y);ctx.moveTo(width*x,height*y-4);ctx.lineTo(width*x,height*y+4);ctx.stroke();});
 }
 function tick(now){if(disposed)return;if(visible&&!document.hidden&&!reduced.matches&&now-last>48){t+=.05;draw();last=now;}frame=requestAnimationFrame(tick);}
 frame=requestAnimationFrame(tick);
 const pointer=e=>{const r=canvas.getBoundingClientRect();mouseX=(e.clientX-r.left)/r.width-.5;mouseY=(e.clientY-r.top)/r.height-.5;};canvas.addEventListener('pointermove',pointer);
 return()=>{disposed=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();canvas.removeEventListener('pointermove',pointer);};
}

export function diagram(type='tian') {
 const base='<g fill="none" stroke="currentColor" stroke-width=".7">';
 if(type==='tian') return `<svg class="path-diagram" viewBox="0 0 250 190" aria-hidden="true">${base}${Array.from({length:11},(_,i)=>`<ellipse cx="125" cy="95" rx="${12+i*8}" ry="75" transform="rotate(-28 125 95)"/>`).join('')}<path d="M20 95h210M125 12v166" opacity=".4"/></g></svg>`;
 if(type==='ren') return `<svg class="path-diagram" viewBox="0 0 250 190" aria-hidden="true">${base}${Array.from({length:12},(_,i)=>`<ellipse cx="${98+i*5}" cy="95" rx="${22+i*4}" ry="${70-i*2}"/>`).join('')}<circle cx="125" cy="95" r="4" fill="currentColor"/></g></svg>`;
 return `<svg class="path-diagram" viewBox="0 0 250 190" aria-hidden="true">${base}${Array.from({length:12},(_,i)=>`<ellipse cx="125" cy="95" rx="89" ry="26" transform="rotate(${i*15} 125 95)"/>`).join('')}<circle cx="125" cy="95" r="4" fill="currentColor"/></g></svg>`;
}
