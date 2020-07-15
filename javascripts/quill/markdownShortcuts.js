  // ordered and unordered lists are built in
var BlockEmbed, HorizontalRule, MarkdownShortcuts,
  indexOf = [].indexOf;

MarkdownShortcuts = (function() {
  class MarkdownShortcuts {
    _slicedToArray(arr, i) {
      var ref, sliceIterator;
      sliceIterator = function(arr, i) {
        var _arr, _d, _e, _i, _n, _s, err;
        _arr = [];
        _n = true;
        _d = false;
        _e = void 0;
        try {
          _i = arr[Symbol.iterator]();
          _s = void 0;
          while (!(_n = (_s = _i.next()).done)) {
            _arr.push(_s.value);
            if (i && _arr.length === i) {
              break;
            }
            _n = true;
          }
        } catch (error) {
          err = error;
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"]) {
              _i["return"]();
            }
          } finally {
            if (_d) {
              throw _e;
            }
          }
        }
        return _arr;
      };
      if (Array.isArray(arr)) {
        return arr;
      } else if ((ref = Symbol.iterator, indexOf.call(Object(arr), ref) >= 0)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    }

    constructor(quill, options) {
      var that;
      this.quill = quill;
      this.options = options;
      // Handler that looks for insert deltas that match specific characters
      that = this;
      this.matches = [
        {
          name: 'hr-dash',
          pattern: /^([-*]\s?){3}/g,
          action: function(text,
        selection) {
            var startIndex;
            startIndex = selection.index - text.length;
            setTimeout((function() {
              that.quill.deleteText(startIndex,
        text.length);
              that.quill.insertEmbed(startIndex + 1,
        'hr',
        true,
        "user");
              that.quill.insertText(startIndex + 2,
        '\n',
        "silent");
              that.quill.setSelection(startIndex + 2,
        "silent");
            }),
        0);
          }
        },
        {
          name: 'hr-underscore',
          pattern: /^([_*]\s?){3}/g,
          action: function(text,
        selection) {
            var startIndex;
            startIndex = selection.index - text.length;
            setTimeout((function() {
              that.quill.deleteText(startIndex,
        text.length);
              that.quill.insertEmbed(startIndex + 1,
        'hr',
        true,
        "user");
              that.quill.insertText(startIndex + 2,
        '\n',
        "silent");
              that.quill.setSelection(startIndex + 2,
        "silent");
            }),
        0);
          }
        },
        {
          name: 'hr-asterisk',
          pattern: /^([_*]\s?){3}/g,
          action: function(text,
        selection) {
            var startIndex;
            startIndex = selection.index - text.length;
            setTimeout((function() {
              that.quill.deleteText(startIndex,
        text.length);
              that.quill.insertEmbed(startIndex + 1,
        'hr',
        true,
        "user");
              that.quill.insertText(startIndex + 2,
        '\n',
        "silent");
              that.quill.setSelection(startIndex + 2,
        "silent");
            }),
        0);
          }
        },
        {
          name: 'header',
          pattern: /^(#){1,6}\s/g,
          action: function(text,
        selection,
        pattern) {
            var match,
        size;
            match = pattern.exec(text);
            if (!match) {
              return;
            }
            size = match[0].length;
            // Need to defer this action https:#github.com/quilljs/quill/issues/1134
            setTimeout((function() {
              that.quill.formatLine(selection.index,
        0,
        'header',
        size - 1);
              that.quill.deleteText(selection.index - size,
        size);
            }),
        0);
          }
        },
        {
          name: 'blockquote',
          pattern: /^(>)\s/g,
          action: function(text,
        selection) {
            // Need to defer this action https:#github.com/quilljs/quill/issues/1134
            setTimeout((function() {
              that.quill.formatLine(selection.index,
        1,
        'blockquote',
        true);
              that.quill.deleteText(selection.index - 2,
        2);
            }),
        0);
          }
        },
        {
          name: 'code-block',
          pattern: /^`{3}(?:\s|\n)/g,
          action: function(text,
        selection) {
            // Need to defer this action https:#github.com/quilljs/quill/issues/1134
            setTimeout((function() {
              that.quill.formatLine(selection.index,
        1,
        'code-block',
        true);
              that.quill.deleteText(selection.index - 4,
        4);
            }),
        0);
          }
        },
        {
          name: 'bolditalic',
          pattern: /(?:\*|_){3}(.+?)(?:\*|_){3}/g,
          action: function(text,
        selection,
        pattern,
        lineStart) {
            var annotatedText,
        match,
        matchedText,
        startIndex;
            match = pattern.exec(text);
            annotatedText = match[0];
            matchedText = match[1];
            startIndex = lineStart + match.index;
            if (text.match(/^([*_ \n]+)$/g)) {
              return;
            }
            setTimeout((function() {
              that.quill.deleteText(startIndex,
        annotatedText.length);
              that.quill.insertText(startIndex,
        matchedText,
        {
                bold: true,
                italic: true
              });
              that.quill.format('bold',
        false);
            }),
        0);
          }
        },
        {
          name: 'bold',
          pattern: /(?:\*|_){2}(.+?)(?:\*|_){2}/g,
          action: function(text,
        selection,
        pattern,
        lineStart) {
            var annotatedText,
        match,
        matchedText,
        startIndex;
            match = pattern.exec(text);
            annotatedText = match[0];
            matchedText = match[1];
            startIndex = lineStart + match.index;
            if (text.match(/^([*_ \n]+)$/g)) {
              return;
            }
            setTimeout((function() {
              that.quill.deleteText(startIndex,
        annotatedText.length);
              that.quill.insertText(startIndex,
        matchedText,
        {
                bold: true
              });
              that.quill.format('bold',
        false);
            }),
        0);
          }
        },
        {
          name: 'italic',
          pattern: /(?:\*|_){1}(.+?)(?:\*|_){1}/g,
          action: function(text,
        selection,
        pattern,
        lineStart) {
            var annotatedText,
        match,
        matchedText,
        startIndex;
            match = pattern.exec(text);
            annotatedText = match[0];
            matchedText = match[1];
            startIndex = lineStart + match.index;
            if (text.match(/^([*_ \n]+)$/g)) {
              return;
            }
            setTimeout((function() {
              that.quill.deleteText(startIndex,
        annotatedText.length);
              that.quill.insertText(startIndex,
        matchedText,
        {
                italic: true
              });
              that.quill.format('italic',
        false);
            }),
        0);
          }
        },
        {
          name: 'strikethrough',
          pattern: /(?:~~)(.+?)(?:~~)/g,
          action: function(text,
        selection,
        pattern,
        lineStart) {
            var annotatedText,
        match,
        matchedText,
        startIndex;
            match = pattern.exec(text);
            annotatedText = match[0];
            matchedText = match[1];
            startIndex = lineStart + match.index;
            if (text.match(/^([*_ \n]+)$/g)) {
              return;
            }
            setTimeout((function() {
              that.quill.deleteText(startIndex,
        annotatedText.length);
              that.quill.insertText(startIndex,
        matchedText,
        {
                strike: true
              });
              that.quill.format('strike',
        false);
            }),
        0);
          }
        },
        {
          name: 'code',
          pattern: /(?:`)(.+?)(?:`)/g,
          action: function(text,
        selection,
        pattern,
        lineStart) {
            var annotatedText,
        match,
        matchedText,
        startIndex;
            match = pattern.exec(text);
            annotatedText = match[0];
            matchedText = match[1];
            startIndex = lineStart + match.index;
            if (text.match(/^([*_ \n]+)$/g)) {
              return;
            }
            setTimeout((function() {
              that.quill.deleteText(startIndex,
        annotatedText.length);
              that.quill.insertText(startIndex,
        matchedText,
        {
                code: true
              });
              that.quill.format('code',
        false);
              that.quill.insertText(that.quill.getSelection(),
        ' ');
            }),
        0);
          }
        },
        {
          name: 'asterisk-ul',
          pattern: /^(\*|\+)\s$/g,
          action: function(text,
        selection,
        pattern) {
            console.log("asterisk-ul");
            setTimeout((function() {
              that.quill.formatLine(selection.index,
        1,
        'list',
        'bullet');
              that.quill.deleteText(selection.index - 2,
        2);
            }),
        0);
          }
        },
        {
          name: 'image',
          pattern: /(?:!\[(.+?)\])(?:\((.+?)\))/g,
          action: function(text,
        selection,
        pattern) {
            var hrefLink,
        matchedText,
        start,
        startIndex;
            startIndex = text.search(pattern);
            matchedText = text.match(pattern)[0];
            // const hrefText = text.match(/(?:!\[(.*?)\])/g)[0]
            hrefLink = text.match(/(?:\((.*?)\))/g)[0];
            start = selection.index - matchedText.length - 1;
            if (startIndex !== -1) {
              setTimeout((function() {
                that.quill.deleteText(start,
        matchedText.length);
                that.quill.insertEmbed(start,
        'image',
        hrefLink.slice(1,
        hrefLink.length - 1));
              }),
        0);
            }
          }
        },
        {
          name: 'link',
          pattern: /(?:\[(.+?)\])(?:\((.+?)\))/g,
          action: function(text,
        selection,
        pattern) {
            var hrefLink,
        hrefText,
        matchedText,
        start,
        startIndex;
            startIndex = text.search(pattern);
            matchedText = text.match(pattern)[0];
            hrefText = text.match(/(?:\[(.*?)\])/g)[0];
            hrefLink = text.match(/(?:\((.*?)\))/g)[0];
            start = selection.index - matchedText.length - 1;
            if (startIndex !== -1) {
              setTimeout((function() {
                that.quill.deleteText(start,
        matchedText.length);
                that.quill.insertText(start,
        hrefText.slice(1,
        hrefText.length - 1),
        'link',
        hrefLink.slice(1,
        hrefLink.length - 1));
              }),
        0);
            }
          }
        }
      ];
      this.quill.on('text-change', function(delta, oldContents, source) {
        var i;
        i = 0;
        while (i < delta.ops.length) {
          if (delta.ops[i].hasOwnProperty('insert')) {
            if (delta.ops[i].insert === ' ') {
              that.onSpace();
            } else if (delta.ops[i].insert === '\n') {
              that.onEnter();
            }
          }
          i++;
        }
      });
      return;
    }

    isValid(text, tagName) {
      return typeof text !== 'undefined' && text && this.ignoreTags.indexOf(tagName) === -1;
    }

    onSpace() {
      var _didIteratorError, _iterator, _iteratorError, _iteratorNormalCompletion, _quill$getLine, _quill$getLine2, _step, err, line, lineStart, match, matchedText, offset, selection, text;
      selection = this.quill.getSelection();
      if (!selection) {
        return;
      }
      _quill$getLine = this.quill.getLine(selection.index);
      console.warn("onSpace _quill$getLine");
      console.warn(_quill$getLine);
      _quill$getLine2 = this._slicedToArray(_quill$getLine, 2);
      line = _quill$getLine2[0];
      offset = _quill$getLine2[1];
      text = line.domNode.textContent;
      lineStart = selection.index - offset;
      if (this.isValid(text, line.domNode.tagName)) {
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = void 0;
        try {
          _iterator = this.matches[Symbol.iterator]();
          _step = void 0;
          while (!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) {
            match = _step.value;
            matchedText = text.match(match.pattern);
            if (matchedText) {
              // We need to replace only matched text not the whole line
              match.action(text, selection, match.pattern, lineStart);
              return;
            }
            _iteratorNormalCompletion = true;
          }
        } catch (error) {
          err = error;
          _didIteratorError = true;
          return _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }

    onEnter() {
      var _didIteratorError2, _iterator2, _iteratorError2, _iteratorNormalCompletion2, _quill$getLine3, _quill$getLine4, _step2, err, line, lineStart, match, matchedText, offset, selection, text;
      selection = this.quill.getSelection();
      if (!selection) {
        return;
      }
      _quill$getLine3 = this.quill.getLine(selection.index);
      _quill$getLine4 = this._slicedToArray(_quill$getLine3, 2);
      line = _quill$getLine4[0];
      offset = _quill$getLine4[1];
      text = line.domNode.textContent + ' ';
      lineStart = selection.index - offset;
      selection.length = selection.index++;
      if (this.isValid(text, line.domNode.tagName)) {
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = void 0;
        try {
          _iterator2 = this.matches[Symbol.iterator]();
          _step2 = void 0;
          while (!(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done)) {
            match = _step2.value;
            matchedText = text.match(match.pattern);
            if (matchedText) {
              match.action(text, selection, match.pattern, lineStart);
              return;
            }
            _iteratorNormalCompletion2 = true;
          }
        } catch (error) {
          err = error;
          _didIteratorError2 = true;
          return _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              //throw _iteratorError2
              console.log;
            }
          }
        }
      }
    }

  };

  MarkdownShortcuts.prototype.quill = void 0;

  MarkdownShortcuts.prototype.options = void 0;

  MarkdownShortcuts.prototype.ignoreTags = ['PRE'];

  MarkdownShortcuts.prototype.matches = [];

  return MarkdownShortcuts;

}).call(this);

if (window.Quill) {
  //_quill2 = undefined
  //_hr2 = undefined
  BlockEmbed = Quill.import('blots/block/embed');
  HorizontalRule = (function() {
    class HorizontalRule extends BlockEmbed {};

    HorizontalRule.prototype.blotName = "hr";

    HorizontalRule.prototype.tagName = "hr";

    return HorizontalRule;

  }).call(this);
  HorizontalRule.blotName = 'hr';
  HorizontalRule.tagName = 'hr';
  window.Quill.register('formats/horizontal', HorizontalRule);
  window.Quill.register('modules/markdownShortcuts', MarkdownShortcuts);
}
