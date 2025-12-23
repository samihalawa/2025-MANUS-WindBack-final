import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Users, FileText, CreditCard } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);

  const { data: organizations, isLoading: orgsLoading } = trpc.dashboard.getOrganizations.useQuery(
    undefined,
    { enabled: !!user }
  );

  const { data: stats } = trpc.dashboard.getStats.useQuery(
    { organizationId: selectedOrgId || 0 },
    { enabled: !!selectedOrgId }
  );

  const { data: memories } = trpc.dashboard.getMemories.useQuery(
    { organizationId: selectedOrgId || 0, limit: 10 },
    { enabled: !!selectedOrgId }
  );

  const { data: members } = trpc.dashboard.getMembers.useQuery(
    { organizationId: selectedOrgId || 0 },
    { enabled: !!selectedOrgId }
  );

  const { data: subscription } = trpc.dashboard.getSubscription.useQuery(
    { organizationId: selectedOrgId || 0 },
    { enabled: !!selectedOrgId }
  );

  if (authLoading || orgsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" />
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {/* Organizations Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Organizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizations?.map((org) => (
              <Card
                key={org.id}
                className={`cursor-pointer transition-all ${
                  selectedOrgId === org.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedOrgId(org.id)}
              >
                <CardHeader>
                  <CardTitle>{org.name}</CardTitle>
                  <CardDescription>{org.slug}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{org.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 rounded">
                      {org.plan}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="flex items-center justify-center cursor-pointer hover:bg-accent">
              <Button variant="ghost" className="w-full h-full">
                <Plus className="mr-2" /> New Organization
              </Button>
            </Card>
          </div>
        </div>

        {/* Selected Organization Details */}
        {selectedOrgId && stats && (
          <>
            {/* Stats Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.plan}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                      <Users className="mr-2 h-4 w-4" /> Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.memberCount}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                      <FileText className="mr-2 h-4 w-4" /> Memories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.memoryCount}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" /> Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold capitalize">
                      {subscription?.status || "free"}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Members Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Team Members</h2>
              <Card>
                <CardContent className="pt-6">
                  {members && members.length > 0 ? (
                    <div className="space-y-4">
                      {members.map((member: any) => (
                        <div key={member.id} className="flex items-center justify-between py-2 border-b">
                          <div>
                            <p className="font-medium">{member.user?.name || "Unknown"}</p>
                            <p className="text-sm text-muted-foreground">{member.user?.email}</p>
                          </div>
                          <span className="text-xs font-semibold px-2 py-1 bg-secondary rounded capitalize">
                            {(member as any).role}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No members yet</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Memories Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Recent Memories</h2>
              <Card>
                <CardContent className="pt-6">
                  {memories && memories.length > 0 ? (
                    <div className="space-y-4">
                      {memories.map((memory) => (
                        <div key={memory.id} className="py-2 border-b">
                          <p className="font-medium">{memory.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{memory.content}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(memory.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No memories yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
