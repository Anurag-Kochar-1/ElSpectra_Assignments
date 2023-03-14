const fs = require("fs")
const readline = require('readline');


const inputJson = fs.readFileSync('./data/catsData.json')
const skillsData = JSON.parse(inputJson);

const sortedCapabilities2019 = skillsData.skills_capabilities.map((skill) => skill).sort((a, b) => {
    return parseFloat(b.score_2019) - parseFloat(a.score_2019);
});

const sortedCapabilities2024 = skillsData.skills_capabilities.map((skill) => skill).sort((a, b) => {
    return parseFloat(b.score_2024) - parseFloat(a.score_2024);
});

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


function getTop3(year = 2019) {
    if (year === 2019) return sortedCapabilities2019.splice(0, 3)
    if (year === 2024) return sortedCapabilities2024.splice(0, 3)
}
// console.log(getTop3(2019))

function getBottom3(year) {
    if (year === 2019) return sortedCapabilities2019.splice(-3)
    if (year === 2024) return sortedCapabilities2024.splice(-3)
}
// console.log(getTop3(2024))


const sortedGrowth = skillsData.skills_capabilities.sort((a, b) => {
    const growthA = parseInt(a.score_2024) - parseInt(a.score_2019);
    const growthB = parseInt(b.score_2024) - parseInt(b.score_2019);
    return growthB - growthA;
});

const top3Accelerating = sortedGrowth.map(c => c).slice(0, 3);
// console.log(top3Accelerating)

const top3Decelerating = sortedGrowth.map(c => c).slice(-3);
// console.log(top3Decelerating)
