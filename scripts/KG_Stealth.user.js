// ==UserScript==
// @name           KG_Stealth
// @version        1.0
// @namespace      klavogonki
// @author         LaFa777
// @description    Скрывает набираемое слово
// @include        http://klavogonki.ru/g/*
// @include        https://klavogonki.ru/g/*
// @grant          none
// @run-at         document-start
// @license        MIT
// ==/UserScript==

window.addEventListener("DOMContentLoaded", function(){
$('typetext').on('DOMSubtreeModified',function(event, el){
    if (!el.firstElementChild)
        return
    var childs = el.firstElementChild.childElements();
    var before_el = childs[0];
    var word_el = childs[1];
    var after_el = childs[2];
    
    function getStringWithoutGovna(el){
        if(!el.childElements().length)
            return el.textContent;
        
        var str = '';
        el.childElements().forEach(function(el){
            if (el.getStyle('display') != 'none')
                str = str + el.textContent;
        });
        return str;
    }
    
    var before = before_el.textContent;
    var word = getStringWithoutGovna(word_el);
    var after = getStringWithoutGovna(after_el);

    // ОСНОВНОЙ КОД. НАЧАЛО    

    function containsAny(suffixes, string) {return suffixes.some(function (suffix) {return string.indexOf(suffix) !== -1;});}
    if(before){
        word = word.trim();
        if(containsAny([",", ":", ".", "!", "-", "?", ";", "_"], word)){
            var match = word.split(/[,:.!-?;_]/);
            var pos_char = match[0].length;
            before = before + word.slice(0, pos_char);
            after = word.slice(pos_char) + after;
        }else{
            before = before + word;
        }
        word = '';
    }
    
    // ОСНОВНОЙ КОД. КОНЕЦ
    
    childs[0].textContent = before;
    childs[0].setStyle({'opacity': 0});
    childs[1].textContent = word;
    childs[2].textContent = after;
});
});
