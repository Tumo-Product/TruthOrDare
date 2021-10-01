const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let currentWord = 0;

const onPageLoad = async () => {
    $(".wideBtn").click(async function () {
        let type = $(this).attr("id");
        $(this).attr("disabled", true).css("pointer-events", "none");
        $("#dare").addClass(`offscreenDare`);
        $("#truth").addClass(`offscreenTruth`);

        await timeout(600);

        $("#spinner").removeClass("closed");
        let timer = 0;
        let info  = data[type];
        currentWord = Math.floor(Math.random() * info.length);
        currentWord -= 30;
        for (let i = currentWord; i <= currentWord + 30; i++) {
            $("#spinner p").text(getWord(i, info));
            await timeout(easeOutQuad(timer) * 100);
            timer = timer + (1/30);
            if (timer > 1) timer = 1;
        }
    });

    loader.toggle();
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
    dare: [
        "dxrea 1",
        "dard s2",
        "dzre 3",
        "darb 4",
        "dqrsasf 5",
        "daqeasf 6",
        "dane opakfs7",
    ],
    truth: [
        "troth 1",
        "trytha 2",
        "trute 3",
        "trutqq 4",
        "truthaga 5",
        "truthsf 6",
        "trutah 7",
    ]
}

$(onPageLoad);