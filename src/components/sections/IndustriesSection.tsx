"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { theme } from "@/styles/theme";

const Section = styled.section`
  padding: 120px 24px;
  background: white;
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 1280px;
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
  max-width: 540px;
  margin: 0 auto 64px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const IndustryCard = styled(motion.div)`
  position: relative;
  background: ${theme.colors.offWhite};
  border-radius: ${theme.borderRadius.xl};
  padding: 40px 28px;
  border: 1px solid ${theme.colors.midGray};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(245,157,21,0.08), rgba(122,40,122,0.06));
    opacity: 0;
    transition: opacity 0.35s;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
    border-color: rgba(245, 157, 21, 0.3);
  }

  &:hover::before { opacity: 1; }
`;

const EmojiWrap = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  display: block;
  transition: transform 0.3s ease;
  ${IndustryCard}:hover & { transform: scale(1.15); }
`;

const IndustryName = styled.h3`
  font-size: 1.1rem;
  font-weight: 800;
  color: ${theme.colors.charcoal};
  margin-bottom: 10px;
`;

const IndustryDesc = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.6;
`;

const industries = [
  { emoji: "🏠", name: "Homeowners", desc: "Safe domestic gas piping, cylinder supply, and cooker installation for every household." },
  { emoji: "🍽️", name: "Restaurants", desc: "Commercial LPG systems, industrial burners, and certified kitchen gas installations." },
  { emoji: "🏨", name: "Hotels & Lodges", desc: "Large-scale gas supply, central piping, and industrial cooking gas systems for hospitality." },
  { emoji: "🏭", name: "Factories & Plants", desc: "Industrial-grade gas supply, tank installations, and oxygen/nitrogen solutions for manufacturing." },
  { emoji: "🍴", name: "Catering Businesses", desc: "Mobile and fixed gas systems for caterers, event kitchens, and food production facilities." },
  { emoji: "🔩", name: "Construction Projects", desc: "Acetylene, oxygen, propane, and industrial gas for welding, cutting, and construction work." },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.93 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function IndustriesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section>
      <Inner>
        <SectionLabel>Industries We Serve</SectionLabel>
        <Title>Built for Every Sector</Title>
        <Subtitle>
          From individual homeowners to large industrial facilities — we design safe, efficient gas solutions that fit your exact needs.
        </Subtitle>

        <Grid ref={ref}>
          {industries.map((ind, i) => (
            <IndustryCard
              key={ind.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <EmojiWrap>{ind.emoji}</EmojiWrap>
              <IndustryName>{ind.name}</IndustryName>
              <IndustryDesc>{ind.desc}</IndustryDesc>
            </IndustryCard>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
