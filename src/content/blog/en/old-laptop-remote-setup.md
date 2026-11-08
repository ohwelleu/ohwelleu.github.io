---
title: "Giving an old laptop a second career as a remote AI box"
description: "A step-by-step setup: SSH keys, Node, Claude Code and a laptop that refuses to sleep, so I can control it from my main PC."
pubDate: 2026-11-08
tags: ["linux", "ssh", "t3-code", "setup"]
---

I have an old laptop that spends its days doing nothing. I also have a main PC that I'd rather not run every AI thread on. So the laptop gets a promotion: it will run [T3 Code](https://github.com/pingdotgg/t3code) and its agents, and my main PC will just be the remote control.

This is the setup, step by step, in the order I did it (including the parts where I tripped). The laptop runs Linux Mint, my main PC runs Windows. Wherever you see `USER` and `LAPTOP_IP`, put your own.

## 1. Update it first

An old laptop has a lot of updates waiting for it. Plug in the charger, then:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y openssh-server git curl
sudo systemctl enable --now ssh
```

Use `upgrade`, not a release upgrade. Reboot if it asks. Then write down two things, because you'll need them later:

```bash
hostname -I   # the laptop's IP
whoami        # your username
```

## 2. Make a key on the main PC

Windows already ships with an SSH client. I made a separate key just for this laptop, so my other keys stay out of it:

```powershell
ssh-keygen -t ed25519 -f $env:USERPROFILE\.ssh\id_oldlaptop -C "main-pc"
```

The `-C` part is only a label stuck on the end of the public key, so you can tell your keys apart later. It does nothing else. A passphrase is optional. I skipped it, because T3 connects without a human around to type one.

## 3. Send the key over (the only time you type the password)

Windows has no `ssh-copy-id`, so we do it by hand:

```powershell
type $env:USERPROFILE\.ssh\id_oldlaptop.pub | ssh USER@LAPTOP_IP "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

The first time, SSH asks if you trust the new host. Say `yes`. It remembers that in `known_hosts`, so you don't have to do this again.

## 4. Give it a nickname

Create `C:\Users\<you>\.ssh\config`. Yes, it has **no file extension**, so make sure Notepad doesn't turn it into `config.txt`:

```
Host oldlaptop
    HostName LAPTOP_IP
    User USER
    IdentityFile ~/.ssh/id_oldlaptop
    IdentitiesOnly yes
```

`IdentitiesOnly yes` means SSH offers only this key and not every key you own. Now this works with no password:

```powershell
ssh oldlaptop
```

## 5. Install Node (and not the newest one)

Mint's own Node is too old, so I used NodeSource. I asked for "the latest", got Node 27, and then learned that odd-numbered Node versions never become LTS. 27 is basically a permanent beta. Take the LTS instead:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
node -v
```

T3 wants a recent version (I saw 22.16 or newer in the guides I read), so anything that's current LTS is fine.

## 6. Install Claude Code

```bash
sudo npm install -g --allow-scripts=@anthropic-ai/claude-code @anthropic-ai/claude-code
claude --version
```

The odd-looking flag exists because newer npm blocks install scripts by default and warns you instead. This allows just this one package, once. Don't approve a script you don't recognise.

Then log in. Over SSH there's no browser, so `claude` prints a URL. Open it on your main PC, sign in, and paste the code back into the terminal.

```bash
claude -p "say hi"
```

If it answers, it's logged in. I forgot this step and wondered why T3 saw an agent that couldn't talk.

## 7. Tell the laptop not to sleep

A sleeping laptop is a very slow remote control. I used `mask` so that suspend can't happen at all, and told the lid to be quiet:

```bash
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target

sudo mkdir -p /etc/systemd/logind.conf.d
printf '[Login]\nHandleLidSwitch=ignore\nHandleLidSwitchExternalPower=ignore\nHandleLidSwitchDocked=ignore\nIdleAction=ignore\n' | sudo tee /etc/systemd/logind.conf.d/nosleep.conf

sudo systemctl kill -s HUP systemd-logind
```

The last line reloads the settings without restarting `logind`. A restart can kick you out of your own SSH session, which is a funny way to find out.

To check: `systemctl status sleep.target` should say `masked`. I then closed the lid and my SSH session carried on as if nothing had happened. Keep the charger plugged in, and prop the lid open a bit if the laptop gets warm.

## 8. Connect T3 Code

On the main PC, the T3 desktop app can add the laptop as a remote environment over SSH, so threads run on the laptop while the window stays on my PC. As far as I can tell, it's Settings → Connections → Add environment → SSH, and you enter `oldlaptop`. The first connection is slow because it installs the server on the laptop. Run `ssh oldlaptop` once by hand before that, because the app can't answer the "do you trust this host?" question.

To check that it works, start a thread on the laptop and ask it to run `hostname`. If the answer is the laptop's name and not your PC's, it's running where you want it.

## Things that confused me

- **I made a folder called `.ai` and `ls` showed nothing.** Names that start with a dot are hidden. `ls -a` shows them. AI agents can use them fine, but tools like ripgrep skip hidden files unless you give the path. If the T3 folder picker doesn't list it, type the full path or make a visible symlink: `ln -s ~/.ai ~/ai`.
- **The config file.** It has no extension. Check with `dir`, not by trusting Notepad.
- **Still asked for a password after the key?** Look at `ssh -v oldlaptop` and the permissions on `~/.ssh` (700) and `authorized_keys` (600).

## What's next

I haven't done these yet, so treat them as the plan and not as a tested recipe:

- Run the T3 server on the laptop as a background service, so that threads keep running when I close the app. That means `loginctl enable-linger` as well, or the service dies when I log out.
- Add Tailscale, so it works away from home too, with no router ports open to the internet.
- A real long-running thread, to see whether it survives me closing everything.

If any of this breaks, I'll update the post. Until then, the laptop sits there with its lid closed, working harder than it has in years.
