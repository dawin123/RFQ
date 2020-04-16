import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Menu,
  Select,
  Checkbox,
  Icon,
  Segment,
  Label,
  Popup
} from "semantic-ui-react";
import { setShowSidebar } from "./actions/index";

const MenuContainer = props => {
  const { showSidebar, toggleSidebar } = props;
  const today = new Date();

  //for UI interaction only
  const [pinned, setPinned] = useState(false);
  const [autoRelease, setAutoRelease] = useState(false);
  const [autoReject, setAutoReject] = useState(false);

  const handlePinClicked = () => {
    setPinned(!pinned);
  };

  const handleAutoReleaseCheck = (ev, data) => {
    setAutoRelease(data.checked);
  };

  const handleAutoRejectCheck = (ev, data) => {
    setAutoReject(data.checked);
  };

  const handleItemClick = () => {
    return false;
  };

  const handleToggleSidebar = () => {
    toggleSidebar(!showSidebar);
  };

  return (
    <Segment basic inverted style={{ marginBottom: 0, paddingTop: '0.1em', paddingBottom: '0.1em' }}>
      <Menu inverted secondary>
        <Menu.Item name="push" onClick={handleToggleSidebar}>
          Menu
          {showSidebar ? (
            <Icon name="angle left" />
          ) : (
            <Icon name="angle right" />
          )}
        </Menu.Item>

        <Menu.Item>
          <Icon name="globe" size="large" color="red" />
        </Menu.Item>

        <Menu.Item name="pin" onClick={handlePinClicked}>
          <Icon name="thumbtack" style={{color: pinned ? "#db2828" : "rgba(255,255,255,.7)"}}/>
        </Menu.Item>

        <Menu.Item name="spe" onClick={handleItemClick}>
          SPE
        </Menu.Item>

        <Menu.Item name="rfq" onClick={handleItemClick}>
          RFQ
        </Menu.Item>

        <Menu.Item name="uat" onClick={handleItemClick}>
          UAT
        </Menu.Item>

        <Menu.Item name="select" onClick={handleItemClick}>
          <Select
            options={[
              { key: "spe_sg", value: "SPE_SG_TRADER", text: "SPE_SG_TRADER" },
            ]}
            defaultValue={"SPE_SG_TRADER"}
          />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item name="auto-release">
            <Checkbox style={{ marginRight: "5px" }} onChange={handleAutoReleaseCheck} checked={autoRelease}/> Auto Release RFQ
          </Menu.Item>

          <Menu.Item name="auto-reject">
            <Checkbox style={{ marginRight: "5px" }} onChange={handleAutoRejectCheck} checked={autoReject}/> Auto Reject Order
          </Menu.Item>

          <Menu.Item name="date" onClick={handleItemClick}>
            {today.toDateString()}
          </Menu.Item>

          <Menu.Item name="date" onClick={handleItemClick}>
            {"Welcome, Trader1"}
          </Menu.Item>

          <Menu.Item name="mail" onClick={handleItemClick}>
            <Popup basic content='You have 22 unread message(s).' 
              trigger={
              <div>
                <Icon name="mail" />
                <Label color="red" floating circular>
                  22
                </Label>
              </div>} />
          </Menu.Item>

          <Menu.Item name="date" onClick={handleItemClick}>
            {"Logout"}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
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
)(MenuContainer);
