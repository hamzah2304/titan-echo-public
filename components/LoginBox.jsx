import React from 'react';
import styles from '/styles/Home.module.css';

import { Montserrat } from "next/font/google"
const montserrat = Montserrat({ subsets: ['latin'] })

class LoginBox extends React.Component {
    state = {
        email: '',
        loading:false,
    };

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
            loading: this.state.loading
        });
    }

    render() {
        return (
            <div className={styles.loginbox}>
                <h3 className={`${styles.logotitle} ${styles.tom} ${montserrat.className}`}>
                    Login or Signup
                </h3>
                <div style={{display:"flex"}}>
                    <input 
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        className={`${styles.input} ${"logininput"}`}
                    />
                    <div className={`${styles.btn} ${this.state.email!="" ? styles.btnClickable : styles.btnUnclickable} ${"loginbtn"}  ${this.state.loading ? styles.loginbtnactiveloading : styles.loginbtnnotloading}`} style={{display:'flex'}} onClick={()=>{
                        if (this.state.email!=""){
                            this.setState({
                                email: this.state.email,
                                loading: true
                            });
                        }
                    }}>
                        <div className={styles.text}>Submit</div>
                        <div className={`${styles.btnloadingicon} ${this.state.loading ? styles.btnactiveloading : styles.btnnotloading}`}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginBox;

