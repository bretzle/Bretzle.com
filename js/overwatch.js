const HEROES = [
    "Ana",
    "Ashe",
    "Baptiste",
    "Bastion",
    "Brigitte",
    "D.Va",
    "Doomfist",
    "Genji",
    "Hanzo",
    "Junkrat",
    "Lúcio",
    "McCree",
    "Mei",
    "Mercy",
    "Moira",
    "Orisa",
    "Pharah",
    "Reaper",
    "Reinhardt",
    "Roadhog",
    "Sigma",
    "Soldier: 76",
    "Sombra",
    "Symmetra",
    "Torbjörn",
    "Tracer",
    "Widowmaker",
    "Winston",
    "Wrecking Ball",
    "Zarya",
    "Zenyatta"
];
const MAPS = [
    "Blizzard World",
    "Busan",
    "Dorado",
    "Eichenwalde",
    "Hanamura",
    "Havana",
    "Hollywood",
    "Horizon Lunar Colony",
    "Ilios",
    "Junkertown",
    "King's Row",
    "Lijiang Tower",
    "Nepal",
    "Numbani",
    "Oasis",
    "Paris",
    "Rialto",
    "Route 66",
    "Temple of Anubis",
    "Volskaya Industries",
    "Watchpoint: Gibraltar",
];

let isSaving = false;
let game;

load();
setupAutoCompleteForHeroes();

function newGame() {
    return {
        inputs: [],
        friends: ["test1", "test2", "test3", "test4", "test5", "test6", "test7"]
    };
}

function addEntry() {
    let map = document.getElementById("owMap").value;
    let side = document.getElementById("owSide").value;
    let groupSize = parseInt(document.getElementById("owGroupSize").value);
    let heroes = document.getElementById("owHeroes").value.split(";");
    let score = document.getElementById("owScore").value;
    let SR = parseInt(document.getElementById("owSR").value);
    let friends = document.getElementById("owFriends").value.split(";");

    if (friends[0] === "") {
        friends = [];
    }

    let correctInput = true;

    if (map === "" || score === "" || isNaN(SR) || friends.length + 1 !== groupSize) {
        correctInput = false
    }

    if (correctInput) {
        game.inputs.push(
            {
                "date": new Date().getTime(),
                "map": map,
                "side": side,
                "groupSize": groupSize,
                "heroes": heroes,
                "score": score,
                "SR": SR,
                "friends": friends
            }
        );
        console.log("Added new entry");
        console.log(game.inputs[game.inputs.length - 1])
    } else {
        console.log("Invalid input. No Entry created")
    }
}

function load() {
    const cookies = document.cookie;

    if (cookies === "") {
        game = newGame();
        console.log("No cookies found. Generating new Overwatch stats");
    } else {
        game = JSON.parse(cookies);
        console.log("Loading Overwatch stats from cookies");
    }
}

function save() {
    document.cookie = JSON.stringify(game);
    console.log("Saving Overwatch stats to cookies");
}

function updateFriendsDisable() {
    let friend1 = document.getElementById("owFriend_1");
    let friend2 = document.getElementById("owFriend_2");
    let friend3 = document.getElementById("owFriend_3");
    let friend4 = document.getElementById("owFriend_4");
    let friend5 = document.getElementById("owFriend_5");

    let size = parseInt(document.getElementById("owGroupSize").value);

    if (size === 6) {
        friend5.disabled = false;
        friend4.disabled = false;
        friend3.disabled = false;
        friend2.disabled = false;
        friend1.disabled = false;
    } else if (size === 5) {
        friend5.disabled = true;
        friend4.disabled = false;
        friend3.disabled = false;
        friend2.disabled = false;
        friend1.disabled = false;
    } else if (size === 4) {
        friend5.disabled = true;
        friend4.disabled = true;
        friend3.disabled = false;
        friend2.disabled = false;
        friend1.disabled = false;
    } else if (size === 3) {
        friend5.disabled = true;
        friend4.disabled = true;
        friend3.disabled = true;
        friend2.disabled = false;
        friend1.disabled = false;
    } else if (size === 2) {
        friend5.disabled = true;
        friend4.disabled = true;
        friend3.disabled = true;
        friend2.disabled = true;
        friend1.disabled = false;
    } else if (size === 1) {
        friend5.disabled = true;
        friend4.disabled = true;
        friend3.disabled = true;
        friend2.disabled = true;
        friend1.disabled = true;
    }
}

function setupAutoCompleteForHeroes() {
    autoComplete(document.getElementById("owHero_1"), HEROES);
    autoComplete(document.getElementById("owHero_2"), HEROES);
    autoComplete(document.getElementById("owHero_3"), HEROES);
    autoComplete(document.getElementById("owHero_4"), HEROES);
}

function autoComplete(field, arr) {
    let currentFocus;

    field.addEventListener("input", function () {
        let a, b, i, val = this.value;
        closeAllLists();

        if (!val) { return false; }
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(a);

        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] +"'>";

                b.addEventListener("click", function () {
                    field.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    field.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "autocomplete-list");

        if (x) x = x.getElementsByTagName("div");

        if (e.keyCode === 40) { // down
            currentFocus++;
            addActive(x);
        } else if (e.keyCode === 38) { //up
            currentFocus--;
            addActive(x);
        } else if (e.keyCode === 13) { // enter
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;

        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);

        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(element) {
        const x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (element !== x[i] && element !== field) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    })
}