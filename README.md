# Skylite

Skylite is a framework for creating modal boxes in your browser application. It is written in CoffeeScript and utilized jQuery.

Unlike a lot of other modal scripts, the view work is up to you here. This script will dump `<div id="mask">` and multiple `<div class="modal">` blocks to `<body>`.

You can add as many modals as your heart desires (or until your browser crashes). I like to use the `:last-of-type` pseudo-selector to show only the last `<div class="modal">`.

Here are some examples:

---

## A Basic Alert Box

```
  options =
    body: "This is a message from your browser overlord."

  new Skylite options
```

## The same alert box with a title and a callback function

```
  options =
    title: "My Modal"
    body: "This is a message from your browser overlord."
    callback: -> console.log 'The modal is dead.'

  new Skylite options
```

## A Confirmation Box

```
  options =
    title: "Are you sure?"
    body: "The sky will fall on your head."
    actions:
      cancel: -> console.log 'Cancel clicked'
      continue: -> console.log 'Continue clicked'

  new Skylite options
```

## Add as many buttons as you want

```
  options =
    title: "Select One"
    body: "Make up your mind already."
    actions:
      apple: -> console.log 'Apple clicked'
      banana: -> console.log 'Banana clicked'
      grape: -> console.log 'Grape clicked'
      pear: -> console.log 'Pear clicked'
      orange: -> console.log 'Orange clicked'

  modal = new Skylite options
  setTimeout (-> modal.dismiss()), 5000
```

## Auto-dismiss Modals

```
  options =
    title: "Dismiss me remotely"
    body: "Click me, or I will disappear in 5 seconds."
    actions:
      cancel: -> console.log 'Cancel clicked'
      continue: -> console.log 'Continue clicked'

  modal = new Skylite options
  setTimeout (-> modal.dismiss()), 5000

```

---

Copyright (c) 2012 Douglas Waltman II http://dougwaltman.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.