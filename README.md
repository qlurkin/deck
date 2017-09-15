# deck
Yet Another HTML Deck

## Create a deck
Decks are written in pug. A minimal deck would be:

```pug
extends lib/layout.pug
block title
   | Browser tab Title
block slides
   section
      h1 Deck Title
```

## Create Slides
The `section` tag is used to create slides. The `h1` tag create a big centered title that can be used to title your whole deck. The `h2` tag create a title at the top of the slide. You will generaly use `h2` in every slides 
