"use client";

import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useInView } from "framer-motion";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { theme } from "@/styles/theme";
import emailjs from "emailjs-com";

const Section = styled.section`
  padding: 120px 24px;
  background: linear-gradient(
    160deg,
    ${theme.colors.charcoal} 0%,
    #0f0f1c 60%,
    ${theme.colors.purpleDark} 100%
  );
  position: relative;
  overflow: hidden;
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.08); opacity: 0.8; }
`;

const Orb1 = styled.div`
  position: absolute;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(245, 157, 21, 0.12) 0%,
    transparent 70%
  );
  top: -200px;
  right: -200px;
  animation: ${pulse} 7s ease-in-out infinite;
`;

const Orb2 = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(122, 40, 122, 0.2) 0%,
    transparent 70%
  );
  bottom: -150px;
  left: -100px;
  animation: ${pulse} 9s ease-in-out infinite 2s;
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

const LeftCol = styled(motion.div)``;

const EyebrowBadge = styled.div`
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
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 900;
  color: white;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
  line-height: 1.1;
`;

const TitleAccent = styled.span`
  background: linear-gradient(
    135deg,
    ${theme.colors.orange},
    ${theme.colors.purpleLight}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SubText = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.05rem;
  line-height: 1.75;
  margin-bottom: 40px;
`;

const DirectCtaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 48px;
`;

const DirectCta = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 24px;
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.3s ease;
  &:hover {
    transform: translateX(6px);
  }
`;

const CallCta = styled(DirectCta)`
  background: rgba(245, 157, 21, 0.12);
  border: 1px solid rgba(245, 157, 21, 0.3);
  color: white;
`;

const WaCta = styled(DirectCta)`
  background: rgba(37, 211, 102, 0.1);
  border: 1px solid rgba(37, 211, 102, 0.3);
  color: white;
`;

const CtaIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const CtaText = styled.div`
  flex: 1;
`;

const CtaTitle = styled.div`
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 2px;
`;

const CtaDesc = styled.div`
  font-size: 0.8rem;
  opacity: 0.6;
`;

const TrustPoints = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const TrustPoint = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.82rem;
  svg {
    color: ${theme.colors.orange};
  }
`;

const RightCol = styled(motion.div)`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius["2xl"]};
  padding: 40px;
`;

const FormTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
`;

const FormSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  margin-bottom: 32px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ $full?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${({ $full }) => $full && "grid-column: 1 / -1;"}
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 13px 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${theme.borderRadius.md};
  color: white;
  font-size: 0.9rem;
  transition: all 0.2s;
  outline: none;
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  &:focus {
    border-color: ${theme.colors.orange};
    background: rgba(245, 157, 21, 0.05);
  }
`;

const Select = styled.select`
  padding: 13px 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${theme.borderRadius.md};
  color: white;
  font-size: 0.9rem;
  transition: all 0.2s;
  outline: none;
  cursor: pointer;
  &:focus {
    border-color: ${theme.colors.orange};
    background: rgba(245, 157, 21, 0.05);
  }
  option {
    background: #1a1a2e;
    color: white;
  }
`;

const Textarea = styled.textarea`
  padding: 13px 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${theme.borderRadius.md};
  color: white;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s;
  outline: none;
  font-family: inherit;
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  &:focus {
    border-color: ${theme.colors.orange};
    background: rgba(245, 157, 21, 0.05);
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(
    135deg,
    ${theme.colors.orange},
    ${theme.colors.orangeDark}
  );
  color: white;
  font-weight: 800;
  font-size: 1rem;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 24px;
  transition: all 0.3s;
  box-shadow: 0 6px 24px rgba(245, 157, 21, 0.35);
  border: none;
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(245, 157, 21, 0.5);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMsg = styled(motion.div)`
  text-align: center;
  padding: 40px;
  color: white;
`;

const trustPoints = [
  "No commitment required",
  "Free consultation",
  "Response within 24hrs",
  "Certified professionals",
];

export default function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("stWw7uvY_czmhHtIB");
  }, []);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (formRef.current) {
        await emailjs.sendForm(
          "service_6xpf76g",
          "template_quv9hff",
          formRef.current,
        );
        setSubmitted(true);
        if (formRef.current) {
          formRef.current.reset();
        }
      }
    } catch (err) {
      setError("Failed to send message. Please try again or call us directly.");
      console.error("EmailJS Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact">
      <Orb1 />
      <Orb2 />
      <Inner ref={ref}>
        <LeftCol
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <EyebrowBadge>Get In Touch Today</EyebrowBadge>
          <Title>
            Ready to Get <TitleAccent>Safe Gas Solutions?</TitleAccent>
          </Title>
          <SubText>
            Don&apos;t wait until there&apos;s a problem. Get your gas system
            installed or inspected by certified experts today. We&apos;re just
            one call or message away.
          </SubText>

          <DirectCtaRow>
            <CallCta href="tel:+2349166133000">
              <CtaIcon style={{ background: "rgba(245,157,21,0.2)" }}>
                <FaPhone color={theme.colors.orange} />
              </CtaIcon>
              <CtaText>
                <CtaTitle>Call Us Now</CtaTitle>
                <CtaDesc>+234 916 613 3000 — Available Mon–Sat</CtaDesc>
              </CtaText>
              <HiArrowRight color="rgba(255,255,255,0.4)" />
            </CallCta>

            <WaCta
              href="https://wa.me/2349166133000?text=Hello%2C%20I%20am%20interested%20in%20your%20gas%20services.%20Please%20contact%20me."
              target="_blank"
              rel="noopener noreferrer"
            >
              <CtaIcon style={{ background: "rgba(37,211,102,0.15)" }}>
                <FaWhatsapp size={20} color="#25D366" />
              </CtaIcon>
              <CtaText>
                <CtaTitle>Chat on WhatsApp</CtaTitle>
                <CtaDesc>Quick response — message us anytime</CtaDesc>
              </CtaText>
              <HiArrowRight color="rgba(255,255,255,0.4)" />
            </WaCta>
          </DirectCtaRow>

          <TrustPoints>
            {trustPoints.map((pt) => (
              <TrustPoint key={pt}>
                <FaCheckCircle size={13} /> {pt}
              </TrustPoint>
            ))}
          </TrustPoints>
        </LeftCol>

        <RightCol
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          {!submitted ? (
            <>
              <FormTitle>Request a Free Quote</FormTitle>
              <FormSubtitle>
                Fill in your details and we&apos;ll get back to you within 24
                hours.
              </FormSubtitle>

              <form ref={formRef} onSubmit={handleSubmit}>
                <FormGrid>
                  <FormGroup>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+234 xxx xxx xxxx"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="service">Service Needed *</Label>
                    <Select required name="service" id="service">
                      <option value="">Select a service</option>
                      <option>LPG Delivery or Cylinder Refill</option>
                      <option>Gas Installation (Domestic)</option>
                      <option>Gas Installation (Industrial)</option>
                      <option>Gas Accessories Purchase</option>
                      <option>Industrial Gas Supply</option>
                      <option>Gas Tank or Tanker Truck</option>
                      <option>Safety Inspection</option>
                      <option>Other</option>
                    </Select>
                  </FormGroup>
                  <FormGroup $full>
                    <Label htmlFor="message">
                      Message / Additional Details
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your needs, location, or any specific requirements..."
                    />
                  </FormGroup>
                </FormGrid>

                {error && (
                  <div
                    style={{
                      color: "#ff6b6b",
                      fontSize: "0.875rem",
                      marginTop: "12px",
                    }}
                  >
                    {error}
                  </div>
                )}

                <SubmitBtn type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Quote Request"}{" "}
                  <HiArrowRight />
                </SubmitBtn>
              </form>
            </>
          ) : (
            <SuccessMsg
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
              <FormTitle>Request Sent!</FormTitle>
              <FormSubtitle style={{ marginTop: "8px" }}>
                Thank you! Our team will contact you within 24 hours. For urgent
                inquiries, call us at +234 916 613 3000.
              </FormSubtitle>
            </SuccessMsg>
          )}
        </RightCol>
      </Inner>
    </Section>
  );
}
