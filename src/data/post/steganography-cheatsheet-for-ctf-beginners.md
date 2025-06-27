---
title: Steganography Cheatsheet for CTF Beginners
draft: true
excerpt: A complete Steganography 101 CTF Cheatsheet covering essential tools,
  techniques, and tips to solve image, audio, and file-based stego challenges.
  Perfect for beginners and CTF players looking to master hidden data analysis.
publishDate: 2025-06-27 22:58
tags:
  - cheatsheet
  - Steganography
  - CTFs
category: Steganography
metadata:
  canonical: https://neerajlovecyber.com/steganography-cheatsheet-for-ctf-beginners
---
**Steganography** is the art of concealing messages in plain sight — hiding data in files that _appear_ normal. In **Capture The Flag (CTF)** contests, stego challenges often hide flags inside images, audio, videos, PDFs, or metadata.

* * *

## 📁 Step-by-Step File Analysis

### 🔍 Basic Commands

```
file target.jpg strings target.jpg | head -n 50 xxd target.jpg | head hexdump -C target.jpg | head
```

Check the file’s true type, readable strings, and hex patterns. You may discover plaintext flags, passwords, or data headers.

* * *

### 🧵 Metadata Extraction

```
exiftool target.jpg
```

Extract EXIF comments, timestamps, GPS info, and hidden metadata.

Also try:

```
exiv2 target.jpg
```

For direct metadata manipulation or cleanup.

* * *

## 🧩 Embedded File Discovery

### 🔍 [Binwalk](https://github.com/ReFirmLabs/binwalk) – File Carving Tool

`binwalk -Me target.jpg`

**Key Options:**

*   `-e`: Extract embedded files
    
*   `-M`: Recursive extraction
    
*   `-z`: Carve data blocks without extraction
    
*   `-R`: Raw hex pattern match (e.g., `\x1f\x8b` for gzip)
    
*   `-E`: Entropy scanning
    
*   `-W`: Hex diff mode
    

Use `dd` if you manually need to extract embedded segments.

* * *

## 🎨 Image Steganography

### 🖼 Visual Tricks

1.  Open image and observe — flag may be painted in.
    
2.  Use **[GIMP](https://www.gimp.org/)**: adjust brightness, contrast, curves, color levels.
    
3.  Use **[ImageMagick](http://www.imagemagick.org/script/index.php)** to compare images:
    

```
compare original.png modified.png diff.png
```

* * *

### 🔧 Bit-Level Tools

| Tool | Usage |
| --- | --- |
| [`stegsolve`](https://github.com/zardus/ctf-tools/tree/master/stegsolve) | Bit-plane viewer (bit-level hidden info) |
| [`zsteg`](https://github.com/zed-0xff/zsteg/) | Bit analysis of PNG/BMP |
| [`stegonline`](https://stegonline.georgeom.net/) | Web-based image steg operations |
| [`Steganabara`](https://github.com/Denbergvanthijs/Steganabara) | LSB amplifier & visualizer |
| [`sigBits`](https://github.com/Pulho/sigBits) | Significant bits stego decoder |
| [`pngcheck`](http://www.libpng.org/pub/png/apps/pngcheck.html) | Dump/analyze PNG chunks |
| [`pngtools`](https://packages.debian.org/sid/pngtools) | Deep chunk-level PNG analysis |

Use stegsolve to identify QR codes, LSB data, or color-filtered patterns.

* * *

### 🧰 Extraction Tools

| Tool | Usage |
| --- | --- |
| [`steghide`](http://steghide.sourceforge.net/) | Hide/extract in JPG, BMP, WAV |
| [`stegseek`](https://github.com/RickdeJager/stegseek) | Fast brute-force for `steghide` |
| [`stegcracker`](https://github.com/Paradoxis/StegCracker) | Brute-force JPG stego files |
| [`outguess`](https://www.freebsd.org/cgi/man.cgi?query=outguess+&apropos=0&sektion=0&manpath=FreeBSD+Ports+5.1-RELEASE&format=html) | Stego in JPG/PPM files |
| [`stegextract`](https://github.com/evyatarmeged/stegextract) | Auto-detect hidden data |
| [`jsteg`](https://github.com/lukechampine/jsteg) | LSB-based JPEG stego |
| [`stegpy`](https://github.com/dhsdshdhk/stegpy) | Simple Python LSB tool |
| [`stegosaurus`](https://github.com/AngelKitty/stegosaurus) | Embed data into Python bytecode |
| [`Snow/stegsnow`](https://darkside.com.au/snow/) | Whitespace stego tool |

Example:

```
steghide extract -sf secret.jpg stegseek secret.jpg rockyou.txt
```

* * *

### 🖼 Online Tools

*   [**StegOnline**](https://stegonline.georgeom.net/)
    
*   [**Steganography Online**](https://stylesuxx.github.io/steganography/)
    
*   [**Image Steganography**](https://manytools.org/)
    
*   [**FotoForensics**](https://fotoforensics.com/)
    
*   [**AperiSolve**](https://aperisolve.fr) – Multi-layer analyzer
    
*   [**Image ELA**](https://29a.ch/sandbox/2012/imageerrorlevelanalysis/) – Error level analysis (detects manipulations)
    

* * *

## 🎧 Audio Steganography

### 🔊 Useful Tools

| Tool | Purpose |
| --- | --- |
| [`DeepSound`](https://github.com/Jpinsoft/DeepSound) | Hide/extract files in `.wav` audio |
| [`sonic-visualiser`](https://www.sonicvisualiser.org/) | Visualize spectrograms, waveforms |
| [`audacity`](https://www.audacityteam.org/) | Waveform editing, reversal, decoding |
| [`DTMF Detection`](https://unframework.github.io/dtmf-detect/) | Decodes dial tones from audio |
| [`Snow` / `stegsnow`](https://darkside.com.au/snow/) | Whitespace stego in audio |

Use **[sonic-visualiser](https://www.sonicvisualiser.org/)** with linear/log scale spectrogram + contrast filters.

* * *

## 🎥 Video Steganography

### 🔍 Frame & Audio Extraction

```
ffmpeg -i video.mp4 frame_%04d.png
```

*   Analyze individual frames using [`zsteg`](https://github.com/zed-0xff/zsteg/), [`stegsolve`](https://github.com/zardus/ctf-tools/tree/master/stegsolve).
    
*   Open audio separately in **[Audacity](https://www.audacityteam.org/)** for reverse/LSB tricks.
    

Tool:  
[**hipshot**](https://bitbucket.org/eliteraspberries/hipshot/src/master/) — Convert video/photo series into long-exposure-style images to reveal stego data.

* * *

## 📄 PDF Stego

### 🔐 Text & Metadata

```
pdfinfo file.pdf pdftotext file.pdf output.txt
```

### 🔓 Crack Protected PDFs

```
pdf2john file.pdf > hash.txt john --wordlist=rockyou.txt hash.txt
```

* * *

## 🔥 Advanced Tricks & Scripts

### 📊 Convert Binary to Image

```
convert -depth 8 -size 300x300+0 gray:data.raw output.png
```

View strange binary blobs visually.

* * *

### 🧬 Invert Pixel Colors (Python)

```
from PIL import Image img = Image.open('input.png') pixels = [(255-r, 255-g, 255-b) for r, g, b in img.getdata()] out = Image.new(img.mode, img.size) out.putdata(pixels) out.save("inverted.png")
```

* * *

## 🌍 OSINT & Comparisons

*   [**TinEye**](https://www.tineye.com): Reverse search
    
*   Use **[ImageMagick](http://www.imagemagick.org/script/index.php)** or **diff-pixel tools** for overlays
    
*   Compare layers in Adobe/GIMP if image has metadata for layer stacking
    

* * *

## 🛠️ Tool Index (Summary)

| Tool | Category | Function |
| --- | --- | --- |
| [`AperiSolve`](https://aperisolve.fr/) | Online | Layer inspection |
| [`FotoForensics`](https://fotoforensics.com/) | Online | ELA and manipulation detection |
| [`BPStegano`](https://github.com/TapanSoni/BPStegano) | CLI | LSB encoding (Python3) |
| [`Stegsolve`](https://github.com/zardus/ctf-tools/tree/master/stegsolve) | GUI (Java) | Bit-layer viewer |
| [`Zsteg`](https://github.com/zed-0xff/zsteg/) | CLI | PNG/BMP LSB decoding |
| [`Steghide`](http://steghide.sourceforge.net/) | CLI | Stego in image/audio |
| [`Stegseek`](https://github.com/RickdeJager/stegseek) | CLI | Brute-force `steghide` |
| [`Outguess`](https://www.freebsd.org/cgi/man.cgi?query=outguess+&apropos=0&sektion=0&manpath=FreeBSD+Ports+5.1-RELEASE&format=html) | CLI | JPG/PPM stego |
| [`Snow` / `Stegsnow`](https://darkside.com.au/snow/) | CLI | Whitespace stego |
| [`jsteg`](https://github.com/lukechampine/jsteg) | CLI | JPEG LSB |
| [`sigBits`](https://github.com/Pulho/sigBits) | CLI | LSB decoder |
| [`stegcracker`](https://github.com/Paradoxis/StegCracker) | CLI | JPG bruteforce stego |
| [`stegextract`](https://github.com/evyatarmeged/stegextract) | CLI | Auto extract data |
| [`ImageMagick`](http://www.imagemagick.org/script/index.php) | CLI | Compare, convert, XOR |
| [`pngcheck`](http://www.libpng.org/pub/png/apps/pngcheck.html) | CLI | PNG chunk inspection |
| [`pngtools`](https://packages.debian.org/sid/pngtools) | CLI | Advanced PNG analysis |
| [`StegOnline`](https://stegonline.georgeom.net/) | Web | Encode/Decode images |
| [`Image Steganography`](https://incoherency.co.uk/image-steganography/) | Web | JS-based LSB tool |
| [`OpenStego`](https://www.openstego.com/) | GUI | Random LSB |
| [`DeepSound`](https://github.com/Jpinsoft/DeepSound) | GUI | Audio file steganography |
| [`hipshot`](https://bitbucket.org/eliteraspberries/hipshot/src/master/) | CLI | Video → long exposure frame |
| [`sonic-visualiser`](https://www.sonicvisualiser.org/) | GUI | Audio spectrum viewer |
| [`DTMF Tools`](https://unframework.github.io/dtmf-detect/) | Audio | Decode dial tones |
| [`pdf2john`](https://github.com/openwall/john) | CLI | Crack PDF password |
| [`Stegosaurus`](https://github.com/AngelKitty/stegosaurus) | Python | Embed in bytecode |
| [`StegoVeritas`](https://github.com/bannsec/stegoVeritas) | Python | Multi-stego toolkit |
| [`Stegpy`](https://github.com/dhsdshdhk/stegpy) | Python | Basic LSB tool |
| [`BPStegano`](https://github.com/TapanSoni/BPStegano) | Python | LSB encoding (Python3) |
| [`Steganabara`](https://github.com/Denbergvanthijs/Steganabara) | GUI | LSB amplifier & visualizer |
| [`Magic Eye Solver`](http://magiceye.ecksdee.co.uk/) | Web | Hidden info from images |
| [`SmartDeblur`](https://github.com/Y-Vladimir/SmartDeblur) | GUI | Deblur images |
| [`Exiv2`](https://www.exiv2.org/manpage.html) | CLI | Image metadata manipulation |
| [`Exif`](http://manpages.ubuntu.com/manpages/trusty/man1/exif.1.html) | CLI | Show EXIF info |
| [`Stegbreak`](https://linux.die.net/man/1/stegbreak) | CLI | Brute-force JPG stego |
| [`Binwalk`](https://github.com/ReFirmLabs/binwalk) | CLI | Embedded file extraction |