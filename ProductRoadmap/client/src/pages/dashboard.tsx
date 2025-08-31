import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { Plus, Megaphone, Play, IndianRupee, Users, Eye, MousePointer, ShoppingCart } from "lucide-react";
import Header from "@/components/layout/header";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Campaign } from "@shared/schema";

const objectiveIcons = {
  awareness: Eye,
  traffic: MousePointer,
  sales: ShoppingCart,
};

const objectiveLabels = {
  awareness: "Brand Awareness",
  traffic: "Website Traffic",
  sales: "Sales & Conversions",
};

const objectiveColors = {
  awareness: "bg-blue-100 text-blue-800",
  traffic: "bg-green-100 text-green-800", 
  sales: "bg-purple-100 text-purple-800",
};

const statusColors = {
  active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800",
  completed: "bg-gray-100 text-gray-800",
};

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: campaigns = [], isLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  const updateCampaignMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/campaigns/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      toast({
        title: "Campaign updated",
        description: "Campaign status has been updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Failed to update campaign",
        variant: "destructive",
      });
    },
  });

  const activeCampaigns = campaigns.filter(c => c.status === "active").length;
  const totalSpend = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalReach = campaigns.reduce((sum, c) => sum + (c.reach || 0), 0);

  const handleCreateNew = () => {
    setLocation("/");
  };

  const handlePauseCampaign = (id: string) => {
    updateCampaignMutation.mutate({ id, status: "paused" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-xl"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Campaign Dashboard</h1>
              <p className="text-muted-foreground">Manage and monitor your advertising campaigns.</p>
            </div>
            <Button 
              onClick={handleCreateNew}
              className="mt-4 sm:mt-0"
              data-testid="button-new-campaign"
            >
              <Plus className="mr-2" size={16} />
              New Campaign
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Campaigns</p>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-total-campaigns">
                    {campaigns.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Megaphone className="text-blue-600" size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Campaigns</p>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-active-campaigns">
                    {activeCampaigns}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Play className="text-green-600" size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spend</p>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-total-spend">
                    ₹{totalSpend.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <IndianRupee className="text-purple-600" size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reach</p>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-total-reach">
                    {(totalReach / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="text-orange-600" size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Your Campaigns</h3>
            </div>
            
            {campaigns.length === 0 ? (
              <div className="p-12 text-center">
                <Megaphone className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No campaigns yet</h3>
                <p className="text-muted-foreground mb-4">Create your first campaign to get started.</p>
                <Button onClick={handleCreateNew} data-testid="button-create-first-campaign">
                  <Plus className="mr-2" size={16} />
                  Create Campaign
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-foreground">Campaign</th>
                      <th className="text-left py-3 px-6 font-medium text-foreground">Objective</th>
                      <th className="text-left py-3 px-6 font-medium text-foreground">Budget</th>
                      <th className="text-left py-3 px-6 font-medium text-foreground">Reach</th>
                      <th className="text-left py-3 px-6 font-medium text-foreground">Status</th>
                      <th className="text-left py-3 px-6 font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-accent/50" data-testid={`row-campaign-${campaign.id}`}>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-foreground" data-testid={`text-campaign-name-${campaign.id}`}>
                              {campaign.name}
                            </div>
                            <div className="text-sm text-muted-foreground" data-testid={`text-campaign-id-${campaign.id}`}>
                              {campaign.id}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={objectiveColors[campaign.objective as keyof typeof objectiveColors]}>
                            {objectiveLabels[campaign.objective as keyof typeof objectiveLabels]}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-foreground font-medium" data-testid={`text-campaign-budget-${campaign.id}`}>
                          ₹{campaign.budget.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-foreground" data-testid={`text-campaign-reach-${campaign.id}`}>
                          {(campaign.reach || 0).toLocaleString()}
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={statusColors[campaign.status as keyof typeof statusColors]}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-2">
                            <button className="text-primary hover:text-primary/80 text-sm" data-testid={`button-view-${campaign.id}`}>
                              View
                            </button>
                            <button className="text-muted-foreground hover:text-foreground text-sm" data-testid={`button-edit-${campaign.id}`}>
                              Edit
                            </button>
                            {campaign.status === "active" && (
                              <button 
                                onClick={() => handlePauseCampaign(campaign.id)}
                                className="text-destructive hover:text-destructive/80 text-sm"
                                data-testid={`button-pause-${campaign.id}`}
                              >
                                Pause
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
