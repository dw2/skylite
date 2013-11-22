// Generated by CoffeeScript 1.6.2
/*!
skylite.js

(c) 2012-2013 Douglas Waltman II, DigitalAugment Inc.
Skylite may be freely distributed under the MIT license.

http://github.com/dw2/skylite
*/


(function() {
  jQuery.fn.modal = function() {
    return this.get(0).modal;
  };

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
          if (key === 27 && !_this.lockMask) {
            _this.dismiss();
            return $(document).off('keypress', false, _this.keypress);
          }
        }, _this.keypress);
      }, 300);
      this.$actions.appendTo(this.$modal);
      return this.render();
    }

    Skylite.prototype.mask = function() {
      var _this = this;

      if (!$('#mask').length) {
        $('body').addClass('hasMask').append('<div id="mask"></div>');
      }
      this.$mask = $('#mask');
      if (!$('.modal').length) {
        this.$mask.stop(true).css({
          opacity: 0
        }).animate({
          opacity: 1
        }, 400, 'linear');
      }
      return this.$mask.click(function() {
        if (!_this.lockMask) {
          return _this.dismiss();
        }
      });
    };

    Skylite.prototype.unmask = function() {
      if ($('body > .modal').length > 1) {
        return;
      }
      return $('#mask').stop(true).fadeTo(200, 0, function() {
        $(this).remove();
        return $('body').removeClass('hasMask');
      });
    };

    Skylite.prototype.render = function() {
      var _ref;

      if (!this.hideMask) {
        this.mask();
      }
      this.setActive();
      if (this.cssIn != null) {
        this.$modal.css(this.cssIn);
      }
      this.$modal.appendTo('body');
      this.$modal.modal = this;
      this.$modal.get(0).modal = this;
      if (this.animIn != null) {
        this.$modal.animate(this.animIn[0], (_ref = this.animIn[1]) != null ? _ref : 400);
      }
      if (this.ready != null) {
        this.ready();
      }
      return this.$modal;
    };

    Skylite.prototype.setActive = function() {
      $('.modal').removeClass('active');
      return this.$modal.addClass('active');
    };

    Skylite.prototype.dismiss = function() {
      var done, _ref,
        _this = this;

      if ($('body > .modal').length === 1) {
        this.unmask();
      }
      done = function() {
        var $modal, $modals;

        if (_this.callback != null) {
          $modal = _this.$modal;
          _this.callback();
        }
        _this.$modal.remove();
        $modals = $('body > .modal:not(.dismissed)');
        if ($modals.length) {
          return $modals.last().modal().setActive();
        } else {
          return _this.unmask();
        }
      };
      this.$modal.addClass('dismissed');
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
