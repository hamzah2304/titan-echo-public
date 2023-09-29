import React from "react";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
import styles from "/styles/Home.module.css";

class TextBox extends React.Component {
  render() {
    const { num, paragraphs } = this.props;

    return (
      <div
        className={`${styles.card} ${styles.tom} ${styles.guide} ${styles.whitep}`}
      >
        <h1
          className={montserrat.className}
          style={{ textAlign: "center", fontWeight: "normal" }}
        >
          {this.props.title}
        </h1>
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={styles.textWrap}
            style={{ textAlign: "center", padding: 5 }}
          >
            {index == 0 ? num + ". " : null}
            <span style={{ opacity: 0.6 }}>{paragraph}</span>
          </p>
        ))}
      </div>
    );
  }
}

export default TextBox;
