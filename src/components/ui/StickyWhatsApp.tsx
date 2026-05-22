"use client";

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { theme } from "@/styles/theme";

const ping = keyframes`
  0% { transform: scale(1); opacity: 0.75; }
  75%, 100% { transform: scale(2.2); opacity: 0; }
`;

const Wrapper = styled.div`
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
`;

const ChatBubble = styled(motion.div)`
  background: white;
  border-radius: 16px 16px 0 16px;
  padding: 16px 20px;
  max-width: 260px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.08);
`;

const BubbleTitle = styled.div`
  font-weight: 700;
  font-size: 0.875rem;
  color: #1a1a2e;
  margin-bottom: 4px;
`;

const BubbleText = styled.div`
  font-size: 0.8rem;
  color: #666;
  line-height: 1.5;
`;

const ButtonWrap = styled.div`
  position: relative;
`;

const Ping = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #25D366;
  animation: ${ping} 2s cubic-bezier(0, 0, 0.2, 1) infinite;
`;

const WaButton = styled(motion.a)`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #25D366, #128C7E);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.6rem;
  box-shadow: 0 8px 30px rgba(37, 211, 102, 0.45);
  cursor: pointer;
  z-index: 1;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: #999;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 2px;
  line-height: 1;
  &:hover { color: #666; }
`;

const WA_LINK = "https://wa.me/2349166133000?text=Hello%2C%20I%20am%20interested%20in%20your%20LPG%20services.%20Please%20get%20in%20touch%20with%20me.";

export default function StickyWhatsApp() {
  const [showBubble, setShowBubble] = useState(true);

  return (
    <Wrapper>
      <AnimatePresence>
        {showBubble && (
          <ChatBubble
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <CloseBtn onClick={() => setShowBubble(false)}>
              <FaTimes />
            </CloseBtn>
            <BubbleTitle>💬 Chat with Us!</BubbleTitle>
            <BubbleText>
              Get a free quote or ask us anything about our gas services.
            </BubbleText>
          </ChatBubble>
        )}
      </AnimatePresence>

      <ButtonWrap>
        <Ping />
        <WaButton
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowBubble(false)}
        >
          <FaWhatsapp />
        </WaButton>
      </ButtonWrap>
    </Wrapper>
  );
}
