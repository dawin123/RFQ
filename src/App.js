import React from "react";
import "./styles.css";
import "semantic-ui-css/semantic.min.css";
import { Sidebar, Segment } from "semantic-ui-react";
import SidebarContainer from "./SidebarContainer";
import MenuContainer from "./MenuContainer";
import SecondaryMenuContainer from "./SecondaryMenuContainer";
import ContentContainer from "./ContentContainer";

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
