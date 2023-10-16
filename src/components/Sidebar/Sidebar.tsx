import "./style.scss";
import { ProfileIcon, MoonIcon, SettingsIcon } from "../../Icons";

export default function Sidebar() {
  return (
    <div className="SidebarContainer">
      <div className="SidebarLogoContainer">
        <p className="SidebarLogo">⚡️</p>
      </div>

      <div className="SidebarOptionsContainer">
        <div className="SidebarButtonContainer">
          <ProfileIcon className="SidebarButtonIcon" />
        </div>
        <div className="SidebarButtonContainer">
          <MoonIcon className="SidebarButtonIcon" />
        </div>
        <div className="SidebarButtonContainer">
          <SettingsIcon className="SidebarButtonIcon" />
        </div>
      </div>
    </div>
  );
}
