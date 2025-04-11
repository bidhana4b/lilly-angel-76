
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-orange-DEFAULT" />,
      label: "Call Us",
      value: "+1 (555) 123-4567",
    },
    {
      icon: <Mail className="h-6 w-6 text-orange-DEFAULT" />,
      label: "Email",
      value: "contact@hurak.com",
    },
    {
      icon: <MapPin className="h-6 w-6 text-orange-DEFAULT" />,
      label: "Location",
      value: "123 Education Ave, Learning City",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-4">Need To Contact Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our support team is available to help you with any questions or issues you may have.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center card-hover">
              <div className="bg-orange-light/10 p-3 rounded-full mb-4">
                {info.icon}
              </div>
              <h3 className="text-navy-dark font-semibold mb-1">{info.label}</h3>
              <p className="text-gray-600">{info.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md max-w-2xl mx-auto p-8">
          <h3 className="text-xl font-bold text-navy-dark mb-6 text-center">Send Us a Message</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help you?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-DEFAULT"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <Button className="w-full bg-orange-DEFAULT hover:bg-orange-dark text-white">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
