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
    ]
}

$(onPageLoad);