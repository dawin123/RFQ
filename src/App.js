import React from "react";
import "./styles.css";
import "semantic-ui-css/semantic.min.css";
import { Sidebar, Segment } from "semantic-ui-react";
import SidebarContainer from "./containers/SidebarContainer";
import MenuContainer from "./containers/MenuContainer";
import SecondaryMenuContainer from "./containers/SecondaryMenuContainer";
import ContentContainer from "./containers/ContentContainer";

export default function App() {
  return (
    <div className="App">
      <MenuContainer />
      <Sidebar.Pushable as={Segment} style={{ marginTop: 0 }}>
        <SidebarContainer />
        <Sidebar.Pusher>
          <SecondaryMenuContainer />
          <ContentContainer />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
}
