let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let mode = "human";  // Default mode
let turnO = true;

const humanVsHumanBtn = document.querySelector("#human-vs-human");
const humanVsMachineBtn = document.querySelector("#human-vs-machine");

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Switch between modes
humanVsHumanBtn.addEventListener("click", () => {
    mode = "human";
    resetGame();
});

humanVsMachineBtn.addEventListener("click", () => {
    mode = "machine";
    resetGame();
});

// Box click logic
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (mode === "human") {
                
                if (turnO) {
                    box.innerText = "O";
                    box.style.color = "blue";
                } else {
                    box.innerText = "X";
                    box.style.color = "red";
                }
                box.disabled = true;
                turnO = !turnO;
                checkWinner();
            } else if (mode === "machine") {
                if (turnO) {
                    box.innerText = "O";
                    box.style.color = "blue";
                    box.disabled = true;
                    checkWinner();
                    turnO = false;

                    
                    setTimeout(machineMove, 500);
                }
            }
        }
    });
});

const machineMove = () => {
    let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
    if (emptyBoxes.length === 0) return;  // No move if full

    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = "X";
    randomBox.style.color = "red";
    randomBox.disabled = true;

    checkWinner();
    turnO = true;  // Back to human
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return;
            }
        }
    }

    // Check for draw
    let isDraw = Array.from(boxes).every(box => box.innerText !== "");
    if (isDraw) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "blue";
    });
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
