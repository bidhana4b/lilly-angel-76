
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon, Download, FileUp, Search, X } from "lucide-react";
import { Transaction, PaymentMethod, PaymentStatus } from "./types";
import { mockTransactions } from "./mockData";

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  const { toast } = useToast();
  
  const handleSearch = () => {
    let results = transactions;
    
    if (searchTerm) {
      results = results.filter(
        (item) => 
          item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (paymentMethod) {
      results = results.filter(item => item.paymentMethod === paymentMethod);
    }
    
    if (status) {
      results = results.filter(item => item.status === status);
    }
    
    if (startDate) {
      results = results.filter(item => new Date(item.date) >= startDate);
    }
    
    if (endDate) {
      results = results.filter(item => new Date(item.date) <= endDate);
    }
    
    setFilteredTransactions(results);
  };
  
  React.useEffect(() => {
    handleSearch();
  }, [searchTerm, paymentMethod, status, startDate, endDate]);
  
  const resetFilters = () => {
    setSearchTerm("");
    setPaymentMethod("");
    setStatus("");
    setStartDate(undefined);
    setEndDate(undefined);
    setFilteredTransactions(transactions);
  };
  
  const exportCSV = () => {
    // Create CSV content
    let csvContent = "Transaction ID,Student Name,Student ID,Amount,Date,Payment Method,Status,Description\n";
    
    filteredTransactions.forEach(item => {
      csvContent += `"${item.id}","${item.studentName}","${item.studentId}","${item.amount}","${item.date}","${item.paymentMethod}","${item.status}","${item.description}"\n`;
    });
    
    // Create download element
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `transactions-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "CSV Export Successful",
      description: `Exported ${filteredTransactions.length} transactions.`,
      duration: 3000,
    });
  };
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const getStatusBadgeClass = (status: PaymentStatus): string => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium";
      case "pending":
        return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium";
      case "overdue":
        return "bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium";
      case "refunded":
        return "bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium";
      case "cancelled":
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium";
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>View and filter payment history</CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={exportCSV} 
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by student or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Methods</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="debit_card">Debit Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : "Start Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP') : "End Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {(searchTerm || paymentMethod || status || startDate || endDate) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="flex items-center gap-1 h-10"
              >
                <X className="h-4 w-4" /> Clear Filters
              </Button>
            )}
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>
                        <div>{transaction.studentName}</div>
                        <div className="text-xs text-muted-foreground">{transaction.studentId}</div>
                      </TableCell>
                      <TableCell>{format(new Date(transaction.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(transaction.amount)}</TableCell>
                      <TableCell>
                        <span className="capitalize">
                          {transaction.paymentMethod.replace('_', ' ')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={getStatusBadgeClass(transaction.status)}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No transactions found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TransactionsPage;
