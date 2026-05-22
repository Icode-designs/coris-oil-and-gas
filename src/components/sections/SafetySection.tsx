"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { FaShieldAlt, FaCheckCircle, FaFireExtinguisher, FaTachometerAlt, FaWrench } from "react-icons/fa";
import { theme } from "@/styles/theme";

const Section = styled.section`
  padding: 120px 24px;
  background: linear-gradient(160deg, ${theme.colors.purpleDark} 0%, ${theme.colors.charcoal} 100%);
  position: relative;
  overflow: hidden;
`;

const BgGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(245, 157, 21, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245, 157, 21, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
`;

const GlowCircle = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 157, 21, 0.1) 0%, transparent 70%);
  right: -200px;
  top: 50%;
  transform: translateY(-50%);
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  margin-bottom: 80px;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const TextSide = styled.div``;

const SectionLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(245, 157, 21, 0.15);
  border: 1px solid rgba(245, 157, 21, 0.3);
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.orange};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 900;
  color: white;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
  line-height: 1.15;
`;

const TitleAccent = styled.span`
  color: ${theme.colors.orange};
`;

const Desc = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  line-height: 1.75;
  margin-bottom: 32px;
`;

const SafetyHighlight = styled.div`
  padding: 20px 24px;
  background: rgba(245, 157, 21, 0.08);
  border-left: 3px solid ${theme.colors.orange};
  border-radius: 0 ${theme.borderRadius.md} ${theme.borderRadius.md} 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  line-height: 1.65;
  font-style: italic;
`;

const SafetyCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SafetyCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.lg};
  padding: 24px;
  transition: all 0.3s;

  &:hover {
    background: rgba(245, 157, 21, 0.08);
    border-color: rgba(245, 157, 21, 0.25);
    transform: translateY(-4px);
  }
`;

const SafetyIcon = styled.div`
  color: ${theme.colors.orange};
  font-size: 1.6rem;
  margin-bottom: 14px;
`;

const SafetyTitle = styled.h4`
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const SafetyText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.82rem;
  line-height: 1.6;
`;

const CertRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 48px;
`;

const CertBadge = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${theme.borderRadius.full};
  color: white;
  font-size: 0.82rem;
  font-weight: 600;
  svg { color: ${theme.colors.orange}; }
`;

const safetyItems = [
  {
    icon: <FaShieldAlt />,
    title: "Leak Prevention Systems",
    text: "Advanced gas leak detection and automated shutoff systems installed in all projects.",
  },
  {
    icon: <FaTachometerAlt />,
    title: "Pressure Testing",
    text: "Every installation undergoes full pressure testing before we consider the job complete.",
  },
  {
    icon: <FaFireExtinguisher />,
    title: "Emergency Safety",
    text: "Emergency shutoff valves and safety systems as standard in all our installations.",
  },
  {
    icon: <FaWrench />,
    title: "Certified Fittings Only",
    text: "We use only government-approved, internationally certified fittings and components.",
  },
];

const certs = [
  "DPR Compliant",
  "SON Certified Materials",
  "ISO Safety Standards",
  "NUPRC Registered",
  "Pressure Tested",
];

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function SafetySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section id="safety">
      <BgGrid />
      <GlowCircle />
      <Inner ref={ref}>
        <TopRow>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <TextSide>
              <SectionLabel>
                <FaShieldAlt /> Safety First
              </SectionLabel>
              <Title>
                Your Safety Is Our{" "}
                <TitleAccent>Highest Priority</TitleAccent>
              </Title>
              <Desc>
                Every product we sell, every system we install, and every service we provide is grounded in a non-negotiable commitment to safety. We follow the strictest Nigerian and international safety protocols so you never have to worry.
              </Desc>
              <SafetyHighlight>
                &ldquo;We don&apos;t cut corners on safety. Every fitting, every connection, every installation is done right — the first time.&rdquo;
              </SafetyHighlight>

              <CertRow>
                {certs.map((cert, i) => (
                  <CertBadge
                    key={cert}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  >
                    <FaCheckCircle size={12} /> {cert}
                  </CertBadge>
                ))}
              </CertRow>
            </TextSide>
          </motion.div>

          <SafetyCards>
            {safetyItems.map((item, i) => (
              <SafetyCard
                key={item.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
              >
                <SafetyIcon>{item.icon}</SafetyIcon>
                <SafetyTitle>{item.title}</SafetyTitle>
                <SafetyText>{item.text}</SafetyText>
              </SafetyCard>
            ))}
          </SafetyCards>
        </TopRow>
      </Inner>
    </Section>
  );
}
