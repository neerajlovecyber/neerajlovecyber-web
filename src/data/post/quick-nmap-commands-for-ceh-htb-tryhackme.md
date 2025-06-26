---
publishDate: 29-04-2025 00:00
title: Essential Nmap Commands for CEH, HTB, and TryHackMe
excerpt: A comprehensive guide to Nmap commands commonly used in ethical hacking, HackTheBox, and TryHackMe challenges. From basic scans to advanced techniques.
image: src/assets/images/posts/quick-nmap-commands-for-ceh-htb-tryhackme.png
category: Cybersecurity
tags:
  - nmap
  - CEH
  - HackTheBox
  - TryHackMe
metadata:
  canonical: https://neerajlovecyber.com/quick-nmap-commands-for-ceh-htb-tryhackme
---

import DListItem from '~/components/ui/DListItem.astro';

Nmap (Network Mapper) is an essential tool in every security professional's toolkit. Here's my personal collection of frequently used Nmap commands, especially useful for CEH certification, HackTheBox, and TryHackMe challenges.

## Host Discovery

Before diving into detailed scans, it's crucial to identify active hosts in your target network:

```bash
# Scan for alive hosts (no port scan)
nmap -sn $ip/24

# Faster host scan with no DNS resolution
nmap -sn -n $ip/24 > ip-range.txt

# Scan specific IP range
nmap -sP 10.0.0.0-100
```

> **Tip**: Use these commands to identify which hosts are up before diving into detailed port or vulnerability scans.

## Basic Scans

These are your bread-and-butter Nmap commands for initial reconnaissance:

```bash
# Basic scan of 1000 common ports
nmap [target]

# Scan all TCP ports (65535)
nmap -p- [target]

# Quick UDP scan
nmap -sU [target]

# Version & OS detection
nmap -sC -sV -O -oA initial [target]

# Fast scan of 100 common ports
nmap -F [target]
```

## Service & Vulnerability Enumeration

Deeper inspection of services and potential vulnerabilities:

```bash
# Default script scan & version detection
nmap -sC -sV -oN scan.txt [target]

# Scan for vulnerabilities
nmap --script vuln [target]

# Use multiple script categories
nmap --script vuln,safe,discovery -oN scan.txt [target]
```

> **Tip**: Running service detection (-sV) and using scripts can give you insights into what versions are running and potential vulnerabilities, helping you prioritize further actions.

## Specific Port Scans

Target specific ports or ranges:

```bash
# TCP scan of specific ports
nmap -p T:80,443,8080 [target]

# Full connect scan on all ports
nmap -v -p- -sT [target]

# Scan specific port range with no retries
nmap -p 21-25 [target] --max-retries 0
```

## Aggressive & Full Scans

When you need comprehensive results:

```bash
# Aggressive scan (faster)
nmap -T4 [target]

# Full TCP scan with scripts and version detection
nmap -sC -sV -p- -v -T4 -oN full.txt [target]

# Full UDP scan
nmap -sU -O -p- -T4 -oN nmap/udp.txt [target]

# Max scan delay control
nmap -sC -sV [target] -v --max-scan-delay=10
```

> **Tip**: Aggressive timing templates like -T4 speed up scans but can be more detectable. Consider using stealthier options if you want to avoid detection.

## Advanced Techniques

For more sophisticated scanning needs:

```bash
# Deep scanning - all ports with full connect
nmap -v -p- -sT $ip

# TCP SYN scan (stealthy)
nmap -sS [target]

# TCP ACK scan
nmap -sA [target]

# Top ports scan
nmap --top-ports=20 [target]
```

## Port Knocking

Sometimes services are hidden behind port knock sequences:

```bash
# Port knock with retries
for x in 7000 8000 9000; do
    nmap -Pn --host_timeout 201 --max-retries 0 -p $x $ip
done
```

## Useful Automation Tools

Several tools can help automate and enhance your Nmap scans:

1. **AutoRecon**: A multi-threaded network reconnaissance tool
   - GitHub: [AutoRecon](https://github.com/Tib3rius/AutoRecon)

2. **Onetwopunch**: Combines unicornscan and Nmap for efficient scanning
   - GitHub: [onetwopunch](https://github.com/superkojiman/onetwopunch.git)

3. **nmapAutomator**: Automates the Nmap scanning process
   - GitHub: [nmapAutomator](https://github.com/21y4d/nmapAutomator)

## Best Practices

1. **Start Broad, Then Focus**: Begin with host discovery and basic scans before diving into detailed port scans
2. **Consider the Network**: Use appropriate timing templates based on network stability
3. **Save Your Output**: Always use output options (-oN, -oX) for later reference
4. **Be Mindful of Noise**: More aggressive scans are noisier and more detectable

## Further Reading

For more advanced techniques on evading firewalls with Nmap, check out my detailed blog post on [Firewalls Evading Techniques in Nmap](https://neerajlovecyber.com/blog/firewall-evasion-nmap).

Remember, with great power comes great responsibility. Always ensure you have proper authorization before scanning any networks or systems.
