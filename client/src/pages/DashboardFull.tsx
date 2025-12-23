import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Users, FileText, CreditCard, Settings, LogOut, Menu, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardFull() {
  const { user, loading: authLoading, logout } = useAuth();
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgSlug, setNewOrgSlug] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // 查询
  const { data: organizations, isLoading: orgsLoading, refetch: refetchOrgs } = trpc.organizations.getAll.useQuery(
    undefined,
    { enabled: !!user }
  );

  const { data: stats } = trpc.dashboard.getStats.useQuery(
    { organizationId: selectedOrgId || 0 },
    { enabled: !!selectedOrgId }
  );

  const { data: members, refetch: refetchMembers } = trpc.members.getByOrganization.useQuery(
    { organizationId: selectedOrgId || 0 },
    { enabled: !!selectedOrgId }
  );

  const { data: subscription } = trpc.subscriptions.getByOrganization.useQuery(
    { organizationId: selectedOrgId || 0 },
    { enabled: !!selectedOrgId }
  );

  const { data: invoices } = trpc.subscriptions.getInvoices.useQuery(
    { organizationId: selectedOrgId || 0 },
    { enabled: !!selectedOrgId }
  );

  // 变更
  const createOrgMutation = trpc.organizations.create.useMutation({
    onSuccess: () => {
      toast.success("Organization created!");
      setShowCreateOrg(false);
      setNewOrgName("");
      setNewOrgSlug("");
      refetchOrgs();
    },
  });

  const handleCreateOrg = async () => {
    if (!newOrgName || !newOrgSlug) {
      toast.error("Please fill in all fields");
      return;
    }

    await createOrgMutation.mutateAsync({
      name: newOrgName,
      slug: newOrgSlug,
      plan: "free",
    });
  };

  if (authLoading || orgsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please log in to access the dashboard</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg" />
            <span className="font-bold text-lg">WindBack</span>
          </div>

          <button
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X /> : <Menu />}
          </button>

          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${showMobileMenu ? "block" : "hidden"} md:block w-full md:w-64 bg-white border-r border-gray-200 p-4 min-h-[calc(100vh-64px)]`}>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Organizations</h3>

            <div className="space-y-2">
              {organizations?.map((org) => (
                <button
                  key={org.id}
                  onClick={() => {
                    setSelectedOrgId(org.id);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    selectedOrgId === org.id
                      ? "bg-purple-100 text-purple-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="font-medium">{org.name}</div>
                  <div className="text-xs text-gray-500">{org.slug}</div>
                </button>
              ))}
            </div>

            <Button
              onClick={() => setShowCreateOrg(true)}
              className="w-full"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Organization
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {showCreateOrg ? (
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle>Create Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Organization Name</label>
                  <Input
                    value={newOrgName}
                    onChange={(e) => setNewOrgName(e.target.value)}
                    placeholder="My Team"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={newOrgSlug}
                    onChange={(e) => setNewOrgSlug(e.target.value)}
                    placeholder="my-team"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCreateOrg}
                    disabled={createOrgMutation.isPending}
                  >
                    Create
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateOrg(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : selectedOrgId && stats ? (
            <div className="space-y-8">
              {/* Stats */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold capitalize">{subscription?.plan || "Free"}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Members
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.memberCount}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Memories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.memoryCount}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold capitalize">
                        {subscription?.status || "Active"}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Members */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Team Members</h2>
                <Card>
                  <CardContent className="pt-6">
                    {members && members.length > 0 ? (
                      <div className="space-y-3">
                        {members.map((member: any) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{member.user?.name || "Unknown"}</p>
                              <p className="text-sm text-gray-500">{member.user?.email}</p>
                            </div>
                            <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-700 rounded-full capitalize">
                              {member.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No members yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Invoices */}
              {invoices && invoices.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Billing History</h2>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        {invoices.map((invoice: any) => (
                          <div
                            key={invoice.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium">Invoice {invoice.stripeInvoiceId}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(invoice.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${invoice.amount}</p>
                              <p className="text-xs text-gray-500 capitalize">{invoice.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Select an organization to view details</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
