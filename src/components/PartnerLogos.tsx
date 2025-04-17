
import React from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';

const PartnerLogos = () => {
  const isMobile = useIsMobile();
  
  // Partner logos array
  const partnerLogos = [
    {
      src: "/lovable-uploads/b3d9ea52-4905-417d-9403-6d23cd3e8499.png",
      alt: "Qualifi Logo"
    },
    {
      src: "/lovable-uploads/18f4bf6f-6b3d-4e94-a279-58efe83fa447.png",
      alt: "Trinity College London Logo"
    },
    {
      src: "/lovable-uploads/028b546c-a59b-47a0-a299-35ae799b0d5d.png",
      alt: "Highfield Approved Centre Logo"
    },
    {
      src: "/lovable-uploads/95611343-7f51-4cf9-85a9-6a1b59554def.png",
      alt: "CalmMinds-UK Partnership Logo"
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-800">Our Trusted Partners</h3>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {partnerLogos.map((logo, index) => (
              <CarouselItem key={index} className={isMobile ? "basis-1/2" : "basis-1/4"}>
                <div className="p-2 h-full">
                  <motion.div
                    className="bg-white rounded-lg p-4 h-24 flex items-center justify-center border border-gray-100 shadow-sm"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="max-h-16 max-w-full object-contain mx-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-end gap-2 mt-4">
            <CarouselPrevious className="relative -left-0" />
            <CarouselNext className="relative -right-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default PartnerLogos;
