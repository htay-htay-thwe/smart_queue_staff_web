"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, Copy, Loader2, QrCode, RefreshCw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { useShopStore } from "@/store/shopStore";
import { createShopQr, getShopQrStatus } from "@/services/queue.service";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type QrData = { token: string; qr_value: string; expires_at: string };

export default function GenerateQrDialog() {
  const shopId = useShopStore((state) => state.shop._id);
  const [isOpen, setIsOpen] = useState(false);
  const [qr, setQr] = useState<QrData | null>(null);
  const [used, setUsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateNewQr = useCallback(async () => {
    if (!shopId) { toast.error("Shop information is unavailable. Please sign in again."); return; }
    setLoading(true);
    try {
      const next = await createShopQr(shopId);
      setQr({ token: next.token, qr_value: next.qr_value, expires_at: next.expires_at });
      setUsed(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Could not generate QR code");
    } finally { setLoading(false); }
  }, [shopId]);

  useEffect(() => {
    if (!isOpen || !qr || used) return;
    const timer = setInterval(async () => {
      try {
        const status = await getShopQrStatus(qr.token);
        if (status.used) {
          setUsed(true);
          toast.success("Customer check-in confirmed. Generate a new QR for the next customer.");
        }
      } catch { /* A temporary polling failure must not close the QR dialog. */ }
    }, 2000);
    return () => clearInterval(timer);
  }, [isOpen, qr, used]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !qr && !loading) void generateNewQr();
  };
  const copyCode = async () => {
    if (!qr) return;
    await navigator.clipboard.writeText(qr.qr_value);
    toast.success("QR payload copied");
  };

  return <Dialog open={isOpen} onOpenChange={handleOpenChange}>
    <DialogTrigger asChild><Button className="h-11 bg-[#1E7A9B] px-5 text-white shadow-md hover:bg-[#176680]"><QrCode className="h-5 w-5"/>Generate QR</Button></DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader className="items-center text-center sm:text-center">
        <div className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${used ? "bg-emerald-100" : "bg-[#1E7A9B]/10"}`}>
          {used ? <CheckCircle2 className="h-6 w-6 text-emerald-600"/> : <QrCode className="h-6 w-6 text-[#1E7A9B]"/>}
        </div>
        <DialogTitle className="text-2xl">{used ? "QR already used" : "Customer check-in QR"}</DialogTitle>
        <DialogDescription>{used ? "This UUID belongs to one completed scan and cannot be reused. Generate a fresh QR for the next customer." : "Only a customer whose status is Ready to seat can scan this single-use QR."}</DialogDescription>
      </DialogHeader>

      {loading && <div className="flex min-h-72 flex-col items-center justify-center gap-3"><Loader2 className="h-8 w-8 animate-spin text-[#1E7A9B]"/><p className="text-sm text-slate-500">Generating secure UUID…</p></div>}
      {!loading && qr && <div className="flex flex-col items-center gap-5 py-3">
        <div className={`relative rounded-2xl border bg-white p-5 shadow-sm ${used ? "opacity-25 grayscale" : ""}`}><QRCodeSVG value={qr.qr_value} size={240} level="H" marginSize={1} title="Single-use Smart Queue check-in QR"/></div>
        <button type="button" onClick={copyCode} disabled={used} className="flex max-w-full items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-mono text-xs font-semibold text-gray-700 disabled:opacity-40" aria-label="Copy QR payload"><span className="max-w-72 truncate">{qr.token}</span><Copy className="h-4 w-4 shrink-0"/></button>
        {!used && <p className="text-center text-xs text-slate-500">Waiting for one Ready to seat customer to scan…</p>}
        <Button type="button" variant={used ? "default" : "outline"} className={`w-full ${used ? "bg-[#1E7A9B] hover:bg-[#176680]" : ""}`} onClick={() => void generateNewQr()}><RefreshCw className="h-4 w-4"/>Generate New QR</Button>
      </div>}
    </DialogContent>
  </Dialog>;
}
