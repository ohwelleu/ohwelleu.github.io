---
title: "Kaip per dieną gimė AFK Hunter"
description: "Kaip buvo priimti sprendimai mano mažam pikselių idle žaidimui: kokie buvo variantai ir kas nulėmė pasirinkimą."
pubDate: 2026-10-31
tags: ["game", "pixel-art", "process"]
---

Viskas prasidėjo nuo smulkmenos: pagrindinio puslapio viršuje buvo tuščia juosta, ir norėjau ten įdėti žaidimą. Dienos pabaigoje iš to išaugo pikselių „idle“ žaidimas [AFK Hunter](/lt/game) su [atskira repozitorija](https://github.com/ohwelleu/browser-afk-game). Tai ne specifikacija, o trumpas užrašas apie tai, kaip buvo priimti pagrindiniai sprendimai.

## Atskira repozitorija, viena script žymė

Paprasčiausia būtų buvę žaidimą įrašyti tiesiai į svetainę. Bet nenorėjau, kad blogas virstų žaidimo projektu, todėl žaidimas gyvena atskiroje repozitorijoje, o bet kuris puslapis jį parodo su vienu `<script>` ir `<afk-game>` elementu. Svetainė lieka paprasta, o žaidimas turi savo demo ir savo versijas.

Galiausiai iš pagrindinio puslapio jį vis tiek išėmiau. Dabar jis turi savo puslapį **Žaidimas**.

## Dvikovos vietoj ateinančių monstrų

Pirmas planas buvo klasikinis: monstrai ateina, nugali dešimt, ir lygis kyla. Tada pažaidžiau grubų demo ir dienos viduryje apsigalvojau. Dabar kiekvienas lygis yra **dvikova vienas prieš vieną**: herojus kairėje, monstras dešinėje, smūgiai pagal laikmatį, monetos už kiekvieną pergalę ir bosas kas šeštą lygį. Jei žūsti, grįžti vienu lygiu atgal ir kovoji ten, kol sustiprėji.

Progreso neprisijungus nėra. Žaidimas turi tyliai suktis, kol skirtukas atidarytas, o ne kviesti sugrįžti.

## Skaičiai iš simuliacijos, ne iš akies

Balanso nederinau iš jausmo. Greita simuliacija parodė, kad jei monstrų žala auga greitai, herojus (kurio gyvybės šioje versijoje nedidėja) atsiremia į sieną, kurios jokie žalos patobulinimai neperšoka. Todėl monstrų žala dabar auga lėtai, apie 5 % per lygį. Nuobodus sprendimas, bet paremtas duomenimis, o ne viltimi.

## Keturi bandymai nupiešti herojų

Daugiausia laiko užėmė grafika. Žaidime naudojamos dvi mano svetainės spalvos (`#1f1f1f` ir `#ece9e2`, kurios susikeičia pagal tamsią ar šviesią temą) ir svetainės akcentų spalvos. Kiekvienas spraitas yra mažas tekstinis tinklelis kode, be jokių paveikslėlių failų.

Herojus turėjo keturias versijas. Pirma – dirbtinio intelekto nupieštas 32×32 medžiotojas. Tada aukštesnis, kuris atrodė kaip plokščia balta dėmė. Tada sukurtas pagal proporcijas, išmatuotas nuo pavyzdinio paveikslėlio (DI nekopijuoja svetimo personažo, tik proporcijas ir pozą). Nė vienas nebuvo „mano“, todėl nusipiešiau savo 32×64 žudiką su raudona akimi ir balta ranka. Į žaidimą jis perkeltas pikselis į pikselį, o ataka tapo antausiu ta balta ranka.

Ką iš to išmokau: DI gerai tvarkosi su struktūra ir animacijos „santechnika“, o patį personažą geriau nupiešia žmogus. Kitas žingsnis – spraitų konverteris, kad visą grafiką ir animacijas galėčiau piešti pats.

## Muzika, sukurta naršyklėje

Muzika – du originalūs sintezatoriaus kūriniai, generuojami tiesiai naršyklėje, be garso failų: ramus viduramžiškas ambientas ir synthwave, juos galima perjungti. Svarsčiau ir drum and bass, bet tai per daug energijos „idle“ žaidimui bloge. Žiūrėjau ir į „no copyright“ kūrinį YouTube, bet pavadinimas dar nėra licencija. Todėl planas – originalus 8 bitų kūrinys tokiu stiliumi.

## Vienas planuotojas, keli pagalbininkai

Žaidimą kūriau su DI, bet ne viename ilgame pokalbyje. Buvo viena planavimo gija ir atskiros gijos kodui, grafikai, muzikai ir meniu. Kiekviena dirbo savo šakoje ir siuntė pull requestus, kuriuos peržiūrėjau pats. Sinchronizuoti jas padėjo paprasti dokumentai: planas, darbų sąrašas ir datuotas sprendimų žurnalas. Iš to žurnalo ir gimė šis įrašas.

Jei įdomu, kur visa tai nueis, [pažaisk čia](/lt/game) arba sek [repozitoriją](https://github.com/ohwelleu/browser-afk-game).
