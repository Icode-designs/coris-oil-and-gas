"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { theme } from "@/styles/theme";

const Section = styled.section`
  padding: 120px 24px;
  background: white;
  position: relative;
  overflow: hidden;
`;

const BgShape = styled.div`
  position: absolute;
  bottom: -100px;
  left: -100px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(245, 157, 21, 0.06) 0%,
    transparent 70%
  );
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 56px;
  gap: 24px;
  flex-wrap: wrap;
`;

const HeaderLeft = styled.div``;

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
  line-height: 1.15;
`;

const ViewAllBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 1.5px solid ${theme.colors.orange};
  color: ${theme.colors.orange};
  font-weight: 700;
  border-radius: ${theme.borderRadius.full};
  font-size: 0.875rem;
  transition: all 0.3s;
  white-space: nowrap;
  &:hover {
    background: ${theme.colors.orange};
    color: white;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.35s ease;
  cursor: pointer;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    border-color: rgba(245, 157, 21, 0.25);
  }
`;

const ProductEmoji = styled.div`
  height: 300px;
  background: linear-gradient(
    135deg,
    ${theme.colors.lightGray},
    ${theme.colors.midGray}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(245, 157, 21, 0.05),
      rgba(122, 40, 122, 0.05)
    );
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    min-width: 280px;
    min-height: 300px;
  }
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductName = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${theme.colors.charcoal};
  margin-bottom: 6px;
`;

const ProductDesc = styled.p`
  font-size: 0.8rem;
  color: ${theme.colors.textMuted};
  margin-bottom: 16px;
  line-height: 1.5;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 8px;
`;

const OrderBtn = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  background: linear-gradient(
    135deg,
    ${theme.colors.orange},
    ${theme.colors.orangeDark}
  );
  color: white;
  font-size: 0.78rem;
  font-weight: 700;
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s;
  &:hover {
    box-shadow: 0 4px 15px rgba(245, 157, 21, 0.4);
    transform: translateY(-1px);
  }
`;

const WaBtn = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(37, 211, 102, 0.12);
  border: 1px solid rgba(37, 211, 102, 0.3);
  color: #25d366;
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s;
  &:hover {
    background: #25d366;
    color: white;
  }
`;

const products = [
  {
    name: "LPG Cylinder 12.5kg",
    desc: "Standard household cooking gas cylinder. Most popular size.",
    image: "/assets/lpg-12kg.jpg",
  },
  {
    name: "LPG Cylinder 25kg",
    desc: "Industrial size cylinder for restaurants and commercial kitchens.",
    image: "/assets/lpg-25kg.jpg",
  },
  {
    name: "LPG Cylinder 3kg / 5kg",
    desc: "Compact cylinders for camping and small households.",
    image: "/assets/lpg-3kg.jpg",
  },
  {
    name: "Gas Cookers",
    desc: "2-burner to 4-burner domestic and commercial gas cookers.",
    image: "/assets/gas-cooker.jpeg",
  },
  {
    name: "Industrial Burners",
    desc: "High-output burners for bakeries, restaurants, and factories.",
    image: "/assets/industrial-burner.webp",
  },
  {
    name: "Gas Regulators",
    desc: "Certified high & low pressure regulators for all cylinder sizes.",
    image: "/assets/gas-regulator.jpeg",
  },
  {
    name: "Leakage Detectors",
    desc: "Electronic gas leak detectors and alarms for home safety.",
    image: "/assets/leakage-detector.jpeg",
  },
  {
    name: "Camping Stoves",
    desc: "Portable, lightweight stoves for camping and outdoor use.",
    image: "/assets/camping-stove.jpeg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
  }),
};

const WA_MSG =
  "https://wa.me/2349166133000?text=Hello%2C%20I%20would%20like%20to%20order%20a%20product.";

export default function ProductShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section id="products">
      <BgShape />
      <Inner>
        <Header>
          <HeaderLeft>
            <SectionLabel>Our Products</SectionLabel>
            <Title>
              Quality Gas Products
              <br />
              Ready for Delivery
            </Title>
          </HeaderLeft>
          <ViewAllBtn href={WA_MSG} target="_blank">
            Order via WhatsApp
          </ViewAllBtn>
        </Header>

        <Grid ref={ref}>
          {products.map((p, i) => (
            <ProductCard
              key={p.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              <ProductEmoji>
                <Image
                  src={p.image}
                  alt={p.name}
                  width={200}
                  height={160}
                  priority={i < 2}
                />
              </ProductEmoji>
              <ProductInfo>
                <ProductName>{p.name}</ProductName>
                <ProductDesc>{p.desc}</ProductDesc>
                <ProductActions>
                  <OrderBtn href="#contact">
                    <FaShoppingCart size={12} /> Order Now
                  </OrderBtn>
                  <WaBtn
                    href={WA_MSG}
                    target="_blank"
                    aria-label="Order via WhatsApp"
                  >
                    <FaWhatsapp />
                  </WaBtn>
                </ProductActions>
              </ProductInfo>
            </ProductCard>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
