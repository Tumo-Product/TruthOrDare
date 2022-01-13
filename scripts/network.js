const network = {
    getData: async () => {
        let url = new URL(document.location.href);
        let lang = url.searchParams.get("lang");
        let name = url.searchParams.get("name");
        let getString = `data/${lang}/${name}.json`;
        let data = {};

        if (lang === null || name == null) {
            await $.get(`data/FR/first.json`, function (json) { data = json; });
        } else {
            await $.get(getString, function (json) { data = json; });
        }

        return data;
    }
}