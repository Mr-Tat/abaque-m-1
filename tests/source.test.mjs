import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
test('GRAN : moteur autonome, ressources locales et aucune écriture Connect',()=>{
 const html=read('index.html');
 assert.doesNotMatch(html,/fetch\(|XMLHttpRequest|createClient|sendBeacon|(?:src|href)=["']https?:/);
 assert.match(read('environment.js'),/laboratory:false/);
 assert.match(read('demo-controls.mjs'),/get\('demo'\)==='1'/);
 assert.doesNotMatch(read('demo-controls.mjs'),/fetch\(|getSession|createClient|localStorage|sessionStorage/);
});
