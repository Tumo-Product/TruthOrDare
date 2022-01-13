const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let replays = 0;
let data = {};

const onPageLoad = async () => {
    data = await network.getData();

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

$(onPageLoad);