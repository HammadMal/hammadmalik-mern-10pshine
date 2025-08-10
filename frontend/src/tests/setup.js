// src/tests/setup.js
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import '@testing-library/jest-dom';
import 'jest-canvas-mock';

// Mock fetch globally
global.fetch = jest.fn();

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  disconnect() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  disconnect() {}
  unobserve() {}
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock canvas context for WebGL
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  clearColor: jest.fn(),
  createProgram: jest.fn(),
  createShader: jest.fn(),
  getExtension: jest.fn(() => ({
    loseContext: jest.fn()
  }))
}));

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
  ToastContainer: () => null,
}));

// Mock framer-motion
jest.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    header: ({ children, ...props }) => <header {...props}>{children}</header>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => children,
  useMotionValue: () => ({ set: jest.fn() }),
  useTransform: () => jest.fn(),
  useSpring: () => jest.fn(),
  useScroll: () => ({ scrollYProgress: { set: jest.fn() } }),
  useMotionValueEvent: jest.fn(),
}));

// Mock OGL/Orb component
jest.mock('../components/Orb', () => {
  return function MockOrb() {
    return <div data-testid="orb-component">Orb Component</div>;
  };
});