import AccountInformation from "./card/AccountInformation";
import AddressBar from "./card/AddressBar";
import Profile from "./card/Profile";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6">
      {/* Modern Header */}
      <div className="mb-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-linear-to-br from-[#157aa2] to-[#1C7AA5] rounded-xl flex items-center justify-center shadow-lg">
            <SettingsIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your profile and account preferences</p>
          </div>
        </div>
      </div>
      <div className="animate-fade-in-delay-1">
        <Profile/>
      </div>
      <div className="animate-fade-in-delay-2">
        <AccountInformation/>
      </div>
      <div className="animate-fade-in-delay-3">
        <AddressBar/>
      </div>
    </div>
  );
}
