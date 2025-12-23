import { AppLayout } from "@/components/AppLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Mic, BarChart3, Clock, Zap } from "lucide-react";

export default function AppDashboard() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="space-y-8">
          {/* 欢迎部分 */}
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Here's your Rewind activity.
            </p>
          </div>

          {/* 快速操作 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  Start Recording
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/app/recording">
                  <a>
                    <Button className="w-full">Start</Button>
                  </a>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0</p>
                <p className="text-xs text-muted-foreground">Recordings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Total Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0h</p>
                <p className="text-xs text-muted-foreground">Recorded</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">0 MB</p>
                <p className="text-xs text-muted-foreground">Used</p>
              </CardContent>
            </Card>
          </div>

          {/* 最近录制 */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Recordings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">No recordings yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Start recording to see your activity here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
