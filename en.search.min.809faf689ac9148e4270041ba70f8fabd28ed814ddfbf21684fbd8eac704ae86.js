'use strict';(function(){const searchDataURL='/en.search-data.min.eddfd902fb49d1d5a2ee5af60f6c3877c17f2e6aff14d476f29499b9f65e7a47.json';const indexConfig=Object.assign({cache:true},{doc:{id:'id',field:['title','content'],store:['title','href','section']}});const input=document.querySelector('#book-search-input');const results=document.querySelector('#book-search-results');if(!input){return}
input.addEventListener('focus',init);input.addEventListener('keyup',search);document.addEventListener('keypress',focusSearchFieldOnKeyPress);function focusSearchFieldOnKeyPress(event){if(input===document.activeElement){return;}
const characterPressed=String.fromCharCode(event.charCode);if(!isHotkey(characterPressed)){return;}
input.focus();event.preventDefault();}
function isHotkey(character){const dataHotkeys=input.getAttribute('data-hotkeys')||'';return dataHotkeys.indexOf(character)>=0;}
function init(){input.removeEventListener('focus',init);input.required=true;fetch(searchDataURL).then(pages=>pages.json()).then(pages=>{window.bookSearchIndex=FlexSearch.create('balance',indexConfig);window.bookSearchIndex.add(pages);}).then(()=>input.required=false).then(search);}
function search(){while(results.firstChild){results.removeChild(results.firstChild);}
if(!input.value){return;}
const searchHits=window.bookSearchIndex.search(input.value,10);searchHits.forEach(function(page){const li=element('<li><a href></a><small></small></li>');const a=li.querySelector('a'),small=li.querySelector('small');a.href=page.href;a.textContent=page.title;small.textContent=page.section;results.appendChild(li);});}
function element(content){const div=document.createElement('div');div.innerHTML=content;return div.firstChild;}})();