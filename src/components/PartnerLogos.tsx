
import React from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';

const PartnerLogos = () => {
  const isMobile = useIsMobile();

  // Partner logos array
  const partnerLogos = [{
    src: "/lovable-uploads/b3d9ea52-4905-417d-9403-6d23cd3e8499.png",
    alt: "Qualifi Logo"
  }, {
    src: "/lovable-uploads/18f4bf6f-6b3d-4e94-a279-58efe83fa447.png",
    alt: "Trinity College London Logo"
  }, {
    src: "/lovable-uploads/028b546c-a59b-47a0-a299-35ae799b0d5d.png",
    alt: "Highfield Approved Centre Logo"
  }, {
    src: "/lovable-uploads/95611343-7f51-4cf9-85a9-6a1b59554def.png",
    alt: "CalmMinds-UK Partnership Logo"
  }];
  
  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-lg text-gray-500 mb-8">Trusted by industry leaders</h3>
        
        <Carousel className="w-full">
          <CarouselContent>
            {partnerLogos.map((logo, index) => (
              <CarouselItem key={index} className={isMobile ? "basis-1/2" : "basis-1/4"}>
                <motion.div 
                  className="flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <img 
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {!isMobile && (
            <>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default PartnerLogos;
