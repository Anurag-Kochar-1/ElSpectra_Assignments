const fs = require("fs")

const inputJson = fs.readFileSync('./data/catsData.json')
const skillsData = JSON.parse(inputJson);

function getRank(dataFile) {
    const skills = dataFile.skills_capabilities;
    const skills_2019_sorted = skills.map((skill) => skill).sort((a, b) => parseFloat(b.score_2019) - parseFloat(a.score_2019));
    const skills_2024_sorted = skills.map((skill) => skill).sort((a, b) => parseFloat(b.score_2024) - parseFloat(a.score_2024));

    return {
        ranking_2019: skills_2019_sorted,
        ranking_2024: skills_2024_sorted,
    }


}

console.log(getRank(skillsData))