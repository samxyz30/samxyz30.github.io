---
layout: base.njk
title: sam landing page
---

hi i'm sam.
my timezone is gmt+1 (slovakia) which means it's <b id="time">...</b> for me right now


my pronouns are he/him im a asexual male

i update this page once every blue moon so things may be outdated


## <u>interests</u>

i love travelling, animals, music, messing around with computers and software, helping people

i do programming im proficient in typescript/javascript, so work in interpreted languages, know some C++ and by extension C.

i've mostly done web development or web services but i am learning graphics and audio programming, low level stuff

when it comes to music i mostly listen to hip hop but i also like experimental music actually my music taste is like really mixed i just listen to anything i like I don't know

artists like Kendrick Lamar, Baby Keem, Bad Bunny, A$AP Rocky, Childish Gambino, Frank Ocean, KAYTRANADA, Freddie Gibbs, Vince Staples, JPEGMAFIA...


## <u>projects</u>
some notable ones:

- [mediakit](https://github.com/samxyz30/mediakit): audio/video trimmer and encoder, media converter ui built on top of ffmpeg
- zacap: audio source capturing utility, can capture multiple at once in float WAV
- mixin: a DAW in C++ from scratch that i never got to finish
- [tinmc](https://codeberg.org/samxyz30/tinmc): a tiny minecraft launcher in pyton
- gft media stuff

... and a lot lot more unpublished, unfinished, old and lost ones.


## <u>contact</u>

- [discord cat.tac](https://discord.com/users/807643858867322900)
- [github](https://github.com/samxyz30)
- [codeberg](https://codeberg.org/samxyz30)
<!--
- [Random neocities site not contact](https://itzskeetxd662.neocities.org/)
-->

> What would you do if when you ok so he said yes would go?



<script>
function update() {
  const time = new Date().toLocaleString("en-GB", {
    timeZone: "Europe/Bratislava",
    hour12: false,
  });
  document.getElementById("time").innerText = `${time}`;
}
update();
setInterval(update, 1000);
</script>
