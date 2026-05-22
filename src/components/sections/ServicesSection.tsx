"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import {
  FaGasPump, FaTools, FaIndustry, FaTruck, FaFlask, FaShieldAlt,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { theme } from "@/styles/theme";

const Section = styled.section`
  padding: 120px 24px;
  background: ${theme.colors.offWhite};
  position: relative;
  overflow: hidden;
`;

const BgAccent = styled.div`
  position: absolute;
  top: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(122, 40, 122, 0.06) 0%, transparent 70%);
  pointer-events: none;
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

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: ${theme.colors.charcoal};
  letter-spacing: -0.02em;
  margin-bottom: 16px;
  line-height: 1.15;
`;

const SectionSubtitle = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 560px;
  margin-bottom: 64px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  padding: 36px 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.35s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${theme.colors.orange}, ${theme.colors.purple});
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    border-color: rgba(245, 157, 21, 0.2);
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const IconCircle = styled.div<{ $color: string }>`
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.lg};
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  margin-bottom: 24px;
  transition: transform 0.3s ease;
  ${Card}:hover & {
    transform: scale(1.1) rotate(-5deg);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 800;
  color: ${theme.colors.charcoal};
  margin-bottom: 12px;
  letter-spacing: -0.01em;
`;

const CardDesc = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 24px;
`;

const CardLink = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${theme.colors.orange};
  font-size: 0.85rem;
  font-weight: 700;
  transition: gap 0.2s;
  ${Card}:hover & { gap: 10px; }
`;

const services = [
  {
    icon: <FaGasPump />,
    color: "linear-gradient(135deg, rgba(245,157,21,0.15), rgba(245,157,21,0.05))",
    title: "LPG Distribution",
    desc: "Reliable cooking gas delivery, cylinder refills, and bulk LPG supply for homes, restaurants, and industrial facilities across Port Harcourt.",
  },
  {
    icon: <FaTools />,
    color: "linear-gradient(135deg, rgba(122,40,122,0.15), rgba(122,40,122,0.05))",
    title: "Gas Installation & Fitting",
    desc: "Professional domestic and industrial gas piping, fittings, repairs, maintenance, and certified leak testing by licensed technicians.",
  },
  {
    icon: <FaShieldAlt />,
    color: "linear-gradient(135deg, rgba(245,157,21,0.15), rgba(122,40,122,0.1))",
    title: "Safety Equipment Sales",
    desc: "Leakage detectors, safety alarms, pressure regulators, flow meters, and full safety system installations that comply with Nigerian standards.",
  },
  {
    icon: <FaTruck />,
    color: "linear-gradient(135deg, rgba(122,40,122,0.15), rgba(245,157,21,0.05))",
    title: "Gas Tanks & Tanker Trucks",
    desc: "Sales of LPG storage tanks and tanker trucks for residential, commercial, and large-scale industrial operations.",
  },
  {
    icon: <FaIndustry />,
    color: "linear-gradient(135deg, rgba(245,157,21,0.1), rgba(122,40,122,0.15))",
    title: "Industrial Gas Solutions",
    desc: "Supply of oxygen, nitrogen, acetylene, argon, and propane. Plus tank inerting and comprehensive leak testing services.",
  },
  {
    icon: <FaFlask />,
    color: "linear-gradient(135deg, rgba(122,40,122,0.1), rgba(245,157,21,0.15))",
    title: "LPG Accessories Sales",
    desc: "Full range of gas accessories including regulators, valves, compressors, pumps, hoses, and installation materials for every application.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section id="services">
      <BgAccent />
      <Inner>
        <SectionLabel>What We Do</SectionLabel>
        <SectionTitle>Complete Gas Solutions<br />Under One Roof</SectionTitle>
        <SectionSubtitle>
          From LPG delivery to industrial gas installations — we handle everything with certified expertise and a relentless focus on safety.
        </SectionSubtitle>

        <Grid ref={ref}>
          {services.map((svc, i) => (
            <Card
              key={svc.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              whileHover={{ scale: 1.01 }}
            >
              <IconCircle $color={svc.color}>{svc.icon}</IconCircle>
              <CardTitle>{svc.title}</CardTitle>
              <CardDesc>{svc.desc}</CardDesc>
              <CardLink>
                Learn More <HiArrowRight />
              </CardLink>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
