import React from "react";
import { connect } from "react-redux";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import { setShowSidebar } from "../actions/index";

const SidebarContainer = props => {
  const { showSidebar, toggleSidebar } = props;

  const onHide = () => {
    toggleSidebar(false);
  };

  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      onHide={onHide}
      vertical
      visible={showSidebar}
      width="thin"
    >
      <Menu.Item as="a" active>
        <Icon name="file alternate" />
        RFQ
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="briefcase" />
        Order
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="chart bar" />
        Reports
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="mail" />
        Monitor Screens
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="cog" />
        Setting
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="group" />
        Access Rights
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="file alternate outline" />
        Market Data
      </Menu.Item>
    </Sidebar>
  );
};

const mapStateToProps = state => ({
  showSidebar: state.showSidebar
});

const mapDispatchToProps = dispatch => ({
  toggleSidebar: value => dispatch(setShowSidebar(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer);
