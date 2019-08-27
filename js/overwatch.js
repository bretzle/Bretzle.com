import LZString from "./LZString.js";

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
    "Lucio",
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

const mapTypes = {
    control: [
        "Busan", "Ilios", "Lijiang Tower", "Nepal", "Oasis"
    ],
    assault: [
        "Hanamura", "Horizon Lunar Colony", "Paris", "Temple of Anubis", "Volskaya Industries"
    ],
    hybrid: [
        "Blizzard World", "Eichenwalde", "Hollywood", "King's Row", "Numbani"
    ],
    escort: [
        "Dorado", "Havana", "Junkertown", "Rialto", "Route 66", "Watchpoint: Gibraltar"
    ]
};
const heroTypes = {
    tank: [
        "D.Va", "Orisa", "Reinhardt", "Roadhog", "Sigma", "Winston", "Wrecking Ball", "Zarya",
    ],
    damage: [
        "Ashe", "Bastion", "Doomfist", "Genji", "Hanzo", "Junkrat", "McCree", "Mei", "Pharah", "Reaper", "Soldier: 76", "Sombra", "Symmetra", "Torbjörn", "Tracer", "Widowmaker",
    ],
    support: [
        "Ana", "Baptiste", "Brigitte", "Lucio", "Mercy", "Moira", "Zenyatta"
    ]
};

let game = {
    inputs: [],
    friends: []
};

const dev_mode = location.hostname === "localhost" || location.hostname === "127.0.0.1";

load();
setupButtons();
setupAutoCompleteForHeroes();
generateTableOffCookies();
save();

if (dev_mode) {
    console.log("Server running in a dev environment.");
    console.log("Loading dev tools");
    window.load = load;
    window.save = save;
    window.generateRandomEntries = generateRandomEntry;
}

function addEntry() {
    let map = document.getElementById("owMap").value;
    let side = document.getElementById("owSide").value;
    let groupSize = parseInt(document.getElementById("owGroupSize").value);
    let score = document.getElementById("owScore").value.split(":");
    let SR = parseInt(document.getElementById("owSR").value);

    let friends = [
        document.getElementById("owFriend_1").value,
        document.getElementById("owFriend_2").value,
        document.getElementById("owFriend_3").value,
        document.getElementById("owFriend_4").value,
        document.getElementById("owFriend_5").value,
    ];

    let heroes = [
        document.getElementById("owHero_1").value,
        document.getElementById("owHero_2").value,
        document.getElementById("owHero_3").value,
        document.getElementById("owHero_4").value
    ];

    friends = friends.filter(function (e) {
        return game.friends.indexOf(e) !== -1;
    });

    heroes = heroes.filter(function (e) {
        return HEROES.indexOf(e) !== -1;
    });

    score = [parseInt(score[0]), parseInt(score[1])];

    if (map !== "" && groupSize - 1 === friends.length && heroes.length >= 1 && score.length === 2 && SR > 0 && SR < 5000) {
        game.inputs.push({
            "date": new Date().getTime(),
            "map": map,
            "side": side,
            "groupSize": groupSize,
            "heroes": heroes,
            "score": score,
            "SR": SR,
            "friends": friends
        });
        console.log("Added entry");
        generateTableOffCookies();
        resetEntryInput();
        save();
    } else {
        console.log("Invalid Entry");
    }
}

function resetEntryInput() {
    document.getElementById("owMap").value = "";
    document.getElementById("owSide").value = "Attack";
    document.getElementById("owScore").value = "";
    document.getElementById("owSR").value = "";

    document.getElementById("owGroupSize").value = "1";
    updateFriendsDisable();

    document.getElementById("owFriend_1").value = "";
    document.getElementById("owFriend_2").value = "";
    document.getElementById("owFriend_3").value = "";
    document.getElementById("owFriend_4").value = "";
    document.getElementById("owFriend_5").value = "";

    document.getElementById("owHero_1").value = "";
    document.getElementById("owHero_2").value = "";
    document.getElementById("owHero_3").value = "";
    document.getElementById("owHero_4").value = "";
}

function load() {
    const save = localStorage.getItem("owSave");
    if (save !== null) {
        game = JSON.parse(LZString().decompressFromBase64(save));
        console.log("Loaded save from local storage");
    } else {
        console.log("Failed to load save from storage. Generating new save");
    }

    console.log("loaded " + game.inputs.length + " entries");
}

function save() {
    const save = LZString().compressToBase64(JSON.stringify(game));
    localStorage.setItem("owSave", save);
    if (localStorage.getItem("owSave") === save) {
        console.log("Saving Overwatch stats to cookies");
    } else {
        console.log("Failed to save");
    }
}

function setupButtons() {
    document.querySelector("#submitEntry").addEventListener("click", addEntry);
    document.querySelector("#resetEntry").addEventListener("click", resetEntryInput);
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

        if (!val) {
            return false;
        }
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
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

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

function generateTableOffCookies() {
    let table = document.getElementById("owDataTable");
    table.innerHTML = "";

    game.inputs.forEach(function (entry) {
        console.log("Adding row");
        table.innerHTML += generateRow(entry);
    });

    function generateRow(entry) {
        return "<tr>" +
            "<td>" + entry["date"] + "</td>" +
            "<td>" + entry["map"] + "</td>" +
            "<td>" + entry["side"] + "</td>" +
            "<td>" + entry["heroes"] + "</td>" +
            "<td>" + entry["score"] + "</td>" +
            "<td>" + entry["SR"] + "</td>" +
            "<td>" + entry["friends"] + "</td>" +
            "</tr>";
    }
}

function generateRandomEntry(number) {
    for (let i = 0; i < number; i++) {
        game.inputs.push({
            "date": new Date().getTime(),
            "map": randomElement(MAPS),
            "side": randomElement(["Attack", "Defense", "None"]),
            "groupSize": randomElement([1, 2, 3, 4, 5, 6]),
            "heroes": randomElement(HEROES),
            "score": randomElement([[1, 0], [2, 3], [2, 2], [3, 0], [0, 0]]),
            "SR": randomElement([2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900]),
            "friends": ""
        });
    }
}

function randomElement(array) {
    return array[Math.floor((Math.random() * array.length))]
}