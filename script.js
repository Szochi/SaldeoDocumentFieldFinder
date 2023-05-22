var poleNIP= document.getElementById('documentEditForm:ocrNip');
var zaznaczenie= poleNIP.value;
let fieldDataWpływu = {Day:'',Month:'',Year:'',All:''};
let fieldDataWystawienia = {Day:'',Month:'',Year:'',All:''};


(function() {
    'use strict';

    // Pobierz pole input
    fieldDataWpływu.All = document.getElementById('documentEditForm:docReceiveDateInputDate');
    [fieldDataWpływu.Day, fieldDataWpływu.Month, fieldDataWpływu.Year] = fieldDataWpływu.All.value.split('/');

    const fieldNumerDokumentu = document.getElementById('documentEditForm:docNumber');
    const fieldWartoscNetto23 = document.getElementById('documentEditForm:rv:0:netPriceRS');
    const divDocument = document.querySelector("td[rowspan='2']");
    console.log('WartoscNetto: ', divDocument);

    fieldDataWystawienia.All = document.getElementById('documentEditForm:docIssueDateInputDate');
    [fieldDataWystawienia.Day, fieldDataWystawienia.Month, fieldDataWystawienia.Year] = fieldDataWystawienia.All.value.split('/');

    // Dodaj nasłuchiwanie na zdarzenie focus
    fieldDataWpływu.All.addEventListener('focus', () => {
        console.log('Wartość pola input "data wpł.":', fieldDataWpływu.All);
        zaznaczenie= fieldDataWpływu.Day+'.'+fieldDataWpływu.Month+'.'+fieldDataWpływu.Year;
    });
    fieldNumerDokumentu.addEventListener('focus', () => {
        console.log('Wartość pola input "nrDok":', fieldNumerDokumentu.value);
        zaznaczenie=fieldNumerDokumentu.value;
    });
    fieldDataWystawienia.All.addEventListener('focus', () => {
        console.log('Wartość pola input "data wyst."]:', fieldDataWystawienia.All.value);
        zaznaczenie= fieldDataWystawienia.Day+'.'+fieldDataWystawienia.Month+'.'+fieldDataWystawienia.Year;
    });
    fieldWartoscNetto23.addEventListener('focus', () => {
        console.log('Wartość pola input "kwota23":', fieldWartoscNetto23.value);
        zaznaczenie=fieldWartoscNetto23.value;
        divDocument.style.paddingTop = "850px";
    });


    console.log('NIP: '+poleNIP.value);

    // Pobranie kodu strony
    var pageCode = document.documentElement.outerHTML;
    pageCode = pageCode.replace(/-/g, '');


    var STAGE= setInterval(function(){
        //const regex = /{"page":\d+,"top":\d+,"left":\d+,"bottom":\d+,"right":\d+,"pageWidth":\d+,"pageHeight":\d+,"text":"2222222222"}/g;
        const regex = new RegExp('{"page":\\d+,"top":\\d+,"left":\\d+,"bottom":\\d+,"right":\\d+,"pageWidth":\\d+,"pageHeight":\\d+,"text":"'+zaznaczenie+ '"}', 'g');
        const matches = pageCode.match(regex);
        console.log(matches);

        const str = matches[0];
        const obj = JSON.parse(str);

        const page = obj.page;
        const top = obj.top;
        const left = obj.left;
        const bottom = obj.bottom;
        const right = obj.right;
        const pageWidth = obj.pageWidth;
        const pageHeight = obj.pageHeight;
        const text = obj.text;

        console.log(`Współrzędne: page=${page}, top=${top}, left=${left}, bottom=${bottom}, right=${right}, pageWidth=${pageWidth}, pageHeight=${pageHeight}, text=${text}`);
        var finalTop=top/3.1-10;
        var finalLeft=left/3.1-20;
        var finalBottom=bottom/3.1;
        var finalRight=right/3.1+20;
        var finalWidth=finalRight-finalLeft;
        var finalHeight=finalBottom-finalTop;

        console.log('lewy: '+finalLeft);
        console.log('prawy: '+finalRight);
        const div = document.querySelector("#docPreviewId-0");
        //Usuń poprzedni
        const prevDiv = document.getElementById("ebit");
        if (prevDiv) {
            prevDiv.remove();
        }
        // Utwórz nowy element div i ustaw styl
        const innerDiv = document.createElement("div");
        innerDiv.id="ebit";
        innerDiv.style.position = "absolute";
        innerDiv.style.top = finalTop+"px";
        innerDiv.style.left = finalLeft+"px";
        innerDiv.style.width = finalWidth+"px";
        innerDiv.style.height = finalHeight+"px";
        innerDiv.style.border = "5px solid red";
        div.appendChild(innerDiv);
    },500);

})();