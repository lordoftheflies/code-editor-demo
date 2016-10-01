import React, {PropTypes} from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

import {FolderContextMenu} from './ContextMenu.jsx';

export default class FolderNode extends React.Component {
  static propTypes = {
    collapsed: React.PropTypes.bool,
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onNewFile: PropTypes.func,
    onNewFolder: PropTypes.func,
    onRename: PropTypes.func,
    selected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      showContextMenu: false
    };
  }

  @autobind
  handleClick() {
    this.props.onClick(this.props.id);
  }
  @autobind
  handleContextMenu(e) {
    this.setState({showContextMenu: true});
    e.preventDefault();
  }
  @autobind
  handleHideContextMenu() {
    this.setState({showContextMenu: false});
  }

  @autobind
  handleRename(e) {
    this.handleHideContextMenu(e);
    e.stopPropagation();
  }
  @autobind
  handleDelete(e) {
    this.handleHideContextMenu(e);
    e.stopPropagation();
  }
  @autobind
  handleNewFile(e) {
    this.handleHideContextMenu(e);
    e.stopPropagation();
  }
  @autobind
  handleNewFolder(e) {
    this.handleHideContextMenu(e);
    e.stopPropagation();
  }


  render() {
    const nodeClasses = classNames("folder-label", this.props.selected ? 'selected' : '');
    const iconClasses = classNames('fa', this.props.collapsed ? 'fa-folder-o' : 'fa-folder-open-o');

    return (
      <div className={nodeClasses} onClick={this.handleClick} onContextMenu={this.handleContextMenu}>
        <i className={iconClasses} /> {this.props.name}
        <FolderContextMenu 
          display={this.state.showContextMenu} 
          onHide={this.handleHideContextMenu}
          onSelectDelete={this.handleDelete} 
          onSelectNewFile={this.handleNewFile} 
          onSelectNewFolder={this.handleNewFolder} 
          onSelectRename={this.handleRename} 
        />
      </div>
    );
  }  
}
