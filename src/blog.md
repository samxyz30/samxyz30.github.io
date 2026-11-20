---
layout: base.njk
title: blog archive
eleventyImport:
  collections: ["posts"]
---

{% for post in collections.posts %}
\- <a href="{{ post.url | url }}">{{ post.date | todate }}: {{ post.data.title }}</a>
{% endfor %}
