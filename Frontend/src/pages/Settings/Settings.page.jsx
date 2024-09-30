import DisplayCurrentUser from "../../features/Settings/DisplayCurrentUser.feature";
import DisplayUsers from "../../features/Settings/DisplayUsers.feature";
import RegisterForm from "../../forms/Register/Register.form";

function SettingsPage() {
  return (
    <div>
      <DisplayCurrentUser />
      <RegisterForm/>
      <DisplayUsers />
    </div>
  );
}

export default SettingsPage;
