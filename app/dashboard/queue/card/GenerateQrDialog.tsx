"use client";

import { useState } from "react";
import { Copy, QrCode, RefreshCw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function createQrCode() {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return `uuid-${String(values[0] % 100_000_000).padStart(8, "0")}`;
}

export default function GenerateQrDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [qrValue, setQrValue] = useState("");

  const generateNewQr = () => {
    let nextValue = createQrCode();
    while (nextValue === qrValue) nextValue = createQrCode();
    setQrValue(nextValue);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) generateNewQr();
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(qrValue);
    toast.success("QR code copied");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-11 bg-[#1c7aa5] px-5 text-white shadow-md transition-all hover:bg-[#176b91] hover:shadow-lg">
          <QrCode className="h-5 w-5" />
          Generate QR
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center sm:text-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#1c7aa5]/10">
            <QrCode className="h-6 w-6 text-[#1c7aa5]" />
          </div>
          <DialogTitle className="text-2xl">Scan to join the queue</DialogTitle>
          <DialogDescription>
            This QR code is unique. Generate a new one whenever you need a
            fresh scan code.
          </DialogDescription>
        </DialogHeader>

        {qrValue && (
          <div className="flex flex-col items-center gap-5 py-3">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <QRCodeSVG
                value={qrValue}
                size={240}
                level="H"
                marginSize={1}
                title={`Queue code ${qrValue}`}
              />
            </div>

            <button
              type="button"
              onClick={copyCode}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-mono text-lg font-semibold text-gray-800 transition-colors hover:bg-gray-200"
              aria-label="Copy QR code"
            >
              {qrValue}
              <Copy className="h-4 w-4 text-gray-500" />
            </button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={generateNewQr}
            >
              <RefreshCw className="h-4 w-4" />
              Generate New QR
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
