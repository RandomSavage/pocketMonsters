webpackJsonp([0],{

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This is the database for pokemon
// create data for 3 different pokemons, with their names, type, weaknesses, health, and attack moves(name, attack stat, maximum)


var attack = 20;
var level = 10;
var stack = 1.3;
var defense = 39;

// create a formula for attacks
console.log(attack * level * stack / 7);

// create a formula for health
//HP = 0.20 x Sqrt(Pokemon_level) x (HP_base_stat)
console.log(0.20 * Math.sqrt(level) * defense * 15);

// let user choose 1 and then assign a random pokemon to battle thats not the users pokemon
// p1 vs p2


// when one user loses all his health declare a winner


// state
var gameState = {
  userPokemon: '',
  rivalPokemon: '',
  pokemonDB: [{
    name: 'charmander',
    type: 'fire',
    hp: 39,
    attack: 52,
    defense: 43,
    level: 1,
    img: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
  }, {
    name: 'bulbasaur',
    type: 'grass',
    hp: 45,
    attack: 49,
    defense: 49,
    level: 1,
    img: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'
  }, {
    name: 'squirtle',
    type: 'water',
    hp: 44,
    attack: 48,
    defense: 65,
    level: 1,
    img: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'
  }],
  elements: {
    pokemonsEl: document.querySelector('.select-screen').querySelectorAll('.character'),
    battleScreenEl: document.getElementById("battle-screen"),
    attackBtnsEl: document.getElementById("battle-screen").querySelectorAll('.attack')
  },
  init: function init() {
    // the initial loop
    var i = 0;
    while (i < gameState.elements.pokemonsEl.length) {
      // adds function to all characters on screen select
      gameState.elements.pokemonsEl[i].onclick = function () {
        // current selected pokemons name
        var pokemonName = this.dataset.pokemon;

        // elements for images on battle screen
        var player1Img = document.querySelector('.player1').getElementsByTagName('img');
        var player2Img = document.querySelector('.player2').getElementsByTagName('img');

        // working on changing player name in health background
        // document.getElementById("listItem").childNodes[0].nodeValue;
        var player1Name = document.querySelector('.player1').querySelector('.name').childNodes[0].nodeValue;
        // we save the current selected pokemon
        gameState.userPokemon = pokemonName;
        document.querySelector('.player1').querySelector('.name').childNodes[0].nodeValue = gameState.userPokemon;
        console.log(gameState.currentRivalPokemon);
        // cpu picks a pokemon
        gameState.cpuPick();

        // change screen to battle scene
        gameState.elements.battleScreenEl.classList.toggle('active');

        // select data from the current user pokemon
        gameState.currentPokemon = gameState.pokemonDB.filter(function (pokemon) {
          return pokemon.name == gameState.userPokemon;
        });
        player1Img[0].src = gameState.currentPokemon[0].img;

        // select data from the current cpu pokemon
        gameState.currentRivalPokemon = gameState.pokemonDB.filter(function (pokemon) {
          return pokemon.name == gameState.rivalPokemon;
        });
        player2Img[0].src = gameState.currentRivalPokemon[0].img;
        document.querySelector('.player2').querySelector('.name').childNodes[0].nodeValue = gameState.rivalPokemon;

        gameState.currentPokemon[0].health = gameState.calculateInitialHealth(gameState.currentPokemon);
        gameState.currentPokemon[0].originalHealth = gameState.calculateInitialHealth(gameState.currentPokemon);

        gameState.currentRivalPokemon[0].health = gameState.calculateInitialHealth(gameState.currentRivalPokemon);
        gameState.currentRivalPokemon[0].originalHealth = gameState.calculateInitialHealth(gameState.currentRivalPokemon);
        console.log(gameState);
      };
      i++;
    }

    // loop to select attack types
    var a = 0;
    while (a < gameState.elements.attackBtnsEl.length) {
      gameState.elements.attackBtnsEl[a].onclick = function () {
        var attackName = this.dataset.attack;
        gameState.currentUserAttack = attackName;

        gameState.play(attackName, gameState.cpuAttack());
        // console.log(gameState.currentUserAttack);
      };
      a++;
    }
    console.log(gameState);
  },
  cpuAttack: function cpuAttack() {
    var attacks = ['rock', 'paper', 'scissors'];
    return attacks[gameState.randomNumber(0, 3)];
  },

  calculateInitialHealth: function calculateInitialHealth(user) {
    return 0.20 * Math.sqrt(user[0].level) * user[0].defense * user[0].hp;
  },

  attackMove: function attackMove(attack, level, stack, critical, enemy, attacker) {
    console.log(enemy.name + "before:" + enemy.health);
    var attackAmount = attack * level * (stack * critical);
    enemy.health = enemy.health - attackAmount;

    var userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside');
    var cpuHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside');
    if (enemy.owner == 'user') {
      var minusPercent = enemy.health * 100 / enemy.originalHealth;
      userHP.style.width = (minusPercent < 0 ? 0 : minusPercent) + '%';
    } else {
      var minusPercent = enemy.health * 100 / enemy.originalHealth;
      cpuHP.style.width = (minusPercent < 0 ? 0 : minusPercent) + '%';
    }

    gameState.checkWinner(enemy, attacker);
    console.log(enemy.name + "after:" + enemy.health);
  },

  checkWinner: function checkWinner(enemy, attacker) {
    if (enemy.health <= 0) {
      console.log('HEy Winnerrrrrr' + attacker.name);
    }
  },

  randomNumber: function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },

  cpuPick: function cpuPick() {
    gameState.rivalPokemon = gameState.elements.pokemonsEl[gameState.randomNumber(0, 3)].dataset.pokemon;
  },

  play: function play(userAttack, cpuAttack) {
    var currentPokemon = gameState.currentPokemon[0];
    var currentRivalPokemon = gameState.currentRivalPokemon[0];
    currentPokemon.owner = 'user';
    currentRivalPokemon.owner = 'cpu';
    switch (userAttack) {
      case 'rock':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            //user
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              //cpu
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon);
            }
          }console.log('paper killed rock');
        }
        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon);
            }
          }console.log('rock killed scissors');
        }
        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon);
            }
          }console.log('Draw');
        }
        break;
      case 'paper':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon);
            }
          }console.log('Draw');
        }
        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon);
            }
          }console.log('scissors killed paper');
        }
        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon);
            }
          }console.log('paper killed rock');
        }
        break;
      case 'scissors':
        if (cpuAttack == 'paper') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon);
            }
          }console.log('scissors killed paper');
        }
        if (cpuAttack == 'scissors') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon);
            }
          }console.log('Draw');
        }
        if (cpuAttack == 'rock') {
          if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
            gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon);
            if (currentRivalPokemon.health >= 1) {
              gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon);
            }
          }console.log('rock killed scissors');
        }
        break;
    }
  }

};
// end of gamestate object
gameState.init();

// elements


console.log(gameState.elements.pokemonsEl);

// alternate code for cpuPick inside gamestate object
// do {
//   gameState.rivalPokemon = gameState.elements.pokemonsEl[gameState.randomNumber(0, 3)].dataset.pokemon;
//   console.log('looping ' + gameState.rivalPokemon);
// }
// while (gameState.userPokemon == gameState.rivalPokemon);

/***/ })

},[233]);