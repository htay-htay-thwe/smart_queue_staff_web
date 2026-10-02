"use client";

import AccountInformation from "./card/AccountInformation";
import AddressBar from "./card/AddressBar";
import Profile from "./card/Profile";
import { Settings as SettingsIcon } from "lucide-react";
import ShopInformation from "./card/ShopInformation";
import { useShopStore } from "@/store/shopStore";
import { PageHeader } from "@/components/dashboard/page-header";

export default function Settings() {
  const shopData = useShopStore((s) => s.shop);
  console.log("Shop Data in Settings Page:", shopData);
  return (
    <div className="page-shell">
      <PageHeader title="Account Settings" description="Manage your business profile, contact details, and location." icon={SettingsIcon} eyebrow="Workspace" />
      <div className="animate-fade-in-delay-1">
        <Profile shop={shopData} />
      </div>
      <div className="animate-fade-in-delay-2">
        <AccountInformation shop={shopData} />
      </div>
      <div className="animate-fade-in-delay-3">
        <AddressBar shop={shopData} />
      </div>
      <div className="animate-fade-in-delay-4">
        <ShopInformation shop={shopData} />
      </div>
    </div>
  );
}
