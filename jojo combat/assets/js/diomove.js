var dio = document.getElementById("dio");
var jojo = document.getElementById("jojo");
var dioHand;
var jojoHealthDisplay = document.getElementById("jojoHealthDisplay");
var dioHealthDisplay = document.getElementById("dioHealthDisplay");

var counter = document.getElementById("counter");

let dioWins = 0;

var container = document.getElementById("map");
var stepDio = 0;

let jojoHeall = 100;

var dioHandFlag = false;
var isKick = false;

function checkCollisionDIO() {
    var jojoRect = jojo.getBoundingClientRect();

    if (dioHand) {
        var dioHandRect = dioHand.getBoundingClientRect();
        if (
            dioHandRect.right >= jojoRect.left &&
            dioHandRect.left <= jojoRect.right &&
            dioHandRect.bottom >= jojoRect.top &&
            dioHandRect.top <= jojoRect.bottom &&
            !isKick
        ) {
            isKick = true;
            jojoHit();
            jojoHeall -= 10;
            //console.log(jojoHeall);
            jojoHealthDisplay.textContent = "Health: " + jojoHeall;

            if (jojoHeall == 0) 
            {   
                alert("Dio Win");

                dioWins++;
                counter.textContent = dioWins + " : " + jojoWins;

                dioHeall = 100;
                jojoHeall = 100;
                jojoHealthDisplay.textContent = "Health: " + jojoHeall;
                dioHealthDisplay.textContent = "Health: " + dioHeall;

                stepDio = 0;
                stepJojo = 0;

                dio.style.left = 0 + "px";
                jojo.style.right = 0 + "px";
            }
        }
    }

}

function jojoHit() {
    var count = 0;
    var interval = setInterval(function () {
        if (count % 2 === 0) {
            jojo.style.transform = "rotate(2deg)";
        } else {
            jojo.style.transform = "rotate(-2deg)";
        }
        count++;

        if (count >= 6) {
            clearInterval(interval);

            jojo.style.transform = "rotate(0deg)";
        }
    }, 100);
}

function createDioHand() 
{
    if (dioHandFlag)
    {
        return;
    }

    if (dioHand) {
        dioHand.remove();
    }

    dioHand = document.createElement("div");
    dioHand.id = "handDIO";
    dioHand.innerHTML = '<img src="/assets/img/hand.png" alt="">';
    dio.appendChild(dioHand);
    performPunch();

    dioHandFlag = true;
}

function performPunch() {
    if (dioHand) {
        dioHand.style.opacity = "1";
        setTimeout(function () {
            dioHand.style.opacity = "0";
            dioHand.remove();
            dioHandFlag = false;
            isKick = false;
        }, 600);
    }
}

document.addEventListener("keydown", function (event) {
    var containerWidth = container.offsetWidth;
    var dioWidth = dio.offsetWidth;

    if (event.key === "x" || event.key === "X") {
        createDioHand();
        checkCollisionDIO();
    }

    if (event.key === "d" || event.key === "D") {
        stepDio += 20;
        if (stepDio + dioWidth > containerWidth) {
            stepDio = containerWidth - dioWidth;
        }
        dio.style.left = stepDio + "px";
    } else if (event.key === "a" || event.key === "A") {
        stepDio -= 20;
        if (stepDio < 0) {
            stepDio = 0;
        }
        dio.style.left = stepDio + "px";
        // checkCollisionDIO();
    }
});
