const input = document.getElementById("input-text");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let round = 1,
    ties = 0,
    playerWins = 0,
    computerWins = 0,
    playerLosses = 0,
    computerLosses = 0;

const getComputerChoice = () => ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];

const playRound = (playerSelection, computerSelection) => {
    if (playerSelection === computerSelection) {
        ties++;
        resultDiv.innerHTML = `<p>Round ${round}: It's a tie</p>`;
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        playerWins++;
        computerLosses++;
        resultDiv.innerHTML = `<p>Round ${round}: You win!</p>`;
    } else {
        computerWins++;
        playerLosses++;
        resultDiv.innerHTML = `<p>Round ${round}: You lose!</p>`;
    }
    round++;
};

const playGame = () => {
    if (round < 6) {
        const playerInput = input.value.trim().toLowerCase();
        if (!["rock", "paper", "scissors"].includes(playerInput)) {
            resultDiv.innerHTML = `<p>Please enter a valid input (rock, paper, scissors).</p>`;
            return;
        }

        const computerInput = getComputerChoice();
        playRound(playerInput, computerInput);
        resultDiv.style.display ="block"

        input.value = "";

        if (round === 6) {
            input.disabled = true;
            input.placeholder = "Game over";

            const finalResult =
                playerWins > computerWins ? "You win the game!" :
                playerWins < computerWins ? "You lose the game!" :
                "It's a tie!";

            const playerStats = `Player: Wins: ${playerWins} | Losses: ${playerLosses} | Ties: ${ties}`;
            const computerStats = `Computer: Wins: ${computerWins} | Losses: ${computerLosses} | Ties: ${ties}`;

            resultDiv.innerHTML += `<p>${playerStats}</p><p>${computerStats}</p><p>Final result: ${finalResult}</p>`;
            restartButton.removeAttribute("hidden");
        }
    }
};

const restartGame = () => {
    round = 1;
    ties = 0;
    playerWins = 0;
    computerWins = 0;
    playerLosses = 0;
    computerLosses = 0;
    input.disabled = false;
    input.placeholder = "Rock, Paper, Scissors";
    resultDiv.style.display = "none"
    resultDiv.innerHTML = "";
    restartButton.setAttribute("hidden", true);
};

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        playGame();
    }
});
restartButton.addEventListener("click", restartGame);
