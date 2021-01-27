var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ENTER_KEY, ESCAPE_KEY, TAB_KEY, RIGHT_KEY, LEFT_KEY, UP_KEY, DOWN_KEY } from './keys';

import Cell from './Cell';
import CellShape from './CellShape';
import DataEditor from './DataEditor';
import ValueViewer from './ValueViewer';
import { renderValue, renderData } from './renderHelpers';

function initialData(_ref) {
  var cell = _ref.cell,
      row = _ref.row,
      col = _ref.col,
      valueRenderer = _ref.valueRenderer,
      dataRenderer = _ref.dataRenderer;

  return renderData(cell, row, col, valueRenderer, dataRenderer);
}

function initialValue(_ref2) {
  var cell = _ref2.cell,
      row = _ref2.row,
      col = _ref2.col,
      valueRenderer = _ref2.valueRenderer;

  return renderValue(cell, row, col, valueRenderer);
}

function widthStyle(cell) {
  var width = typeof cell.width === 'number' ? cell.width + 'px' : cell.width;
  return width ? { width: width } : null;
}

var DataCell = function (_PureComponent) {
  _inherits(DataCell, _PureComponent);

  function DataCell(props) {
    _classCallCheck(this, DataCell);

    var _this = _possibleConstructorReturn(this, (DataCell.__proto__ || Object.getPrototypeOf(DataCell)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleCommit = _this.handleCommit.bind(_this);
    _this.handleRevert = _this.handleRevert.bind(_this);

    _this.handleKey = _this.handleKey.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.handleMouseOver = _this.handleMouseOver.bind(_this);
    _this.handleContextMenu = _this.handleContextMenu.bind(_this);
    _this.handleDoubleClick = _this.handleDoubleClick.bind(_this);

    _this.state = {
      updated: false,
      reverting: false,
      committing: false,
      value: ''
    };
    return _this;
  }

  _createClass(DataCell, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (!this.props.cell.disableUpdatedFlag && initialValue(prevProps) !== initialValue(this.props)) {
        this.setState({ updated: true });
        this.timeout = setTimeout(function () {
          return _this2.setState({ updated: false });
        }, 700);
      }
      if (this.props.editing === true && prevProps.editing === false) {
        var value = this.props.clearing ? '' : initialData(this.props);
        this.setState({ value: value, reverting: false });
      }

      if (prevProps.editing === true && this.props.editing === false && !this.state.reverting && !this.state.committing && this.state.value !== initialData(this.props)) {
        this.props.onChange(this.props.row, this.props.col, this.state.value);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value) {
      this.setState({ value: value, committing: false });
    }
  }, {
    key: 'handleCommit',
    value: function handleCommit(value, e) {
      var _props = this.props,
          onChange = _props.onChange,
          onNavigate = _props.onNavigate;

      if (value !== initialData(this.props)) {
        this.setState({ value: value, committing: true });
        onChange(this.props.row, this.props.col, value);
      } else {
        this.handleRevert();
      }
      if (e) {
        e.preventDefault();
        onNavigate(e, true);
      }
    }
  }, {
    key: 'handleRevert',
    value: function handleRevert() {
      this.setState({ reverting: true });
      this.props.onRevert();
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      var _props2 = this.props,
          row = _props2.row,
          col = _props2.col,
          onMouseDown = _props2.onMouseDown,
          cell = _props2.cell;

      if (!cell.disableEvents) {
        onMouseDown(row, col, e);
      }
    }
  }, {
    key: 'handleMouseOver',
    value: function handleMouseOver(e) {
      var _props3 = this.props,
          row = _props3.row,
          col = _props3.col,
          onMouseOver = _props3.onMouseOver,
          cell = _props3.cell;

      if (!cell.disableEvents) {
        onMouseOver(row, col);
      }
    }
  }, {
    key: 'handleDoubleClick',
    value: function handleDoubleClick(e) {
      var _props4 = this.props,
          row = _props4.row,
          col = _props4.col,
          onDoubleClick = _props4.onDoubleClick,
          cell = _props4.cell;

      if (!cell.disableEvents) {
        onDoubleClick(row, col);
      }
    }
  }, {
    key: 'handleContextMenu',
    value: function handleContextMenu(e) {
      var _props5 = this.props,
          row = _props5.row,
          col = _props5.col,
          onContextMenu = _props5.onContextMenu,
          cell = _props5.cell;

      if (!cell.disableEvents) {
        onContextMenu(e, row, col);
      }
    }
  }, {
    key: 'handleKey',
    value: function handleKey(e) {
      var keyCode = e.which || e.keyCode;
      if (keyCode === ESCAPE_KEY) {
        return this.handleRevert();
      }
      var _props6 = this.props,
          component = _props6.cell.component,
          forceEdit = _props6.forceEdit;

      var eatKeys = forceEdit || !!component;
      var commit = keyCode === ENTER_KEY || keyCode === TAB_KEY || !eatKeys && [LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY].includes(keyCode);

      if (commit) {
        this.handleCommit(this.state.value, e);
      }
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent(editing, cell) {
      var component = cell.component,
          readOnly = cell.readOnly,
          forceComponent = cell.forceComponent;

      if (editing && !readOnly || forceComponent) {
        return component;
      }
    }
  }, {
    key: 'renderEditor',
    value: function renderEditor(editing, cell, row, col, dataEditor) {
      if (editing) {
        var Editor = cell.dataEditor || dataEditor || DataEditor;
        return React.createElement(Editor, {
          cell: cell,
          row: row,
          col: col,
          value: this.state.value,
          onChange: this.handleChange,
          onCommit: this.handleCommit,
          onRevert: this.handleRevert,
          onKeyDown: this.handleKey
        });
      }
    }
  }, {
    key: 'renderViewer',
    value: function renderViewer(cell, row, col, valueRenderer, valueViewer) {
      var Viewer = cell.valueViewer || valueViewer || ValueViewer;
      var value = renderValue(cell, row, col, valueRenderer);
      return React.createElement(Viewer, { cell: cell, row: row, col: col, value: value });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props7 = this.props,
          row = _props7.row,
          col = _props7.col,
          cell = _props7.cell,
          CellRenderer = _props7.cellRenderer,
          valueRenderer = _props7.valueRenderer,
          dataEditor = _props7.dataEditor,
          valueViewer = _props7.valueViewer,
          attributesRenderer = _props7.attributesRenderer,
          selected = _props7.selected,
          editing = _props7.editing,
          onKeyUp = _props7.onKeyUp;
      var updated = this.state.updated;


      var content = this.renderComponent(editing, cell) || this.renderEditor(editing, cell, row, col, dataEditor) || this.renderViewer(cell, row, col, valueRenderer, valueViewer);

      var className = [cell.className, 'cell', cell.overflow, selected && 'selected', editing && 'editing', cell.readOnly && 'read-only', updated && 'updated'].filter(function (a) {
        return a;
      }).join(' ');

      return React.createElement(
        CellRenderer,
        {
          row: row,
          col: col,
          cell: cell,
          selected: selected,
          editing: editing,
          updated: updated,
          attributesRenderer: attributesRenderer,
          className: className,
          style: widthStyle(cell),
          onMouseDown: this.handleMouseDown,
          onMouseOver: this.handleMouseOver,
          onDoubleClick: this.handleDoubleClick,
          onContextMenu: this.handleContextMenu,
          onKeyUp: onKeyUp
        },
        content
      );
    }
  }]);

  return DataCell;
}(PureComponent);

export default DataCell;


DataCell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  cell: PropTypes.shape(CellShape).isRequired,
  forceEdit: PropTypes.bool,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  editValue: PropTypes.any,
  clearing: PropTypes.bool,
  cellRenderer: PropTypes.func,
  valueRenderer: PropTypes.func.isRequired,
  dataRenderer: PropTypes.func,
  valueViewer: PropTypes.func,
  dataEditor: PropTypes.func,
  attributesRenderer: PropTypes.func,
  onNavigate: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRevert: PropTypes.func.isRequired,
  onEdit: PropTypes.func
};

DataCell.defaultProps = {
  forceEdit: false,
  selected: false,
  editing: false,
  clearing: false,
  cellRenderer: Cell
};