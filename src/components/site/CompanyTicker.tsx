const companies = [
  "SR18 GROUPS",
  "DELHI 6",
  "VOLT 50000",
  "VAM",
  "ADATTO",
  "ARNIKA TEXTILES",
  "MASAI",
  "TRADESNSIGNALS",
];

export function CompanyTicker() {
  return (
    <section
      className="company-ticker"
      aria-label="Companies and ventures Rahul Tanwar has worked with"
    >
      <div className="company-ticker__shell">
        <div className="company-ticker__track">
          {[0, 1].map((setIndex) => (
            <div
              className="company-ticker__set"
              key={setIndex}
              aria-hidden={setIndex === 1 ? "true" : undefined}
            >
              {companies.map((company) => (
                <span className="company-ticker__item" key={`${company}-${setIndex}`}>
                  <span>{company}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
