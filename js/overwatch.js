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
fillMapPool();
fillHeroPool();

function newGame() {
    return {
        inputs: [],
        friends: []
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

    let correctInput = true;

    if (map === "" || side === "" || isNaN(groupSize) || score === "" || isNaN(SR) || friends.length + 1 !== groupSize) {
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

function fillMapPool() {
    let selectTag = document.getElementById("owMap");
    let option = document.createElement("option");
    option.text = "";
    selectTag.add(option);

    for (let index in MAPS) {
        option = document.createElement("option");
        option.text = MAPS[index];
        selectTag.add(option);
    }
}

function fillHeroPool() {

}

function getMaps() {
    return MAPS;
}

function getHeroes() {
    return HEROES;
}