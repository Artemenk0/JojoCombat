var dio = document.getElementById("dio");
var jojo = document.getElementById("jojo");
var container = document.getElementById("map");

var jojoHealthDisplay = document.getElementById("jojoHealthDisplay");
var dioHealthDisplay = document.getElementById("dioHealthDisplay");

var counter = document.getElementById("counter");

let jojoWins = 0;

var stepJojo = 0;
var jojoHand;

let dioHeall = 100;

var jojoHandFlag = false;
var isKick = false;

function checkCollisionJOJO() {
    var dioRect = dio.getBoundingClientRect();

    if (jojoHand)
    {
        var jojoHandRect = jojoHand.getBoundingClientRect();

        if (
            jojoHandRect.right >= dioRect.left &&
            jojoHandRect.left <= dioRect.right &&
            jojoHandRect.bottom >= dioRect.top &&
            jojoHandRect.top <= dioRect.bottom &&
            !isKick
        ) 
        {
            isKick = true;
            DioHit();
            dioHeall -= 10;
            dioHealthDisplay.textContent = "Health: " + dioHeall;
            //console.log(dioHeall);

            if (dioHeall == 0) 
            {
                alert("Jojo Win");

                jojoWins++;
                counter.textContent = dioWins + " : " + jojoWins;

                dioHeall = 100;
                jojoHeall = 100;
                jojoHealthDisplay.textContent = "Health: " + jojoHeall;
                dioHealthDisplay.textContent = "Health: " + dioHeall;

                stepJojo = 0;
                stepDio = 0;
                
                dio.style.left = 0 + "px";
                jojo.style.right = 0 + "px";
            }
        }
    }
    
}

function DioHit() {
    var count = 0;
    var interval = setInterval(function () {
        if (count % 2 === 0) {
            dio.style.transform = "rotate(2deg)";
        } else {
            dio.style.transform = "rotate(-2deg)";
        }
        count++;

        if (count >= 6) {
            clearInterval(interval);

            dio.style.transform = "rotate(0deg)";
        }
    }, 100);
}

document.addEventListener("keydown", function (event) {
    var containerWidth = container.offsetWidth;
    var jojoWidth = jojo.offsetWidth;

    if (event.key === "m" || event.key === "M") 
    {
        createJojoHand();
        checkCollisionJOJO();
    }

    if (event.key === "j" || event.key === "J") {
        stepJojo += 20;
        if (stepJojo + jojoWidth > containerWidth) {
            stepJojo = containerWidth - jojoWidth;
        }
        jojo.style.right = stepJojo + "px";
        checkCollisionJOJO();
    } else if (event.key === "l" || event.key === "L") {
        stepJojo -= 20;
        if (stepJojo < 0) {
            stepJojo = 0;
        }
        jojo.style.right = stepJojo + "px";
        checkCollisionJOJO();
    }
});

function createJojoHand() 
{
    if (jojoHandFlag)
    {
        return;
    }

    if (jojoHand) {
        jojoHand.remove();
    }

    jojoHand = document.createElement("div");
    jojoHand.id = "handJOJO";
    jojoHand.innerHTML = '<img src="/assets/img/hand.png" alt="">';
    jojo.appendChild(jojoHand);
    performPunch2();

    jojoHandFlag = true;
}

function performPunch2() 
{
    if (jojoHand) {
        jojoHand.style.opacity = "1";
        setTimeout(function () {
            jojoHand.style.opacity = "0";
            jojoHand.remove();
            jojoHandFlag = false;
            isKick = false;
        }, 600);
    }
}
