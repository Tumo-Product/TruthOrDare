const view = {
    correct: 0,
    row: `<div class="row"></div>`,
    
    fitText: (parent, offset, yOffset) => {
        if (offset == undefined) offset = 0;
        if (yOffset === undefined) {
            yOffset = 22;
        }
        console.log(yOffset);

		$(parent).each(function () {
			let size;
            let paragraph = $(this).find("p");

			while (paragraph.prop("scrollWidth") > $(this).width() - offset || paragraph.prop("scrollHeight") > $(this).height() - yOffset) {
				size = parseInt(paragraph.css("font-size"), 10);
				paragraph.css("font-size", size - 2);
			}
		});
	},
}