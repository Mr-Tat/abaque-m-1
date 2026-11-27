import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {chromium} from 'playwright';

// Vérifie le CSS réel de l'application, dans les deux états de l'aide.
const source=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const style=source.match(/<style>([\s\S]*?)<\/style>/)?.[1];
assert.ok(style,'Le CSS intégré de l\'abaque doit être présent');
const units=['km','hm','dam','m','dm','cm','mm'];
const slots=units.map((unit)=>'<div class="helpSlot"><button class="helpUnitChip" type="button">'+unit+'</button></div>').join('');
const labels=units.map((unit)=>'<div>'+unit+'</div>').join('');
const empty='<div></div>'.repeat(7);
const fixture=`<!doctype html><html lang="fr"><head><meta name="viewport" content="width=device-width,initial-scale=1">
<style>${style}</style></head><body>
<main id="moveScreen" style="padding:12px">
<div style="max-width:530px"><div class="moveAbacus">
<div class="metricTableScroll"><div class="metricTable moveHelpTable">
<div class="metricHeaders" id="moveHelpSlots">${slots}</div><div class="metricPlaces">${empty}</div></div></div>
<div class="metricTableScroll" style="margin-top:12px"><div class="metricTable compactAbacus">
<div class="metricHeaders">${labels}</div><div class="metricPlaces">${empty}</div></div></div>
</div></div></main></body></html>`;

test('activité 2 : les sept colonnes restent visibles dans les deux abaques d’aide',async()=>{
 const browser=await chromium.launch();
 try{
  for(const width of [320,390,500,610,820,1440]){
   const page=await browser.newPage({viewport:{width,height:800}});
   try{
    await page.setContent(fixture);
    const metrics=await page.evaluate(()=>{
     const scrollers=[...document.querySelectorAll('#moveScreen .metricTableScroll')];
     return {
      scrollers:scrollers.map(x=>({client:x.clientWidth,scroll:x.scrollWidth})),
      columns:[...document.querySelectorAll('#moveHelpSlots>.helpSlot')].length,
      chips:[...document.querySelectorAll('#moveHelpSlots .helpUnitChip')].map(x=>({client:x.clientWidth,scroll:x.scrollWidth}))
     };
    });
    assert.equal(metrics.columns,7,`width ${width}: nombre de colonnes`);
    for(const item of metrics.scrollers)assert.ok(item.scroll<=item.client+1,`width ${width}: abaque tronqué ${JSON.stringify(item)}`);
    for(const chip of metrics.chips)assert.ok(chip.scroll<=chip.client+1,`width ${width}: étiquette tronquée ${JSON.stringify(chip)}`);
   }finally{await page.close()}
  }
 }finally{await browser.close()}
});
