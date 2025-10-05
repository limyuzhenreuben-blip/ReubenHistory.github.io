// Data structure invote: list,Dictionary
// List []

// Dictionary {}
/*
    {
       "Patwin" : "91230000",
       "Jace" : "989877",
    }
*/


const database1 = [
    {
        question : "whats the capital of China",
        options : ["Tokoy", "Maila", "bankok", "beijing"],
        answer :  "beijing"
    },

    {
        question : "when is the rubiks cube invented",
        options : ["1950", "2018", "2022", "1974"],
        answer :  "1974"
    },


    {
        question : "when is the rubik clock invented",
        options : ["1900", "2017", "2002", "1988"],
        answer :  "1988"
    },

    {
        question : "who the 49 by49 by49",
        options : ["patwin", "jace", "yishan", "Preston Alden"],
        answer :  "Preston Alden"
    },

    {
        question : "what is the fastest time to solve a 3x3",
        options : ["3.08", "10.38", "4.43", "2.53"],
        answer :  "3.08"
    },
    
]

const DropDown = document.getElementById("drop-down");
const StartButton = document.getElementById("start-btn");
const TimerLabel = document.getElementById("timer-label");
const questionlabel = document.getElementById("question");
const optionscontainer = document.getElementById("option-container");
const SocreLabel = document.getElementById("score-label");
const FeedbackLabel = document.getElementById("feedback-label");
const ProgressBar = document.getElementById("progress-bar-fill");
const BgmDropdown = document.getElementById("bgm-dropdown");
const BgmButton = document.getElementById("music-btn");

let CurrentSong = null;
let IsBgmPlaying = false;

// on bgm dropdown change
BgmDropdown.addEventListener("change", () => {
    
    const SelectedSong = BgmDropdown.value;

    // abort the function if the song cannot be found
    if(!SelectedSong) return;

    // stop and reset previous song if it exists
    if(CurrentSong)
    {
        CurrentSong.pause();
        CurrentSong.currentTime = 0;
    }

    // load and play the new song
    CurrentSong = new Audio(SelectedSong);
    CurrentSong.loop = true;
    CurrentSong.volume = 0.2;
    CurrentSong.play();
    IsBgmPlaying = true;
    BgmButton.textContent = "🔊 Music On";

});

BgmButton.addEventListener('click', () => {
    if(IsBgmPlaying)
    {
        CurrentSong.pause();
        BgmButton.textContent = "🔇 Music Off";
        IsBgmPlaying = false;
    }else
    {
       CurrentSong.play()
       BgmButton.textContent = "🔊 Music On";
       IsBgmPlaying = true
    }

});








StartButton.addEventListener('click', StartQuiz);

let timer;
let question_index = 0;
let score = 0;

function StartQuiz()
{
    DropDown.style.display = 'none';
    StartButton.style.display = 'none';
    loadquestion();
}

function loadquestion()
{
    if(question_index < database1.length)
    {
        TimerLabel.textContent = 15;

        FeedbackLabel.textContent = "";

        // adjust progress bar's width
            ProgressBar.style.width = `${((question_index + 1) / database1.length) * 100}%`;

        // load a question from the database
        const Currentquestionset = database1[question_index];
        questionlabel.textContent = Currentquestionset.question;

        //remove previous option button 
        optionscontainer.innerHTML = "";

    // create options buttons
        Currentquestionset.options.forEach((item) => {
        const button = document.createElement('button')
        button.textContent = item;
        button.classList.add('option-btu')
        optionscontainer.appendChild(button);

        button.addEventListener('click', () => {
            DisableAllOptionButtons();
            CheckAnswer(item);
        });
        });
    
        // turn on timer
        timer = setInterval(() => {
            TimerLabel.textContent =parseInt(TimerLabel.textContent) - 1;

            if(parseInt(TimerLabel.textContent) === 0)
            {
                clearInterval(timer); // turn off the timer\
                CheckAnswer(null);
            }

        }, 1000);
    } else {
        
    }
}

function DisableAllOptionButtons()
{
    const all_option_buttons = document.querySelectorAll('.option-btu')

    all_option_buttons.forEach(button => {
        button.disabled = true;
    })
        
}


// item - the player selected option
function CheckAnswer(item)
{
    clearInterval(timer);
    const Currentquestionset = database1[question_index];
    let message = "";

    if (item === Currentquestionset.answer)
    {
        score = score + 1;
        message = "Correct! 1 point goes to you!"

    } else if (item === null)
    {
        message = "time's up.";
    } else
    {
       message = "incrrect"
    }

    SocreLabel.textContent = `you score ${score} points`
    FeedbackLabel.textContent = message;

    // to wait for 2 seconds before loading the next question
    setTimeout(() => {
        question_index = question_index + 1
        loadquestion();
    }, 2000);
}

