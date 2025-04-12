
// Polyfill for global object needed by @octokit/rest
if (typeof window !== 'undefined' && typeof window.global === 'undefined') {
  window.global = window;
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
