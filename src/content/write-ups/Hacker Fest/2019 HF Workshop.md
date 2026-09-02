---
title: "2019 HF Workshop"
os: "Linux"
pubDate: "07-08-2019"
difficulty: "Beginner"
series: "Hacker Fest"
description: "Very simple starter VM used in Martin Haller's Hacker Fest workshop!"
heroImage: "/vulnhub-writeups-site/images/webmin.png"
---

This was a super simple box, but it still gave me enough trouble that I learnt a couple of interesting things along the way. Starting out as per the usual I did an nmap scan to see what I was working with:

![](../../../../public/images/Pasted%20image%2020260902150612.png)

What perked my interest immediately was the weird sounding service running on port 1000. What is 'snet-sensor-mgmt', and why is it on such a nice round number?

A quick google told me that it's the default service name nmap sticks on port 1000 when it's not sure what's running. Makes sense, so I had a further look:
![](../../../../public/images/Pasted%20image%2020260902150931.png)

Well this isn't much help to me! Why would Computer Aided Design Lock be running on this? Has it got a super cool vuln to exploit? Nope, it's just another obscure legacy software-locking service which nmap also defaults port 1000 to...

Finally, when I used -sV to figure out what was really going on, I got told the truth. 'MiniServ 1.8.9.0', a webmin component. Immediately I started looking for any known CVEs, and I quickly found one that uses a simple post request to run commands as root. 

I fired up msfconsole, found webin_backdoor, set (what I thought) were the required options and... nothing!

It had failed to create a session. I had a look around, double checked this vuln does exist on the VM, until I finally realised the reason for the failure. One option in msfconsole was to set whether the site uses SSL, and if you scroll up to one of the earlier screenshots you will indeed see, SSL!

I set that to true, and just like that I was off to the races! I had a session as root, I made it look a bit prettier with the classic 
```
python -c 'import pty;pty.spawn("/bin/bash")'
```
, stumbled into the root home directory, and just like that I had the flag! 

A lovely quick and easy box, with a couple of interesting tidbits to make it worth my while. 

![](../../../../public/images/Pasted%20image%2020260902151819.png)
