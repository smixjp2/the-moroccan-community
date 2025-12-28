import type { Article } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const articles: Article[] = [
  {
    id: "1",
    title: "MASI 2025 : Analyse des perspectives post-budgétaires et impact des taux",
    category: "Analyse de Marché",
    excerpt: "Une analyse approfondie de la trajectoire attendue de l'indice MASI en 2025, en tenant compte des nouvelles mesures budgétaires et de la politique monétaire de Bank Al-Maghrib.",
    date: "2025-01-20",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-1')?.imageHint || '',
    content: `
      <h2>Introduction : Un Contexte Macroéconomique en Mutation</h2>
      <p>L'année 2025 s'ouvre sur un paysage économique marocain façonné par deux forces majeures : la mise en œuvre de la nouvelle loi de finances et la politique monétaire restrictive de Bank Al-Maghrib (BAM). Ces éléments créent un environnement complexe pour l'indice MASI, qui navigue entre des vents contraires et des opportunités sectorielles ciblées. Cette analyse décrypte les facteurs clés susceptibles d'influencer la performance de la Bourse de Casablanca au cours des prochains mois.</p>
      
      <h2>Impact de la Loi de Finances 2025</h2>
      <p>La loi de finances pour 2025 introduit plusieurs mesures structurantes. D'une part, l'augmentation de la pression fiscale sur certains secteurs pourrait peser sur les marges des entreprises concernées. D'autre part, les incitations à l'investissement productif et le soutien à la demande intérieure via des programmes sociaux pourraient stimuler l'activité de certains pans de l'économie. Nous anticipons un impact différencié :</p>
      <ul>
        <li><strong>Secteurs sous pression :</strong> Les entreprises des secteurs historiquement peu taxés pourraient voir leurs bénéfices nets affectés.</li>
        <li><strong>Secteurs gagnants :</strong> Les entreprises de biens de consommation, du BTP et des matériaux de construction pourraient bénéficier des mesures de soutien à la demande.</li>
      </ul>

      <h2>La Politique Monétaire de Bank Al-Maghrib</h2>
      <p>Face à des tensions inflationnistes persistantes, BAM a maintenu un taux directeur élevé. Cette politique a plusieurs conséquences :</p>
      <ul>
        <li><strong>Renchérissement du crédit :</strong> L'accès au financement devient plus coûteux pour les entreprises, ce qui peut freiner les investissements et la croissance.</li>
        <li><strong>Arbitrage en faveur des placements sans risque :</strong> Les rendements attractifs des bons du Trésor et des dépôts à terme peuvent détourner une partie de la liquidité du marché actions, réduisant ainsi son attractivité relative.</li>
        <li><strong>Pression sur les valorisations :</strong> Un taux d'actualisation plus élevé exerce une pression mathématique à la baisse sur la valorisation des actions.</li>
      </ul>

      <h2>Perspectives pour le MASI</h2>
      <p>Dans ce contexte, notre scénario central pour le MASI en 2025 est celui d'une croissance modérée, marquée par une forte sélectivité. Les investisseurs devront faire preuve de discernement et privilégier les entreprises résilientes, dotées de fondamentaux solides et d'un faible endettement. Le stock-picking sera plus que jamais la clé de la surperformance. Nous prévoyons une première moitié d'année volatile, suivie d'une potentielle embellie au second semestre si les tensions inflationnistes s'apaisent et que BAM commence à signaler un assouplissement de sa politique monétaire.</p>
    `
  },
  {
    id: "2",
    title: "Secteur Bancaire Marocain 2025 : Marges, Digitalisation et Nouveaux Risques",
    category: "Analyse Sectorielle",
    excerpt: "Comparaison des grandes valeurs bancaires (Attijariwafa, BCP, BMCE) face aux défis de la digitalisation, à l'évolution des marges d'intérêt et aux nouvelles réglementations prudentielles.",
    date: "2025-01-18",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-2')?.imageHint || '',
    content: `
      <h2>Le Secteur Bancaire à la Croisée des Chemins</h2>
      <p>Le secteur bancaire marocain, pilier de l'économie nationale, fait face en 2025 à une triple révolution : la digitalisation accélérée, la compression des marges dans un environnement de taux élevés, et le durcissement des exigences réglementaires. Cette analyse compare la situation des trois géants du secteur : Attijariwafa Bank, Banque Centrale Populaire (BCP) et BMCE Bank of Africa.</p>

      <h2>1. Le Défi de la Marge d'Intérêt</h2>
      <p>La politique de taux élevés de Bank Al-Maghrib a un double effet. Si elle permet de mieux rémunérer les liquidités des banques, elle augmente aussi le coût des ressources, notamment les dépôts à terme. De plus, la hausse des taux peut freiner la demande de crédits et augmenter le coût du risque. Dans cette bataille, les banques disposant d'une large base de dépôts à vue (peu ou pas rémunérés) comme Attijariwafa et BCP, possèdent un avantage compétitif certain sur leurs concurrents.</p>

      <h2>2. La Course à la Digitalisation</h2>
      <p>La transformation digitale n'est plus une option. Les clients, de plus en plus jeunes et connectés, exigent des services bancaires fluides, accessibles et instantanés. Les néobanques et les fintechs, bien que naissantes au Maroc, représentent une menace à long terme.</p>
      <ul>
        <li><strong>Attijariwafa Bank :</strong> Investit massivement dans la refonte de son application mobile et le développement d'une offre digitale complète, capitalisant sur sa large base de clients.</li>
        <li><strong>BCP :</strong> Profite de son maillage régional pour combiner approche physique et digitale, avec des services comme "Pocket Bank".</li>
        <li><strong>BMCE Bank of Africa :</strong> Tente de rattraper son retard avec des investissements ciblés mais fait face à une concurrence agressive.</li>
      </ul>
      <p>Le principal enjeu est de monétiser ces investissements et de réduire les coûts opérationnels grâce à l'automatisation.</p>
      
      <h2>3. Réglementation et Nouveaux Risques</h2>
      <p>Les nouvelles normes prudentielles, inspirées de Bâle III et IV, exigent des niveaux de fonds propres plus élevés, ce qui peut limiter la capacité des banques à distribuer des dividendes généreux. De plus, la montée des risques climatiques et cybernétiques contraint les banques à intégrer de nouveaux paramètres dans leur gestion des risques. La capacité à s'adapter rapidement à ce cadre réglementaire en constante évolution sera un facteur de différenciation majeur.</p>

      <h2>Conclusion : Quel Positionnement ?</h2>
      <p>Attijariwafa Bank semble la mieux positionnée grâce à sa taille, la qualité de ses dépôts et son avancée dans le digital. BCP reste un acteur solide avec une forte résilience grâce à son modèle coopératif. BMCE Bank of Africa présente un potentiel de redressement mais avec un profil de risque plus élevé. Les investisseurs devront surveiller de près l'évolution du coût du risque et l'efficacité des stratégies digitales pour chaque acteur.</p>
    `
  },
  {
    id: "3",
    title: "Immobilier et BTP : Les valeurs à surveiller après la relance du crédit",
    category: "Analyse Sectorielle",
    excerpt: "Le marché immobilier montre des signes de reprise. Découvrez quelles actions (Addoha, Alliances, TGCC) sont les mieux positionnées pour bénéficier de cette nouvelle dynamique.",
    date: "2025-01-15",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-3')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-3')?.imageHint || '',
    content: `
      <h2>Un Souffle Nouveau pour l'Immobilier</h2>
      <p>Après plusieurs années de morosité, le marché immobilier marocain donne des signes de frémissement en ce début 2025. La combinaison d'une stabilisation des taux d'intérêt, des nouveaux programmes d'aide au logement et d'une demande latente semble créer un alignement des planètes favorable pour le secteur. Cependant, tous les acteurs ne sont pas logés à la même enseigne.</p>

      <h2>Les Catalyseurs du Secteur</h2>
      <p>Plusieurs facteurs soutiennent la thèse d'une reprise :</p>
      <ul>
          <li><strong>Programme d'aide au logement :</strong> Le programme gouvernemental visant à aider les primo-accédants stimule directement la demande pour le logement social et moyen standing.</li>
          <li><strong>Stabilisation des taux :</strong> Bien que toujours élevés, les taux de crédit immobilier semblent avoir atteint un plateau, redonnant de la visibilité aux acheteurs.</li>
          <li><strong>Demande démographique :</strong> La structure démographique du Maroc assure une demande de fond continue pour de nouveaux logements.</li>
      </ul>

      <h2>Analyse des Acteurs Clés</h2>
      <h3>Groupe Addoha</h3>
      <p>En tant que leader historique du logement social et économique, Addoha est le bénéficiaire le plus direct des nouveaux programmes d'aide. Le groupe a assaini son bilan au cours des dernières années, réduisant significativement sa dette. Son immense réserve foncière lui permet de lancer rapidement de nouveaux projets pour répondre à la demande. Le principal défi reste la maîtrise des marges dans un segment sensible aux prix.</p>

      <h3>Groupe Alliances</h3>
      <p>Alliances, après une restructuration profonde, s'est repositionné avec succès sur le moyen et haut standing, notamment à travers des projets de golf et des resorts. Le groupe est moins dépendant des aides directes mais profite de l'amélioration générale du sentiment de marché. La qualité de ses projets et sa capacité à commercialiser des biens à plus forte valeur ajoutée sont ses principaux atouts. Le risque réside dans la cyclicalité du segment haut de gamme.</p>

      <h3>TGCC (Travaux Généraux de Construction de Casablanca)</h3>
      <p>TGCC n'est pas un promoteur mais le leader de la construction (BTP). Son carnet de commandes est le principal indicateur à suivre. Le groupe bénéficie non seulement de la reprise de l'immobilier privé, mais aussi et surtout des grands projets d'infrastructure lancés par l'État (ports, stades pour la CAN 2025 et le Mondial 2030, lignes TGV...). Son profil est donc plus diversifié et potentiellement plus résilient que celui des promoteurs purs. La maîtrise des délais et des coûts sur des chantiers complexes est son challenge permanent.</p>

      <h2>Conclusion : Quelle Stratégie d'Investissement ?</h2>
      <p>Pour les investisseurs, le choix dépendra de leur appétit pour le risque :</p>
      <ul>
          <li><strong>Addoha :</strong> Un pari direct sur la reprise du logement économique, avec un potentiel de volume important.</li>
          <li><strong>Alliances :</strong> Une exposition au segment du moyen/haut standing, sensible à la confiance des ménages les plus aisés.</li>
          <li><strong>TGCC :</strong> Un pari plus large sur la dynamique de l'investissement au Maroc, public comme privé, offrant une meilleure diversification.</li>
      </ul>
    `
  },
  {
    id: "4",
    title: "Énergies Renouvelables : Taqa Morocco et Nareva, qui mène la course en 2025 ?",
    category: "Analyse d'Actions",
    excerpt: "Analyse comparative des stratégies d'investissement, des rendements et des perspectives de croissance pour les leaders marocains de l'énergie verte dans un contexte de transition énergétique.",
    date: "2025-01-12",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-4')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-4')?.imageHint || '',
    content: `
      <h2>La Transition Énergétique Marocaine : Un Enjeu Stratégique</h2>
      <p>La stratégie énergétique du Maroc, visant plus de 52% de la capacité électrique installée à partir de sources renouvelables d'ici 2030, crée un terrain de jeu exceptionnel pour les acteurs du secteur. En 2025, deux champions se distinguent : Taqa Morocco, l'opérateur historique, et Nareva, la filiale du groupe Al Mada. Qui est le mieux positionné pour capter cette croissance ?</p>

      <h2>Taqa Morocco : La Force de l'Existant et la Diversification</h2>
      <p>Historiquement, Taqa Morocco est le premier producteur privé d'électricité au Maroc, principalement via sa centrale thermique de Jorf Lasfar. Cette activité, basée sur des contrats à long terme avec l'ONEE, lui assure des revenus stables et prévisibles, ainsi qu'un dividende historiquement généreux. Conscient des enjeux de la transition, Taqa a entamé une diversification stratégique :</p>
      <ul>
          <li><strong>Développement de parcs éoliens et solaires :</strong> Le groupe investit pour construire un portefeuille d'actifs renouvelables.</li>
          <li><strong>Dessalement d'eau de mer :</strong> Un axe de croissance majeur, répondant au stress hydrique du Maroc. Le projet de Casablanca en est la pierre angulaire.</li>
      </ul>
      <p><strong>Forces :</strong> Stabilité des revenus, expertise opérationnelle, rendement attractif.<br><strong>Faiblesses :</strong> Forte dépendance résiduelle au charbon, perception ESG (Environnemental, Social et de Gouvernance) à améliorer.</p>

      <h2>Nareva Holding : Le Pure-Player des Énergies Vertes</h2>
      <p>Filiale du holding royal Al Mada, Nareva s'est positionné dès sa création comme un acteur majeur des énergies renouvelables. Le groupe opère certains des plus grands parcs éoliens d'Afrique (comme celui de Tarfaya) et développe activement des projets solaires et hydrauliques.</p>
      <ul>
          <li><strong>Un portefeuille 100% vert :</strong> Nareva bénéficie d'une image et d'un positionnement parfaitement alignés avec la stratégie nationale et les attentes des investisseurs internationaux.</li>
          <li><strong>Projets d'envergure :</strong> Le groupe est impliqué dans des projets structurants, y compris des projets futurs liés à l'hydrogène vert.</li>
      </ul>
      <p><strong>Forces :</strong> Alignement stratégique parfait, fort soutien actionnarial, potentiel de croissance élevé.<br><strong>Faiblesses :</strong> Rentabilité des projets parfois longue à matérialiser, exposition à la variabilité des ressources (vent, soleil).</p>

      <h2>Comparaison et Verdict pour l'Investisseur</h2>
      <p>Le choix entre Taqa Morocco et les entreprises du secteur renouvelable comme Nareva (bien que non directement cotée, son écosystème l'est) dépend du profil de l'investisseur :</p>
      <ul>
          <li><strong>Taqa Morocco</strong> s'adresse à l'investisseur en quête de <strong>rendement et de stabilité</strong>. Le dividende est son principal attrait, et sa diversification vers le dessalement offre une nouvelle histoire de croissance. C'est un profil "valeur/rendement".</li>
          <li><strong>L'écosystème Nareva</strong> (et les futures introductions en bourse du secteur) représente un pari sur la <strong>croissance pure</strong>. Le potentiel de plus-value est plus important, mais les dividendes sont plus incertains à court terme. C'est un profil "croissance".</li>
      </ul>
      <p>En 2025, une stratégie prudente pourrait consister à détenir Taqa pour son dividende robuste tout en surveillant de près l'émergence d'opportunités d'investissement direct dans des pure-players de l'énergie verte.</p>
    `
  },
  {
    id: "5",
    title: "Technologie : HPS et la dynamique des paiements digitaux en Afrique",
    category: "Analyse d'Actions",
    excerpt: "Focus sur HPS, sa position sur le marché africain des solutions de paiement et les catalyseurs potentiels pour son action en 2025, face à une concurrence accrue.",
    date: "2025-01-10",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-5')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-5')?.imageHint || '',
    content: `
      <h2>HPS : Un Leader Technologique Marocain à la Conquête du Monde</h2>
      <p>Hightech Payment Systems (HPS) est l'une des rares véritables success stories technologiques de la Bourse de Casablanca. Spécialisée dans les solutions de paiement électronique, sa plateforme PowerCARD est utilisée par des centaines d'institutions financières dans plus de 90 pays. En 2025, l'entreprise se trouve à un point d'inflexion, entre une croissance structurelle forte et une concurrence qui s'intensifie.</p>

      <h2>Le Moteur de Croissance : la Digitalisation des Paiements</h2>
      <p>Le marché de HPS est structurellement porteur. La transition du cash vers le paiement digital s'accélère dans le monde entier, particulièrement sur les marchés émergents en Afrique et en Asie, qui constituent le cœur de cible de HPS. Plusieurs facteurs alimentent cette tendance :</p>
      <ul>
        <li>La pénétration croissante des smartphones.</li>
        <li>La volonté des gouvernements de formaliser l'économie.</li>
        <li>L'émergence de nouveaux usages (e-commerce, paiement mobile, BNPL - "Buy Now, Pay Later").</li>
      </ul>
      <p>HPS est idéalement positionnée pour capter cette croissance grâce à la robustesse et la complétude de sa solution PowerCARD, qui couvre l'ensemble de la chaîne de valeur du paiement (émission de cartes, acquisition de transactions, switching...).</p>

      <h2>Nouveaux Contrats et Expansion Géographique</h2>
      <p>La performance boursière de HPS est fortement corrélée à sa capacité à signer de nouveaux contrats importants. L'année 2025 sera scrutée à la loupe sur ce point. L'expansion récente au Canada et le renforcement de sa présence en Asie du Sud-Est sont des signaux positifs. Le modèle économique de HPS, basé sur des frais de licence initiaux ("upfront") puis des revenus récurrents de maintenance, lui assure une bonne visibilité sur ses revenus futurs une fois un client signé.</p>

      <h2>Les Défis à Surveiller</h2>
      <h3>1. La Concurrence</h3>
      <p>HPS n'est pas seule. Elle fait face à des géants mondiaux comme Temenos ou ACI Worldwide, qui disposent de moyens financiers bien plus importants. De plus, de nouvelles startups agiles et spécialisées sur des niches (comme le BNPL) peuvent grignoter des parts de marché. La capacité de HPS à innover en continu et à maintenir son avance technologique est donc cruciale.</p>
      <h3>2. La Valorisation</h3>
      <p>En tant que valeur de croissance technologique, HPS se paie traditionnellement cher en bourse. Sa valorisation intègre déjà des perspectives de croissance élevées. Tout ralentissement dans la signature de nouveaux contrats ou toute déception sur les marges pourrait entraîner une correction boursière significative. Les investisseurs paient aujourd'hui pour la croissance de demain.</p>

      <h2>Conclusion pour l'Investisseur</h2>
      <p>Investir dans HPS en 2025 est un pari sur la poursuite de la digitalisation du système financier mondial. Le potentiel reste immense, mais le titre n'est pas sans risque. Il est destiné aux investisseurs patients, avec un horizon de temps long, et qui acceptent la volatilité inhérente aux valeurs technologiques. La communication financière du groupe et l'annonce de nouveaux contrats seront les éléments clés à surveiller tout au long de l'année.</p>
    `
  },
  {
    id: "6",
    title: "Tourisme : Risma profite-t-elle pleinement du rebond post-pandémique ?",
    category: "Analyse Sectorielle",
    excerpt: "Évaluation de la performance des actifs hôteliers de Risma, de son taux d'occupation et de sa stratégie de gestion de la dette pour l'année 2025.",
    date: "2025-01-08",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-6')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-6')?.imageHint || '',
    content: `
      <h2>Risma : Au Cœur du Rebond Touristique Marocain</h2>
      <p>Le secteur touristique marocain a connu un rebond spectaculaire après la pandémie, porté par une stratégie gouvernementale volontariste et l'attractivité de la destination Maroc. Risma, en tant que premier opérateur touristique coté à Casablanca et partenaire historique du groupe Accor, est en première ligne pour bénéficier de cette dynamique. Mais la performance est-elle au rendez-vous en 2025 ?</p>
      
      <h2>Des Indicateurs Opérationnels en Forte Amélioration</h2>
      <p>Les principaux indicateurs de performance de Risma montrent des signes clairs d'amélioration :</p>
      <ul>
        <li><strong>Taux d'occupation (TO) :</strong> En nette hausse sur l'ensemble du parc hôtelier, se rapprochant et dépassant même par endroits les niveaux pré-pandémiques de 2019. Les destinations comme Marrakech et Agadir tirent cette performance.</li>
        <li><strong>Prix moyen par chambre (ADR) :</strong> Le groupe a réussi à augmenter ses prix, reflétant la forte demande et un positionnement plus qualitatif de certains de ses hôtels après rénovation.</li>
        <li><strong>RevPAR (Revenu par chambre disponible) :</strong> La combinaison d'un TO et d'un ADR en hausse se traduit logiquement par un RevPAR en forte croissance, indicateur clé de la rentabilité dans l'hôtellerie.</li>
      </ul>

      <h2>La Stratégie de Montée en Gamme et de Rénovation</h2>
      <p>Risma a profité de la période de faible activité pour rénover une partie de son parc hôtelier. Cette stratégie de montée en gamme vise à attirer une clientèle à plus forte contribution et à améliorer durablement les marges. Le succès de la rénovation d'hôtels emblématiques sous les marques Sofitel, MGallery ou Mövenpick est un facteur clé à surveiller. Cette stratégie permet à Risma de mieux se défendre face à la concurrence croissante, notamment celle de plateformes comme Airbnb.</p>

      <h2>Le Grand Défi : la Gestion de la Dette</h2>
      <p>Le principal point de vigilance pour les investisseurs reste le niveau d'endettement de Risma. Le secteur hôtelier est très capitalistique, et la construction ainsi que la rénovation des hôtels nécessitent des investissements lourds, souvent financés par la dette. Dans un contexte de taux d'intérêt élevés, le coût de cette dette pèse sur la rentabilité nette du groupe.</p>
      <p>La stratégie de Risma pour 2025 est double :</p>
      <ol>
        <li><strong>Générer un cash-flow opérationnel solide :</strong> Utiliser la bonne performance actuelle pour rembourser une partie de la dette.</li>
        <li><strong>Optimiser le portefeuille d'actifs :</strong> Le groupe pourrait être amené à céder certains actifs jugés non stratégiques ou moins rentables pour accélérer son désendettement.</li>
      </ol>
      
      <h2>Conclusion : Un Potentiel certain, un Risque à Maîtriser</h2>
      <p>Risma représente une exposition directe et de qualité au thème porteur du tourisme marocain. Le potentiel d'appréciation du titre est réel si la dynamique actuelle se poursuit et si le groupe réussit à maîtriser son endettement. Pour l'investisseur, le titre offre une histoire de "recovery" (rétablissement) claire. Il faudra cependant surveiller attentivement les prochaines publications financières pour valider la trajectoire de désendettement et la confirmation de la rentabilité.</p>
    `
  },
];
