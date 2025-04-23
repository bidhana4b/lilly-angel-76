
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, CreditCard, EyeOff, Info } from "lucide-react";
import { PaymentGateway } from "./types";
import { mockPaymentGateways } from "./mockData";

const PaymentGatewayPage: React.FC = () => {
  const [gateways, setGateways] = useState<PaymentGateway[]>(mockPaymentGateways);
  const [activeTab, setActiveTab] = useState<string>("stripe");
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [showWebhookKey, setShowWebhookKey] = useState(false);
  
  const { toast } = useToast();
  
  const currentGateway = gateways.find(g => g.name === activeTab) || gateways[0];
  
  const [formState, setFormState] = useState({
    isActive: currentGateway.isActive,
    apiKey: currentGateway.apiKey || "",
    secretKey: currentGateway.secretKey || "",
    webhookKey: currentGateway.webhookKey || ""
  });
  
  React.useEffect(() => {
    const gateway = gateways.find(g => g.name === activeTab);
    if (gateway) {
      setFormState({
        isActive: gateway.isActive,
        apiKey: gateway.apiKey || "",
        secretKey: gateway.secretKey || "",
        webhookKey: gateway.webhookKey || ""
      });
      setShowSecretKey(false);
      setShowWebhookKey(false);
    }
  }, [activeTab, gateways]);
  
  const handleSave = () => {
    // Validate form
    if (formState.isActive) {
      if (!formState.apiKey) {
        toast({
          title: "Validation Error",
          description: "API Key is required when gateway is active.",
          variant: "destructive",
        });
        return;
      }
      
      if (!formState.secretKey) {
        toast({
          title: "Validation Error",
          description: "Secret Key is required when gateway is active.",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Update gateway configuration
    const updatedGateways = gateways.map(gateway => 
      gateway.name === activeTab
        ? {
            ...gateway,
            isActive: formState.isActive,
            apiKey: formState.apiKey,
            secretKey: formState.secretKey,
            webhookKey: formState.webhookKey,
            lastUpdated: new Date().toISOString()
          }
        : gateway
    );
    
    setGateways(updatedGateways);
    
    toast({
      title: "Gateway Updated",
      description: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} gateway configuration has been updated.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Payment Gateway Configuration</CardTitle>
          <CardDescription>
            Configure payment gateways for processing transactions
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs
            defaultValue="stripe"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
              <TabsTrigger value="stripe" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Stripe</span>
              </TabsTrigger>
              <TabsTrigger value="paypal" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>PayPal</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="stripe" className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="stripe-active" className="flex flex-col space-y-1">
                  <span>Enable Stripe Payments</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Allow students to pay using Stripe
                  </span>
                </Label>
                <Switch
                  id="stripe-active"
                  checked={formState.isActive}
                  onCheckedChange={(checked) => 
                    setFormState({ ...formState, isActive: checked })
                  }
                />
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="stripe-api-key">
                    Publishable API Key
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="stripe-api-key"
                    placeholder="pk_test_..."
                    value={formState.apiKey}
                    onChange={(e) => 
                      setFormState({ ...formState, apiKey: e.target.value })
                    }
                    disabled={!formState.isActive}
                  />
                  <p className="text-xs text-muted-foreground">
                    Your Stripe publishable API key (starts with pk_)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stripe-secret-key">
                    Secret Key
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="stripe-secret-key"
                      placeholder="sk_test_..."
                      type={showSecretKey ? "text" : "password"}
                      value={formState.secretKey}
                      onChange={(e) => 
                        setFormState({ ...formState, secretKey: e.target.value })
                      }
                      disabled={!formState.isActive}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSecretKey(!showSecretKey)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 px-2"
                      disabled={!formState.isActive}
                    >
                      <EyeOff className="h-3 w-3" />
                      <span className="sr-only">
                        {showSecretKey ? "Hide" : "Show"} secret key
                      </span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your Stripe secret key (starts with sk_)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stripe-webhook-key">
                    Webhook Signing Secret
                  </Label>
                  <div className="relative">
                    <Input
                      id="stripe-webhook-key"
                      placeholder="whsec_..."
                      type={showWebhookKey ? "text" : "password"}
                      value={formState.webhookKey}
                      onChange={(e) => 
                        setFormState({ ...formState, webhookKey: e.target.value })
                      }
                      disabled={!formState.isActive}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowWebhookKey(!showWebhookKey)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 px-2"
                      disabled={!formState.isActive}
                    >
                      <EyeOff className="h-3 w-3" />
                      <span className="sr-only">
                        {showWebhookKey ? "Hide" : "Show"} webhook key
                      </span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Used for verifying webhook events (starts with whsec_)
                  </p>
                </div>
              </div>
              
              <div className="flex items-center p-3 border rounded-md bg-muted/40">
                <Info className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-xs text-muted-foreground">
                  For testing, use Stripe's test keys. For production, switch to live keys.
                </span>
              </div>
              
              {formState.isActive && currentGateway.lastUpdated && (
                <div className="text-xs text-muted-foreground">
                  Last updated: {new Date(currentGateway.lastUpdated).toLocaleString()}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="paypal" className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="paypal-active" className="flex flex-col space-y-1">
                  <span>Enable PayPal Payments</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Allow students to pay using PayPal
                  </span>
                </Label>
                <Switch
                  id="paypal-active"
                  checked={formState.isActive}
                  onCheckedChange={(checked) => 
                    setFormState({ ...formState, isActive: checked })
                  }
                />
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="paypal-api-key">
                    Client ID
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="paypal-api-key"
                    placeholder="Your PayPal Client ID..."
                    value={formState.apiKey}
                    onChange={(e) => 
                      setFormState({ ...formState, apiKey: e.target.value })
                    }
                    disabled={!formState.isActive}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paypal-secret-key">
                    Client Secret
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="paypal-secret-key"
                      placeholder="Your PayPal Client Secret..."
                      type={showSecretKey ? "text" : "password"}
                      value={formState.secretKey}
                      onChange={(e) => 
                        setFormState({ ...formState, secretKey: e.target.value })
                      }
                      disabled={!formState.isActive}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSecretKey(!showSecretKey)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 px-2"
                      disabled={!formState.isActive}
                    >
                      <EyeOff className="h-3 w-3" />
                      <span className="sr-only">
                        {showSecretKey ? "Hide" : "Show"} secret key
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-3 border rounded-md bg-muted/40">
                <Info className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-xs text-muted-foreground">
                  For testing, use PayPal Sandbox credentials. For production, use your live credentials.
                </span>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                const gateway = gateways.find(g => g.name === activeTab);
                if (gateway) {
                  setFormState({
                    isActive: gateway.isActive,
                    apiKey: gateway.apiKey || "",
                    secretKey: gateway.secretKey || "",
                    webhookKey: gateway.webhookKey || ""
                  });
                }
              }}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" /> Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center p-4 border rounded-md bg-yellow-50">
        <AlertCircle className="h-5 w-5 mr-3 text-yellow-600" />
        <div>
          <h3 className="font-medium text-yellow-800">Important</h3>
          <p className="text-sm text-yellow-700">
            Payment gateway API keys provide access to process real transactions. 
            Always keep your secret keys secure and never share them publicly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayPage;
