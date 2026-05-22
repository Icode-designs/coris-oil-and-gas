"use client";

import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaPhone, FaWhatsapp, FaShieldAlt, FaStar, FaCheckCircle } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { theme } from "@/styles/theme";

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: ${theme.colors.darkBg};
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 80% 60% at 70% 40%, rgba(122, 40, 122, 0.35) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 20% 80%, rgba(245, 157, 21, 0.15) 0%, transparent 55%),
    linear-gradient(160deg, #0F0F1C 0%, #1A0E2E 50%, #0F0F1C 100%);
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(245, 157, 21, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245, 157, 21, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
`;

const OrbLeft = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(122, 40, 122, 0.25) 0%, transparent 70%);
  left: -200px;
  top: 50%;
  transform: translateY(-50%);
  animation: ${pulse} 6s ease-in-out infinite;
`;

const OrbRight = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 157, 21, 0.2) 0%, transparent 70%);
  right: -100px;
  bottom: -100px;
  animation: ${pulse} 8s ease-in-out infinite 2s;
`;

const FloatingRing = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  border: 1px solid rgba(245, 157, 21, 0.1);
  top: 10%;
  right: 5%;
  animation: ${rotate} 40s linear infinite;
  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${theme.colors.orange};
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 12px ${theme.colors.orange};
  }
`;

const HeroInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 120px 24px 80px;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 140px 24px 80px;
  }
`;

const HeroContent = styled.div``;

const EyebrowBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(245, 157, 21, 0.12);
  border: 1px solid rgba(245, 157, 21, 0.3);
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.orange};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 28px;
`;

const HeroHeadline = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4.2rem);
  font-weight: 900;
  line-height: 1.1;
  color: white;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
`;

const HeadlineAccent = styled.span`
  background: linear-gradient(135deg, ${theme.colors.orange}, ${theme.colors.orangeLight});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtext = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 40px;
  max-width: 520px;

  @media (max-width: ${theme.breakpoints.lg}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const HeroCtas = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 48px;

  @media (max-width: ${theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, ${theme.colors.orange}, ${theme.colors.orangeDark});
  color: white;
  font-weight: 800;
  font-size: 1rem;
  border-radius: ${theme.borderRadius.full};
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(245, 157, 21, 0.4);
  white-space: nowrap;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(245, 157, 21, 0.55);
  }
`;

const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: rgba(37, 211, 102, 0.12);
  border: 1.5px solid rgba(37, 211, 102, 0.4);
  color: #25D366;
  font-weight: 700;
  font-size: 1rem;
  border-radius: ${theme.borderRadius.full};
  transition: all 0.3s ease;
  white-space: nowrap;
  &:hover {
    background: rgba(37, 211, 102, 0.2);
    border-color: #25D366;
    transform: translateY(-3px);
  }
`;

const TrustBadges = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: ${theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.full};
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  font-weight: 600;
  svg { color: ${theme.colors.orange}; }
`;

const HeroVisual = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

const GlassCard = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.xl};
  padding: 20px 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
`;

const StatsCard = styled(GlassCard)`
  top: 10%;
  right: -20px;
  min-width: 180px;
  animation: ${float} 4s ease-in-out infinite;
`;

const SafetyCard = styled(GlassCard)`
  bottom: 15%;
  left: -20px;
  animation: ${float} 5s ease-in-out infinite 1s;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: ${theme.colors.orange};
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 4px;
`;

const CentralVisual = styled.div`
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(122, 40, 122, 0.4) 0%, rgba(15, 15, 28, 0) 70%);
  border: 1px solid rgba(245, 157, 21, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const InnerCircle = styled.div`
  width: 260px;
  height: 260px;
  border-radius: 50%;
  border: 1px solid rgba(245, 157, 21, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterIcon = styled.div`
  font-size: 5rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  z-index: 2;
`;

const ScrollLine = styled(motion.div)`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, rgba(245, 157, 21, 0.6), transparent);
`;

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  return (
    <HeroSection id="home">
      <HeroBg />
      <GridOverlay />
      <OrbLeft />
      <OrbRight />
      <FloatingRing />

      <HeroInner>
        <HeroContent
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <EyebrowBadge variants={itemVariants}>
            <FaShieldAlt size={12} />
            Certified Safety Experts · Port Harcourt, Nigeria
          </EyebrowBadge>

          <HeroHeadline variants={itemVariants}>
            Safe & Reliable{" "}
            <HeadlineAccent>LPG Solutions</HeadlineAccent>
            {" "}for Homes & Industries
          </HeroHeadline>

          <HeroSubtext variants={itemVariants}>
            Professional gas installation, LPG supply, and industrial gas solutions you can trust. Certified experts, premium materials, fast delivery — your safety is our mission.
          </HeroSubtext>

          <HeroCtas variants={itemVariants}>
            <PrimaryBtn href="#contact">
              Get a Free Quote <HiArrowRight />
            </PrimaryBtn>
            <SecondaryBtn
              href="https://wa.me/2349166133000?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={18} /> Chat on WhatsApp
            </SecondaryBtn>
          </HeroCtas>

          <TrustBadges variants={itemVariants}>
            <TrustBadge><FaCheckCircle /> Certified Safety</TrustBadge>
            <TrustBadge><FaStar /> Premium Quality</TrustBadge>
            <TrustBadge><FaShieldAlt /> 100% Guaranteed</TrustBadge>
          </TrustBadges>
        </HeroContent>

        <HeroVisual
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
        >
          <CentralVisual>
            <InnerCircle>
              <CenterIcon>🔥</CenterIcon>
            </InnerCircle>
          </CentralVisual>

          <StatsCard
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <StatNumber>500+</StatNumber>
            <StatLabel>Projects Completed</StatLabel>
          </StatsCard>

          <SafetyCard
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FaShieldAlt size={24} color={theme.colors.orange} />
              <div>
                <StatNumber style={{ fontSize: "1.2rem" }}>ISO Certified</StatNumber>
                <StatLabel>Safety Standards</StatLabel>
              </div>
            </div>
          </SafetyCard>
        </HeroVisual>
      </HeroInner>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <ScrollLine
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        Scroll
      </ScrollIndicator>
    </HeroSection>
  );
}
