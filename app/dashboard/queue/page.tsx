"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, CheckCircle2Icon, Users } from "lucide-react";
import LiveTable from "../dashboard/card/LiveTable";

export default function Queue() {

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowAlert(true);

      const hideTimer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(hideTimer);
    }, 1000);

    return () => clearTimeout(showTimer);
  }, []);


  return (
    <div className="p-6">
      {/* Modern Header */}
      <div className="mb-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-linear-to-br from-[#157aa2] to-[#1C7AA5] rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Queue Management</h1>
            <p className="text-sm text-gray-500 mt-1">Assign and manage customer queues</p>
          </div>
        </div>
      </div>

      {showAlert && (
        <Alert className="mb-4 bg-green-100 border-green-200 text-green-800 animate-fade-in">
          <CheckCircle2Icon className="h-4 w-4" />
          <AlertTitle className="font-bold">A1000 - Aung</AlertTitle>
          <AlertDescription>
            <div className="flex gap-1">
              <span className="text-blue-500 font-medium">2 people</span> Table <span className="text-red-500 font-medium">16</span> is assigned!
            </div>
          </AlertDescription>
        </Alert>
      )}
      <div className="animate-fade-in-delay-1">
        <LiveTable />
      </div>
    </div>
  );
}
