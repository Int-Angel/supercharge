import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ProfileIcon, MoonIcon, SettingsIcon } from "../../Icons";
import { useSignOut } from "../../hooks/auth/useSignOut";

interface SidebarProps {
  setIsModalOpen: (value: React.SetStateAction<boolean>) => void;
}

export default function Sidebar({ setIsModalOpen }: SidebarProps) {
  const navigate = useNavigate();
  const signOutMutation = useSignOut();

  function handleSignOut() {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        console.log("Sucess");
        navigate("/login");
      },
      onError: (error: any) => {
        console.log("Error: ", error);
      },
    });
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="SidebarContainer">
      <div className="SidebarLogoContainer">
        <p className="SidebarLogo">⚡️</p>
      </div>

      <div className="SidebarOptionsContainer">
        <div className="SidebarButtonContainer" onClick={handleSignOut}>
          <ProfileIcon className="SidebarButtonIcon" />
        </div>
        <div className="SidebarButtonContainer" onClick={openModal}>
          <MoonIcon className="SidebarButtonIcon" />
        </div>
        <div className="SidebarButtonContainer">
          <SettingsIcon className="SidebarButtonIcon" />
        </div>
      </div>
    </div>
  );
}
