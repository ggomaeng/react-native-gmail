/**
 * Created by ggoma on 2016. 11. 26..
 */
import React, { Component } from "react";
import { Animated, View, FlatList } from "react-native";

import MailListItem from "./mail-list-item";

export default class MailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [1, 2, 3, 4, 5, 6, 7, 8],
      height: new Animated.Value(0)
    };

    this._renderRow = this._renderRow.bind(this);
    this.showUndo = this.showUndo.bind(this);
  }

  showUndo() {
    this.props.showUndo();
  }

  _renderRow(row) {
    return <MailListItem key={row} showUndo={this.showUndo} />;
  }

  render() {
    return (
      <FlatList data={this.state.dataSource} renderItem={this._renderRow} />
    );
  }
}
