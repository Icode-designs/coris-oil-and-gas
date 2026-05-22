"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { theme } from "@/styles/theme";

const Section = styled.section`
  padding: 120px 24px;
  background: ${theme.colors.offWhite};
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
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
  margin-bottom: 80px;
`;

const StepsWrap = styled.div`
  position: relative;
`;

const ConnectorLine = styled.div`
  position: absolute;
  top: 44px;
  left: calc(12.5% + 22px);
  right: calc(12.5% + 22px);
  height: 2px;
  background: linear-gradient(90deg, ${theme.colors.orange}, ${theme.colors.purple});
  z-index: 0;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const Step = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    text-align: left;
    gap: 20px;
    padding: 24px 0;
    border-bottom: 1px solid ${theme.colors.midGray};
    &:last-child { border-bottom: none; }
  }
`;

const StepNumber = styled.div<{ $active?: boolean }>`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: ${({ $active }) =>
    $active
      ? `linear-gradient(135deg, ${theme.colors.orange}, ${theme.colors.orangeDark})`
      : "white"};
  border: 2px solid ${({ $active }) => ($active ? theme.colors.orange : theme.colors.midGray)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 24px;
  flex-shrink: 0;
  box-shadow: ${({ $active }) =>
    $active ? "0 8px 24px rgba(245, 157, 21, 0.35)" : "0 4px 16px rgba(0,0,0,0.08)"};
  transition: all 0.3s;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 64px;
    height: 64px;
    font-size: 1.5rem;
    margin-bottom: 0;
  }
`;

const StepContent = styled.div``;

const StepTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 800;
  color: ${theme.colors.charcoal};
  margin-bottom: 10px;
`;

const StepDesc = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.65;
`;

const StepTag = styled.div`
  display: inline-block;
  padding: 4px 12px;
  background: rgba(245, 157, 21, 0.1);
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.orangeDark};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const steps = [
  {
    emoji: "📞",
    tag: "Step 01",
    title: "Consultation",
    desc: "Contact us via phone or WhatsApp. We assess your needs and recommend the right gas solution for your home or business.",
    active: true,
  },
  {
    emoji: "🔍",
    tag: "Step 02",
    title: "Site Inspection",
    desc: "Our certified technicians visit your location, assess the space, and design the safest, most efficient installation plan.",
    active: false,
  },
  {
    emoji: "🔧",
    tag: "Step 03",
    title: "Installation",
    desc: "Professional installation using certified materials and following all safety codes. Clean, precise, and built to last.",
    active: false,
  },
  {
    emoji: "✅",
    tag: "Step 04",
    title: "Testing & Delivery",
    desc: "Full pressure testing, safety verification, and product delivery. Your installation is handed over only when 100% safe.",
    active: false,
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section>
      <Inner>
        <SectionLabel>How It Works</SectionLabel>
        <Title>Simple 4-Step Process</Title>
        <Subtitle>
          Getting your gas system set up is easier than you think. We handle everything — from initial consultation to final safety testing.
        </Subtitle>

        <StepsWrap ref={ref}>
          <ConnectorLine />
          <StepsGrid>
            {steps.map((step, i) => (
              <Step
                key={step.tag}
                custom={i}
                variants={stepVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
              >
                <StepNumber $active={step.active}>{step.emoji}</StepNumber>
                <StepContent>
                  <StepTag>{step.tag}</StepTag>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDesc>{step.desc}</StepDesc>
                </StepContent>
              </Step>
            ))}
          </StepsGrid>
        </StepsWrap>
      </Inner>
    </Section>
  );
}
