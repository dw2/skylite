// Generated by CoffeeScript 1.3.3

/*!
skylite.js

(c) 2010-2012 Douglas Waltman II, DigitalAugment Inc.
Skylite may be freely distributed under the MIT license.

http://github.com/dw2/skylite
*/


(function() {

  window.Skylite = (function() {

    function Skylite(options) {
      var key, option, _ref,
        _this = this;
      for (key in options) {
        option = options[key];
        this[key] = option;
      }
      this.$modal = $("<div class='modal " + ((_ref = this.type) != null ? _ref : '') + "'>");
      if (this.title != null) {
        $("<h1>" + this.title + "</h1>").appendTo(this.$modal);
      }
      if (this.body != null) {
        $("<p>" + this.body + "</p>").appendTo(this.$modal);
      }
      if (this.html != null) {
        $(this.html).appendTo(this.$modal);
      }
      this.$actions = $("<div class='actions'>");
      if (this.actions != null) {
        $.each(this.actions, function(text, action) {
          return $("<button>").text(text).addClass(text.toLowerCase().replace(/[^a-z]/g, '')).click(function() {
            if (action(_this)) {
              return _this.dismiss();
            }
          }).appendTo(_this.$actions);
        });
      } else {
        $("<button>").text('Okay').addClass('ok').click(function() {
          return _this.dismiss();
        }).appendTo(this.$actions);
      }
      setTimeout(function() {
        return $(document).on('keyup', function(e) {
          var _ref1;
          if (!_this.$modal.is(':last-of-type')) {
            return;
          }
          key = (_ref1 = e.keyCode) != null ? _ref1 : e.which;
          if (key === 13) {
            _this.$actions.find('button:last').trigger('click');
            $(document).off('keypress', false, _this.keypress);
          }
          if (key === 27) {
            _this.dismiss();
            return $(document).off('keypress', false, _this.keypress);
          }
        }, _this.keypress);
      }, 500);
      this.$actions.appendTo(this.$modal);
      this.render();
    }

    Skylite.prototype.mask = function() {
      if ($('.wmd-prompt-background').length) {
        $('#mask').remove();
      } else if ($('#mask').length === 0) {
        $('body').append('<div id="mask"></div>');
      }
      return $('#mask, .wmd-prompt-background').stop(true).css({
        opacity: 0
      }).animate({
        opacity: .7
      }, 400, 'linear').click((function() {
        return $('body > .modal, .wmd-prompt-dialog').find('.cancel').trigger('click');
      }));
    };

    Skylite.prototype.unmask = function() {
      if ($('body > .modal').length > 1) {
        return;
      }
      return $('#mask, .wmd-prompt-background').stop(true).fadeTo(200, 0, function() {
        return $(this).remove();
      });
    };

    Skylite.prototype.render = function() {
      var _ref;
      this.mask();
      if (this.cssIn != null) {
        this.$modal.css(this.cssIn);
      }
      this.$modal.appendTo('body');
      if (this.animIn != null) {
        return this.$modal.animate(this.animIn[0], (_ref = this.animIn[1]) != null ? _ref : 400);
      }
    };

    Skylite.prototype.dismiss = function() {
      var done, _ref,
        _this = this;
      if ($('body > .modal').length === 1) {
        this.unmask();
      }
      done = function() {
        var $modal;
        if (_this.callback != null) {
          $modal = _this.$modal;
          _this.callback();
        }
        return _this.$modal.remove();
      };
      if (this.cssOut != null) {
        this.$modal.css(this.cssOut);
      }
      if (this.animOut != null) {
        return this.$modal.animate(this.animOut[0], (_ref = this.animOut[1]) != null ? _ref : 400, done);
      } else {
        return done();
      }
    };

    return Skylite;

  })();

}).call(this);
