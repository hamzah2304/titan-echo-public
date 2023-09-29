import React from 'react';
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ['latin'] });
import styles from '/styles/Home.module.css';

class TextBox extends React.Component {
    render() {
      const { paragraphs } = this.props;

      return (
        <div className={`${styles.card} ${styles.tom}`}>
        <h2 className={montserrat.className} style={{textAlign: 'center', fontWeight: 'normal'}}>{this.props.title}</h2>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.textWrap} style={{textAlign: "justify"}}>
              {paragraph}
            </p>
          ))}
        </div>
      );
    }
}

export default TextBox;

