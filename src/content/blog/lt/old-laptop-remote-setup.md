---
title: "Senas nešiojamasis gauna antrą karjerą: nuotolinė DI dėžė"
description: "Žingsnis po žingsnio: SSH raktai, Node, Claude Code ir nešiojamasis, kuris atsisako miegoti, kad galėčiau jį valdyti iš pagrindinio kompiuterio."
pubDate: 2026-11-08
tags: ["linux", "ssh", "t3-code", "setup"]
---

Turiu seną nešiojamąjį, kuris dienas leidžia nieko neveikdamas. Taip pat turiu pagrindinį kompiuterį, kuriame nenoriu sukti visų DI gijų. Todėl nešiojamasis gauna paaukštinimą: jame veiks [T3 Code](https://github.com/pingdotgg/t3code) ir jo agentai, o pagrindinis kompiuteris bus tik nuotolinio valdymo pultas.

Čia mano sąranka žingsnis po žingsnio, tokia tvarka, kaip dariau (įskaitant vietas, kur suklupau). Nešiojamajame yra Linux Mint, pagrindiniame kompiuteryje Windows. Ten, kur matai `USER` ir `LAPTOP_IP`, įrašyk savo.

## 1. Pirma atnaujink

Senas nešiojamasis turi daug laukiančių atnaujinimų. Prijunk kroviklį ir:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y openssh-server git curl
sudo systemctl enable --now ssh
```

Naudok `upgrade`, o ne leidimo atnaujinimą. Jei prašo, perkrauk. Tada užsirašyk du dalykus, nes jų vėliau prireiks:

```bash
hostname -I   # nešiojamojo IP
whoami        # tavo vartotojo vardas
```

## 2. Sukurk raktą pagrindiniame kompiuteryje

Windows jau turi SSH klientą. Šiam nešiojamajam sukūriau atskirą raktą, kad kiti mano raktai nebūtų į tai įtraukti:

```powershell
ssh-keygen -t ed25519 -f $env:USERPROFILE\.ssh\id_oldlaptop -C "main-pc"
```

`-C` yra tik etiketė viešojo rakto gale, kad vėliau atskirtum raktus. Daugiau nieko nedaro. Slaptafrazė neprivaloma. Aš jos nenaudojau, nes T3 jungiasi be žmogaus, kuris galėtų ją įvesti.

## 3. Nusiųsk raktą (vienintelis kartas, kai rašai slaptažodį)

Windows neturi `ssh-copy-id`, todėl darome rankomis:

```powershell
type $env:USERPROFILE\.ssh\id_oldlaptop.pub | ssh USER@LAPTOP_IP "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

Pirmą kartą SSH paklaus, ar pasitiki nauju serveriu. Atsakyk `yes`. Tai įrašoma į `known_hosts`, todėl daugiau nebereikės.

## 4. Duok jam pravardę

Sukurk `C:\Users\<tu>\.ssh\config`. Taip, jis **be plėtinio**, todėl pasirūpink, kad Notepad nepavertų jo į `config.txt`:

```
Host oldlaptop
    HostName LAPTOP_IP
    User USER
    IdentityFile ~/.ssh/id_oldlaptop
    IdentitiesOnly yes
```

`IdentitiesOnly yes` reiškia, kad SSH siūlo tik šį raktą, o ne visus tavo raktus. Dabar be slaptažodžio veikia:

```powershell
ssh oldlaptop
```

## 5. Įdiek Node (ir ne naujausią)

Mint'o Node per senas, todėl naudojau NodeSource. Paprašiau „naujausio“ ir gavau Node 27, o paskui sužinojau, kad nelyginės Node versijos niekada netampa LTS. 27 yra beveik amžina beta. Verčiau imk LTS:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
node -v
```

T3 reikia naujos versijos (skaitytuose gidaluose mačiau 22.16 ar naujesnė), todėl tinka bet kuri dabartinė LTS.

## 6. Įdiek Claude Code

```bash
sudo npm install -g --allow-scripts=@anthropic-ai/claude-code @anthropic-ai/claude-code
claude --version
```

Keista vėliavėlė atsirado todėl, kad naujesnis npm pagal nutylėjimą blokuoja diegimo skriptus ir tik įspėja. Ši leidžia tik šį vieną paketą, vieną kartą. Neleisk skripto, kurio neatpažįsti.

Tada prisijunk. Per SSH naršyklės nėra, todėl `claude` išspausdina nuorodą. Atidaryk ją pagrindiniame kompiuteryje, prisijunk ir įklijuok gautą kodą atgal į terminalą.

```bash
claude -p "say hi"
```

Jei atsako, prisijungta. Aš šio žingsnio pamiršau ir stebėjausi, kodėl T3 mato agentą, kuris negali kalbėti.

## 7. Pasakyk nešiojamajam nemiegoti

Miegantis nešiojamasis yra labai lėtas nuotolinio valdymo pultas. Naudojau `mask`, kad užmigimas apskritai nebūtų galimas, o dangtį paprašiau tylėti:

```bash
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target

sudo mkdir -p /etc/systemd/logind.conf.d
printf '[Login]\nHandleLidSwitch=ignore\nHandleLidSwitchExternalPower=ignore\nHandleLidSwitchDocked=ignore\nIdleAction=ignore\n' | sudo tee /etc/systemd/logind.conf.d/nosleep.conf

sudo systemctl kill -s HUP systemd-logind
```

Paskutinė eilutė perkrauna nustatymus neperkraudama `logind`. Perkrovimas gali išmesti tave iš tavo paties SSH sesijos, o tai juokingas būdas tai sužinoti.

Patikrinimas: `systemctl status sleep.target` turi rodyti `masked`. Tada uždariau dangtį, ir mano SSH sesija tęsėsi, tarsi nieko nebūtų nutikę. Laikyk kroviklį prijungtą, o jei nešiojamasis įkaista, šiek tiek pakelk dangtį.

## 8. Prijunk T3 Code

Pagrindiniame kompiuteryje T3 programa gali pridėti nešiojamąjį kaip nuotolinę aplinką per SSH, todėl gijos veikia nešiojamajame, o langas lieka mano kompiuteryje. Kiek supratau, tai Settings → Connections → Add environment → SSH, ir įrašai `oldlaptop`. Pirmas prisijungimas lėtas, nes nešiojamajame įdiegiamas serveris. Prieš tai kartą pats paleisk `ssh oldlaptop`, nes programa negali atsakyti į klausimą „ar pasitiki šiuo serveriu?“.

Patikrinti galima taip: pradėk giją nešiojamajame ir paprašyk paleisti `hostname`. Jei atsakymas yra nešiojamojo vardas, o ne tavo kompiuterio, viskas veikia ten, kur reikia.

## Kas mane supainiojo

- **Sukūriau aplanką `.ai`, o `ls` nieko nerodė.** Pavadinimai, prasidedantys tašku, yra paslėpti. `ls -a` juos parodo. DI agentai jais naudojasi be problemų, bet įrankiai kaip ripgrep praleidžia paslėptus failus, jei nenurodai kelio. Jei T3 aplankų pasirinkimo langas jo nerodo, įrašyk pilną kelią arba padaryk matomą nuorodą: `ln -s ~/.ai ~/ai`.
- **Config failas.** Jis be plėtinio. Tikrink su `dir`, o ne pasitikėk Notepad.
- **Po rakto vis dar prašo slaptažodžio?** Pažiūrėk `ssh -v oldlaptop` ir `~/.ssh` (700) bei `authorized_keys` (600) teises.

## Kas toliau

Šito dar nepadariau, todėl laikyk tai planu, o ne išbandytu receptu:

- Paleisti T3 serverį nešiojamajame kaip foninę paslaugą, kad gijos veiktų ir uždarius programą. Tam reikia ir `loginctl enable-linger`, kitaip paslauga miršta, kai atsijungiu.
- Pridėti Tailscale, kad veiktų ir ne namuose, be maršrutizatoriuje atvertų prievadų į internetą.
- Tikrą ilgai trunkančią giją, kad pamatyčiau, ar ji išgyvena, kai viską uždarau.

Jei kas nors sulūš, atnaujinsiu įrašą. O kol kas nešiojamasis stovi uždarytu dangčiu ir dirba sunkiau nei per daugelį metų.
