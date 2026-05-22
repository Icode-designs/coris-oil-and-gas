"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { theme } from "@/styles/theme";

const Section = styled.section`
  padding: 120px 24px;
  background: ${theme.colors.offWhite};
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
  max-width: 500px;
  margin: 0 auto 64px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  text-align: left;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
    border-color: rgba(245, 157, 21, 0.2);
  }
`;

const QuoteIcon = styled.div`
  color: ${theme.colors.orange};
  opacity: 0.3;
  font-size: 2rem;
  margin-bottom: 16px;
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
  color: ${theme.colors.orange};
`;

const Quote = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.92rem;
  line-height: 1.75;
  margin-bottom: 24px;
  font-style: italic;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.midGray};
  margin-bottom: 20px;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.div<{ $bg: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-weight: 700;
  color: ${theme.colors.charcoal};
  font-size: 0.9rem;
`;

const AuthorRole = styled.div`
  color: ${theme.colors.textMuted};
  font-size: 0.78rem;
  margin-top: 2px;
`;

const testimonials = [
  {
    stars: 5,
    quote: "Coris Oil & Gas installed our restaurant's gas system in two days. Professional team, clean work, and they tested everything thoroughly before leaving. Highly recommend!",
    name: "Chef Emmanuel Okafor",
    role: "Restaurant Owner, Port Harcourt",
    emoji: "👨‍🍳",
    avatarBg: "linear-gradient(135deg, #FDB444, #F59D15)",
  },
  {
    stars: 5,
    quote: "We needed industrial oxygen and nitrogen supply for our factory urgently. Coris delivered same day and set up the whole system. Very reliable company.",
    name: "Engr. Chioma Adaora",
    role: "Factory Manager, Rivers State",
    emoji: "👩‍🔧",
    avatarBg: "linear-gradient(135deg, #9B3D9B, #7A287A)",
  },
  {
    stars: 5,
    quote: "They replaced all the old gas fittings in our hotel with modern, certified equipment. No more gas smell or leaks. Peace of mind for us and our guests.",
    name: "Mr. Babatunde Adeyemi",
    role: "Hotel Director, GRA Phase 2",
    emoji: "🏨",
    avatarBg: "linear-gradient(135deg, #F59D15, #7A287A)",
  },
  {
    stars: 5,
    quote: "My home gas installation was done perfectly. The technician explained every step and even showed me how to check for leaks. Very professional service.",
    name: "Mrs. Ngozi Eze",
    role: "Homeowner, Port Harcourt",
    emoji: "👩",
    avatarBg: "linear-gradient(135deg, #FDB444, #9B3D9B)",
  },
  {
    stars: 5,
    quote: "Fast delivery of our LPG cylinders every week without fail. The prices are fair and the quality is consistent. Best gas supplier we've worked with.",
    name: "Alhaji Bello Musa",
    role: "Catering Business Owner",
    emoji: "👨‍💼",
    avatarBg: "linear-gradient(135deg, #7A287A, #F59D15)",
  },
  {
    stars: 5,
    quote: "We bought 4 gas tanks for our LPG depot through Coris. Great quality, fair pricing, and their team helped with the installation too. Top notch!",
    name: "Prince Ikechukwu Nwosu",
    role: "LPG Reseller, Trans-Amadi",
    emoji: "🏗️",
    avatarBg: "linear-gradient(135deg, #F59D15, #9B3D9B)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section>
      <Inner>
        <SectionLabel>Testimonials</SectionLabel>
        <Title>What Our Customers Say</Title>
        <Subtitle>
          Real experiences from real customers across Port Harcourt and Rivers State.
        </Subtitle>

        <Grid ref={ref}>
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <QuoteIcon><FaQuoteLeft /></QuoteIcon>
              <Stars>
                {[...Array(t.stars)].map((_, si) => <FaStar key={si} size={14} />)}
              </Stars>
              <Quote>&ldquo;{t.quote}&rdquo;</Quote>
              <Divider />
              <Author>
                <Avatar $bg={t.avatarBg}>{t.emoji}</Avatar>
                <AuthorInfo>
                  <AuthorName>{t.name}</AuthorName>
                  <AuthorRole>{t.role}</AuthorRole>
                </AuthorInfo>
              </Author>
            </TestimonialCard>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
