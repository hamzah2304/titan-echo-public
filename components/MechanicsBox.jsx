import React from 'react';
import "katex/dist/katex.min.css"; // Importing CSS for react-latex-next
import Latex from "react-latex-next"; // Importing react-latex-next
import styles from '/styles/Home.module.css';

import { Montserrat } from "next/font/google"
const montserrat = Montserrat({ subsets: ['latin'] })

class MechanicsBox extends React.Component {
  render() {
    return (
      <div className={`${styles.card} ${styles.tom}`}>
        <h2 className={montserrat.className} style={{textAlign: 'center', fontWeight: 'normal'}}>{this.props.title}</h2>
        <p style={{textAlign: 'justify'}}>{this.props.textContent1} <Latex>{this.props.latexContent1}</Latex> {this.props.textContent2}</p>
        <p style={{textAlign: 'justify'}}>{this.props.textContent3} <Latex>{this.props.latexContent2}</Latex> {this.props.textContent4}</p>
      </div>
    );
  }
}

export default MechanicsBox;



