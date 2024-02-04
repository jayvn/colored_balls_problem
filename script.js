let balls = ["G", "G", "G", "S", "S", "S"];
let ballsNum = [[1, 2], [3, 4], [5, 6]];
let ballsFlattened = balls.flat();
let cumulativeResults = {}
let pickButton = document.getElementById("pick");

pickButton.addEventListener("click", pickRandomly);


function pickRandomly(auto = false) {
    let timeOut1 = 1500;
    let timeOut2 = 2 * timeOut1;
    pickButton.disabled = true
    pickButton.classList.add('disabledButton');

    let { ball1, ball2 } = pickBalls();
    let ball1Id = `ball-${ball1}`
    let ball2Id = `ball-${ball2}`

    console.log(ball1Id, ball2Id)
    document.getElementById(ball1Id).classList.add('highlight');
    setTimeout(() => {
        document.getElementById(ball2Id).classList.add('highlight2');
    }, timeOut1);
    setTimeout(() => {
        document.getElementById(ball1Id).classList.remove('highlight');
        document.getElementById(ball2Id).classList.remove('highlight2');
        pickButton.disabled = false
        pickButton.classList.remove('disabledButton');
    }, timeOut2);
}

function pickBalls() {
    let ball1 = Math.floor(Math.random() * 6 + 1);
    console.log(ball1);
    let chosenBox = Math.ceil(ball1 / 2);

    let ballsLeft = ballsNum[chosenBox - 1].filter((ball) => ball !== ball1);
    let ball2 = ballsLeft[0];
    updateResults(ball1, ball2);
    return { ball1, ball2 };
}

function autoPick(n) {
    for (let i = 0; i < n; i++) {
        pickBalls();
    }
    updateTable();
}

var totals = resetTotals();

function resetTotals() {
    return {
        firstPickGold: 0,
        firstPickSilver: 0,
        secondPickGold: 0,
        secondPickSilver: 0,
        secondPickAfterGold: 0,
        secondPickAfterSilver: 0,
        totalTrials: 0,
    }
}

function clearResults() {
    totals = resetTotals();
    updateTable();
}

function updateResults(ball1, ball2) {
    let firstPick = balls[ball1 - 1]
    let secondPick = balls[ball2 - 1]
    console.log(firstPick, secondPick)
    totals.firstPickGold += firstPick === "G" ? 1 : 0;
    totals.firstPickSilver += firstPick === "S" ? 1 : 0;
    totals.secondPickGold += secondPick === "G" ? 1 : 0;
    totals.secondPickSilver += secondPick === "S" ? 1 : 0;
    totals.secondPickAfterGold += firstPick === "G" && secondPick === "G" ? 1 : 0;
    totals.secondPickAfterSilver += ((firstPick === "G" && secondPick === "S") ? 1 : 0);
    totals.totalTrials += 1;
    updateTable();
}

function updateTable() {
    document.getElementById("firstPickGold").innerText = totals.firstPickGold;
    document.getElementById("firstPickGoldPercentage").innerText = `${Math.round(totals.firstPickGold / (totals.firstPickGold + totals.firstPickSilver) * 100)}%`;
    document.getElementById("firstPickSilver").innerText = totals.firstPickSilver;
    document.getElementById("firstPickSilverPercentage").innerText = `${Math.round(totals.firstPickSilver / (totals.firstPickGold + totals.firstPickSilver) * 100)}%`;
    document.getElementById("secondPickGold").innerText = totals.secondPickGold;
    document.getElementById("secondPickGoldPercentage").innerText = `${Math.round(totals.secondPickGold / (totals.secondPickGold + totals.secondPickSilver) * 100)}%`;
    document.getElementById("secondPickSilver").innerText = totals.secondPickSilver;
    document.getElementById("secondPickSilverPercentage").innerText = `${Math.round(totals.secondPickSilver / (totals.secondPickGold + totals.secondPickSilver) * 100)}%`;
    document.getElementById("secondPickAfterGold").innerText = totals.secondPickAfterGold;
    document.getElementById("secondPickAfterGoldPercentage").innerText = `${Math.round(totals.secondPickAfterGold / totals.firstPickGold * 100)}%`;
    document.getElementById("secondPickAfterSilver").innerText = totals.secondPickAfterSilver;
    document.getElementById("secondPickAfterSilverPercentage").innerText = `${Math.round(totals.secondPickAfterSilver / totals.firstPickGold * 100)}%`;
    document.getElementById("totalTrials").innerText = totals.totalTrials;
}
