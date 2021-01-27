var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CellShape from './CellShape';

var Cell = function (_PureComponent) {
  _inherits(Cell, _PureComponent);

  function Cell() {
    _classCallCheck(this, Cell);

    return _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).apply(this, arguments));
  }

  _createClass(Cell, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          cell = _props.cell,
          row = _props.row,
          col = _props.col,
          attributesRenderer = _props.attributesRenderer,
          className = _props.className,
          style = _props.style,
          onMouseDown = _props.onMouseDown,
          onMouseOver = _props.onMouseOver,
          onDoubleClick = _props.onDoubleClick,
          onContextMenu = _props.onContextMenu;
      var colSpan = cell.colSpan,
          rowSpan = cell.rowSpan;

      var attributes = attributesRenderer ? attributesRenderer(cell, row, col) : {};

      return React.createElement(
        'td',
        _extends({
          className: className,
          onMouseDown: onMouseDown,
          onMouseOver: onMouseOver,
          onDoubleClick: onDoubleClick,
          onTouchEnd: onDoubleClick,
          onContextMenu: onContextMenu,
          colSpan: colSpan,
          rowSpan: rowSpan,
          style: style
        }, attributes),
        this.props.children
      );
    }
  }]);

  return Cell;
}(PureComponent);

export default Cell;


Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  cell: PropTypes.shape(CellShape).isRequired,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  updated: PropTypes.bool,
  attributesRenderer: PropTypes.func,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

Cell.defaultProps = {
  selected: false,
  editing: false,
  updated: false,
  attributesRenderer: function attributesRenderer() {}
};