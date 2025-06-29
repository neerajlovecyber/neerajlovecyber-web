---
title: Linux Commands for Hackers:Essential Commands Cheat Sheet
draft: true
slug: essential-linux-commands-for-hackers-ctf-cheat-sheet
metadata:
  canonical: https://neerajlovecyber.com/essential-linux-commands-for-hackers-ctf-cheat-sheet
excerpt: "Linux Commands for Hackers: Your Essential Cheat Sheet. Perfect for
  cybersecurity beginners, CTF players, and ethical hackers. Master the terminal
  today!"
publishDate: 2025-06-29 09:42
tags:
  - linux
  - cheatsheet
  - security
  - ctfs
category: linux
---
If you're learning ethical hacking, Linux is your battlefield. Most CTF labs, real-world targets, and cybersecurity tools are Linux-based — and the command line is your weapon.

This guide is for beginners coming from Windows or GUI-heavy environments who want to become comfortable with the Linux shell. Below, you'll find 25+ practical commands, explained clearly, followed by a print-ready cheatsheet.

## Why Hackers Need the Terminal

*   Most hacking tools (Nmap, Netcat, Metasploit) run on Linux.
    
*   You often get access to targets via shell or SSH, not GUI.
    
*   Privilege escalation, file enumeration, and tool installation are faster through the terminal.
    
*   In real-world systems, the GUI is often disabled or unavailable.
    

## Essential Linux Commands for Hackers

### 1\. `pwd` — Print Working Directory

```
pwd
```

Shows your current location in the filesystem.

### 2\. `cd` — Change Directory

```
cd /etc
cd ..     # One level up
cd ~      # Home directory
cd -      # Previous directory
```

### 3\. `ls` — List Files and Directories

```
ls
ls -l     # Long listing
ls -a     # Show hidden files
```

### 4\. `cat` — Show File Contents

```
cat file.txt
```

Use to read simple files like credentials or configs.

### 5\. `less` — View Long Files

```
less bigfile.txt
```

Scroll up/down with arrow keys or space.

### 6\. `head` / `tail` — View Start or End of Files

```
head /etc/passwd
tail /var/log/auth.log
```

### 7\. `touch` — Create New File

```
touch notes.txt
```

### 8\. `mkdir` — Make Directory

```
mkdir loot
mkdir -p recon/web/fuzz
```

### 9\. `cp` — Copy Files and Folders

```
cp file.txt backup.txt
cp -r dir1 dir2
```

### 10\. `mv` — Move or Rename

```
mv old.txt new.txt
mv file.txt /tmp/
```

### 11\. `rm` — Remove Files or Directories

```
rm file.txt
rm -rf folder/
```

### 12\. `find` — Locate Files

```
find / -name "*.conf" 2>/dev/null
find / -perm -4000 -type f 2>/dev/null # Find SUID binaries
```

### 13\. `grep` — Search Inside Files

```
grep "admin" *.txt
grep -rin "password" /etc
```

### 14\. `nano` / `vi` — Edit Text Files

```
nano config.txt
vi script.sh
```

### 15\. `chmod` — Change Permissions

```
chmod +x exploit.sh
chmod 644 secrets.txt
```

### 16\. `chown` — Change Ownership

```
chown user:group file.txt
```

### 17\. `ps` — View Processes

```
ps aux
ps -ef | grep apache
```

### 18\. `top` / `htop` — Monitor System Usage

```
top
htop # If installed
```

### 19\. `df` — Check Disk Space

```
df -h
```

### 20\. `du` — Check Folder Size

```
du -sh *
```

### 21\. `wget` / `curl` — Download Files

```
wget http://example.com/file.sh
curl -O http://example.com/file.sh
```

### 22\. `sudo` — Run as Root

```
sudo command
```

Check accessible commands:

```
sudo -l
```

### 23\. `id` — Show Current User and Groups

```
id
```

### 24\. `whoami` — Show Logged-In User

```
whoami
```

### 25\. `netstat` / `ss` — Check Open Ports

```
netstat -tuln
ss -tuln
```

### 26\. `hostname` / `uname` — System Info

```
hostname
uname -a
```

### 27\. `tar` / `zip` — Archive or Extract

```
tar -czvf archive.tar.gz folder/
tar -xzvf archive.tar.gz
zip -r out.zip folder/
unzip out.zip
```

### 28\. `useradd` / `passwd` — Add Users

```
sudo useradd hacker
sudo passwd hacker
```

### 29\. `usermod` — Add User to Group

```
sudo usermod -aG sudo hacker
```

### 30\. `history` — Show Past Commands

```
history
```

## Linux Command-Line Cheatsheet for Hackers

```
====================[ SYSTEM & USER INFO ]====================
whoami               → Show current user
id                   → Display UID, GID, groups
hostname             → Show system hostname
uname -a             → Kernel and system details
uptime               → System load and uptime

======================[ NAVIGATION ]==========================
pwd                  → Show current directory
cd /path             → Change directory
cd ..                → Go up one level
cd -                 → Previous directory
ls -alh              → List files (detailed, incl. hidden)

====================[ FILE MANAGEMENT ]=======================
touch file           → Create empty file
cp src dst           → Copy file or folder
mv old new           → Rename or move file/folder
rm file              → Delete file
rm -rf folder        → Force remove directory
mkdir name           → Create new directory
mkdir -p a/b/c       → Create nested directories

====================[ FILE CONTENT VIEWING ]==================
cat file             → Show entire file
less file            → Scroll through file
head file            → Show first 10 lines
tail file            → Show last 10 lines
tail -f logfile      → Live log monitoring

====================[ SEARCHING & FINDING ]===================
grep "text" file     → Search in file
grep -r "str" dir    → Recursive grep
find / -name "file"  → Find file by name
find / -perm -4000   → Find SUID binaries (Privilege Esc)
locate keyword       → Fast file location (if installed)

======================[ PERMISSIONS ]=========================
ls -l                → Show file permissions
chmod +x file        → Make executable
chmod 755 file       → rwxr-xr-x
chown user:group f   → Change file owner
chmod -R 755 dir     → Recursively set permissions

======================[ NETWORKING ]==========================
ip a                 → Show IP addresses
ping host            → Check connectivity
ss -tuln             → Show listening ports
netstat -tulnp       → Show all network connections
wget URL             → Download via HTTP
curl -O URL          → Download via curl

===================[ PROCESS MANAGEMENT ]=====================
ps aux               → List all running processes
top                  → Live system monitor
htop                 → Advanced process monitor (if installed)
kill PID             → Kill a process
killall name         → Kill process by name

===================[ ARCHIVING & COMPRESSION ]================
tar -czvf a.tar.gz f → Compress folder to .tar.gz
tar -xzvf file.tar.gz→ Extract tar.gz file
zip -r out.zip dir   → Create zip file
unzip file.zip       → Extract zip file

====================[ PACKAGE MANAGEMENT ]====================
apt update           → Update package index (Debian/Ubuntu)
apt install pkg      → Install a package
apt remove pkg       → Remove a package
dnf install pkg      → Install on Fedora/RHEL
dnf remove pkg       → Remove from Fedora/RHEL

====================[ PRIVILEGE ESCALATION ]==================
sudo command         → Run as root
sudo -l              → Show allowed sudo commands
find / -perm -4000   → Find SUID binaries
cat /etc/passwd      → View user accounts
cat /etc/shadow      → Encrypted passwords (root access needed)

======================[ MISC & UTILITIES ]=====================
history              → Show recent commands
clear                → Clear the terminal
echo $VAR            → Print variable
export VAR=value     → Set environment variable
alias ll='ls -alh'   → Define command alias
```

## Final Thoughts

These Linux commands are foundational for hackers and cybersecurity learners. You’ll use them to:

*   Navigate and explore compromised systems
    
*   Investigate misconfigurations
    
*   Upload payloads
    
*   View logs and credentials
    
*   Escalate privileges
    
*   Manage tools and scripts
    

Practice regularly in platforms like TryHackMe, HackTheBox, or your own Kali/Parrot VM.