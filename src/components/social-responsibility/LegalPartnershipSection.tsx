
import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Phone, Mail } from 'lucide-react';

const LegalPartnershipSection = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-navy-dark mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Free Legal Consultation Partnership
          </motion.h2>
          <motion.p 
            className="text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            In partnership with CalmMinds-UK, we're providing free legal consultation by experienced solicitors as part of our Social Responsibility to the local community.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            className="bg-white rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img 
              src="/lovable-uploads/922ff83d-92bb-4f7e-83c6-f9d55a3b8687.png" 
              alt="CalmMinds-UK and Lilly Angel Free Legal Consultation Partnership" 
              className="w-full h-auto"
            />
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Scale className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-navy-dark">Areas of Expertise</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Immigration & Asylum</h4>
                  <ul className="space-y-1">
                    <li>• Human rights & protection</li>
                    <li>• Asylum applications & appeals</li>
                    <li>• Naturalization & British passport</li>
                    <li>• UK Sponsorship & Work Permits</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Housing & Property</h4>
                  <ul className="space-y-1">
                    <li>• Commercial & Residential Leasing</li>
                    <li>• Tenant rights & Landlord disputes</li>
                    <li>• Lease agreements & renewals</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Employment Law</h4>
                  <ul className="space-y-1">
                    <li>• Unlawful dismissal</li>
                    <li>• Workplace rights & disputes</li>
                    <li>• Universal Credit (Welfare Benefits)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Family Law</h4>
                  <ul className="space-y-1">
                    <li>• Divorce & separation</li>
                    <li>• Child arrangements & custody</li>
                    <li>• Debt management & advice</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Phone className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-lg font-bold text-navy-dark">Contact for Booking</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-600">07448 186 998</span>
                  <span className="mx-2">|</span>
                  <span className="font-semibold text-blue-600">07940 078 447</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-blue-600 mr-2" />
                  <a href="mailto:info@lilly-angel.co.uk" className="text-blue-600 hover:underline">info@lilly-angel.co.uk</a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-blue-600 mr-2" />
                  <a href="mailto:info@calmmindsuk.org.uk" className="text-blue-600 hover:underline">info@calmmindsuk.org.uk</a>
                </div>
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500">
                  <p className="text-sm text-red-700 font-medium">
                    *FREE LEGAL ADVICE IS AVAILABLE FOR PRE-BOOKED APPOINTMENTS ONLY.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h4 className="font-semibold text-navy-dark mb-2">Location:</h4>
              <p className="text-gray-700 text-sm">
                The WELLcome Hub, 1st floor<br />
                35 Vicarage Lane, East Ham, E6 6DQ
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LegalPartnershipSection;
