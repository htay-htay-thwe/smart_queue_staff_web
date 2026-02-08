import AccountInformation from "./card/AccountInformation";
import AddressBar from "./card/AddressBar";
import Profile from "./card/Profile";

export default function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Account Settings</h1>
      <Profile/>
      <AccountInformation/>
      <AddressBar/>
    </div>
  );
}
