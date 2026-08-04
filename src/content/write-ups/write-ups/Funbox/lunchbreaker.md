---
title: "Lunchbreaker"
os: "Linux"
series: "Funbox"
summary: "My first CTF!"
pubDate: "28-07-2026"
difficulty: "Beginner"
heroImage: "/images/lunchbreaker.png"
---

(NOTE: This was my first CTF, so it may be a comparatively shoddy write-up compared to others, and I occasionally referenced guides when stuck)

![Pasted image 20260727162338.png](/images/lunchbreaker-pasted-image-20260727162338.png)

My initial scan showed three open ports:
- 21 - FTP
- 22 - SSH
- 80 - HTTP
Additionally, the scan showed that Anonymous FTP login is allowed on the server.

Checking the website, I found nothing visibly interesting on the public page immediately, however in the source code there was a comment

```html
<!-- webdesign by j.miller [jane@funbox8.ctf] -->
```

I made a note of this for later, however first I decided to see what was publicly through FTP

(I also poked around with gobuster and found robots.txt, which contained a couple of joke entries)

There existed a file 'sup3rs3cr3t', containing a mix of various `+._` characters, and a directory containing a basic wordpress site. 

I found nothing interesting in the wordpress directory, however upon further research, the found file does not contain gibberish, rather it contained an excerpt of text encoded via BrainFuck, a horrific-looking yet Turing-Complete programming language. Thankfully, this excerpt just contained the Einstein quote `Look deep into nature, and then you will understand everything better`

Whilst I thought this may be referencing the image displayed on the website, a field of lavender, upon some basic checking of metadata and potential stenographic hiding spots, this quote seemed to be a distraction.

After this dead-end, I decided to start seeing if anything came from the comment I spotted earlier, so I decided to run a quick brute force with Hydra, using 'jane' as the username.

Whilst I had no success with port 22, when I tried it on ftp, I had a near immediate hit.

The first thing I found, was `keys.txt` inside jane's home directory, however I was unable to figure out their intended use, assuming they were not just red herrings.

The most important thing, was that I could no see the names of other users on the server, `john, jules, jim`.

Using these usernames, I used Hydra to get the ftp credentials for both jim and jules, and whilst jim had nothing of note, inside `.backups` jules had two text files, `.good-passwds, .bad-passwds`

Through trial-and-error, I managed to get johns ssh credentials with hydra, using `.bad-passwds` as a wordlist.

Once inside the server, I found a todo list left behind, where john told himself to change the root password, as it was currently the same as his password. 

This was the final thing I needed to complete the CTF, and find the flag in the root users home directory :)

![Pasted image 20260728151536.png](/images/lunchbreaker-pasted-image-20260728151536.png)
