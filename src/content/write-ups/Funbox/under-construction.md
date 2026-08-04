---
title: "Under Construction!"
os: "Linux"
series: "Funbox"
description: "Exploit galore with linpeas.sh saving the day!"
pubDate: "29-07-2026"
heroImage: "/images/under_construction.jpg"
difficulty: "Beginner"
---
My first step was to do an NMAP scan, to see what attack vectors I had available to me

![](/images/under-construction-pasted-image-20260729203937.png)

Quite a few ports were open, however I decided I'd check out the ones I'm more familiar with first, so I checked to see what their website on port 80 had to show.

The website was pretty plain, and nothing stood out to me initially, however when poking around using gobuster to check for hidden directories, I found something rather interesting![](/images/under-construction-pasted-image-20260729204635.png)

This directory lead to an oscommerce setup page, and whilst it didn't seem like I could do much from there manually, a simple searchsploit query showed me that this would definitely a vulnerability worth chasing.

This specific outdated version (2.3.4.1), was susceptible to a RCE (remote code execution) exploit, so I booted msfconsole and I shortly was in via the account www-data.

After setting up a shell with `python -c 'import pty;pty.spawn("/bin/bash"'` , I started poking around for privilege escalation opportunities. 

I also found the names of the users on the account, and a little poking with Hydra got me into Susan's account, however her home directory had nothing useful to me. (NOTE: There was something interesting going on with this account, as it was in the adm group, and seemingly had a cron job running in the account, but as you see I went with a much simpler approach rather than explore this avenue)

First I had a look manually, for programs with the SUID bit set, but I had no luck there, so then I outsourced the work to linpeas.sh.

This handy script gave me a bunch of exploits this kernel version was susceptible too, and after some trial and error with them, finally pwnkit (cve_2021_4034) worked for me.

This gave me root access just like that, and I was able to grab the flag, and defeat my first CTF unassisted (Not included are my 3-ish hours being ran in circles by the kernel exploits I couldn't get to work...)

![](/images/under-construction-pasted-image-20260729205835.png)
