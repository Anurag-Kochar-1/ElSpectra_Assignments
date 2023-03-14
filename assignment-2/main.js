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
// console.log(getRank(skillsData))


function getTop3(dataFile) {
    const skills = dataFile.skills_capabilities;
    const top_3_2019 = skills.map((skill) => skill).sort((a, b) => parseFloat(b.score_2019) - parseFloat(a.score_2019)).splice(0, 4).map((skill) => skill.name)
    const top_3_2024 = skills.map((skill) => skill).sort((a, b) => parseFloat(b.score_2024) - parseFloat(a.score_2024)).splice(0, 4).map((skill) => skill.name)

    return {
        top_3_2019_capabilities: top_3_2019,
        top_3_2024_capabilities: top_3_2024,

    }
}

function getBottom3(dataFile) {
    const skills = dataFile.skills_capabilities;
    const bottom_3_2019 = skills.map((skill) => skill).sort((a, b) => parseFloat(a.score_2019) - parseFloat(b.score_2019)).splice(0, 4).map((skill) => skill)
    const bottom_3_2024 = skills.map((skill) => skill).sort((a, b) => parseFloat(a.score_2024) - parseFloat(b.score_2024)).splice(0, 4).map((skill) => skill)

    return {
        bottom_3_2019_capabilities: bottom_3_2019,
        bottom_3_2024_capabilities: bottom_3_2024,

    }
}
// console.log(getBottom3(skillsData))

