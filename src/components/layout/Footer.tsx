"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { theme } from "@/styles/theme";

const FooterWrap = styled.footer`
  background: ${theme.colors.darkBg};
  border-top: 1px solid rgba(245, 157, 21, 0.2);
  padding: 80px 24px 0;
`;

const FooterInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 48px;
  padding-bottom: 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const BrandCol = styled.div``;

const BrandTagline = styled.p`
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.9rem;
  line-height: 1.7;
  margin-top: 16px;
  margin-bottom: 28px;
  max-width: 280px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  transition: all 0.3s;
  &:hover {
    border-color: ${theme.colors.orange};
    color: ${theme.colors.orange};
    background: rgba(245, 157, 21, 0.1);
    transform: translateY(-2px);
  }
`;

const FooterCol = styled.div``;

const ColTitle = styled.h4`
  color: ${theme.colors.orange};
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterLink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.875rem;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.orange};
    gap: 10px;
  }
`;

const ContactItem = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 16px;
  transition: color 0.2s;
  &:hover {
    color: ${theme.colors.orange};
  }
`;

const ContactIcon = styled.div`
  color: ${theme.colors.orange};
  font-size: 1rem;
  margin-top: 2px;
  flex-shrink: 0;
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  flex-wrap: wrap;
  gap: 12px;
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.8rem;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 24px;
`;

const BottomLink = styled.a`
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.8rem;
  transition: color 0.2s;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.orange};
  }
`;

const quickLinks = [
  "Home",
  "Services",
  "Products",
  "About Us",
  "Safety",
  "Contact",
];
const services = [
  "LPG Distribution",
  "Gas Installation",
  "Gas Accessories",
  "Industrial Gas",
  "Gas Tanks & Trucks",
  "Safety Equipment",
];

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(/ /g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <FooterWrap>
      <FooterInner>
        <FooterGrid>
          <BrandCol>
            <Image
              src="/logo.png"
              alt="Coris Oil & Gas"
              width={140}
              height={45}
              style={{ objectFit: "contain" }}
            />
            <BrandTagline>
              Your safety and comfort, powered by experts. Reliable LPG supply
              and professional gas installation across Port Harcourt and beyond.
            </BrandTagline>
            <SocialLinks>
              <SocialIcon
                href="https://wa.me/2349166133000"
                target="_blank"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </SocialIcon>
              <SocialIcon href="tel:+2349166133000" aria-label="Phone">
                <FaPhone size={14} />
              </SocialIcon>
              <SocialIcon href="mailto:bd@corisgas.com" aria-label="Email">
                <FaEnvelope size={14} />
              </SocialIcon>
            </SocialLinks>
          </BrandCol>

          <FooterCol>
            <ColTitle>Quick Links</ColTitle>
            <LinkList>
              {quickLinks.map((link) => (
                <li key={link}>
                  <FooterLink onClick={() => scrollTo(link)}>
                    <FiChevronRight size={13} />
                    {link}
                  </FooterLink>
                </li>
              ))}
            </LinkList>
          </FooterCol>

          <FooterCol>
            <ColTitle>Our Services</ColTitle>
            <LinkList>
              {services.map((s) => (
                <li key={s}>
                  <FooterLink onClick={() => scrollTo("services")}>
                    <FiChevronRight size={13} />
                    {s}
                  </FooterLink>
                </li>
              ))}
            </LinkList>
          </FooterCol>

          <FooterCol>
            <ColTitle>Contact Us</ColTitle>
            <ContactItem href="tel:+2349166133000">
              <ContactIcon>
                <FaPhone />
              </ContactIcon>
              <span>+234 916 613 3000</span>
            </ContactItem>
            <ContactItem href="mailto:bd@corisgas.com">
              <ContactIcon>
                <FaEnvelope />
              </ContactIcon>
              <span>bd@corisgas.com</span>
            </ContactItem>
            <ContactItem
              href="https://maps.google.com/?q=70+Stadium+Road+Port+Harcourt"
              target="_blank"
            >
              <ContactIcon>
                <FaMapMarkerAlt />
              </ContactIcon>
              <span>
                70 Stadium Road,
                <br />
                Port Harcourt, Nigeria
              </span>
            </ContactItem>
          </FooterCol>
        </FooterGrid>

        <BottomBar>
          <Copyright>
            © {new Date().getFullYear()} Coris Oil & Gas. All rights reserved.
            RC: Registered Energy Company, Nigeria.
          </Copyright>
          {/* <BottomLinks>
            <BottomLink>Privacy Policy</BottomLink>
            <BottomLink>Terms of Service</BottomLink>
          </BottomLinks> */}
        </BottomBar>
      </FooterInner>
    </FooterWrap>
  );
}
