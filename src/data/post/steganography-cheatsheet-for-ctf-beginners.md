---
title: Steganography Cheatsheet for CTF Beginners
draft: true
excerpt: A complete Steganography 101 CTF Cheatsheet covering essential tools,
  techniques, and tips to solve image, audio, and file-based stego challenges.
  Perfect for beginners and CTF players looking to master hidden data analysis.
publishDate: 2025-06-27 22:58
tags:
  - cheatsheet
  - "Steganography "
  - CTFs
category: "Steganography "
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

### 🔍 Binwalk – File Carving Tool

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
    
2.  Use **GIMP**: adjust brightness, contrast, curves, color levels.
    
3.  Use **ImageMagick** to compare images:
    

```
compare original.png modified.png diff.png
```

* * *

### 🔧 Bit-Level Tools

| Tool | Usage |
| --- | --- |
| `stegsolve` | Bit-plane viewer (bit-level hidden info) |
| `zsteg` | Bit analysis of PNG/BMP |
| `stegonline` | Web-based image steg operations |
| `Steganabara` | LSB amplifier & visualizer |
| `sigBits` | Significant bits stego decoder |
| `pngcheck` | Dump/analyze PNG chunks |
| `pngtools` | Deep chunk-level PNG analysis |

Use stegsolve to identify QR codes, LSB data, or color-filtered patterns.

* * *

### 🧰 Extraction Tools

| Tool | Usage |
| --- | --- |
| `steghide` | Hide/extract in JPG, BMP, WAV |
| `stegseek` | Fast brute-force for `steghide` |
| `stegcracker` | Brute-force JPG stego files |
| `outguess` | Stego in JPG/PPM files |
| `stegextract` | Auto-detect hidden data |
| `jsteg` | LSB-based JPEG stego |
| `stegpy` | Simple Python LSB tool |
| `stegosaurus` | Embed data into Python bytecode |
| `Snow/stegsnow` | Whitespace stego tool |

Example:

```
steghide extract -sf secret.jpg stegseek secret.jpg rockyou.txt
```

* * *

### 🖼 Online Tools

*   [**StegOnline**](https://georgeom.net/StegOnline)
    
*   [**Steganography Online**](https://stylesuxx.github.io/steganography/)
    
*   [**Image Steganography**](https://manytools.org/)
    
*   [**FotoForensics**](https://fotoforensics.com/)
    
*   [**AperiSolve**](https://aperisolve.fr) – Multi-layer analyzer
    
*   **Image ELA** – Error level analysis (detects manipulations)
    

* * *

## 🎧 Audio Steganography

### 🔊 Useful Tools

| Tool | Purpose |
| --- | --- |
| `DeepSound` | Hide/extract files in `.wav` audio |
| `sonic-visualiser` | Visualize spectrograms, waveforms |
| `audacity` | Waveform editing, reversal, decoding |
| `DTMF Detection` | Decodes dial tones from audio |
| `Snow` / `stegsnow` | Whitespace stego in audio |

Use **sonic-visualiser** with linear/log scale spectrogram + contrast filters.

* * *

## 🎥 Video Steganography

### 🔍 Frame & Audio Extraction

```
ffmpeg -i video.mp4 frame_%04d.png
```

*   Analyze individual frames using `zsteg`, `stegsolve`.
    
*   Open audio separately in **Audacity** for reverse/LSB tricks.
    

Tool:  
**hipshot** — Convert video/photo series into long-exposure-style images to reveal stego data.

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
    
*   Use **ImageMagick** or **diff-pixel tools** for overlays
    
*   Compare layers in Adobe/GIMP if image has metadata for layer stacking
    

* * *

## 🛠️ Tool Index (Summary)

| Tool | Category | Function |
| --- | --- | --- |
| `AperiSolve` | Online | Layer inspection |
| `FotoForensics` | Online | ELA and manipulation detection |
| `BPStegano` | CLI | LSB encoding (Python3) |
| `Stegsolve` | GUI (Java) | Bit-layer viewer |
| `Zsteg` | CLI | PNG/BMP LSB decoding |
| `Steghide` | CLI | Stego in image/audio |
| `Stegseek` | CLI | Brute-force `steghide` |
| `Outguess` | CLI | JPG/PPM stego |
| `Snow` / `Stegsnow` | CLI | Whitespace stego |
| `jsteg` | CLI | JPEG LSB |
| `sigBits` | CLI | LSB decoder |
| `stegcracker` | CLI | JPG bruteforce stego |
| `stegextract` | CLI | Auto extract data |
| `ImageMagick` | CLI | Compare, convert, XOR |
| `pngcheck` | CLI | PNG chunk inspection |
| `pngtools` | CLI | Advanced PNG analysis |
| `StegOnline` | Web | Encode/Decode images |
| `Image Steganography` | Web | JS-based LSB tool |
| `OpenStego` | GUI | Random LSB |
| `DeepSound` | GUI | Audio file steganography |
| `hipshot` | CLI | Video → long exposure frame |
| `sonic-visualiser` | GUI | Audio spectrum viewer |
| `DTMF Tools` | Audio | Decode dial tones |
| `pdf2john` | CLI | Crack PDF password |
| `Stegosaurus` | Python | Embed in bytecode |
| `StegoVeritas` | Python | Multi-stego toolkit |
| `Stegpy` | Python | Basic LSB tool |