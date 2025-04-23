
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { AlertCircle, Mail, Search } from "lucide-react";
import { DuePayment } from "./types";
import { mockDuePayments } from "./mockData";

const DueListPage: React.FC = () => {
  const [duePayments, setDuePayments] = useState<DuePayment[]>(mockDuePayments);
  const [filteredDuePayments, setFilteredDuePayments] = useState<DuePayment[]>(mockDuePayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<DuePayment | null>(null);
  const [reminderMessage, setReminderMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { toast } = useToast();
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredDuePayments(duePayments);
      return;
    }
    
    const results = duePayments.filter(
      (item) =>
        item.studentName.toLowerCase().includes(term.toLowerCase()) ||
        item.studentId.toLowerCase().includes(term.toLowerCase()) ||
        item.course.toLowerCase().includes(term.toLowerCase()) ||
        item.paymentFor.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredDuePayments(results);
  };
  
  const handleReminderClick = (payment: DuePayment) => {
    setSelectedPayment(payment);
    setReminderMessage(`Dear ${payment.studentName},\n\nThis is a reminder that your payment of $${payment.amount.toFixed(2)} for ${payment.paymentFor} is overdue by ${payment.daysOverdue} days. Please make the payment as soon as possible.\n\nThank you,\nEduLearn Academy`);
    setDialogOpen(true);
  };
  
  const sendReminder = () => {
    if (!selectedPayment) return;
    
    // In a real app, this would send the email or notification
    // For now, we'll just update the lastReminder date
    const updatedPayments = duePayments.map(payment => 
      payment.id === selectedPayment.id 
        ? { ...payment, lastReminder: new Date().toISOString() }
        : payment
    );
    
    setDuePayments(updatedPayments);
    setFilteredDuePayments(
      filteredDuePayments.map(payment => 
        payment.id === selectedPayment.id 
          ? { ...payment, lastReminder: new Date().toISOString() }
          : payment
      )
    );
    
    toast({
      title: "Reminder Sent",
      description: `Payment reminder sent to ${selectedPayment.studentName}`,
      duration: 3000,
    });
    
    setDialogOpen(false);
  };
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Due Payments</CardTitle>
              <CardDescription>Students with pending payments</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by student or course..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Payment For</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Days Overdue</TableHead>
                  <TableHead>Last Reminder</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDuePayments.length > 0 ? (
                  filteredDuePayments.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>{payment.studentName}</div>
                        <div className="text-xs text-muted-foreground">{payment.studentId}</div>
                      </TableCell>
                      <TableCell>{payment.course}</TableCell>
                      <TableCell>{payment.paymentFor}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>{format(new Date(payment.dueDate), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                          payment.daysOverdue > 30 ? 'bg-red-100 text-red-800' : 
                          payment.daysOverdue > 14 ? 'bg-orange-100 text-orange-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payment.daysOverdue} days
                        </span>
                      </TableCell>
                      <TableCell>
                        {payment.lastReminder ? 
                          format(new Date(payment.lastReminder), 'MMM dd, yyyy') : 
                          <span className="text-muted-foreground">Never</span>
                        }
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex items-center gap-1"
                          onClick={() => handleReminderClick(payment)}
                        >
                          <Mail className="h-4 w-4" /> 
                          <span className="hidden sm:inline">Send Reminder</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      No due payments found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        <CardFooter>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>Students are listed when payments are past their due date</span>
          </div>
        </CardFooter>
      </Card>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Payment Reminder</DialogTitle>
            <DialogDescription>
              This will send a payment reminder email to {selectedPayment?.studentName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="recipient">To:</Label>
              <Input 
                id="recipient" 
                value={`${selectedPayment?.studentName} <${selectedPayment?.studentId.toLowerCase()}@edulearn.com>`} 
                readOnly 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject:</Label>
              <Input 
                id="subject" 
                value={`PAYMENT REMINDER: ${selectedPayment?.paymentFor}`} 
                readOnly 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="message">Message:</Label>
              <Textarea 
                id="message" 
                value={reminderMessage} 
                onChange={(e) => setReminderMessage(e.target.value)} 
                rows={8}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={sendReminder} className="flex items-center gap-1">
              <Mail className="h-4 w-4" /> Send Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DueListPage;
