import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AppSettings() {
  const { user } = useAuth();

  return (
        <div className="space-y-8 max-w-2xl">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account and preferences.
            </p>
          </div>

          {/* 账户信息 */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-lg font-semibold mt-1">{user?.name || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-lg font-semibold mt-1">{user?.email || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Login Method</label>
                <p className="text-lg font-semibold mt-1 capitalize">{user?.loginMethod || "Unknown"}</p>
              </div>
            </CardContent>
          </Card>

          {/* 隐私设置 */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Local-first vault</p>
                  <p className="text-sm text-muted-foreground">Your data is encrypted locally</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">End-to-end encryption</p>
                  <p className="text-sm text-muted-foreground">All recordings are encrypted</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
            </CardContent>
          </Card>

          {/* 数据管理 */}
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Export My Data
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                Delete All Data
              </Button>
            </CardContent>
          </Card>
        </div>
  );
}
