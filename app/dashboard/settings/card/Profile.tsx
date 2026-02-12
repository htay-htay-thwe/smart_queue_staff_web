import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profile from "@/asset/image/profile.jpg";
import { MapPin, User, Briefcase } from "lucide-react";

export default function Profile() {
    return (
        <div className="p-6">
            <Card className="group overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:border-primary/50">
                {/* Gradient background header */}
                <div className="relative h-24 bg-gradient-to-r from-primary/10 to-primary/20">
                    <div className="absolute inset-0 bg-grid-white/10"></div>
                </div>
                
                <CardContent className="relative -mt-12 space-y-4">
                    {/* Avatar */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/5 to-primary/10 blur-xl"></div>
                            <Avatar className="relative h-24 w-24 border-4 border-background shadow-xl ring-2 ring-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:ring-primary/40">
                                <AvatarImage src={profile.src} alt="Profile" />
                                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                                    <User className="h-12 w-12" />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    {/* User info */}
                    <div className="space-y-3 text-center">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight">John Smith</h3>
                            <div className="mt-1 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <Briefcase className="h-4 w-4" />
                                <span>Regular Customer</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2 rounded-lg bg-muted/50 px-4 py-2 text-sm transition-colors hover:bg-muted">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="font-medium">Bangkok, Thailand</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}