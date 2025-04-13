
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Faq = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const faqCategories = [
    {
      category: 'Courses & Enrollment',
      questions: [
        {
          id: 'q1',
          question: 'How do I enroll in a course?',
          answer: 'To enroll in a course, navigate to the course page and click the "Enroll Now" button. You\'ll be guided through our simple registration process to complete your enrollment.'
        },
        {
          id: 'q2',
          question: 'Can I transfer from one course to another?',
          answer: 'Yes, you can transfer to another course up to 7 days before your original course start date. Please contact our support team to arrange a transfer.'
        },
        {
          id: 'q3',
          question: 'What happens if I miss a session?',
          answer: 'If you miss a session, you should contact your instructor as soon as possible. Depending on the course, we may be able to provide materials or arrange for you to attend the session with another group.'
        },
        {
          id: 'q4',
          question: 'Do your courses expire?',
          answer: 'Access to online course materials typically expires 12 months after enrollment. Certifications have varying validity periods depending on the industry standards.'
        }
      ]
    },
    {
      category: 'Payments & Refunds',
      questions: [
        {
          id: 'q5',
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit/debit cards, PayPal, and bank transfers for course payments. Some courses also offer payment plans.'
        },
        {
          id: 'q6',
          question: 'What is your refund policy?',
          answer: 'We offer a full refund if you cancel at least 14 days before the course start date. Cancellations between 14 and 7 days receive a 50% refund. No refunds are available for cancellations less than 7 days before the start date.'
        },
        {
          id: 'q7',
          question: 'Are there any hidden fees?',
          answer: 'No, the price you see is inclusive of all materials and assessment fees. Some specialized courses may have additional certification fees, which will be clearly listed on the course page.'
        }
      ]
    },
    {
      category: 'Certifications',
      questions: [
        {
          id: 'q8',
          question: 'Are your certifications recognized internationally?',
          answer: 'Many of our certifications are recognized internationally, but this can vary by industry and country. Check the specific course page for details on recognition and accreditation.'
        },
        {
          id: 'q9',
          question: 'How long are certifications valid?',
          answer: 'Certification validity periods vary by subject. Health and safety certifications typically need renewal every 3 years, while other professional certifications may be valid for longer periods.'
        },
        {
          id: 'q10',
          question: 'How do I verify the authenticity of my certificate?',
          answer: 'All our certificates come with a unique verification code that employers can use to confirm authenticity through our online verification portal.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          id: 'q11',
          question: 'What if I have technical issues with the online platform?',
          answer: 'Our technical support team is available Monday to Friday, 9am to 5pm. Contact them at support@lilly-angel.com or call our helpline for assistance.'
        },
        {
          id: 'q12',
          question: 'Can I access courses on mobile devices?',
          answer: 'Yes, our learning platform is fully responsive and works on smartphones and tablets. We also offer a mobile app for iOS and Android for a better mobile learning experience.'
        }
      ]
    }
  ];
  
  // Filter FAQs based on search term
  const filteredFAQs = searchTerm 
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;
  
  // Count total questions
  const totalQuestions = faqCategories.reduce((sum, category) => sum + category.questions.length, 0);
  
  // Count filtered questions
  const filteredQuestionCount = filteredFAQs.reduce((sum, category) => sum + category.questions.length, 0);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto text-center">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-navy-dark mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Find answers to common questions about our courses, certifications, and services
            </motion.p>
            
            <motion.div 
              className="max-w-lg mx-auto relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Input
                type="text"
                placeholder="Search for a question..."
                className="pl-10 py-3 w-full rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              
              {searchTerm && (
                <p className="text-sm text-gray-600 mt-2 text-left">
                  {filteredQuestionCount} of {totalQuestions} questions match your search
                </p>
              )}
            </motion.div>
          </div>
        </section>
        
        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto max-w-4xl">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((category, categoryIndex) => (
                <motion.div 
                  key={categoryIndex}
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-xl font-bold text-navy-dark mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((item, questionIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (questionIndex * 0.05) }}
                        viewport={{ once: true }}
                      >
                        <AccordionItem value={item.id} className="border rounded-lg overflow-hidden">
                          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-colors">
                            <span className="text-left">{item.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 py-4 bg-gray-50">
                            <p className="text-gray-600">{item.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-navy-dark mb-4">No results found</h3>
                <p className="text-gray-600 mb-6">We couldn't find any questions matching your search.</p>
                <Button 
                  onClick={() => setSearchTerm('')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Still Need Help Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.h2 
              className="text-2xl font-bold text-navy-dark mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Still Have Questions?
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-8"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              If you couldn't find the answer you're looking for, please contact our support team
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button className="bg-blue-600 hover:bg-blue-700">
                Contact Support
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Faq;
