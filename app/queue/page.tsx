"use client";

import { useEffect, useState } from "react";
import AssignLiveTable from "./card/AssignLiveTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, CheckCircle2Icon } from "lucide-react";

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
      {showAlert && (
        <Alert className="mb-4 bg-green-100 border-green-200 text-green-800">
          <CheckCircle2Icon className="h-4 w-4" />
          <AlertTitle className="font-bold">A1000 - Aung</AlertTitle>
          <AlertDescription>
            <div className="flex gap-1">
              <span className="text-blue-500 font-medium">2 people</span> Table <span className="text-red-500 font-medium">16</span> is assigned!
            </div>
          </AlertDescription>
        </Alert>
      )}
      <AssignLiveTable />
    </div>
  );
}
