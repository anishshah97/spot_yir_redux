import PropTypes from "prop-types";
import MaterialTitlePanel from "./MaterialPanel";
import PlaylistMediaCard from "./PlaylistMediaCard"
import { connect } from "react-redux"
import React, { Component } from 'react'

const styles = {
  sidebar: {
    width: 256,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#757575",
    textDecoration: "none"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#757575"
  },
  content: {
    padding: "16px",
    height: "100%",
    backgroundColor: "white"
  }
};

export class SideBarContent extends Component {
  render() {

    const style = this.props.style
    ? { ...styles.sidebar, ...this.props.style }
    : styles.sidebar;

    const links = [];

    for (let ind = 0; ind < 10; ind++) {
      links.push(
        <PlaylistMediaCard data={ind}></PlaylistMediaCard>
      );
    }

    return (
      <MaterialTitlePanel title="Menu" style={style}>
        <div style={styles.content}>
          <a href="#" style={styles.sidebarLink}>
            Home
          </a>
          <div style={styles.divider} />
          {links}
        </div>
      </MaterialTitlePanel>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps
)(SideBarContent);