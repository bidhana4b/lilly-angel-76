
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const paymentHistory = [
  { course: "Web Development", amount: "$199", date: "Mar 15, 2025" },
  { course: "UX Design", amount: "$249", date: "Feb 10, 2025" },
];

const PaymentsCard: React.FC = () => (
  <Card className="transition-all duration-200 hover:shadow-md student-payments">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>Payment Status</span>
        <CreditCard className="h-5 w-5 text-primary" />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-100 p-3 rounded-md">
          <h4 className="font-medium text-red-600">Payment Due: $299</h4>
          <p className="text-sm text-red-500">Due by April 30, 2025</p>
          <Button className="mt-2 w-full" variant="destructive" asChild>
            <Link to="/dashboard/student/payments">Make Payment</Link>
          </Button>
        </div>
        <div>
          <p className="font-medium">Payment History</p>
          <div className="mt-2 space-y-3">
            {paymentHistory.map((payment, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{payment.course}</span>
                <div>
                  <span className="font-medium">{payment.amount}</span>
                  <span className="text-muted-foreground ml-2">{payment.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default PaymentsCard;
