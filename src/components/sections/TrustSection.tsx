"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { FaTruck, FaUsers, FaShieldAlt, FaClock } from "react-icons/fa";
import { theme } from "@/styles/theme";

const Section = styled.section`
  background: ${theme.colors.charcoal};
  padding: 80px 24px;
  overflow: hidden;
  position: relative;
`;

const GlowLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${theme.colors.orange}, ${theme.colors.purple}, transparent);
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 24px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;

  &:last-child { border-right: none; }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, ${theme.colors.orange}, ${theme.colors.purple});
    transition: width 0.5s ease;
  }
  &:hover::before { width: 60%; }

  @media (max-width: ${theme.breakpoints.md}) {
    border-right: 1px solid rgba(255, 255, 255, 0.06);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    &:nth-child(2n) { border-right: none; }
  }
`;

const IconWrap = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(245, 157, 21, 0.15), rgba(122, 40, 122, 0.15));
  border: 1px solid rgba(245, 157, 21, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: ${theme.colors.orange};
  font-size: 1.4rem;
`;

const Number = styled.div`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 900;
  background: linear-gradient(135deg, ${theme.colors.orange}, ${theme.colors.orangeLight});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 8px;
`;

const Label = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.02em;
`;

const SubLabel = styled.div`
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.75rem;
  margin-top: 4px;
`;

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <Number ref={ref}>
      {count}{suffix}
    </Number>
  );
}

const stats = [
  { icon: <FaUsers />, target: 98, suffix: "%", label: "Client Satisfaction", sub: "Based on customer feedback" },
  { icon: <FaTruck />, target: 500, suffix: "+", label: "Projects Completed", sub: "Across Port Harcourt" },
  { icon: <FaShieldAlt />, target: 10, suffix: "+", label: "Years of Expertise", sub: "Certified professionals" },
  { icon: <FaClock />, target: 24, suffix: "/7", label: "Support Available", sub: "Emergency response team" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Section>
      <GlowLine />
      <Inner ref={ref}>
        <Grid>
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <IconWrap>{stat.icon}</IconWrap>
              <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              <Label>{stat.label}</Label>
              <SubLabel>{stat.sub}</SubLabel>
            </StatCard>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
