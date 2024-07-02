"use client";

import React, { useEffect } from "react";

const Application = () => {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "https://seashell-app-34mr3.ondigitalocean.app") {
        return;
      }

      if (event.data === "goBack") {
        window.location.href = "./";
      }

    //   if (event.data && event.data.type === "GA_EVENT") {
    //     window.gtag("event", event.data.eventAction, event.data.params);
    //   }

      if (event.data && event.data.type === "REDIRECT") {
        window.location.href = event.data.url;
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    let v2Data = localStorage.getItem("quote");
    let gclId = localStorage.getItem("gclid");
    let countryCode = localStorage.getItem("countryCode");
    let fbclId = localStorage.getItem("fbclid");
    let src;

    if (!v2Data) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let data = urlParams.get("data");

      console.log(urlParams.get("data"));

      if (data) {
        let entry_url = urlParams.get("entry_url");
        src = `https://seashell-app-34mr3.ondigitalocean.app/?data=${data}&entry_url=${entry_url}&quote_id=`;
      } else {
        data = {
          type: urlParams.get("loan_type") || "CAR_LOAN",
          amount: urlParams.get("loan_amount") || 10000,
          term: urlParams.get("loan_term") || 5,
          usage: urlParams.get("loan_usage") || "CONSUMER",
          externalPartnerId: urlParams.get("partnerId") || 1960,
          source: urlParams.get("source") || "loanoptions",
          sourceUrl: urlParams.get("sourceUrl") || "https://loanoptions.ai",
          targetSystem: urlParams.get("targetSystem") || "SKYNET",
        };
        let entry_url = urlParams.get("entry_url") || "https://loanoptions.ai";
        src = `https://seashell-app-34mr3.ondigitalocean.app/?data=${JSON.stringify(
          data
        )}&entry_url=${entry_url}&quote_id=`;
      }
    } else {
      if (countryCode === "NZ") {
        v2Data = JSON.parse(v2Data);
        v2Data.countryCode = countryCode;
        v2Data = JSON.stringify(v2Data);

        if (gclId) {
          v2Data = JSON.parse(v2Data);
          v2Data.gclId = gclId;
          v2Data = JSON.stringify(v2Data);
        }

        if (fbclId) {
          v2Data = JSON.parse(v2Data);
          v2Data.fbclId = fbclId;
          v2Data = JSON.stringify(v2Data);
        }

        v2Data = encodeURIComponent(v2Data);
        src = `https://seashell-app-34mr3.ondigitalocean.app/?data=${v2Data}&entry_url=https://loanoptions.ai/nz&quote_id=`;
      } else {
        if (gclId) {
          v2Data = JSON.parse(v2Data);
          v2Data.gclId = gclId;
          v2Data = JSON.stringify(v2Data);
        }

        if (fbclId) {
          v2Data = JSON.parse(v2Data);
          v2Data.fbclId = fbclId;
          v2Data = JSON.stringify(v2Data);
        }

        v2Data = encodeURIComponent(v2Data);
        src = `https://seashell-app-34mr3.ondigitalocean.app/?data=${v2Data}&entry_url=https://loanoptions.ai&quote_id=`;
      }
    }

    const iframe = document.getElementById("myIframe");
    iframe.src = src;
  }, []);

  return (
    <section>
      <iframe id="myIframe" className="w-full h-screen"></iframe>
    </section>
  );
};

export default Application;
