"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { theme } from "@/styles/theme";
import { IoClose } from "react-icons/io5";

const Nav = styled(motion.nav)<{ $scrolled: boolean; $menuOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.4s ease;
  background: ${({ $scrolled, $menuOpen }) =>
    $scrolled || $menuOpen ? "rgba(15, 15, 28, 0.97)" : "transparent"};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(20px)" : "none")};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 2px 30px rgba(0,0,0,0.3)" : "none"};
  border-bottom: ${({ $scrolled }) =>
    $scrolled ? "1px solid rgba(245,157,21,0.15)" : "none"};
`;

const NavInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrap = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  @media (max-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: color 0.2s ease;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.orange};
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  @media (max-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

const PhoneBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.85rem;
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: ${theme.colors.orange};
  }
`;

const CtaBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  background: linear-gradient(
    135deg,
    ${theme.colors.orange},
    ${theme.colors.orangeDark}
  );
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: ${theme.borderRadius.full};
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(245, 157, 21, 0.3);
  white-space: nowrap;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(245, 157, 21, 0.45);
  }
`;

const HamburgerBtn = styled.button`
  color: white;
  font-size: 1.5rem;
  display: none;
  padding: 4px;
  @media (max-width: ${theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 998;
  backdrop-filter: blur(4px);
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  right: 0;
  bottom: 0;
  width: min(320px, 85vw);
  height: calc(100vh - 80px);
  background: ${theme.colors.darkBg};
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-left: 1px solid rgba(245, 157, 21, 0.2);
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const MobileLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const MobileLink = styled.a`
  display: block;
  padding: 14px 16px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  font-weight: 500;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: rgba(245, 157, 21, 0.1);
    color: ${theme.colors.orange};
    padding-left: 22px;
  }
`;

const MobileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const MobileCallBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px;
  background: rgba(245, 157, 21, 0.1);
  border: 1px solid rgba(245, 157, 21, 0.3);
  color: ${theme.colors.orange};
  font-weight: 700;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.95rem;
`;

const MobileWaBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px;
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: white;
  font-weight: 700;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.95rem;
`;

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Why Us", href: "#why-us" },
  { label: "Safety", href: "#safety" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Nav
        $scrolled={scrolled}
        $menuOpen={menuOpen}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <NavInner>
          <LogoWrap onClick={() => scrollTo("#home")}>
            <Image
              src="/logo.png"
              alt="Coris Oil & Gas"
              width={140}
              height={45}
              style={{ objectFit: "contain" }}
              priority
            />
          </LogoWrap>

          <NavLinks>
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink onClick={() => scrollTo(link.href)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </NavLinks>

          <NavActions>
            <PhoneBtn href="tel:+2349166133000">
              <FaPhone size={13} />
              +234 916 613 3000
            </PhoneBtn>
            <CtaBtn
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
            >
              Get a Quote
            </CtaBtn>
          </NavActions>

          {!menuOpen && (
            <HamburgerBtn
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <HiMenu />
            </HamburgerBtn>
          )}

          {menuOpen && (
            <HamburgerBtn
              onClick={() => setMenuOpen(false)}
              aria-label="Open menu"
            >
              <IoClose />
            </HamburgerBtn>
          )}
        </NavInner>
      </Nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <MobileOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <MobileMenu
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <MobileLinks>
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <MobileLink onClick={() => scrollTo(link.href)}>
                      {link.label}
                    </MobileLink>
                  </li>
                ))}
              </MobileLinks>

              <MobileActions>
                <MobileCallBtn href="tel:+2349166133000">
                  <FaPhone /> Call Now
                </MobileCallBtn>
                <MobileWaBtn
                  href="https://wa.me/2349166133000?text=Hello%2C%20I%20need%20information%20about%20your%20LPG%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={18} /> Chat on WhatsApp
                </MobileWaBtn>
              </MobileActions>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
