import React, { useEffect } from "react";
import { useDetectAdBlock, AdBlockDetectedWrapper } from "adblock-detect-react";

// Hook-based component
export const AdBlockDetector: React.FC = () => {
  const adBlockDetected = useDetectAdBlock();

  useEffect(() => {
    if (adBlockDetected) {
      // You can customize what happens when an ad blocker is detected
      console.log("Ad blocker detected");
      // Dynamically inject Buy Me a Coffee button script
      const container = document.getElementById('bmc-button-container');
      if (container && !container.querySelector('script[data-name="bmc-button"]')) {
        const script = document.createElement('script');
        script.setAttribute('is:inline', '');
        script.type = 'text/javascript';
        script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js';
        script.setAttribute('data-name', 'bmc-button');
        script.setAttribute('data-slug', 'neerajlovecyber');
        script.setAttribute('data-color', '#FFDD00');
        script.setAttribute('data-emoji', '');
        script.setAttribute('data-font', 'Inter');
        script.setAttribute('data-text', 'Buy me a coffee');
        script.setAttribute('data-outline-color', '#000000');
        script.setAttribute('data-font-color', '#000000');
        script.setAttribute('data-coffee-color', '#ffffff');
        container.appendChild(script);
      }
    }
  }, [adBlockDetected]);

  if (!adBlockDetected) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-red-500 mb-4">Ad Blocker Detected</h2>
        <p className="mb-4">
          We've noticed you're using an ad blocker. We rely on advertising revenue to keep our content free.
          Please consider supporting us by disabling your ad blocker for this site.
        </p>
        <div className="flex justify-start my-2" id="bmc-button-container">
          <a
            className="bmc-button"
            style={{ backgroundColor: '#FFDD00', color: '#000', fontWeight: 'bold', borderRadius: '6px', padding: '10px 24px', display: 'inline-block', textDecoration: 'none' }}
            target="_blank"
            href="https://www.buymeacoffee.com/neerajlovecyber"
            data-name="bmc-button"
            data-slug="neerajlovecyber"
            data-color="#FFDD00"
            data-emoji="🧋"
            data-font="Inter"
            data-text="Buy me a coffee"
            data-outline-color="#000000"
            data-font-color="#000000"
            data-coffee-color="#ffffff"
            rel="noopener noreferrer"
          >
           🧋  Buy me a coffee
          </a>
        </div>
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            // Set a cookie to remember this choice
            document.cookie = "adblock-acknowledged=true; max-age=3600; path=/";
            // Hide the overlay by forcing a re-render
            window.location.reload();
          }}
        >
          Continue Anyway
        </button>
      </div>
    </div>
  );
};

// Wrapper-based component
export const AdBlockWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <AdBlockDetectedWrapper>
      {children}
    </AdBlockDetectedWrapper>
  );
};