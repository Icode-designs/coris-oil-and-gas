"use client";

import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { theme } from "@/styles/theme";

const Section = styled.section`
  padding: 120px 24px;
  background: white;
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const SectionLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(245, 157, 21, 0.1);
  border: 1px solid rgba(245, 157, 21, 0.25);
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.orangeDark};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 900;
  color: ${theme.colors.charcoal};
  letter-spacing: -0.02em;
  margin-bottom: 16px;
  line-height: 1.15;
`;

const Subtitle = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 56px;
`;

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
`;

const FaqItem = styled(motion.div)`
  border: 1px solid ${theme.colors.midGray};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  transition: border-color 0.3s;
  &[data-open="true"] {
    border-color: rgba(245, 157, 21, 0.35);
    box-shadow: 0 4px 20px rgba(245, 157, 21, 0.08);
  }
`;

const FaqHeader = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  background: ${({ $open }) => ($open ? "rgba(245, 157, 21, 0.04)" : "white")};
  cursor: pointer;
  text-align: left;
  transition: background 0.3s;
  &:hover { background: rgba(245, 157, 21, 0.04); }
`;

const FaqQ = styled.h3<{ $open: boolean }>`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ $open }) => ($open ? theme.colors.orangeDark : theme.colors.charcoal)};
  transition: color 0.3s;
  line-height: 1.5;
`;

const ChevronWrap = styled(motion.div)`
  color: ${theme.colors.orange};
  flex-shrink: 0;
  font-size: 1.1rem;
`;

const FaqBody = styled(motion.div)`
  overflow: hidden;
`;

const FaqAnswer = styled.div`
  padding: 0 24px 24px;
  color: ${theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.75;
`;

const faqs = [
  {
    q: "Do you handle industrial gas installations?",
    a: "Yes, absolutely. We specialize in industrial gas installations including oxygen, nitrogen, acetylene, argon, and propane systems. We serve factories, manufacturing plants, construction sites, and other industrial operations across Port Harcourt.",
  },
  {
    q: "Do you deliver LPG to homes and businesses?",
    a: "Yes, we offer prompt LPG delivery for households, restaurants, hotels, and commercial facilities. We supply various cylinder sizes (3kg, 5kg, 6kg, 12.5kg, 25kg) and bulk LPG. Contact us to schedule a delivery.",
  },
  {
    q: "Are your fittings and materials certified?",
    a: "Absolutely. We use only certified, internationally-approved fittings and components. All our materials comply with Nigerian DPR standards, SON certification requirements, and international safety protocols.",
  },
  {
    q: "Do you offer maintenance and repair services?",
    a: "Yes, we provide ongoing maintenance, repairs, and routine inspections for all gas installations. Our certified technicians are available to service both domestic and industrial systems to ensure they remain safe and efficient.",
  },
  {
    q: "How fast can you deliver or start an installation?",
    a: "We typically respond within 24 hours for consultations and installations. Emergency services and urgent deliveries can often be arranged same-day or next-day. Contact us directly for urgent requests.",
  },
  {
    q: "Do you sell LPG accessories and equipment?",
    a: "Yes, we have a full range of LPG accessories including regulators, valves, hoses, compressors, pumps, flow meters, leakage detectors, safety alarms, and installation materials. Visit our showroom or contact us to order.",
  },
  {
    q: "Do you sell gas tanks and tanker trucks?",
    a: "Yes, we sell LPG storage tanks in various capacities for residential and industrial use, as well as tanker trucks. These are ideal for LPG resellers, depots, and large industrial facilities.",
  },
  {
    q: "What areas do you serve?",
    a: "We primarily serve Port Harcourt and Rivers State, including GRA, Trans-Amadi, Rumuola, Rumuokwuta, Eliozu, and surrounding areas. Contact us to confirm if we cover your location.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section id="faq">
      <Inner>
        <SectionLabel>FAQ</SectionLabel>
        <Title>Frequently Asked Questions</Title>
        <Subtitle>
          Everything you need to know about our services, products, and how we work.
        </Subtitle>

        <FaqList ref={ref}>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <FaqItem
                key={faq.q}
                data-open={isOpen}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
              >
                <FaqHeader $open={isOpen} onClick={() => setOpenIdx(isOpen ? null : i)}>
                  <FaqQ $open={isOpen}>{faq.q}</FaqQ>
                  <ChevronWrap
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown />
                  </ChevronWrap>
                </FaqHeader>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <FaqBody
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <FaqAnswer>{faq.a}</FaqAnswer>
                    </FaqBody>
                  )}
                </AnimatePresence>
              </FaqItem>
            );
          })}
        </FaqList>
      </Inner>
    </Section>
  );
}
