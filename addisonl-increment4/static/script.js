var x = 5;
var y = 7;
var z = x + y;
console.log(z);

var A = "Hello ";
var B = "world!";
var C = A + B;
console.log(C);

function SumnPrint(x1, x2) {
    console.log(x1 + x2);
}

SumnPrint(x, y);
SumnPrint(A, B);

if (C.length > z) {
    console.log(C);
} else if (C.length < z) {
    console.log(z);
} else {
    console.log("good job!");
}

var L1 = ["Watermelon", "Pineapple", "Pear", "Banana"];
var L2 = ["Apple", "Banana", "Kiwi", "Orange"];

function findTheBanana(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "Banana") {
            alert("Banana found!");
            break;
        }
    }
}

function findTheBananaForEach(arr) {
    arr.forEach(function(item) {
        if (item === "Banana") {
            alert("Banana found!");
        }
    });
}

/*
findTheBanana(L1);
findTheBanana(L2);
findTheBananaForEach(L1);
findTheBananaForEach(L2);
*/

function greeting(h) {
    var greetingElement = document.getElementById("greeting");

    if (greetingElement) {
        if (h < 5 || h >= 20) {
            greetingElement.innerHTML = "Good night, welcome to MonoMuse";
        } else if (h < 12) {
            greetingElement.innerHTML = "Good morning, welcome to MonoMuse";
        } else if (h < 18) {
            greetingElement.innerHTML = "Good afternoon, welcome to MonoMuse";
        } else {
            greetingElement.innerHTML = "Good evening, welcome to MonoMuse";
        }
    }
}

function addYear() {
    var yearElement = document.getElementById("copyYear");

    if (yearElement) {
        yearElement.innerHTML = new Date().getFullYear();
    }
}

function ActiveNav() {
    var currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "") {
        currentPage = "index.html";
    }

    var navLinks = document.querySelectorAll(".nav_bar a");

    navLinks.forEach(function(link) {
        var linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
}

function showPurchaseForm(selectedDate) {
    var purchaseForm = document.getElementById("purchaseForm");
    var dateField = document.getElementById("selectedDate");

    if (purchaseForm) {
        purchaseForm.style.display = "block";
    }

    if (dateField) {
        dateField.value = selectedDate;
    }
}

function redirectToPayment(event) {
    event.preventDefault();
    alert("Redirecting to payment system.");
}

addYear();
ActiveNav();
greeting(new Date().getHours());

if (typeof window.jQuery !== "undefined") {
    $(document).ready(function () {
        $("#readMore").click(function () {
            $("#longIntro").show();
            $("#readLess").show();
            $("#readMore").hide();
        });

        $("#readLess").click(function () {
            $("#longIntro").hide();
            $("#readLess").hide();
            $("#readMore").show();
        });
    });
}