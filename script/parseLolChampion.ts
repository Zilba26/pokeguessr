import * as cheerio from "cheerio";
import fs from "fs/promises";
import path from "path";

function parseLvl1Value(raw: string | undefined): number | null {
    if (!raw) return null;

    // Nettoyage
    const text = raw.replace(/\s+/g, " ").trim();

    // Cas "665 – 2710.16" → 665
    if (text.includes("–")) {
        return parseFloat(text.split("–")[0].trim());
    }

    // Cas "200%", "24.968%"
    if (text.endsWith("%")) {
        return parseFloat(text.replace("%", ""));
    }

    return parseFloat(text);
}

const STAT_MAP: Record<string, string> = {
    HP: "hp",
    MP: "mp",
    HP5: "hp5",
    MP5: "mp5",
    AR: "ar",
    MR: "mr",
    AD: "ad",
    "Crit. DMG": "critDmg",
    MS: "ms",
    "Attack range": "attackRange",

    "Base AS": "baseAs",
    "AS ratio": "asRatio",
    "Windup%": "windupPercent",
    "Bonus AS": "bonusAs",

    "Gameplay radius": "gameplayRadius",
    "Select. radius": "selectionRadius",
    "Pathing radius": "pathingRadius",
    "Select. height": "selectionHeight",
    "Acq. radius": "acquisitionRadius"
};


async function parseChampions(lang: string = "en-us") {

    const url = `https://wiki.leagueoflegends.com/${lang}/List_of_champions`;
    const outputPath = path.join(process.cwd(), "src", ".generated", `champions-${lang}.json`);

    try {
        const res = await fetch(url);
        const html = await res.text();

        const $ = cheerio.load(html);

        const champions = [];

        // Le tableau des champions sur le wiki contient les colonnes principales
        const rows = $(".article-table tbody tr");
        for (let index = 0; index < rows.length; index++) {
            const row = rows.eq(index);
            const cells = row.find("td");
            if (cells.length >= 3) {
                const a = cells.eq(0).find("a");
                const name = a
                    .contents()
                    .filter((_, el) => el.type === "text")
                    .first()
                    .text()
                    .trim();
                const link = a.attr("href") ? `https://wiki.leagueoflegends.com${a.attr("href")}` : `https://wiki.leagueoflegends.com/${lang}/${name.replace(/\s+/g, "_")}`;

                // Parse the link to get others info

                const res2 = await fetch(link);
                const html2 = await res2.text();
                const $2 = cheerio.load(html2);
                const championInfo = $2(".champion-info");
                const championUpd = championInfo.find(".champion-upd");
                const championStats = championInfo.find(".type-champion-stats");

                const role = championUpd.find(".infobox-section-cell").find('[data-tip]').first().find("a").last().text().trim();
                const storePriceBlock = championUpd.find(".infobox-section-cell")
                    .find("span")
                    .filter((_, el) => $(el).text().trim() === "Store price:")
                    .parent();

                const [bePrice, rpPrice] = storePriceBlock.find("a").map((_, a) => {
                    return parseInt($(a).text().trim(), 10);
                }).get().filter((price) => !isNaN(price));

                const style = parseInt(
                    championUpd.find(".champion_style span[title]")
                        .filter((_, el) => /^\d+$/.test($(el).attr("title") ?? ""))
                        .attr("title") ?? "-1",
                    10
                );

                const difficultyTitle = championUpd.find(".infobox-section-cell")
                    .find('div[title^="This champion has a difficulty rating of"]')
                    .attr("title");

                const difficulty = parseInt(
                    difficultyTitle?.match(/\d+/)?.[0] ?? "-1",
                    10
                );


                let releaseDate, lastChanged, classs, legacyClasses, resource, rangeType, adaptiveType;
                championUpd.find(".infobox-data-row.championbox").each((_, row) => {
                    const label = $(row)
                        .find(".infobox-data-label")
                        .text()
                        .trim();

                    const value = $(row).find(".infobox-data-value");

                    switch (label) {
                        case "Release date":
                            releaseDate = value.text().trim();
                            break;
                        case "Last changed":
                            lastChanged = value.text().trim();
                            break;
                        case "Class":
                            classs = value
                                .find("a")
                                .map((_, a) => $(a).text().trim())
                                .get()
                                .filter((c) => c.length > 0);
                            break;

                        case "Legacy class":
                            legacyClasses = value
                                .find("a")
                                .map((_, a) => $(a).text().trim())
                                .get()
                                .filter((c) => c.length > 0);
                            break;

                        case "Resource":
                            resource = value.find("a").last().text().trim();
                            break;

                        case "Range type":
                            rangeType = value.find("a").last().text().trim();
                            break;

                        case "Adaptive type":
                            adaptiveType = value.find("a").last().text().trim();
                            break;
                    }
                });


                const stats: Record<string, any> = {};

                championStats.find(".infobox-data-row")
                    .each((_, row) => {
                        const label = $(row)
                            .find(".infobox-data-label")
                            .text()
                            .replace(/\s+/g, " ")
                            .trim();

                        const key = STAT_MAP[label];
                        if (!key) return;

                        const rawValue = $(row)
                            .find(".infobox-data-value")
                            .text();

                        stats[key] = parseLvl1Value(rawValue);
                    });



                // Ajout au tableau
                champions.push({
                    id: index + 1,
                    name,
                    role,
                    bePrice,
                    rpPrice,
                    style,
                    difficulty,
                    releaseDate,
                    lastChanged,
                    class: classs,
                    legacyClasses,
                    resource,
                    rangeType,
                    adaptiveType,
                    stats
                });
                if ((index + 1) % 10 === 0) console.log(`✓ ${new Date().toISOString()} ${index + 1} champions parsed...`);
            }
        }

        // Ensure directory exists
        await fs.mkdir(path.dirname(outputPath), { recursive: true });

        await fs.writeFile(
            outputPath,
            JSON.stringify(champions, null, 2),
            "utf-8"
        );

        console.log(`✓ ${champions.length} champions scraped and saved to ${outputPath}`);

    } catch (err) {
        console.error("Erreur lors du scraping :", err);
        process.exit(1);
    }
}

parseChampions();
