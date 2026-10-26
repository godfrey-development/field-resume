# Aranix Systems — Engineering Field Manual

Personal portfolio and resume site. Static HTML/CSS/JS, hosted on GitHub Pages.

## Structure

```
index.html          page structure and text content
css/style.css       all styling (colors, banners, layout, breakpoints)
js/main.js          dropdowns, collapsible rail, photo viewer
img/<entry>/        web-optimized photos, one folder per field entry
```

## Adding a photo

1. Keep the original in `photo-originals/` (outside this repo).
2. Export a web copy: about 1600px wide, WebP, location data stripped.
3. Save it in `img/<entry>/` and reference it in `index.html`.
