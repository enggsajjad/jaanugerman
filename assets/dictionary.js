(() => {
  const raw = window.VOCABULARY_DATA || [];
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm = s => String(s || '').toLocaleLowerCase('de').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const unique = a => [...new Set(a)];
  const levels = ['Alle','A1','A2','B1','B2','BSK_B2','C1','C2'];
  const types = ['Alle','Nomen','Verben','Adjektive','Adverbien','Wendungen','Andere'];
  let levelFilter = 'Alle', typeFilter = 'Alle';

  function cleanTopic(topic){ return String(topic || 'Allgemein').replace(/\s+\d+\s+words?$/i,'').trim(); }
  function wordType(item){
    const w = item.word.trim();
    const low = w.toLowerCase();
    if (/^(der|die|das)\s+/.test(low)) return 'Nomen';
    if (/\s/.test(w) && !/^(der|die|das)\s+/.test(low)) return 'Wendungen';
    if (/(en|ern|eln)$/.test(low) || /^(sich\s+)/.test(low)) return 'Verben';
    if (/(lich|ig|isch|bar|los|sam|voll|haft|end|iert)$/.test(low)) return 'Adjektive';
    if (/(weise|wärts)$/.test(low) || ['heute','morgen','gestern','bald','oft','gern','gerne','immer','nie','manchmal','dort','hier','deshalb','trotzdem','allerdings'].includes(low)) return 'Adverbien';
    return 'Andere';
  }
  const data = raw.map((x,i)=>({...x,id:i,type:x.type||wordType(x),topic:cleanTopic(x.topic),letter:(x.word.replace(/^(der|die|das)\s+/i,'').trim()[0]||'#').toLocaleUpperCase('de')}));
  $('dictionaryTotal').textContent=data.length;
  const levelBox=$('levelButtons'), typeBox=$('typeButtons');
  function buttons(box, values, kind){box.innerHTML=values.map(v=>`<button class="filter ${v==='Alle'?'active':''}" data-${kind}="${esc(v)}">${esc(v)}</button>`).join('');}
  buttons(levelBox,levels,'level'); buttons(typeBox,types,'type');
  levelBox.addEventListener('click',e=>{const b=e.target.closest('[data-level]');if(!b)return;levelFilter=b.dataset.level;levelBox.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));render();});
  typeBox.addEventListener('click',e=>{const b=e.target.closest('[data-type]');if(!b)return;typeFilter=b.dataset.type;typeBox.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));render();});
  $('dictionarySearch').addEventListener('input',render);
  function baseFiltered(){return data.filter(x=>(levelFilter==='Alle'||x.level===levelFilter)&&(typeFilter==='Alle'||x.type===typeFilter));}
  function filtered(){const q=norm($('dictionarySearch').value);return baseFiltered().filter(x=>!q||norm(`${x.word} ${x.translation} ${x.example} ${x.topic} ${x.level} ${x.type}`).includes(q));}
  function articleClass(word){const l=word.toLowerCase();return l.startsWith('der ')?'article-der':l.startsWith('die ')?'article-die':l.startsWith('das ')?'article-das':'';}
  function render(){
    const rows=filtered().sort((a,b)=>a.word.localeCompare(b.word,'de')); $('dictionaryVisible').textContent=rows.length;
    $('dictionaryEmpty').hidden=rows.length>0;
    const letters=unique(rows.map(x=>x.letter)).sort((a,b)=>a.localeCompare(b,'de'));
    $('alphabetNav').innerHTML='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l=>letters.includes(l)?`<a href="#letter-${l}">${l}</a>`:`<span class="alphabet-disabled">${l}</span>`).join('');
    const groups=letters.map(letter=>{const items=rows.filter(x=>x.letter===letter);return `<section class="dictionary-letter" id="letter-${esc(letter)}"><h2>${esc(letter)} <span class="count">${items.length}</span></h2><div class="dictionary-cards">${items.map(x=>`<article class="dictionary-entry"><div class="dictionary-entry-top"><div><h3 class="${articleClass(x.word)}">${esc(x.word)}</h3><div class="entry-badges"><span class="level-pill">${esc(x.level)}</span><span class="type-pill">${esc(x.type)}</span><span class="topic-pill">${esc(x.topic)}</span></div></div><button class="speak" data-speak="${esc(x.word)}" aria-label="Aussprache von ${esc(x.word)}">🔊</button></div><p class="entry-translation">${esc(x.translation)}</p>${x.example?`<p class="entry-example">${esc(x.example)}</p>`:''}</article>`).join('')}</div></section>`;}).join('');
    $('dictionaryList').innerHTML=groups;
  }
  const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  $('startDictionaryTest').addEventListener('click',()=>{const pool=baseFiltered();const wanted=+$('testSize').value;if(pool.length<4){alert('Dieser Filter enthält weniger als vier Wörter. Bitte wählen Sie einen größeren Bereich.');return;}startQuiz(shuffle(pool).slice(0,Math.min(wanted,pool.length)));});
  function startQuiz(items){let index=0,score=0,answered=false;const direction=$('testDirection').value,quiz=$('dictionaryQuiz');quiz.hidden=false;quiz.scrollIntoView({behavior:'smooth',block:'start'});
    function draw(){if(index>=items.length){const pct=Math.round(score/items.length*100);quiz.innerHTML=`<div class="result-card"><div class="result-score">${score}/${items.length}</div><div class="result-pct">${pct}%</div><p>${pct>=80?'Sehr gut!':pct>=60?'Gut gemacht. Wiederholen Sie noch einige Wörter.':'Wiederholen Sie den Wortschatz und versuchen Sie es erneut.'}</p><button class="btn primary" id="againBtn">Neuen Test starten</button></div>`;$('againBtn').onclick=()=>$('startDictionaryTest').click();return;}
      answered=false;const item=items[index],prompt=direction==='de-to-en'?item.word:item.translation,correct=direction==='de-to-en'?item.translation:item.word;const candidates=unique(data.filter(x=>x.id!==item.id).map(x=>direction==='de-to-en'?x.translation:x.word).filter(v=>v&&v!==correct));const options=shuffle([correct,...shuffle(candidates).slice(0,3)]);
      quiz.innerHTML=`<div class="quiz-top"><div><strong>Frage ${index+1} von ${items.length}</strong><span>Punkte: ${score}</span></div><div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${index/items.length*100}%"></div></div></div><div class="quiz-card"><span class="eyebrow">${esc(item.level)} · ${esc(item.type)}</span><h2>${esc(prompt)}</h2>${direction==='de-to-en'?`<button class="speak" data-speak="${esc(item.word)}">🔊 Anhören</button>`:''}<div class="quiz-options">${options.map(o=>`<button class="quiz-option">${esc(o)}</button>`).join('')}</div><p id="quizFeedback" class="feedback"></p><button id="nextQuestion" class="btn primary" disabled>${index===items.length-1?'Ergebnis anzeigen':'Weiter →'}</button></div>`;
      document.querySelectorAll('.quiz-option').forEach(btn=>btn.onclick=()=>{if(answered)return;answered=true;document.querySelectorAll('.quiz-option').forEach(b=>{b.disabled=true;if(b.textContent===correct)b.classList.add('correct');});if(btn.textContent===correct){score++;$('quizFeedback').textContent='✓ Richtig!';$('quizFeedback').className='feedback ok';}else{btn.classList.add('wrong');$('quizFeedback').textContent='✗ Richtig ist: '+correct;$('quizFeedback').className='feedback fail';}$('nextQuestion').disabled=false;});
      $('nextQuestion').onclick=()=>{index++;draw();};
    } draw();
  }
  render();
})();
