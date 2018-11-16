## Install Node
https://nodejs.org/download/

### Install assemble
$ npm install -g assemble

### Install project dependencies
$ npm install

### Run
$ assemble

## For generating favicons use: https://realfavicongenerator.net/
Drop the generated files into /img/icons

## Optimising SVGs
Inline SVGs are best as optmised single path SVGs, here are a few steps to help

1) Using Illustrator
* Merge | Join | Outline paths into one path (compound paths)
* Optmise size and artboard

2) Using http://jakearchibald.github.io/svgomg/
* Import and adjust settings, usually 2 passes is good quality
* Copy generated SVG back to local file

3) svgomg strips attributes, so re-add; width, height, viewbox, xmlns