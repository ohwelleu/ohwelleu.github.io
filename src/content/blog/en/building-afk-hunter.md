---
title: "Building AFK Hunter in a day"
description: "How the decisions behind my little idle pixel game were made: what the options were and what tipped each one."
pubDate: 2026-10-31
tags: ["game", "pixel-art", "process"]
---

It started small: the top of my home page had an empty strip, and I wanted to put a game in it. By the end of the day it had become an idle pixel game, [AFK Hunter](/en/game), with its [own repository](https://github.com/ohwelleu/browser-afk-game). This post isn't a spec. It's a short note on how the main decisions were made.

## Its own repo, one script tag

The obvious option was to build the game straight into the site. I didn't want the blog to turn into a game project, so the game lives in a separate repo, and any page can show it with one `<script>` and an `<afk-game>` element. The site stays simple, and the game gets its own demo and its own releases.

In the end I took it off the home page anyway. It now lives on its own **Game** page.

## Duels instead of walking mobs

The first plan was the classic one: monsters walk in, you kill ten, the stage goes up. Then I played a rough demo and changed my mind halfway through the day. Now every stage is a **1-on-1 duel**: the hero on the left, one mob on the right, attacks on timers, coins for each win, and a boss on every sixth stage. If you die, you step back one stage and keep fighting there until you're stronger.

There's no offline progress. It's meant to tick along while the tab is open, not to nag you to come back.

## Numbers from a simulation, not a guess

I didn't tune the balance by feel. A quick simulation showed that if mob damage grew fast, the hero (whose health doesn't grow in this version) hit a wall that no amount of damage upgrades could get past. So mob damage now grows slowly, about 5% per stage. A boring fix, but it came from data instead of hope.

## Four tries at the hero

The art took the longest. The game uses my site's two colours (`#1f1f1f` and `#ece9e2`, which swap with the dark/light theme) plus the site's accent colours. Every sprite is a small text grid in the code, with no image files.

The hero went through four versions. First an AI-drawn 32×32 hunter. Then a taller one, which looked like a flat white blob. Then one built from proportions measured off a reference image (the AI won't copy someone else's character, only proportions and stance). None of them felt like mine, so I drew my own 32×64 assassin, with a red eye and a white hand. It went into the game pixel for pixel, and the attack became a slap with that white hand.

What I took from it: AI is good at structure and the plumbing of animation. The character itself is better when a person draws it.

## Music made in the browser

The music is two original synth tracks generated in the browser, with no audio files: a calm medieval ambient piece and a synthwave one, and you can switch between them. Drum and bass was on the list too, but it was far too much energy for an idle game on a blog. I also looked at a "no copyright" track on YouTube, but a title isn't a licence. The plan instead is an original 8-bit track in that style.

## One planner, several helpers

I built this with AI, but not in one long chat. There was one planning thread, plus separate threads for code, art, music and menus. Each worked in its own branch and sent pull requests that I reviewed. Plain documents kept them in sync: a plan, a backlog and a dated decision log. That log is where this post came from.

## What's next

A few things I've already agreed with myself to do:

- **A sprite converter**, so I can draw in a pixel editor and the game picks the art up directly, instead of an AI copying it pixel by pixel.
- **Fix the animations.** Only the hero's idle frame is truly mine; the attack, hurt and death frames were derived from it. I want to redraw them myself.
- **Draw another hero.**
- **Bigger weapons, mobs and a boss** to match the taller hero. The weapons were drawn for the old 32×32 one, and the mobs need to grow too.
- **The original 8-bit synthwave track** for the music menu.
- **Gameplay:** health upgrades for the hero (and then a rethink of mob damage), buying upgrades in bulk, and later new worlds with bats, ghouls and vampires.

If you want to see where it goes, [play it here](/en/game) or follow the [repo](https://github.com/ohwelleu/browser-afk-game).
