// memory game

// defining global scope variables and DOM elements
var imageIndentificators = [];
var score= 0,attempts = 0;
var wrapperIDs = [];
var gameBoard = document.getElementById("gameBoard");
// init function
    // randomize images and generate html
    function initializeGame (){
        imageIndentificators = [1,1,2,2,3,3,4,4,5,5,6,6];

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    shuffleArray(imageIndentificators);

    // inserting html code in DOM
    imageIndentificators.forEach(function(current,index){

        var html = `<div class="imageWrapper" id="w-${index}">
        <img src="photos/${current}.jpg" class="${current} id="${index}" alt=""> 
        </div>`

        gameBoard.insertAdjacentHTML("beforeend", html);

    });

    // initial conditions 
    score= 0,attempts = 0,imageIndentificators.length = 0,wrapperIDs.length = 0;
    updateScore (score,attempts);

    };


    // pokrece se prvi puta kad se ucita stranica
    initializeGame();



// main function

document.querySelector("#gameBoard").onclick = function(event){
    

    if(event.target.classList.item(0).includes("imageWrapper")){ // execute only if user clicked on image wrapper
        var img = event.target.children[0];
        if(imageIndentificators.length < 2){
            imageIndentificators.push(img.classList.item(0)); // class from image elementa
            wrapperIDs.push(event.target.id)
            // change visibility
            img.style.visibility = "visible" 
        };
        
        checkStatus();
    };
    setTimeout(function() { checkWinner(); }, 10); //with this delay we ensure that the DOM elements are fully updated and then Alert user
    
};

function checkStatus(){
    if(imageIndentificators.length == 2){
            if(imageIndentificators[0] === imageIndentificators[1]){ // if both images are the same
                score += 1;
                attempts += 1;
                resetArrays();
                updateScore(score,attempts);
                
            }else {
                attempts += 1;
                setTimeout(function() { hideImgs(); }, 300);
                updateScore(score,attempts);
                
            };
        
            
    };
};
 

function updateScore (score,attempts){
    var scoreDigit,attemptDigit;
    scoreDigit = document.getElementById("scoreDigit");
    attemptDigit = document.getElementById("attemptDigit");

    scoreDigit.textContent = score;
    attemptDigit.textContent = attempts;

    

}
function checkWinner(){
    if(score === 6){
        alert("Winner! Press OK to try again"); 
        clearBoard();
        initializeGame();
    };
};
function hideImgs(){
    document.getElementById(wrapperIDs[0]).children[0].style.visibility = "hidden" 
    document.getElementById(wrapperIDs[1]).children[0].style.visibility = "hidden" 
    resetArrays();
    
};
function clearBoard(){
    for(var i=0;i<12;i++){
        document.getElementById(`w-${i}`).remove();
    };
};

function resetArrays(){imageIndentificators.length = 0; wrapperIDs.length = 0;}


