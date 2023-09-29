import React from 'react';
import styles from '/styles/Home.module.css';
import Link from 'next/link';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };

    this.hideFooter = this.hideFooter.bind(this);
  }

  hideFooter() {
    this.setState({ isVisible: false });
  }

  render() {
    if (!this.state.isVisible) {
      return null;
    }

    return (
      <div className={styles.footer} style={{fontFamily: 'var(--font-mono)'}}>
        <button onClick={this.hideFooter} className={styles.closeButton}>×</button>
        {this.props.text}
        <br />
        <Link legacyBehavior href="/disclaimer">
          <a style={{ textDecoration: 'underline', color: '#0070f3', fontWeight: 'bold' }}>
            Full Disclaimer
          </a>
        </Link>
      </div>
    );
  }
}

export default Footer;
