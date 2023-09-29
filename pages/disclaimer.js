import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "/styles/Home.module.css";
import TitleBox from "/components/TitleBox";
import TextBox from "/components/TextBox";
import Button from "components/Button";

import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

const Info = () => {
  return (
    <>
      <Head>
        <title>Titan Echo Info</title>
        <meta name="description" content="Titan echo project Info page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <main className={`${styles.main} ${styles.disclaimerpage}`}>
        <div className={styles.header}>
          <a href="/dashboard">
            <Image
              className={styles.logostyles}
              src="/titanechologohorz-small.svg"
              alt="Titan Echo Logo"
              width={180}
              height={100}
            />
          </a>
          <div className={styles.backButtonContainer}>
            <Button
              btnname="Back to Home"
              onClickCond={() => {
                window.location = "/";
              }}
              cond={true}
            />
          </div>
        </div>

        <div style={{ maxWidth: 800 }}>
          <TitleBox titlepre="" titlemain={["Full Disclaimer"]} titlepost="">
            <p>
              Titan Echo provides betting computations based on SX data. We
              don't guarantee outcomes or assume responsibility for any losses,
              damages, or harm resulting from the use of or reliance on our
              information. Betting involves risk and is not permitted for those
              under the legal gambling age in your jurisdiction. Use responsibly
              at your own risk.
            </p>
          </TitleBox>

          <TextBox
            paragraphs={[
              "This disclaimer governs your use of the Titan Echo website; by using our website, you accept this disclaimer in full. If you disagree with any part of this disclaimer, you must not use our website. Titan Echo reserves the right to modify these terms at any time. You should therefore check periodically for changes. By using this site after we post any changes, you agree to accept those changes, whether or not you have reviewed them.",
              "Titan Echo is a service that computes and suggests bets to users based on data from other bettors on the SX.BET platform. Our services are not intended for those who are under 18 years of age. We do not encourage underage gambling.",
              "We do not guarantee the accuracy, completeness, or usefulness of any information presented. The posted information is for informational purposes only and is not intended to provide specific advice for any individual. The operators of Titan Echo will not be held responsible or liable for any decisions users make based on the information provided on this site.",
              "We are not responsible for any losses, damages, or harm caused by reliance on the information obtained from or through Titan Echo. It is the users' responsibility to analyse, evaluate or assess the risks associated with their betting choices. By utilising our service, users confirm that they are aware of the inherent risks involved in sports betting.",
              "Titan Echo is not responsible for any losses or damages arising from the use of information or the inability to use the information available on this site. You agree that your betting activities, which are managed by SX.BET, are carried out at your own risk.",
              "We reiterate that betting involves significant risk and can result in the loss of your entire stake. Do not bet with money you cannot afford to lose. If you feel you may have a gambling problem, contact a gambling addiction support service immediately.",
              "Titan Echo does not offer or provide any form of insurance, financial guarantee, or assurance regarding the performance or outcomes of any bets suggested or computed by our service.",
              "The team behind Titan Echo believes in the product they have built, however this does not guarantee success or profit from its use. Your use of Titan Echo constitutes your acceptance of this risk.",
              "Titan Echo is intended for use within the United Kingdom. We make no representations that our content or services are appropriate or available for use in other locations. Users are responsible for compliance with all local laws and regulations.",
              "Titan Echo collects and stores user's email addresses as part of the sign-in process. We act as a Data Controller in accordance with the General Data Protection Regulation (GDPR). We use this personal data solely to manage your account and provide you with our services. We do not share, sell, or distribute your data to third parties without your explicit consent unless legally required. We take reasonable steps to protect your personal data from misuse, interference, loss, unauthorised access, modification, or disclosure. By using our services, you consent to our collection, storage, use, and disclosure of your personal information as described in this disclaimer.",
              "This disclaimer shall be interpreted in accordance with English law, and any disputes relating to this disclaimer will be subject to the jurisdiction of the courts of England and Wales.",
              "Last Updated: 1st July 2023",
            ]}
          />
        </div>
      </main>
    </>
  );
};

export default Info;
