import { NextPage } from 'next'

const Privacy: NextPage = () => {
  return (
    <main className="min-h-screen bg-[#050A14] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-8 text-3xl font-semibold tracking-wide">隐私政策</h1>

        <p className="mb-6 text-white/70 leading-relaxed">
          欢迎使用南美大冒险（以下简称"本App"）。本隐私政策旨在明确本App如何收集、使用、存储、共享和保护您的个人数据，严格遵循Apple
          App Store审核指南（尤其是5.1.1条款）、iOS系统隐私规范及相关地区法律法规（如GDPR、CCPA、PIPL等），切实保障您的隐私权益，同时确保符合Apple对App隐私保护的全部要求。
        </p>
        <p className="mb-10 text-white/70 leading-relaxed">
          请您在使用本App前，仔细阅读并理解本隐私政策。您使用本App，即表示您同意我们按照本政策处理您的个人数据。若您不同意本政策的任何条款，请勿使用本App。
        </p>

        <Section title="一、定义与范围">
          <SubSection title="1.1 个人数据">
            依据Apple隐私规范，个人数据指与已识别或可识别的个人相关的所有数据，包括但不限于您的姓名、联系方式、设备信息、使用数据、位置信息等，无论该数据是否能直接识别您的身份，只要可合理关联至您个人，均视为个人数据。本政策所指的汇总数据（无法关联至任何个人的匿名数据）不视为个人数据。
          </SubSection>
          <SubSection title="1.2 适用范围">
            本政策适用于您通过Apple设备（iPhone、iPad、iPod touch、Apple Watch等）使用本App的所有行为，包括但不限于App下载、安装、注册、登录、使用各项功能及与我们的互动。本政策不适用于第三方服务（如第三方SDK、广告服务等），第三方服务的隐私政策请参考其自身的隐私说明。
          </SubSection>
        </Section>

        <Section title="二、数据收集与获取">
          <p className="mb-4 text-white/70 leading-relaxed">
            我们严格遵循Apple"最小必要"原则，仅收集本App正常运行及实现核心功能所必需的数据，不收集与功能无关的任何个人数据，所有数据收集均需获得您的明确授权，具体收集范围如下：
          </p>
          <SubSection title="2.1 必要数据收集（核心功能必需）">
            <p className="mb-2 text-white/70 leading-relaxed">此类数据为App核心功能正常运行的前提，若您拒绝提供，将无法使用本App的核心功能，具体包括：</p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>设备信息：包括设备型号、操作系统版本、设备标识符（如IDFV，不收集IDFA除非获得您的单独授权）、设备网络状态，用于适配App运行环境、修复崩溃问题、保障App稳定性，符合Apple设备数据使用规范。</li>
              <li>账户信息：若您选择通过Apple ID登录，我们仅获取Apple授权提供的昵称、头像（匿名化处理），不获取您的Apple ID账号、密码及其他隐私信息，登录授权流程完全遵循Apple账号授权规范。</li>
              <li>必要功能数据：根据App核心功能而定（如导航类App收集位置信息、相册类App收集照片信息），仅在您使用该功能时收集，且明确告知收集目的，收集范围严格限定于功能所需。</li>
            </ul>
          </SubSection>
          <SubSection title="2.2 可选数据收集（非核心功能）">
            <p className="mb-2 text-white/70 leading-relaxed">此类数据用于增强App使用体验，您可自主选择是否提供，拒绝提供不会影响核心功能的使用，具体包括：</p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>位置信息：仅在您主动开启位置权限时收集，用于提供基于位置的个性化服务（如附近推荐），您可在iOS系统设置中随时关闭该权限。</li>
              <li>照片、通讯录、麦克风、相机等权限：仅在您使用对应功能（如上传照片、语音输入、拍摄）时，经您单独授权后临时获取，使用完毕后立即释放，不存储无关数据，严格遵循Apple权限申请规范，不提前或强制申请权限。</li>
              <li>使用数据：包括App使用时长、功能点击记录、崩溃日志等，用于分析App使用情况、优化功能体验，所有使用数据均进行匿名化处理，无法关联至您个人。</li>
            </ul>
          </SubSection>
          <SubSection title="2.3 数据收集方式">
            <ol className="list-decimal pl-5 space-y-2 text-white/70">
              <li>您主动提供：包括您注册账户、填写信息、使用功能时主动提交的数据；</li>
              <li>系统自动收集：通过iOS系统接口，在您授权后收集设备信息、使用数据等，收集过程符合Apple系统数据访问规范；</li>
              <li>第三方SDK收集：若本App使用第三方SDK（如分析、广告、支付类），第三方将在您授权后收集必要数据，具体收集范围详见本政策"四、第三方服务说明"，我们已要求第三方SDK严格遵循Apple隐私要求，仅收集最小必要数据。</li>
            </ol>
          </SubSection>
        </Section>

        <Section title="三、数据使用与目的">
          <p className="mb-4 text-white/70 leading-relaxed">
            我们对收集的个人数据仅用于明确的、与本App功能相关的目的，不用于任何未告知您的用途，严格遵循Apple透明化要求，具体使用目的如下：
          </p>
          <ul className="list-disc pl-5 space-y-2 text-white/70">
            <li>保障App正常运行：用于适配设备环境、修复崩溃问题、防范安全风险，确保App稳定、安全地为您提供服务；</li>
            <li>实现核心功能：根据您的授权，使用收集的数据提供对应功能（如位置信息用于导航、照片用于上传分享）；</li>
            <li>优化用户体验：通过分析匿名化的使用数据，了解您的使用习惯，优化App功能布局、提升运行速度，为您提供更贴合需求的服务；</li>
            <li>安全与合规：用于识别和防范欺诈、恶意攻击等安全风险，保障您的账户安全，同时符合Apple App Store审核及相关法律法规要求；</li>
            <li>推送服务：若您同意，我们将使用您的设备信息推送App更新、功能通知等，您可在iOS系统设置或App内随时关闭推送权限。</li>
          </ul>
          <p className="mt-4 text-white/50 leading-relaxed text-sm">
            特别说明：我们不会将个人数据用于Apple禁止的用途，不会将您的个人数据用于跨App、跨网站的跟踪，除非获得您的明确授权并通过AppTrackingTransparency（ATT）框架获取许可。
          </p>
        </Section>

        <Section title="四、第三方服务说明">
          <p className="mb-4 text-white/70 leading-relaxed">
            本App可能集成第三方SDK或使用第三方服务，以实现部分功能（如分析、广告、支付、分享等），这些第三方服务可能会收集您的相关数据。我们已严格筛选第三方服务提供商，要求其符合Apple隐私规范及相关法律法规，仅收集实现服务所需的最小必要数据，且不用于与本App服务无关的目的。
          </p>
          <p className="mb-2 text-white/70">主要第三方服务及数据收集说明如下：</p>
          <ul className="list-disc pl-5 space-y-2 text-white/70">
            <li>分析类SDK（如Firebase Analytics）：收集匿名化的使用数据（如功能点击、使用时长），用于分析App使用情况、优化功能，不收集个人身份信息；</li>
            <li>广告类SDK（如Apple Search Ads）：若您授权，可能收集设备广告标识符（IDFA），用于提供个性化广告，您可在iOS系统设置中关闭广告跟踪；</li>
            <li>支付类SDK（如Apple Pay）：仅收集支付相关的必要信息（如交易金额），支付过程由Apple Pay全程处理，我们不存储您的银行卡号、支付密码等敏感信息；</li>
            <li>分享类SDK（如Apple Share）：仅在您主动使用分享功能时，临时获取待分享的内容，不存储任何分享数据。</li>
          </ul>
          <p className="mt-4 text-white/50 leading-relaxed text-sm">
            第三方服务的隐私政策由其自身制定，我们不对第三方的隐私行为承担责任，建议您查看第三方的隐私政策，了解其数据处理方式。若您不同意第三方收集数据，可选择不使用该第三方相关功能。
          </p>
        </Section>

        <Section title="五、数据存储与安全">
          <SubSection title="5.1 数据存储">
            <ol className="list-decimal pl-5 space-y-2 text-white/70">
              <li>存储位置：我们将您的个人数据存储在Apple认可的安全服务器（如iCloud、AWS合规服务器），优先选择存储在您所在地区的服务器，确保符合数据本地化要求；</li>
              <li>存储期限：我们仅在实现本政策所述目的所需的最短期限内存储您的个人数据，超出期限后，将自动删除或匿名化处理您的个人数据（除非法律另有规定）；</li>
              <li>本地存储：部分数据（如缓存、离线内容）可能存储在您的Apple设备本地，仅您可访问，您可通过App内功能或iOS系统设置删除该部分数据。</li>
            </ol>
          </SubSection>
          <SubSection title="5.2 数据安全">
            <p className="mb-2 text-white/70 leading-relaxed">我们严格遵循Apple安全规范，采取多层次的安全保护措施，保障您的个人数据安全：</p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>数据加密：对收集的个人数据进行端到端加密（如AES-256加密），传输过程中使用HTTPS协议；</li>
              <li>权限管控：严格限制内部人员对个人数据的访问权限，仅授权人员可访问，且访问行为将被记录；</li>
              <li>安全审计：定期进行安全审计、漏洞检测，及时修复安全隐患；</li>
              <li>设备安全：依托iOS系统自身的安全防护机制，保障存储在您设备上的数据安全，防止第三方非法获取。</li>
            </ul>
            <p className="mt-4 text-white/50 leading-relaxed text-sm">
              尽管我们采取了上述安全措施，但请注意，任何数据传输和存储都存在一定的安全风险，我们无法完全保证数据的绝对安全。
            </p>
          </SubSection>
        </Section>

        <Section title="六、用户权利">
          <p className="mb-4 text-white/70 leading-relaxed">根据Apple隐私规范及相关法律法规，您享有以下个人数据相关权利：</p>
          <ul className="list-disc pl-5 space-y-2 text-white/70">
            <li>访问权：您可随时访问您的个人数据，可通过App内"我的-设置-隐私中心"查看；</li>
            <li>更正权：若您发现您的个人数据存在错误，可随时申请更正，我们将在15个工作日内处理；</li>
            <li>删除权：您可随时申请删除您的个人数据及账户，删除后，我们将在30个工作日内彻底删除您的所有个人数据（除非法律另有规定）；</li>
            <li>撤回授权权：您可随时撤回对数据收集、使用的授权，通过iOS系统设置或App内设置撤回，撤回后不影响撤回前已合法处理的数据；</li>
            <li>数据迁移权：您可申请将您的个人数据导出，我们将以符合Apple规范的格式提供数据导出服务；</li>
            <li>投诉权：若您认为我们的处理行为违反本政策，可联系我们投诉，也可向Apple App Store审核团队或相关监管部门投诉。</li>
          </ul>
          <p className="mt-4 text-white/50 leading-relaxed text-sm">
            特别说明：行使上述权利时，为保障您的账户安全，我们可能会要求您进行身份验证。
          </p>
        </Section>

        <Section title="七、政策更新与通知">
          <ol className="list-decimal pl-5 space-y-2 text-white/70">
            <li>我们将根据Apple App Store隐私政策更新、相关法律法规变化及本App功能调整，不定期更新本隐私政策，更新后的政策将在App内显著位置公示；</li>
            <li>若本政策发生重大变更，我们将通过App内弹窗、推送通知等方式明确告知您，您继续使用本App即表示同意变更后的隐私政策；</li>
            <li>本政策的最新版本将始终在App内及App Store产品页可访问。</li>
          </ol>
        </Section>

        <Section title="八、儿童隐私保护">
          <p className="text-white/70 leading-relaxed">
            本App不面向13岁以下儿童提供服务，我们不会有意收集13岁以下儿童的任何个人数据。若您是儿童的监护人，发现儿童误使用本App并提交了个人数据，请及时联系我们，我们将立即删除相关数据，并采取措施阻止儿童继续使用本App。
          </p>
        </Section>

        <Section title="九、联系我们">
          <p className="mb-4 text-white/70 leading-relaxed">
            若您对本隐私政策有任何疑问、建议，或需要行使个人数据相关权利、投诉反馈，可通过以下方式联系我们：
          </p>
          <ul className="list-disc pl-5 space-y-2 text-white/70">
            <li>联系邮箱：hierifer@gmail.com
            </li>
            <li>联系地址：Putong, Shanghai</li>
          </ul>
          <p className="mt-4 text-white/50 text-sm">我们将在收到您的咨询、申请后15个工作日内予以回复。</p>
        </Section>

        <Section title="十、其他说明">
          <ol className="list-decimal pl-5 space-y-2 text-white/70">
            <li>本隐私政策是本App处理个人数据的唯一依据，若与Apple App Store审核指南或相关法律法规冲突，以Apple要求及相关法律法规为准；</li>
            <li>您使用本App，即表示您已充分理解并同意本隐私政策的全部条款；</li>
            <li>本隐私政策自发布之日起生效，最后更新日期：2026/3/6。</li>
          </ol>
        </Section>

        <p className="mt-12 text-white/40 text-sm"> NEO-HEX 运营团队 · {new Date().getFullYear()}</p>
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
