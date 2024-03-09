import puppeteer, {ElementHandle} from "puppeteer";

type ADJECTIVE_CATEGORY = "い" | "な";

const I_CATEGORY: ADJECTIVE_CATEGORY = "い";
const NA_CATEGORY: ADJECTIVE_CATEGORY = "な";

const adjectivesCategoryIDByTypes = {
    [I_CATEGORY]: 4,
    [NA_CATEGORY]: 5
};

await main();

async function main() {
    const adjectives = [];

    // Open the browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const [adjectiveCategory, categoryID] of Object.entries(adjectivesCategoryIDByTypes)) {
        let pageNumber = 1;

        while (true) {
            // Compose URL
            const url = `https://www.gavo.t.u-tokyo.ac.jp/ojad/search/index/category:${categoryID}/limit:100/page:${pageNumber}`;

            // Browse to the url
            const response = await page.goto(url);

            // Check if response is 404
            if (!response!.ok()) {
                break;
            }

            // Steal data
            const tableRows = await page.$$('#word_table tbody tr');

            // Extract data from raw DOM elements
            for (const tableRow of tableRows) {
                const kanji = await extractKanji(tableRow);

                // Get hiragana
                let kana = await extractKana(tableRow);

                if (adjectiveCategory === NA_CATEGORY && kana[kana.length - 1] !== NA_CATEGORY) {
                    kana += NA_CATEGORY;
                }

                // Save them locally
                adjectives.push({
                    kanji,
                    kana,
                    category: adjectiveCategory,
                });
            }

            // Go to next page
            pageNumber++;
        }
    }

    await browser.close();

    await Bun.write('./public/adjectives.json', JSON.stringify(adjectives));

}

async function extractKanji (row: ElementHandle) {
    const rawDomElement = await row.$('p.midashi_word');

    // Get text
    let kanji = await (await rawDomElement!.getProperty('textContent')).jsonValue();

    // Replace [な] with な if the adjective is of the "na" category
    kanji = kanji.replace(`[${NA_CATEGORY}]`, NA_CATEGORY);

    // Get the adjective without other stuffs
    return kanji.split("・")[0];
}

async function extractKana (row: ElementHandle) {
    let kana = "";

    // Get single kanas
    const singleKanasElements = await row.$$('.katsuyo_jisho_js span.char');

    // Foreach kanas elements obtain the text content and append it to the string
    for (const singleKanaElement of singleKanasElements) {
        const text = await (await singleKanaElement.getProperty('textContent')).jsonValue();
        kana += text;
    }

    return kana;
}
