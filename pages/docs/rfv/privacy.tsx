import { NextPage } from 'next'

const Privacy: NextPage = () => {
  return (
    <main className="min-h-screen bg-[#050A14] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-8 text-3xl font-semibold tracking-wide">Privacy Policy</h1>

        <p className="mb-6 text-white/70 leading-relaxed">
          Welcome to South American Adventure (hereinafter referred to as "the App"). This Privacy Policy explains how the App
          collects, uses, stores, shares, and protects your personal data, in strict compliance with Apple App Store
          Review Guidelines (especially Section 5.1.1), iOS privacy standards, and applicable regional laws and
          regulations (including GDPR, CCPA, PIPL, etc.).
        </p>
        <p className="mb-10 text-white/70 leading-relaxed">
          Please read and understand this Privacy Policy carefully before using the App. By using the App, you agree to
          the processing of your personal data as described in this Policy. If you do not agree to any terms of this
          Policy, please do not use the App.
        </p>

        <Section title="1. Definitions and Scope">
          <SubSection title="1.1 Personal Data">
            In accordance with Apple's privacy standards, personal data refers to any data relating to an identified or
            identifiable individual, including but not limited to your name, contact information, device information,
            usage data, and location information — whether or not it directly identifies you, as long as it can
            reasonably be linked to you. Aggregated data that cannot be associated with any individual is not considered
            personal data under this Policy.
          </SubSection>
          <SubSection title="1.2 Scope">
            This Policy applies to all your interactions with the App on Apple devices (iPhone, iPad, iPod touch, Apple
            Watch, etc.), including downloading, installing, registering, logging in, using features, and interacting
            with us. This Policy does not apply to third-party services (such as third-party SDKs or advertising
            services); please refer to their respective privacy policies for details.
          </SubSection>
        </Section>

        <Section title="2. Data Collection">
          <p className="mb-4 text-white/70 leading-relaxed">
            We strictly follow Apple's data minimization principle and only collect data necessary for the App's normal
            operation and core functionality. We do not collect any personal data unrelated to these functions. All data
            collection requires your explicit authorization.
          </p>
          <SubSection title="2.1 Required Data (Core Functionality)">
            <p className="mb-2 text-white/70 leading-relaxed">
              This data is essential for the App's core features to function. Declining to provide it may prevent you
              from using certain core features:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>
                Device Information: Device model, OS version, device identifier (e.g., IDFV; IDFA is not collected
                unless separately authorized), and network status — used to adapt the runtime environment, fix crashes,
                and ensure App stability.
              </li>
              <li>
                Account Information: If you sign in with Apple ID, we only receive the nickname and avatar (anonymized)
                authorized by Apple. We do not access your Apple ID credentials or other private information. The
                sign-in flow fully complies with Apple's authorization standards.
              </li>
              <li>
                Core Feature Data: Collected only when you use the relevant feature (e.g., location for navigation,
                photos for a photo App), strictly limited to what is needed for that feature, with the purpose clearly
                disclosed.
              </li>
            </ul>
          </SubSection>
          <SubSection title="2.2 Optional Data (Non-Core Features)">
            <p className="mb-2 text-white/70 leading-relaxed">
              This data enhances your experience. You may choose whether to provide it; declining will not affect core
              functionality:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>
                Location: Collected only when you enable location permission, used to provide location-based services
                (e.g., nearby recommendations). You may revoke this permission at any time in iOS Settings.
              </li>
              <li>
                Photos, Contacts, Microphone, Camera: Accessed only when you use the corresponding feature (e.g.,
                uploading photos, voice input, capturing images), temporarily and with your individual authorization.
                Released immediately after use. No unrelated data is stored.
              </li>
              <li>
                Usage Data: App session duration, feature interaction logs, and crash logs — used to analyze usage
                patterns and improve the experience. All usage data is anonymized and cannot be linked to you personally.
              </li>
            </ul>
          </SubSection>
          <SubSection title="2.3 How We Collect Data">
            <ol className="list-decimal pl-5 space-y-2 text-white/70">
              <li>Provided by you: Data you submit when registering, filling in information, or using features;</li>
              <li>
                Automatically collected: Device information and usage data collected through iOS system interfaces after
                your authorization, in accordance with Apple's data access standards;
              </li>
              <li>
                Collected by third-party SDKs: If the App uses third-party SDKs (e.g., analytics, advertising,
                payment), those parties may collect necessary data after your authorization. See Section 4 for details.
                We require all SDKs to comply with Apple's privacy requirements and collect only the minimum necessary
                data.
              </li>
            </ol>
          </SubSection>
        </Section>

        <Section title="3. How We Use Your Data">
          <p className="mb-4 text-white/70 leading-relaxed">
            We use collected personal data only for clearly defined purposes related to the App's functionality, and
            never for purposes not disclosed to you:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-white/70">
            <li>
              App Operation: To adapt to your device environment, fix crashes, and mitigate security risks, ensuring
              stable and secure service;
            </li>
            <li>Core Features: To deliver the features you've authorized (e.g., location for navigation, photos for sharing);</li>
            <li>
              Experience Improvement: To analyze anonymized usage data, understand usage patterns, and optimize the
              App's layout and performance;
            </li>
            <li>
              Security & Compliance: To detect and prevent fraud and malicious activity, protect your account, and meet
              Apple App Store Review and regulatory requirements;
            </li>
            <li>
              Push Notifications: With your consent, to send App updates and feature announcements. You may disable
              notifications at any time in iOS Settings or within the App.
            </li>
          </ul>
          <p className="mt-4 text-white/50 leading-relaxed text-sm">
            Note: We do not use personal data for purposes prohibited by Apple, and we do not track you across apps or
            websites without your explicit consent and permission granted through the AppTrackingTransparency (ATT)
            framework.
          </p>
        </Section>

        <Section title="4. Third-Party Services">
          <p className="mb-4 text-white/70 leading-relaxed">
            The App may integrate third-party SDKs or services to enable certain features (e.g., analytics,
            advertising, payments, sharing). These services may collect relevant data. We carefully vet all third-party
            providers, requiring compliance with Apple's privacy standards and applicable laws, with data collection
            limited to what is necessary for the service.
          </p>
          <p className="mb-2 text-white/70">Key third-party services include:</p>
          <ul className="list-disc pl-5 space-y-2 text-white/70">
            <li>
              Analytics SDKs (e.g., Firebase Analytics): Collect anonymized usage data (e.g., feature interactions,
              session duration) to analyze App usage and improve features. No personally identifiable information is
              collected.
            </li>
            <li>
              Advertising SDKs (e.g., Apple Search Ads): May collect your device advertising identifier (IDFA) with
              your authorization, to deliver personalized ads. You may opt out in iOS Settings.
            </li>
            <li>
              Payment SDKs (e.g., Apple Pay): Collect only transaction-related information (e.g., transaction amount).
              All payment processing is handled by Apple Pay; we do not store your card numbers or payment credentials.
            </li>
            <li>
              Sharing SDKs (e.g., Apple Share): Temporarily access content to be shared only when you actively use the
              share feature. No sharing data is stored.
            </li>
          </ul>
          <p className="mt-4 text-white/50 leading-relaxed text-sm">
            Third-party services maintain their own privacy policies, and we are not responsible for their privacy
            practices. We recommend reviewing their policies. If you object to a third party's data collection, you may
            choose not to use the associated feature.
          </p>
        </Section>

        <Section title="5. Data Storage and Security">
          <SubSection title="5.1 Storage">
            <ol className="list-decimal pl-5 space-y-2 text-white/70">
              <li>
                Location: Personal data is stored on Apple-approved secure servers (e.g., iCloud, AWS compliant
                servers), preferably in your region, to comply with data localization requirements;
              </li>
              <li>
                Retention: We retain your personal data only for as long as necessary to fulfill the purposes described
                in this Policy. Beyond that period, data is automatically deleted or anonymized, unless otherwise
                required by law;
              </li>
              <li>
                Local Storage: Some data (e.g., cache, offline content) may be stored locally on your Apple device,
                accessible only to you. You may delete it via App settings or iOS Settings.
              </li>
            </ol>
          </SubSection>
          <SubSection title="5.2 Security">
            <p className="mb-2 text-white/70 leading-relaxed">
              We follow Apple's security standards and apply layered protections to safeguard your personal data:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>Encryption: End-to-end encryption (e.g., AES-256) for stored data; HTTPS for data in transit;</li>
              <li>
                Access Control: Strict internal access restrictions; only authorized personnel may access personal data,
                and all access is logged;
              </li>
              <li>Security Audits: Regular audits and vulnerability scans to identify and remediate risks;</li>
              <li>
                Device Security: Leveraging iOS's built-in security mechanisms to protect locally stored data from
                unauthorized third-party access.
              </li>
            </ul>
            <p className="mt-4 text-white/50 leading-relaxed text-sm">
              Despite these measures, no data transmission or storage is entirely risk-free. We cannot guarantee
              absolute security, but will take all reasonable remedial steps and promptly notify you and relevant
              authorities in the event of a breach caused by circumstances beyond our control.
            </p>
          </SubSection>
        </Section>

        <Section title="6. Your Rights">
          <p className="mb-4 text-white/70 leading-relaxed">
            Under Apple's privacy standards and applicable laws, you have the following rights regarding your personal
            data:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-white/70">
            <li>
              Access: You may access your personal data at any time via "Me &gt; Settings &gt; Privacy Center" in the
              App;
            </li>
            <li>
              Correction: If you find errors in your personal data, you may request corrections. We will process your
              request within 15 business days;
            </li>
            <li>
              Deletion: You may request deletion of your personal data and account. We will permanently delete all your
              personal data within 30 business days (unless otherwise required by law);
            </li>
            <li>
              Withdrawal of Consent: You may withdraw authorization for data collection and use at any time via iOS
              Settings or in-App settings. Withdrawal does not affect data already lawfully processed before the
              withdrawal;
            </li>
            <li>
              Data Portability: You may request an export of your personal data. We will provide it in an Apple-compliant
              format;
            </li>
            <li>
              Complaints: If you believe our data processing violates this Policy, you may contact us or file a
              complaint with the Apple App Store Review team or relevant regulatory authorities.
            </li>
          </ul>
          <p className="mt-4 text-white/50 leading-relaxed text-sm">
            Note: To protect your account security, we may require identity verification before processing certain
            requests.
          </p>
        </Section>

        <Section title="7. Policy Updates">
          <ol className="list-decimal pl-5 space-y-2 text-white/70">
            <li>
              We may update this Privacy Policy periodically to reflect changes in Apple App Store policies, applicable
              laws, or App features. Updated policies will be prominently displayed within the App;
            </li>
            <li>
              For material changes (e.g., changes to data collection scope or purposes), we will notify you via in-App
              pop-ups or push notifications. Continued use of the App constitutes acceptance of the updated Policy;
            </li>
            <li>The latest version of this Policy is always accessible within the App and on the App Store product page.</li>
          </ol>
        </Section>

        <Section title="8. Children's Privacy">
          <p className="text-white/70 leading-relaxed">
            The App is not directed at children under 13. We do not knowingly collect personal data from children under
            13. If you are a parent or guardian and discover that a child has used the App and submitted personal data,
            please contact us immediately. We will promptly delete the relevant data and take steps to prevent further
            access by the child.
          </p>
        </Section>

        <Section title="9. Contact Us">
          <p className="mb-4 text-white/70 leading-relaxed">
            If you have any questions or suggestions about this Privacy Policy, or wish to exercise your data rights or
            submit a complaint, please contact us:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-white/70">
            <li>Email: hierifer@gmail.com</li>
            <li>Address: Putong, Shanghai</li>
          </ul>
          <p className="mt-4 text-white/50 text-sm">We will respond to your inquiry within 15 business days.</p>
        </Section>

        <Section title="10. Miscellaneous">
          <ol className="list-decimal pl-5 space-y-2 text-white/70">
            <li>
              This Privacy Policy is the sole basis for our processing of personal data. In case of conflict with Apple
              App Store Review Guidelines or applicable laws, those requirements shall prevail;
            </li>
            <li>
              By using the App, you confirm that you have fully read and agree to all terms of this Privacy Policy;
            </li>
            <li>This Policy is effective from the date of publication. Last updated: 2026/3/6.</li>
          </ol>
        </Section>

        <p className="mt-12 text-white/40 text-sm">NEO-HEX Team · {new Date().getFullYear()}</p>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold text-white/90 border-b border-white/10 pb-2">{title}</h2>
      {children}
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-base font-medium text-white/80">{title}</h3>
      <div className="text-white/70 leading-relaxed">{children}</div>
    </div>
  )
}

export default Privacy
