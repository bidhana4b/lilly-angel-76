
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PaymentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Make Payment</h2>
        <p className="text-muted-foreground">
          View pending payments and payment history.
        </p>
      </div>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-6 space-y-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-red-700">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Due
              </CardTitle>
              <CardDescription className="text-red-600">
                Please make your payment before the due date to avoid late fees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Spring Semester Tuition</h4>
                    <p className="text-sm text-red-600">Due by: April 30, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-red-700">$2,999.00</p>
                    <p className="text-xs text-red-600">Late fee: $50 after due date</p>
                  </div>
                </div>
                
                <div className="border-t border-red-200 pt-4">
                  <Button className="w-full">Make Payment Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Payment Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 flex gap-3 hover:border-primary cursor-pointer transition-all">
                    <CreditCard className="h-10 w-10 text-primary" />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, or American Express</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 flex gap-3 hover:border-primary cursor-pointer transition-all">
                    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 9H9V15H15V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-muted-foreground">Pay directly from your bank account</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>Need financial assistance? <a href="#" className="text-primary hover:underline">Contact the financial aid office</a></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Payment History</CardTitle>
              <CardDescription>View your past transactions and download receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: "INV-2023-005", date: "Feb 10, 2025", desc: "Spring Semester Deposit", amount: "$500.00", status: "Paid" },
                      { id: "INV-2023-004", date: "Jan 15, 2025", desc: "Course Materials Fee", amount: "$199.00", status: "Paid" },
                      { id: "INV-2023-003", date: "Dec 05, 2024", desc: "Fall Semester Tuition", amount: "$2,999.00", status: "Paid" },
                      { id: "INV-2023-002", date: "Aug 20, 2024", desc: "Registration Fee", amount: "$150.00", status: "Paid" },
                      { id: "INV-2023-001", date: "Aug 15, 2024", desc: "Application Fee", amount: "$75.00", status: "Paid" },
                    ].map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.desc}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Download className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:inline-block">Receipt</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Showing 5 of 5 transactions</p>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Statement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentsPage;
