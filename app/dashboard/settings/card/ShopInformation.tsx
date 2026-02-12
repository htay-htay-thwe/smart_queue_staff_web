import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { EditShopInformationDialog } from "./EditShopInformationDialog";
import { Separator } from "@/components/ui/separator";
import { Store, Utensils, FileText, Table } from "lucide-react";

export default function ShopInformation() {
  return (
    <div className="p-4 w-full">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-r from-purple-500/20 to-purple-600/20">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle>Shop Information</CardTitle>
              <CardDescription>
                Business details and configuration
              </CardDescription>
            </div>
          </div>
          <CardAction>
            <EditShopInformationDialog />
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Store className="h-4 w-4" />
                <span>Shop Title</span>
              </div>
              <p className="text-base font-medium">H2T Shop</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Utensils className="h-4 w-4" />
                <span>Shop Type</span>
              </div>
              <p className="text-base font-medium">🍜 Asian Cuisine</p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Description</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              H2T Shop
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Table className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Table Configuration</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    2-Seater
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <Table className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold">20</p>
                <p className="text-xs text-muted-foreground">tables</p>
              </div>

              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    4-Seater
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <Table className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold">40</p>
                <p className="text-xs text-muted-foreground">tables</p>
              </div>

              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    6-Seater
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <Table className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold">60</p>
                <p className="text-xs text-muted-foreground">tables</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
