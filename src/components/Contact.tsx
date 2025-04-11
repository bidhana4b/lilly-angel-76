
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

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
      value: "contact@eduhub.com",
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
      </div>
    </section>
  );
};

export default Contact;
