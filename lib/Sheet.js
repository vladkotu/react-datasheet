var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

var Sheet = function (_PureComponent) {
  _inherits(Sheet, _PureComponent);

  function Sheet() {
    _classCallCheck(this, Sheet);

    return _possibleConstructorReturn(this, (Sheet.__proto__ || Object.getPrototypeOf(Sheet)).apply(this, arguments));
  }

  _createClass(Sheet, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'table',
        { className: this.props.className },
        React.createElement(
          'tbody',
          null,
          this.props.children
        )
      );
    }
  }]);

  return Sheet;
}(PureComponent);

Sheet.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired
};

export default Sheet;