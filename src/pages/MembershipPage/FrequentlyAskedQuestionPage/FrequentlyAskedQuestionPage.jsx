import React from "react";
import Header from "../../../components/views/Header/Header";
import TEXT from "../../../constants/text";
import "./FrequentlyAskedQuestionPage.css";

function FrequentlyAskedQuestionPage() {
  return (
    <section className="faq-wrapper">
      <Header
        headerProps={{
          pageName: "FAQ",
          linkTo: "/faq",
        }}
      />
      <main className="faq-container">
        <div className="faq-box">
          {TEXT.faqQuestionTitle.split("\n").map((title, index) => (
            <React.Fragment key={index}>
              <span className="faq-title">{title}</span>
              <br />
              {/* Check if there's a corresponding line in privacyPolicy */}
              {TEXT.faqQuestion.split("#")[index] && (
                <div>
                  <span className="faq-content">
                    {TEXT.faqQuestion
                      .split("#")
                      [index].split("\n")
                      .map((e, i) =>
                        e.trim().startsWith("-") ? (
                          <li key={i}>{e.trim().slice(1)}</li>
                        ) : (
                          <div key={i} className="faq-content-margin-left">
                            {e}
                          </div>
                        )
                      )}
                  </span>
                  {index === 1 || index === 4 ? (
                    <div className="faq-content-bar">
                      <svg viewBox="0 0 100 1" preserveAspectRatio="none">
                        <line x1="0" y1="0" x2="100" y2="0" />
                      </svg>
                    </div>
                  ) : (
                    <div className="faq-content-none-bar" />
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </main>
    </section>
  );
}

export default FrequentlyAskedQuestionPage;
