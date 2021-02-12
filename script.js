class progress {
    goalVal;
    currentVal;
    constructor(goal) {
        this.goalVal = goal;
        this.currentVal = 0;
    }

    incrementCurrentval(){
        if (this.currentVal < this.goalVal){
            this.currentVal++
            this.updateText(this.currentVal);
            this.playSound();
            this.updateBar();
            this.jump();
            
        } else {
            this.currentVal = 0;
            this.updateText();
            this.updateBar();
        }
    }

    updateText(){
        document.getElementById("percentage").innerHTML = ((this.currentVal/this.goalVal)*100).toFixed(0) + "%";
        document.getElementById("fraction").innerHTML = this.currentVal + "/" + this.goalVal;
    }

    updateBar(){
        document.getElementById("fill").style.width = ((this.currentVal/this.goalVal)*100).toFixed(0) + "%";
    }

    playSound(){
        if (this.currentVal == this.goalVal) {
            document.getElementById("fin").play();
        } else {
            document.getElementById("inc").play();
        }
    }

    jump(){
        var bar = document.getElementById("progressbar");
        var per = document.getElementById("percentage");
        var frac = document.getElementById("fraction");
        var bartop = bar.offsetTop;
        var texttop = per.offsetTop;
        bar.style.top = bartop - 10 + "px";
        per.style.top = texttop - 10 + "px";
        frac.style.top = texttop - 10 + "px";
        setTimeout(function(){
            bar.style.top = bartop;
            per.style.top = texttop;
            frac.style.top = texttop;
        }, 100);
    }
}

var goal;

var prog = new progress(0);

window.addEventListener("load", () => {
    prog.updateText();
    prog.updateBar();
});

function buttonClick() {
    prog.incrementCurrentval();
}

function goClick() {
    var field = document.getElementById("goalinput");
    var goal = field.value;
    if(goal === "") {
        alert("Please specify a goal (number) in order to begin")
    } else {
        field.value = null;
        prog.goalVal = goal;
        prog.currentVal = 0;
        prog.updateText();
        prog.updateBar();
        var popup = document.getElementById("popup");
        popup.style.opacity = 0;
        var maincon = document.getElementById("maincontainer");
        maincon.style.display = "block";
        setTimeout(function(){
            maincon.style.opacity = 1;
            popup.style.display = "none";
        }, 250);
    }
}

function backButtonClick() {
    var popup = document.getElementById("popup");
    var maincon = document.getElementById("maincontainer");
    maincon.style.opacity = 0;
    popup.style.display = "block";
    setTimeout(function(){
        popup.style.opacity = 1;
        maincon.style.display = "none";
    }, 250);
}