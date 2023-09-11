import React from "react";
import "./Footer.css";
import footerArr from "../../assets/footer.json";

const Footer = () => {
  return (
    <div className="container footer">
      {footerArr.map((item, index) => {
        return (
          // render footer column with loop
          <div key={index} className="footer-list">
            {item.footer.map((i, p) => {
              // render item in footer arr
              return <p key={p}>{i}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Footer;
