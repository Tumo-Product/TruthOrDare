const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let replays = 0;

const onPageLoad = async () => {
    $(".wideBtn").click(async function () {
        let type = $(this).attr("id");
        $("#dare").addClass(`offscreenDare`);
        $("#truth").addClass(`offscreenTruth`);

        await timeout(500);
        $("#spinner").removeClass("closed");
        let info        = data[type];
        let timer       = 0;
        let currentWord = Math.floor(Math.random() * info.length) - 30;

        for (let i = currentWord; i < currentWord + 30; i++) {
            $("#spinner p").text(getWord(i, info));
            await timeout(easeOutQuad(timer) * 130);
            timer = timer + (1/30);
            if (timer > 1) timer = 1;
        }

        replays++;
        if (replays < 2)
            $("#replay").removeClass("goUnder");
    });

    loader.toggle();
}

const replay = async () => {
    $("#replay").attr("onclick", "");
    setTimeout(() => { $("#replay").attr("onclick", "replay()"); }, 500); // cooldown.

    $("#spinner").addClass("closed");
    await timeout(500);
    $(".wideBtn").removeClass("offscreenDare offscreenTruth");
    $("#replay").addClass("goUnder");
}

const easeOutQuad = (x) => {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

const getWord = (newIndex, info) => {
    let length  = info.length;
    newIndex    %= length;
    
    if (newIndex < 0) {
        newIndex = length + newIndex;
    }
    else if (newIndex == length) {
        newIndex = 0;
    }

    return info[newIndex];
}


let data = {
    truth: [
        "Combien de fois par semaine achètes-tu une bouteille d'eau en plastique ? Recherche en ligne combien de ces bouteilles sont achetées chaque année.",
        "Recherche en ligne les 6R et nomme-les. Quels sont ceux que tu utilises le plus ?",
        "Selon toi, quelle action conserve le plus d'énergie à l'intérieur de ton habitation? Après avoir fourni une réponse, compare-la à celles que tu trouves en ligne.",
        "Parmi les différents types de pollution (air, eau, son, lumière et sol), le(s)quelle(s) penses-tu produire le plus et pourquoi ?",
        "Peux-tu citer un ou plusieurs puits de carbone? Si la réponse est non, fais des recherches puis explique ce que sont les puits de carbone à tes camarades.",
        "Peux-tu citer des exemples d'architecture verte ? Dans le cas contraire, trouve des exemples en ligne et explique à tes camarades en quoi ils représentent des modèles d'architecture verte.",
        "La dernière fois que tu es sorti·e de la ville, quel type de transport as-tu utilisé ? Était-ce le moyen de transport le plus écologique ? Pourquoi ?",
        "À quelle fréquence toi ou ta famille conservez-vous les restes de nourriture au lieu de les jeter ? Pensez-vous que vous pourriez le faire plus souvent ?",
        "Que penses-tu des régimes végétariens ou véganes ? Regarde ces régimes de plus près et établis les “pour et contre” d’un plat ou d’un régime sans viande ou source animale.",
        "Pourquoi penses-tu que tant de nourriture est perdue ou gaspillée dans le monde ? Peux-tu imaginer des solutions pour résoudre ce problème ?",
        "À quelle fréquence termines-tu ton assiette ? Que fais-tu des restes lorsqu'il y en a ?",
        "À quelle fréquence marches-tu au lieu de prendre les transports publics lorsque tu te déplaces dans ton quartier?",
        "Que penses-tu franchement des espaces verts dans ta ville tels que les jardins publics, les squares, les balcons verts, les murs végétaux et autres ?",
        "Tu marches dans la rue et tu tombes nez à nez avec un déchet sur le trottoir. Honnêtement que fais-tu? Qu’en est-il si le déchet en question est un masque de protection contre la covid-19 ?",
        "Ton sweatshirt préféré a un trou au niveau de l'aisselle droite qui s’agrandit à chaque fois que tu le portes. Si ça continue, la manche finira par tomber. Que décides-tu de faire avec ce sweatshirt?",
        "Il y a une discussion concernant l'avenir d'un terrain dans ton quartier. Certain·es veulent le transformer en logement, d'autres en commerce ou magasin, d'autres veulent en faire un espace vert, comme un parc ou un jardin communautaire. Personne n'arrivant à se décider, on te laisse la décision finale. Laquelle de ces options choisis-tu et pourquoi?",
        "Explique la différence entre les déchets solides, les déchets liquides, les déchets organiques, les déchets alimentaires, les déchets toxiques et les déchets électroniques. Si tu n'es pas sûr·e, recherche-les en ligne et discutes-en avec ton groupe par la suite. ",
        "Selon toi, pourquoi la réduction des émissions de carbone est importante ? Que penses-tu des conséquences si les niveaux élevés d'émissions de carbone continuent ? Si tu n'es pas sûr·e, fais des recherches sur la question avant de présenter ta réponse au groupe.",
        "Penses-tu que ta génération émet moins de gaz à effet de serre dans l'atmosphère que celle de tes parents ou même de tes grands-parents ? Explique pourquoi en examinant les empreintes carbone.",
        "As-tu déjà essayé de sensibiliser quelqu'un à propos du changement climatique ? Si oui, de quoi as-tu parlé ? Et si non, pourquoi ? Regarde si tu peux penser à certains des défis qui se posent lorsqu'on essaie de sensibiliser quelqu'un sur ce sujet. Enregistre tes réponses dans une vidéo et télécharge-la en utilisant notre outil.",
        "Combien de fois recharges-tu ton téléphone par jour ? Fais des recherches pour savoir combien d'énergie est utilisée pour charger ton portable et présente ces informations à ton groupe. Prends une vidéo et télécharge tes réponses.",
        "Quel est ton espace vert préféré dans la ville et pourquoi ? Si tu n’en as pas, fais des recherches et trouve des endroits qui te semblent intéressants. Y a-t-il des zones à Paris qui, selon toi, ont besoin de plus d'espaces verts ? Filme ta réponse et télécharge-la dans notre outil.",
        "Quand as-tu acheté de nouveaux vêtements la dernière fois et où ? Penses-tu que tu pourrais réduire le nombre de vêtements que tu achètes ? Ou si cela a été nécessaire, as-tu acheté dans un endroit qui minimise l’impact environnemental de ces achats ? Enregistre ta réponse sous forme de vidéo, présente-la à ton groupe et télécharge-la dans l'outil.",
        "As-tu jamais pollué un espace vert au milieu urbain ou rural ? Comment changerais-tu ta décision maintenant ? Télécharge une vidéo de ta réponse.",
        "Comment penses-tu réduire, à ton échelle, l'impact de la mode sur l'environnement ? Fais des recherches avant de répondre à cette question. Filme ta réponse et télécharge-la dans l'outil.",
        "Comment penses-tu réduire, à ton échelle, l’empreinte environnementale des appareils et usages du numérique ? Fais des recherches avant de répondre et télécharge ta réponse vidéo dans l’outil.",
        "La plupart des téléphones indiquent le temps que nous passons sur chaque application. Combien de temps passes-tu habituellement sur les réseaux sociaux par jour ? Fais des recherches pour voir à combien d'émissions de gaz à effet de serre cela correspond et comment diminuer ton utilisation des réseaux sociaux. Présente-les à ton groupe. Assure-toi que quelqu'un prenne une vidéo de ta réponse pour la télécharger dans l'outil.",
        "As-tu déjà sensibilisé des personnes aux avantages de la végétalisation des zones urbaines ? Si oui, qu'as-tu fait, et si non, pourquoi ? Enregistre une vidéo de ta réponse, présente-la à ton groupe et n'oublie pas de la télécharger dans notre outil.",
        "Selon toi, quel est le meilleur moyen de sensibiliser aux problèmes liés au climat et pourquoi ? Demande à quelqu'un d'enregistrer ta réponse et télécharge la vidéo.",
        "Si tu penses être sensibilisé aux enjeux climatiques, explique comment tu as été sensibilisé et comment tu as eu un déclic pour passer à l’action. Demande à quelqu'un d'enregistrer ta réponse et télécharge la vidéo. "
    ],
    dare: [
        "Trouvez trois personnes et demandez-leur si elles peuvent nommer les 6 R. Un membre du groupe peut filmer l’interview pendant qu’un·e autre pose la question. Si les personnes interviewées ne connaissent pas les 6 R, expliquez-leur en détail.",
        "Aborde la première personne que tu vois et qui ne fait pas partie de ton groupe et explique-leur les dangers de la pollution lumineuse pendant que ton ou ta partenaire filme l'interaction, puis changez les rôles. Faites vos recherches à l'avance et filmez le tout !",
        "À l'aide de ton téléphone portable, balade-toi dans l'enceinte de TUMO et identifie les objets à forte, moyenne ou faible consommation d'énergie. Étiquette chaque objet avec un post-it que les autres pourront lire. Télécharge les photos des post-it lorsque tu as terminé.",
        "Pendant les dix prochaines minutes, collecte autant de déchets recyclables que possible dans les différents espaces de TUMO et auprès de différentes personnes. Prends-les en photo puis place-les dans les poubelles correspondantes, si aucun de ces déchets ne peut être réutilisé ou réparé.",
        "Recherche tout ce qui peut être recyclé dans ta ville. Qu'est-ce qui ne peut pas l'être ? Cela change-t-il selon les villes ? Télécharge les photos que tu trouves en ligne.",
        "Demande aux cinq premières personnes que tu croises et qui ne font pas partie de ton groupe de nommer un type de transport qui ne fonctionne pas aux combustibles fossiles, puis note leurs réponses.",
        "Trouve quatre sources de pollution en dehors du bâtiment TUMO. Il peut s'agir du pot d'échappement d'une voiture, des lampadaires qui créent une pollution lumineuse ou des équipements de construction qui produisent une pollution sonore. Prends des photos et télécharge-les.",
        "Recherche trois façons de réduire la quantité de pollution sonore que tu produis et présente-les à un groupe assis à côté de toi. N'oublie pas d'enregistrer la présentation !",
        "Faites une liste de tous les avantages et inconvénients du recyclage de nos déchets auxquels vous pouvez penser et dites-les face caméra avec un accent amusant !",
        "Fais un dessin qui représente la quantité de plastique que nous jetons dans l'océan chaque jour et montre-la au groupe. Filme l'image et les réactions du groupe puis télécharge le tout.",
        "Attends à côté du bac de recyclage le plus proche et tope la main de tous ceux et de toutes celles qui recyclent pendant dix minutes. Si tu parviens à convaincre la personne de réutiliser l'article au lieu de le recycler ou de le jeter, tope-leur deux fois la main ! Filme le processus et télécharge la vidéo.",
        "Imagine que tu viens de gagner un prix pour ton travail sur le changement climatique. Donne un discours devant votre groupe sur ce que tu prévois de faire pour l'avenir. Filme le discours et télécharge le fichier.",
        "​​Demande à ton ou ta partenaire de faire du beatbox pendant que tu rappes Filmez et téléchargez la séquence.",
        "Trouve un élément au sein du bâtiment TUMO qui pourrait être considéré comme architecture verte, puis prends un selfie marrant avec. Télécharge le selfie.",
        "Vide ton sac de cours et prends une photo des articles qui peuvent être recyclés, réutilisés ou qui devraient être réduits. Télécharge chaque photo.",
        "Appelle un de tes parents ou un·e ami·e et explique-leur ce qu'est un réservoir de carbone. Filme l'appel.",
        "Explique à ton groupe ce qu'est une source de carbone sans utiliser les mots « carbone » ou « source ». Filme ton discours.",
        "Imite ta star préférée en train d’expliquer ce qu’est l’empreinte carbone. Filme et télécharge la vidéo. ",
        "Sur Twitter, Facebook ou toute autre plateforme de réseaux sociaux, publie un message qui sensibilise les gens à la mode rapide. Fais une capture d'écran du message pour le télécharger dans l'outil.",
        "Regarde maintenant l'étiquette de ta chemise. Fais des recherches et présente à ton groupe des informations sur la façon dont la chemise a probablement été fabriquée. Inclue des informations telles que l'endroit de la fabrication, ton opinion si elle peut être qualifiée de fast ou slow fashion, et les matériaux utilisés. Prends une photo de l'étiquette pour la télécharger avec une description des informations que tu as pu trouver.",
        "Marche dans le couloir et parle à la première personne rencontrée de la quantité d'énergie utilisée lorsqu'elle fait défiler Instagram. Demande à quelqu'un·e de ton groupe de prendre une vidéo de l'interaction.",
        "Va dehors et essaye de trouver au moins 5 exemples d'espaces verts à photographier. Télécharge les photos de chaque exemple pour montrer à tes camarades.",
        "Va dehors et décrit le premier animal, champignon et végétal que tu rencontres. Fais une brève recherche pour expliquer pour ce qu’il ou elle est et si elle dispose d’un habitat adapté en ville. Fais une vidéo de cette rencontre et de cette restitution.",
        "Trouve un fait intéressant, surprenant ou inquiétant sur le changement climatique. Lève-toi devant la salle et annonce ce fait à tes camarades. Demande à un membre de ton groupe d'enregistrer l'interaction et de télécharger la vidéo.",
        "Prends quelques minutes pour écrire une chanson de rap sur la mode rapide. Demande à un membre de ton groupe de faire du beatbox pour toi et à un·e autre d'enregistrer une vidéo de la chanson. Télécharge-la dans l'outil ci-dessous.",
        "Appelle un parent ou un·e ami·e et discute avec lui comment nous pouvons réduire la quantité de déchets vestimentaires que nous produisons. Assure-toi que quelqu'un·e de ton groupe filme la conversation. Télécharge la vidéo dans l'outil ci-dessous.",
        "Imagine que tu viens de gagner un prix pour un article sur l'impact environnemental de nos appareils électroniques. Fais un discours devant ton groupe sur ce que tu comptes faire à l'avenir. Enregistre le discours et télécharge la vidéo.",
        "Va vers la première personne que tu vois et qui ne fait pas partie de ton groupe et demande-lui où se trouve son espace vert préféré à Paris, puis donne-lui des informations sur les avantages des espaces verts en milieu urbain. Demande à un·e partenaire de filmer l'interaction et télécharge la vidéo ci-dessous.",
        "Balade toi en ville et arrête toi au premier espace vert que tu croises. Arrête la première personne que tu vois et demande lui si elle connais une espèce présente dans cet endroit, ou si elle trouve cet endroit plus agréable que des zones non-végétalisées.",
        "Fais une imitation de ta célébrité préférée pour présenter comment nous pouvons réduire l'empreinte carbone de nos appareils numériques. Assure-toi que quelqu'un·e enregistre ta performance pour la télécharger dans notre outil."
    ]
}

$(onPageLoad);