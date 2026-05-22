"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import {
  FaShieldAlt, FaCertificate, FaTools, FaCheckCircle, FaUserTie, FaLeaf,
} from "react-icons/fa";
import { theme } from "@/styles/theme";

const Section = styled.section`
  padding: 120px 24px;
  background: ${theme.colors.charcoal};
  position: relative;
  overflow: hidden;
`;

const BgPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(122, 40, 122, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(245, 157, 21, 0.08) 0%, transparent 40%);
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

const TextCol = styled.div``;

const SectionLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(245, 157, 21, 0.12);
  border: 1px solid rgba(245, 157, 21, 0.25);
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
  background: linear-gradient(135deg, ${theme.colors.orange}, ${theme.colors.purpleLight});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  line-height: 1.75;
  margin-bottom: 48px;
`;

const CtaBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: linear-gradient(135deg, ${theme.colors.orange}, ${theme.colors.orangeDark});
  color: white;
  font-weight: 700;
  border-radius: ${theme.borderRadius.full};
  transition: all 0.3s;
  box-shadow: 0 6px 24px rgba(245, 157, 21, 0.35);
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(245, 157, 21, 0.45);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: ${theme.borderRadius.lg};
  padding: 24px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(245, 157, 21, 0.07);
    border-color: rgba(245, 157, 21, 0.2);
    transform: translateY(-4px);
  }
`;

const FeatureIcon = styled.div`
  color: ${theme.colors.orange};
  font-size: 1.5rem;
  margin-bottom: 12px;
`;

const FeatureTitle = styled.h4`
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 6px;
`;

const FeatureDesc = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.82rem;
  line-height: 1.6;
`;

const features = [
  {
    icon: <FaShieldAlt />,
    title: "Safety Compliance",
    desc: "All installations meet Nigerian DPR and international safety standards.",
  },
  {
    icon: <FaCertificate />,
    title: "Certified Materials",
    desc: "Only premium, certified fittings and equipment from trusted manufacturers.",
  },
  {
    icon: <FaUserTie />,
    title: "Expert Technicians",
    desc: "Licensed, trained professionals with years of hands-on field experience.",
  },
  {
    icon: <FaTools />,
    title: "Long-Lasting Installs",
    desc: "Professional workmanship backed by quality guarantees and follow-up support.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Pressure Tested",
    desc: "Every installation is fully pressure-tested and inspected before handover.",
  },
  {
    icon: <FaLeaf />,
    title: "Eco-Responsible",
    desc: "Clean LPG solutions that reduce carbon emissions and improve efficiency.",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section id="why-us">
      <BgPattern />
      <Inner>
        <TextCol
          as={motion.div}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          ref={ref}
        >
          <SectionLabel>Why Choose Us</SectionLabel>
          <Title>
            The Partner You Can{" "}
            <TitleAccent>Trust With Your Safety</TitleAccent>
          </Title>
          <Subtitle>
            We don&apos;t just supply gas — we ensure every installation is done right. Our team of certified professionals uses only the best materials and follows strict safety protocols, giving you total peace of mind.
          </Subtitle>
          <CtaBtn href="#contact">
            Request a Consultation
          </CtaBtn>
        </TextCol>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <FeaturesGrid>
            {features.map((f) => (
              <FeatureCard key={f.title} variants={itemVariants}>
                <FeatureIcon>{f.icon}</FeatureIcon>
                <FeatureTitle>{f.title}</FeatureTitle>
                <FeatureDesc>{f.desc}</FeatureDesc>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </motion.div>
      </Inner>
    </Section>
  );
}
