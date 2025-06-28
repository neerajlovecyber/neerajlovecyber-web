import React, { useEffect, useState } from "react";
import { useDetectAdBlock, AdBlockDetectedWrapper } from "adblock-detect-react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Hook-based component
export const AdBlockDetector: React.FC<{ mode?: "strict" | "delay" }> = ({ mode = "delay" }) => {
  const adBlockDetected = useDetectAdBlock();
  const [showContinue, setShowContinue] = useState(mode === "strict");
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [acknowledged, setAcknowledged] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.cookie.includes('adblock-acknowledged=true');
    }
    return false;
  });

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (adBlockDetected && !acknowledged) {
      // You can customize what happens when an ad blocker is detected
      console.log("Ad blocker detected");
      // Dynamically inject Buy Me a Coffee button script
      const bmcContainer = document.getElementById('bmc-button-container');
      if (bmcContainer && !bmcContainer.querySelector('script[data-name="bmc-button"]')) {
        const script = document.createElement('script');
        script.setAttribute('is:inline', '');
        script.type = 'text/javascript';
        script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js';
        script.setAttribute('data-name', 'bmc-button');
        script.setAttribute('data-slug', 'neerajlovecyber');
        script.setAttribute('data-color', '#FFDD00');
        script.setAttribute('data-emoji', '🧋');
        script.setAttribute('data-font', 'Inter');
        script.setAttribute('data-text', 'Buy me a coffee');
        script.setAttribute('data-outline-color', '#000000');
        script.setAttribute('data-font-color', '#000000');
        script.setAttribute('data-coffee-color', '#ffffff');
        bmcContainer.appendChild(script);
      }

      // Dynamically inject Google Analytics script if not already present
      if (typeof window !== 'undefined' && !window.gtag) {
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-GQMKSE94S0';
        document.head.appendChild(gaScript);

        const gaScriptInit = document.createElement('script');
        gaScriptInit.setAttribute('is:inline', '');
        gaScriptInit.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GQMKSE94S0');
        `;
        document.head.appendChild(gaScriptInit);
      }
      if (mode === "delay") {
        setShowContinue(false);
        setSecondsLeft(30);
        timer = setInterval(() => {
          setSecondsLeft(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              setShowContinue(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(timer);
      } else {
        setShowContinue(true);
      }
    }
    return () => timer && clearInterval(timer);
  }, [adBlockDetected, mode, acknowledged]);

  // In strict mode, always show popup if adBlockDetected
  if (!adBlockDetected || (mode !== "strict" && acknowledged)) return null;

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
    style={{
      backgroundColor: '#FFDD00',
      color: '#000',
      fontWeight: 'bold',
      borderRadius: '6px',
      padding: '10px 24px',
      display: 'inline-block',
      textDecoration: 'none'
    }}
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
    <img
      src="https://cdn.buymeacoffee.com/widget/assets/coffee%20cup.svg"
      width={15}
      height={15}
      style={{ verticalAlign: 'middle', marginRight: '6px', display: 'inline-block' }}
      alt="coffee"
    />{" "}
    Buy me a coffee
  </a>
</div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 my-4 rounded">
          <strong>We kindly ask you to disable your ad blocker to support us!</strong><br />
          Ads help us keep this content free for everyone. Please consider whitelisting our site.
        </div>
        {mode === "strict" ? (
          <>
            <div className="text-center text-red-600 font-semibold my-4">
              Ads are disabled due to your ad blocker. Please disable your ad blocker and reload the page to continue using the site.
            </div>
            <button
              className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded font-bold shadow-md border border-gray-900 transition-all duration-200"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </>
        ) : showContinue ? (
          <button 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold shadow-md border border-red-800 transition-all duration-200"
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'adblock_continue', {
                  event_category: 'AdBlock',
                  event_label: 'User continued without ads'
                });
              }
              document.cookie = "adblock-acknowledged=true; max-age=3600; path=/";
              setAcknowledged(true);
            }}
          >
            I Still Want to Continue (Not Recommended)
          </button>
        ) : (
          <div className="text-center text-gray-500 mt-4">You can continue in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...</div>
        )}
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