---
layout: post.njk
title: how much do soulseek users really love their flacs
date: 2026-11-25
tags: posts
---

ok so this is a experiment i tried to do a while back but it failed because... well i don't actually remember why. but regardless i felt like i needed to try it again because it may have lasted too short.

the idea was this:
- take my lossy music library and convert all to lossless flacs (which means still lossy)
- host only the flacs on soulseek
- see how much of a increase there is in my uploads

that's it, i wanted to see if people on soulseek would download audio files because of filetype even if what they were getting wasn't real lossless.


my music library consists of ~1600 opus files. i want to keep as much quality and save as much space as possible, opus at 96kbps absolutely crushes everything in quality (compared to bitrate) and works in most media players i care about. if anything converting between is incredibly simple anyway.

i basically normalize everything i download to opus, even if theres quality loss because you cannot tell the difference unless you're REALLY comparing side by side.
and with the ongoing hardware shortages, you bet i want to save as much storage as possible

regardless, i want to see how my uploads will increase when i convert to flacs because i barely get any and so i want to know like What soulseek Is. my internet is also shit but like that's not the point here people will actually gladly wait 1 hour. hello i am people.


## how i did this
the converting part is pretty simple. i wrote a python script that walks my music folder and then we take every file and convert it to flac, outputted to a Fake music folder dupe clone hack. i know you can make this faster with `multiprocessing` probably, i don't care.

here's the code:
```py
import glob, subprocess
from pathlib import Path


for f in glob.glob("Music/**/*.opus", recursive=True):
  out = Path(f).with_suffix(".flac")
  out = Path("MusicFLAC", *out.parts[1:])
  print(f"{f} -> {out}")

  out.parent.mkdir(parents=True, exist_ok=True)
  subprocess.run(f'ffmpeg -i "{f}" -c:a flac -sample_fmt s16 -ar 48000 -map_metadata 0 "{out}"', shell=True, check=True)
```

simple! just have ffmpeg do everything else. the resulting folder is ~32GB in size. fucking gigantic

ok now all i have to do is leave it sit on soulseek for a few hours days weeks we'll see


## results
it is nov 25th now. 5 days since nov 20.

from the few uploads i got, i can assume that they do in fact go up by quite a lot actually, despite the fact that **metadata was not copied!**

i noticed that like immediately after. no metadata is present even though i did supply `-map_metadata 0` ??? very weird.

I counted about 8 song uploads within this range of time. that's quite some compared to 0 previously.
maybe they removed the track after noticing theres no metadata, though if they really didn't that proves that lossy or not, it does not matter.

at least in my lens. whatever.
<u>flac is in general downloaded much more because it's assumed lossless.</u> the data is probably lossy. there's no real way to verify this other than strictly comparing the audio data against the original, which even then might not work.

that's about it. not very interesting and didn't quite go the way i thought it would but there's something to conclude probably nontheless.
