
function input() {
    var username = document.getElementById("username").value;

    var loginData = {
        "username": username
    };

    var myJson = JSON.stringify(loginData);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/login", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === "Login failed!") {
                alert(this.responseText);
            } else {
                document.getElementById("status").innerHTML = this.responseText;
                localStorage.setItem('token', this.responseText);
            }
        }
    }
    xhttp.send(myJson);
}

function printGameField() {
    setInterval(function() {
        var token = localStorage.getItem("token");

        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:8080/gameField", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader('Authorization', token);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("game-field").innerHTML = this.responseText;
            } else {
                //alert(this.responseText);
            }
        }
        xhttp.send();
    }, 1000);
}