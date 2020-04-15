import React from "react";
import { Menu, Icon, Checkbox, Button } from "semantic-ui-react";

const SecondaryMenuContainer = () => {
  const handleItemClick = () => false;
  return (
    <Menu secondary>
      <Menu.Menu position="right">
        <Menu.Item name="column" onClick={handleItemClick}>
          <Icon name="columns" /> Columns
        </Menu.Item>
        <Menu.Item name="hide" onClick={handleItemClick}>
          <Icon name="hide" /> Hide
        </Menu.Item>
        <Menu.Item name="dateSort" onClick={handleItemClick}>
          <Button>
            <Icon name="calendar alternate" /> Start Date - End Date
          </Button>
        </Menu.Item>
        <Menu.Item name="create" onClick={handleItemClick}>
          <Icon name="plus" /> Create RFQ
        </Menu.Item>
        <Menu.Item name="export" onClick={handleItemClick}>
          <Icon name="download" /> Export
        </Menu.Item>
        <Menu.Item name="refresh" onClick={handleItemClick}>
          <Checkbox label={"Auto Refresh"} />
        </Menu.Item>
        <Menu.Item name="clear" onClick={handleItemClick}>
          <Icon name="filter" /> Clear Filters
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default SecondaryMenuContainer;
