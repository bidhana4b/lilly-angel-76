
import React, { useState } from "react";
import { Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText, Settings } from "lucide-react";

// Import submodules
import TransactionsPage from "./TransactionsPage";
import DueListPage from "./DueListPage";
import PaymentGatewayPage from "./PaymentGatewayPage";

const PaymentsPage: React.FC = () => {
  const location = useLocation();
  const currentTab = location.pathname.split("/").pop();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payments Management</h2>
          <p className="text-muted-foreground">
            Manage transactions, due payments, and payment gateways
          </p>
        </div>
      </div>

      <Card>
        <Tabs 
          defaultValue="transactions" 
          value={currentTab === "payments" ? "transactions" : currentTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full bg-muted/50 p-1">
            <TabsTrigger value="transactions" asChild>
              <NavLink to="/dashboard/admin/payments/transactions" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>All Transactions</span>
              </NavLink>
            </TabsTrigger>
            <TabsTrigger value="due-list" asChild>
              <NavLink to="/dashboard/admin/payments/due-list" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Due Payments</span>
              </NavLink>
            </TabsTrigger>
            <TabsTrigger value="gateway" asChild>
              <NavLink to="/dashboard/admin/payments/gateway" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Payment Gateway</span>
              </NavLink>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      <Routes>
        <Route index element={<Navigate to="transactions" replace />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="due-list" element={<DueListPage />} />
        <Route path="gateway" element={<PaymentGatewayPage />} />
      </Routes>
    </div>
  );
};

export default PaymentsPage;
