###!
skylite.js

(c) 2012-2013 Douglas Waltman II, DigitalAugment Inc.
Skylite may be freely distributed under the MIT license.

http://github.com/dw2/skylite
###

class window.Skylite

    constructor: (options) ->
        @[key] = option for key, option of options

        @$modal = $("<div class='modal active #{@type ? ''}'>")
        $("<h1>#{@title}</h1>").appendTo @$modal if @title?
        $("<p>#{@body}</p>").appendTo @$modal if @body?
        $(@html).appendTo @$modal if @html?
        @$actions = $("<div class='actions'>")

        # Add action butons
        if @actions?
            $.each @actions, (text, action) =>
                $("<button>")
                    .text(text)
                    .addClass(text.toLowerCase().replace(/[^a-z]/g,''))
                    .click(=> if action(@) then @dismiss())
                    .appendTo @$actions
        else
            $("<button>")
                .text('Okay')
                .addClass('ok')
                .click(=> @dismiss())
                .appendTo @$actions

        # Add a hotkey to auto-click the last action on press(enter) on a delay
        setTimeout =>
            $(document).on 'keyup', (e) =>
                return unless @$modal.is ':last-of-type'
                key = e.keyCode ? e.which
                # Enter
                if key is 13 and @$modal.find('form').length is 0
                    @$actions.find('button:last').trigger 'click'
                    $(document).off 'keypress', false, @keypress
                # Escape
                if key is 27 and !@lockMask
                    @dismiss()
                    $(document).off 'keypress', false, @keypress
            , @keypress
        , 500

        @$actions.appendTo @$modal
        return @render()

    mask: ->
        if $('.wmd-prompt-background').length
            $('#mask').remove()
        else if $('#mask').length is 0
            $('body').append('<div id="mask"></div>')
        @$mask = $('#mask, .wmd-prompt-background')
        unless $('.modal').length
            @$mask
                .stop(true)
                .css(opacity: 0)
                .animate { opacity: 1 }, 400, 'linear'
        @$mask.click => @dismiss() unless !!@lockMask

    unmask: ->
        return if $('body > .modal').length > 1
        $('#mask, .wmd-prompt-background').stop(true).fadeTo 200, 0, -> $(@).remove()

    render: ->
        @mask() unless !!@hideMask
        $('.modal').removeClass 'active'
        @$modal.css @cssIn if @cssIn?
        @$modal.appendTo('body')
        @$modal.animate @animIn[0], (@animIn[1] ? 400) if @animIn?
        @$modal.modal = @
        return @$modal

    dismiss: ->
        @unmask() if $('body > .modal').length is 1
        done = =>
            if @callback?
                $modal = @$modal
                @callback()
            @$modal.remove()
            $modals = $('.modal')
            if $modals.length
                $modals.last().addClass 'active'
            else
                @unmask()
        @$modal.css @cssOut if @cssOut?
        if @animOut?
            @$modal.animate @animOut[0], (@animOut[1] ? 400), done
        else
            done()
