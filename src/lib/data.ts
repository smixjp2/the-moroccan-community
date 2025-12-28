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
      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Introduction : Un Contexte Macroéconomique en Mutation</h2>
      <p>L'année 2025 s'ouvre sur un paysage économique marocain façonné par deux forces majeures : la mise en œuvre de la nouvelle loi de finances et la politique monétaire de Bank Al-Maghrib (BAM). Ces éléments créent un environnement complexe pour l'indice MASI, qui navigue entre des vents contraires et des opportunités sectorielles ciblées. Cette analyse décrypte les facteurs clés susceptibles d'influencer la performance de la Bourse de Casablanca au cours des prochains mois.</p>
      
      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Impact de la Loi de Finances 2025</h2>
      <p>La loi de finances pour 2025 introduit plusieurs mesures structurantes. D'une part, l'augmentation de la pression fiscale sur certains secteurs, notamment via la réforme de l'IS, pourrait peser sur les marges des entreprises. D'autre part, les incitations à l'investissement productif et le soutien à la demande intérieure via des programmes sociaux pourraient stimuler l'activité de certains pans de l'économie. Nous anticipons un impact différencié :</p>
      <ul>
        <li><strong>Secteurs sous pression :</strong> Les entreprises des secteurs historiquement peu taxés ou bénéficiant de niches fiscales pourraient voir leurs bénéfices nets affectés. Nous estimons un impact potentiel de -2% à -5% sur le BPA de certains acteurs industriels.</li>
        <li><strong>Secteurs gagnants :</strong> Les entreprises de biens de consommation, du BTP et des matériaux de construction pourraient bénéficier des mesures de soutien à la demande. Les budgets alloués aux infrastructures, notamment en vue de la Coupe du Monde 2030, sont un catalyseur majeur.</li>
      </ul>

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">La Politique Monétaire de Bank Al-Maghrib</h2>
      <p>Face à des tensions inflationnistes qui refluent mais restent au-dessus de la cible de 2%, BAM pourrait maintenir une posture prudente au premier semestre 2025. Un taux directeur maintenu autour de 3% a plusieurs conséquences :</p>
      <ul>
        <li><strong>Renchérissement du crédit :</strong> L'accès au financement reste plus coûteux pour les entreprises, ce qui peut freiner les investissements d'expansion.</li>
        <li><strong>Arbitrage en faveur des placements sans risque :</strong> Les rendements attractifs des bons du Trésor (autour de 3.5% - 4%) peuvent détourner une partie de la liquidité du marché actions, réduisant ainsi son attractivité relative.</li>
      </ul>
      <img src="https://picsum.photos/seed/chart1/800/400" data-ai-hint="line chart" alt="Évolution du taux directeur vs. Inflation" class="my-6 rounded-lg shadow-md" />

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Perspectives pour le MASI</h2>
      <p>Dans ce contexte, notre scénario central pour le MASI en 2025 est celui d'une croissance modérée de <strong>+5% à +8%</strong>, marquée par une forte sélectivité. Les investisseurs devront faire preuve de discernement et privilégier les entreprises résilientes, dotées de fondamentaux solides (faible endettement, pricing power) et d'une exposition aux thématiques porteuses (export, transition énergétique, infrastructures). Nous prévoyons une première moitié d'année volatile, suivie d'une potentielle embellie au second semestre si BAM commence à signaler un assouplissement de sa politique monétaire.</p>
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
      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Le Secteur Bancaire à la Croisée des Chemins</h2>
      <p>Le secteur bancaire marocain, pilier de l'économie, fait face en 2025 à une triple révolution : la digitalisation accélérée, la compression des marges dans un environnement de taux élevés, et le durcissement des exigences réglementaires. Cette analyse compare la situation des trois géants du secteur : Attijariwafa Bank, Banque Centrale Populaire (BCP) et Bank of Africa (BOA).</p>

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">1. Le Défi de la Marge d'Intérêt (NIM)</h2>
      <p>La politique de taux de BAM a un double effet. Si elle permet de mieux rémunérer les liquidités des banques, elle augmente aussi le coût des ressources. La marge nette d'intérêt (NIM) est sous pression. Nous estimons une légère contraction de la NIM de -5 à -10 points de base pour le secteur en 2025.</p>
      <div class="my-6 p-4 border rounded-lg bg-card"><p class="text-card-foreground">Dans cette bataille, les banques disposant d'une large base de dépôts à vue (peu ou pas rémunérés) comme Attijariwafa et BCP, possèdent un avantage compétitif certain. Leur coût de ressource est structurellement plus faible.</p></div>

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">2. La Course à la Digitalisation et à l'Efficacité</h2>
      <p>La transformation digitale n'est plus une option. L'enjeu est désormais de traduire les investissements technologiques en gains d'efficacité, mesurés par le coefficient d'exploitation (CoEx). Un CoEx plus faible signifie une meilleure rentabilité.</p>
      <img src="https://picsum.photos/seed/chart2/800/400" data-ai-hint="bar chart" alt="Coefficient d'exploitation comparé des banques" class="my-6 rounded-lg shadow-md" />
      <p>CIH Bank, avec son modèle digital natif, continue de mener la danse sur l'efficacité. Pour les banques traditionnelles, le défi est de rationaliser leurs réseaux d'agences tout en améliorant l'expérience client digitale pour réduire les coûts opérationnels.</p>
      
      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">3. Qualité des Actifs et Coût du Risque</h2>
      <p>Avec le ralentissement économique et le coût élevé du crédit, le coût du risque est l'indicateur à surveiller de près. Un taux de créances en souffrance (NPL ratio) maîtrisé est un signe de bonne santé. Nous anticipons un coût du risque autour de 90-110 points de base pour le secteur, un niveau élevé mais maîtrisé.</p>
      
      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Conclusion : Quel Positionnement ?</h2>
      <p><strong>Attijariwafa Bank</strong> semble la mieux positionnée grâce à sa taille, sa diversification panafricaine et sa base de dépôts solide. <strong>BCP</strong> reste un acteur résilient avec un fort ancrage local. <strong>Bank of Africa</strong> présente un profil plus risqué mais un potentiel de redressement si sa stratégie africaine porte ses fruits. Les investisseurs devront privilégier les banques avec le meilleur coefficient d'exploitation et une gestion du risque prudente.</p>
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
      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Un Souffle Nouveau pour l'Immobilier</h2>
      <p>Après plusieurs années de morosité, le marché immobilier marocain donne des signes de frémissement en 2025. La combinaison d'une stabilisation des taux d'intérêt, des nouveaux programmes d'aide au logement et d'une demande latente semble créer un alignement des planètes favorable pour le secteur. Cependant, tous les acteurs ne sont pas logés à la même enseigne.</p>

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Les Catalyseurs du Secteur</h2>
      <ul>
          <li><strong>Programme d'aide au logement :</strong> Le programme gouvernemental visant à aider les primo-accédants (jusqu'à 100 000 DH d'aide) stimule directement la demande pour le logement social et moyen standing. Nous estimons que cela pourrait générer 70 000 à 100 000 transactions supplémentaires par an.</li>
          <li><strong>Effet Coupe du Monde 2030 :</strong> Les investissements massifs en infrastructures (stades, routes, hôtels) irriguent tout le secteur du BTP.</li>
      </ul>

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Analyse Comparative des Acteurs Clés</h2>
      <div class="overflow-x-auto my-6"><table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr><th scope="col" class="py-3 px-6">Acteur</th><th scope="col" class="py-3 px-6">Segment Clé</th><th scope="col" class="py-3 px-6">Forces</th><th scope="col" class="py-3 px-6">Défis</th></tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">Groupe Addoha</th>
                <td class="py-4 px-6">Économique & Social</td>
                <td class="py-4 px-6">Leader du segment, énorme réserve foncière, bénéficiaire direct des aides.</td>
                <td class="py-4 px-6">Maîtrise des marges, image de marque.</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">Groupe Alliances</th>
                <td class="py-4 px-6">Moyen & Haut Standing</td>
                <td class="py-4 px-6">Bilan assaini, repositionnement réussi, projets de qualité.</td>
                <td class="py-4 px-6">Moins exposé aux aides, sensibilité à la confiance des ménages aisés.</td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">TGCC</th>
                <td class="py-4 px-6">BTP (Construction)</td>
                <td class="py-4 px-6">Carnet de commandes record (+10 Mds DH), diversification (public/privé), exposition aux projets structurants.</td>
                <td class="py-4 px-6">Maîtrise des coûts des matières premières, exécution des grands chantiers.</td>
            </tr>
        </tbody>
      </table></div>
      
      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Conclusion : Quelle Stratégie d'Investissement ?</h2>
      <p>Le choix dépendra de l'appétit pour le risque :</p>
      <ul>
          <li><strong>Addoha :</strong> Un pari direct ("pure play") sur la reprise du logement économique, avec un potentiel de volume important mais des marges plus faibles.</li>
          <li><strong>Alliances :</strong> Une exposition à la reprise du haut de gamme, souvent plus rentable mais plus cyclique.</li>
          <li><strong>TGCC :</strong> Un pari plus large et diversifié sur la dynamique de l'investissement au Maroc. Son carnet de commandes offre une forte visibilité. C'est notre choix privilégié pour une exposition résiliente au secteur.</li>
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
      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">La Transition Énergétique Marocaine : Un Enjeu Stratégique</h2>
      <p>La stratégie énergétique du Maroc, visant plus de 52% de la capacité électrique installée à partir de sources renouvelables d'ici 2030, crée un terrain de jeu exceptionnel pour les acteurs du secteur. En 2025, deux champions se distinguent : Taqa Morocco, l'opérateur historique, et Nareva, la filiale du groupe Al Mada. Qui est le mieux positionné pour capter cette croissance ?</p>

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Taqa Morocco : La Stabilité et la Diversification</h2>
      <p>Taqa Morocco est le premier producteur privé d'électricité au Maroc, principalement via sa centrale thermique de Jorf Lasfar. Cette activité, basée sur des contrats PPA (Power Purchase Agreement) à long terme avec l'ONEE, lui assure des revenus stables et un dividende historiquement généreux (rendement souvent supérieur à 5%).</p>
      <p>Conscient des enjeux, Taqa a entamé une diversification stratégique :</p>
      <ul>
          <li><strong>Développement de parcs renouvelables :</strong> Objectif de 1000 MW de capacité renouvelable d'ici 2030.</li>
          <li><strong>Dessalement d'eau de mer :</strong> Un axe de croissance majeur. Le projet de Casablanca, plus grande station d'Afrique, est une pierre angulaire qui garantira des revenus récurrents pour les 30 prochaines années.</li>
      </ul>
      <div class="my-6 p-4 border-l-4 border-primary bg-card"><p class="text-card-foreground"><strong>Profil d'investisseur :</strong> Idéal pour l'investisseur en quête de <strong>rendement et de visibilité</strong>. C'est une valeur défensive, moins volatile que le reste du marché.</p></div>

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Nareva Holding : Le Pure-Player de la Croissance Verte</h2>
      <p>Filiale du holding royal Al Mada, Nareva (non cotée directement, mais son écosystème l'est) s'est positionné comme un acteur majeur des renouvelables. Le groupe opère certains des plus grands parcs éoliens d'Afrique (Tarfaya, Aftissat) et développe des projets solaires et hydrauliques.</p>
      <img src="https://picsum.photos/seed/chart3/800/400" data-ai-hint="pie chart" alt="Répartition des capacités énergétiques" class="my-6 rounded-lg shadow-md" />
      <p><strong>Forces de Nareva :</strong></p>
      <ul>
          <li><strong>Un portefeuille 100% vert :</strong> Parfaitement aligné avec la stratégie nationale et les critères ESG des investisseurs internationaux.</li>
          <li><strong>Projets d'envergure :</strong> Le groupe est impliqué dans des projets structurants, y compris l'hydrogène vert.</li>
      </ul>
      <div class="my-6 p-4 border-l-4 border-accent bg-card"><p class="text-card-foreground"><strong>Profil d'investisseur :</strong> L'écosystème Nareva représente un pari sur la <strong>croissance pure</strong>. Le potentiel de plus-value est plus important, mais avec une volatilité plus forte et des dividendes incertains à court terme.</p></div>

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Verdict pour 2025</h2>
      <p>Le choix dépend du profil de risque. <strong>Taqa Morocco</strong> est une excellente valeur de fond de portefeuille pour son dividende robuste et sa nouvelle histoire de croissance dans l'eau. Pour une exposition à la croissance pure des énergies vertes, il faudra se tourner vers d'autres acteurs de l'écosystème ou attendre de futures introductions en bourse. Une stratégie mixte combinant les deux profils peut être judicieuse.</p>
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
      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">HPS : Une Pépite Technologique à la Conquête du Monde</h2>
      <p>Hightech Payment Systems (HPS) est l'une des rares véritables success stories technologiques de la Bourse de Casablanca. Sa plateforme PowerCARD est utilisée par plus de 450 institutions dans 90 pays. En 2025, l'entreprise se trouve à un point d'inflexion, entre une croissance structurelle forte et des investissements importants qui pèsent sur les marges à court terme.</p>

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Le Moteur de Croissance : la Digitalisation des Paiements</h2>
      <p>Le marché de HPS est structurellement porteur. La transition du cash vers le paiement digital s'accélère, particulièrement sur les marchés émergents. Le volume de transactions électroniques en Afrique et au Moyen-Orient devrait croître de <strong>plus de 15% par an</strong> jusqu'en 2030.</p>
      <p>HPS est positionnée pour capter cette croissance grâce à sa solution PowerCARD, qui couvre toute la chaîne de valeur :</p>
      <ul>
        <li>Émission de cartes (physiques et virtuelles)</li>
        <li>Acquisition de transactions e-commerce et TPE</li>
        <li>Gestion de portefeuilles mobiles (wallets)</li>
        <li>Switching monétique national et international</li>
      </ul>
      <img src="https://picsum.photos/seed/chart4/800/400" data-ai-hint="flow chart" alt="Chaîne de valeur du paiement" class="my-6 rounded-lg shadow-md" />

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">La Stratégie "Accélérer" : Investir pour Grandir</h2>
      <p>HPS a récemment intensifié ses investissements (R&D, marketing, recrutements) pour maintenir son avance technologique et accélérer sa conquête de marché. Cette stratégie a un coût : la marge opérationnelle a reculé, passant de plus de 20% historiquement à environ 15% en 2024. Le marché attend en 2025 les premiers fruits de ces investissements sous forme d'une accélération de la croissance du chiffre d'affaires (objectif de +15-20%). La signature de nouveaux contrats de grande envergure (Tier-1 banks) sera le principal catalyseur à surveiller.</p>

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Valorisation et Risques</h2>
      <p>En tant que valeur de croissance, HPS se paie cher, avec un PER (Price-to-Earnings Ratio) souvent supérieur à 30x. Cette valorisation intègre déjà des perspectives de croissance élevées. Le principal risque est un décalage dans la concrétisation des nouveaux contrats, ce qui mettrait la pression sur le titre. La concurrence de géants comme Temenos ou de startups agiles reste également un défi constant.</p>

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Conclusion pour l'Investisseur</h2>
      <p>Investir dans HPS est un pari sur la capacité du management à exécuter sa stratégie de croissance. Si l'entreprise réussit à transformer ses investissements en chiffre d'affaires additionnel, le potentiel de revalorisation est important. Le titre est destiné aux investisseurs patients, avec un horizon de temps long, et qui acceptent la volatilité inhérente aux valeurs technologiques.</p>
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
      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Risma : Au Cœur du Rebond Touristique Marocain</h2>
      <p>Le secteur touristique marocain a connu un rebond spectaculaire, dépassant les 14.5 millions d'arrivées en 2023, et la dynamique se poursuit en 2024/2025. Risma, premier opérateur touristique coté et partenaire d'Accor, est en première ligne. Mais comment cela se traduit-il dans les chiffres ?</p>
      
      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Des Indicateurs Opérationnels au Zénith</h2>
      <p>Les indicateurs clés (KPIs) de Risma montrent une forte amélioration :</p>
      <ul>
        <li><strong>Taux d'occupation (TO) :</strong> Nous l'estimons à 68% en 2024, dépassant le niveau de 2019 (65%).</li>
        <li><strong>Prix moyen par chambre (ADR) :</strong> En hausse de plus de 15% par rapport à 2019, grâce à l'inflation et à une stratégie de montée en gamme.</li>
        <li><strong>RevPAR (Revenu par chambre disponible) :</strong> En croissance de plus de 20% vs 2019, il est le véritable moteur de la rentabilité.</li>
      </ul>
      <img src="https://picsum.photos/seed/chart5/800/400" data-ai-hint="line chart trends" alt="Évolution du RevPAR de Risma" class="my-6 rounded-lg shadow-md" />

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Stratégie : Rénovation et Désendettement</h2>
      <p>La stratégie de Risma pour 2025 repose sur deux piliers :</p>
      <ol>
        <li><strong>Montée en gamme :</strong> Le programme de rénovation de 1.1 milliard de dirhams se poursuit. La transformation d'hôtels sous des marques premium (Sofitel, MGallery, Mövenpick) permet de justifier des prix plus élevés et d'attirer une clientèle internationale.</li>
        <li><strong>Gestion de la dette :</strong> C'est le point de vigilance majeur. L'endettement net s'élevait à près de 4 Mds de DH. La génération de cash-flow solide grâce à la bonne performance opérationnelle est cruciale pour réduire ce fardeau, surtout dans un contexte de taux d'intérêt élevés.</li>
      </ol>
      
      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Valorisation et Perspectives</h2>
      <p>Malgré la forte reprise, le titre Risma a sous-performé le marché, se négociant toujours en dessous de sa valeur d'actif net réévalué (ANR). Cette décote s'explique par la crainte des investisseurs concernant le niveau de la dette.</p>
      <div class="my-6 p-4 border-l-4 border-primary bg-card"><p class="text-card-foreground">Nous pensons que cette décote est excessive. Si Risma démontre une trajectoire claire de désendettement dans ses publications de 2025, un rattrapage boursier significatif est possible. Le potentiel est réel, mais conditionné par la discipline financière.</p></div>

      <h2 class="font-headline text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p>Risma offre une histoire de "recovery" (rétablissement) claire et une exposition directe à la thématique porteuse du tourisme marocain (CAN 2025, Coupe du Monde 2030). Pour l'investisseur, le point d'entrée actuel semble attractif, mais il faudra surveiller attentivement les publications sur le niveau d'endettement. C'est une valeur à potentiel pour un investisseur patient.</p>
    `
  },
];
