# Skylite

Skylite is a framework for creating modal boxes in your browser application. It is written in CoffeeScript and utilizes jQuery.

Unlike a lot of other modal scripts, the view work is up to you here. This script will dump `<div id="mask">` and multiple `<div class="modal">` blocks to `<body>`.

You can add as many modals as your heart desires (or until your browser crashes). I like to use the `:last-of-type` pseudo-selector to show only the last `<div class="modal">`.

---

## Options

* **title:** (string) Adds a `<h1>` tag to the content of the modal.
* **body:** (string) Adds html content to the modal.
* **callback:** (function) Fired right before the modal is removed form the DOM, after optional animations.
* **actions:** (hash of functions) Each key is a button name added to a `<div>` with the class "actions", and each value is a function.
* **cssIn:** (hash) CSS properties set to the modal before it is added to the DOM.
* **cssOut:** (hash) CSS properties applied to the modal before exit animation and/or removal of the modal.
* **animIn:** (array) The first vlaue is required and is a hash of CSS properties. The second value is the optional duration of the animation. Applied just after the modal is addded to the DOM.
* **animOut:** (array) The first vlaue is required and is a hash of CSS properties. The second value is the optional duration of the animation. Applied just before the modal is removed from the DOM.

---

## Examples

---

### A Basic Alert Box

```
options =
    body: "This is a message from your browser overlord."

new Skylite options
```

### The same alert box with a title and a callback function

```
options =
    title: "My Modal"
    body: "This is a message from your browser overlord."
    callback: -> console.log 'The modal is dead.'

new Skylite options
```

### A Confirmation Box

```
options =
    title: "Are you sure?"
    body: "The sky will fall on your head."
    actions:
        cancel: -> console.log 'Cancel clicked'
        continue: -> console.log 'Continue clicked'

new Skylite options
```

### Add as many buttons as you want.

Hash heys become the inner text of the `<button>` elements.

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

new Skylite options
```

### Auto-dismiss Modals

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

### Pass the modal into your callback

This can be useful if you're creating a prompt for user input.

```
options =
    title: "Introspective"
    body: "Click and then have your way with me."
    actions:
        something: (modal) -> console.log modal, 'just got clicked'

new Skylite options
```

### Pass in jQuery CSS and Animation hashes

Note: Put as much, if not all, of your CSS into your CSS/Sass/Stylus files.
It's just good practice. Breaking convention here for the sake of the example:

```
options =
    title: "Modal Title"
    body: "Something profound should go here."
    cssIn:
        background: '#ccc'
        height: 140
        left: '50%'
        margin: '-100px 0 0 -200px'
        opacity: 0
        padding: 30
        position: 'fixed'
        top: '40%'
        width: 340
    animIn: [{top: '50%', opacity: 1}, 200]
    animOut: [opacity: 0]

new Skylite options
```

---

## License

(c) 2010-2012 Douglas Waltman II, DigitalAugment Inc.

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