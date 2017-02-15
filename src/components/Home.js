import React, { Component } from "react";
import { connect } from "react-redux";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { List } from "material-ui/List";
import AppBar from "material-ui/AppBar";
import Divider from "material-ui/Divider";
import CircularProgress from "material-ui/CircularProgress";
import LinearProgress from "material-ui/LinearProgress";

import { getJournalAsArray } from "../accessors";
import { addEntry } from "../actionCreators";
import { TOGGLE_DRAWER } from "../actionTypes";
import EntryListItem from "./EntryListItem";

const style = { marginRight: 20, float: "right" };

class Home extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Markdown Journal"
          onLeftIconButtonTouchTap={this.props.toggleDrawer}
        />
        {this.props.uploading &&
          <LinearProgress
            mode="indeterminate"
            style={{ position: "absolute" }}
          />}
        {!this.props.entries
          ? <div
              style={{ width: "100%", textAlign: "center", marginTop: "300px" }}
            >
              <CircularProgress size={80} thickness={5} />
            </div>
          : <div>
              <List>
                {this.props.entries.map(entry => [
                  <EntryListItem id={entry.id} />,
                  <Divider inset={true} />
                ])}
              </List>
              <FloatingActionButton style={style} onClick={this.props.addEntry}>
                <ContentAdd />
              </FloatingActionButton>
            </div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entries: getJournalAsArray(state),
  showDrawer: state.view.showDrawer,
  uploading: state.dropbox.uploading
});

const mapDispatchToProps = dispatch => ({
  addEntry: () => dispatch(addEntry()),
  // TODO: Move to action creator
  toggleDrawer: () => dispatch({ type: TOGGLE_DRAWER })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);