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
  return;
};
export default PartnerLogos;