/**
 * Work with strings.
 */
window.addEventListener("DOMContentLoaded", function () {
    'use strict';
    let rockford = document.getElementById('baddie1'),
    area = document.getElementById('flash'),
    left = area.offsetLeft,
    top = area.offsetTop,
    posLeft = 0,
    posTop = 0,
    tileSize = 32,
    gridSize = 24,
    baddieDirection = 'down',
    soundOn = true, // Set to false to disable sounds.

    /**
     * This is the background for the game area.
     */
    gameArea = [
        24, 24, 24, 24, 24, 24, 24, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12,
        24, 24, 24, 24, 24, 24, 24, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14,
        24, 24, 24, 24, 24, 24, 24, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 26, 26, 12, 13, 14, 12, 13,
        24, 24, 24, 24, 24, 24, 24, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 40, 12, 13, 14, 12,
        24, 24, 24, 24, 24, 24, 24, 13, 14, 12, 13, 14, 12, 13, 14, 12, 40, 13, 14, 13, 40, 12, 13, 14,
        14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 40, 12, 13,
        13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12,
        14, 12, 13, 14, 12, 13, 14, 16, 16, 14, 12, 16, 17, 12, 29, 30, 33, 33, 33, 33, 33, 14, 27, 13, // water start
        13, 14, 12, 13, 14, 12, 13, 14, 16, 17, 14, 17, 13, 15, 30, 28, 30, 31, 28, 29, 28, 33, 27, 28,
        12, 13, 14, 12, 13, 14, 12, 13, 15, 15, 13, 14, 12, 30, 28, 30, 31, 30, 29, 30, 30, 28, 30, 14, // three tombs in a row
        14, 12, 13, 14, 12, 13, 14, 12, 15, 15, 17, 17, 29, 28, 29, 31, 30, 31, 28, 30, 31, 28, 29, 28,
        13, 14, 12, 13, 14, 12, 13, 14, 12, 17, 17, 15, 13, 29, 28, 31, 30, 29, 28, 31, 30, 28, 29, 12,
        12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 28, 30, 31, 28, 29, 28, 30, 31, 30, 31, 14,
        14, 12, 13, 14, 12, 13, 14, 16, 13, 14, 12, 13, 14, 17, 16, 16, 16, 13, 14, 12, 13, 16, 19, 21, // graveyard wall
        13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 17, 13, 14, 12, 16, 16, 12, 13, 19, 18, 18, 21, 21,
        12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 17, 12, 13, 19, 18, 21, 21, 21, 21, 21,
        14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 15, 16, 14, 12, 20, 21, 21, 21, 21, 21, 21,
        13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 15, 15, 13, 19, 21, 21, 21, 21, 21, 21, 21,
        12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 20, 21, 21, 21, 21, 21, 21, 21,
        14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 22, 21, 21, 21, 21, 21, 21, 21,
        13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 22, 21, 21, 21, 21, 21, 21,
        12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 22, 21, 21, 21, 21, 21,
        14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 22, 21, 21, 21, 21,
    ],

    /**
     * These are blocks that cant be moved to, or something happens when you try to move on them.
     * The blocks are drawn "on top" of the gamearea. Block 10 is empty, should be 0 but looks nicer with two figures.
     */
    gameBlocks = [
        22, 20, 21, 23, 20, 22, 23, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 28, 28, 26, 26, 26, 26, 26,
        20, 10, 70, 10, 10, 24, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 28, 28, 10, 10, 10, 10, 26,
        21, 10, 10, 10, 10, 10, 21, 80, 26, 10, 10, 10, 10, 10, 10, 10, 90, 10, 10, 10, 10, 10, 10, 26,
        20, 10, 10, 10, 10, 10, 22, 26, 10, 10, 10, 10, 10, 10, 10, 10, 10, 28, 28, 10, 10, 10, 10, 26,
        22, 21, 71, 18, 72, 20, 20, 10, 10, 10, 10, 10, 26, 10, 10, 10, 10, 28, 28, 28, 10, 10, 10, 26,
        26, 10, 10, 10, 10, 10, 26, 10, 10, 10, 26, 27, 26, 26, 26, 26, 28, 28, 28, 28, 28, 10, 10, 26,
        27, 10, 26, 10, 10, 10, 90, 10, 10, 27, 26, 61, 27, 27, 26, 10, 10, 28, 28, 28, 28, 28, 10, 26,
        26, 80, 26, 10, 10, 10, 26, 10, 60, 26, 27, 10, 10, 37, 36, 38, 40, 40, 38, 37, 36, 28, 10, 28, // Water 
        27, 27, 27, 26, 27, 27, 26, 27, 26, 27, 10, 10, 38, 44, 10, 10, 10, 43, 10, 10, 10, 40, 10, 28, // Water 
        26, 26, 60, 26, 26, 10, 10, 10, 10, 10, 10, 10, 46, 10, 10, 42, 10, 10, 10, 41, 10, 10, 10, 26, 
        26, 61, 27, 10, 10, 10, 27, 26, 10, 10, 10, 10, 91, 10, 10, 10, 10, 73, 10, 10, 10, 10, 10, 26, // fountain
        27, 27, 10, 10, 10, 10, 61, 60, 27, 26, 10, 26, 47, 10, 10, 41, 10, 10, 10, 10, 10, 48, 10, 26,
        27, 26, 10, 10, 10, 10, 10, 26, 26, 27, 61, 26, 38, 44, 10, 10, 10, 42, 10, 45, 10, 10, 10, 26,
        60, 10, 26, 27, 26, 27, 10, 10, 10, 10, 10, 26, 60, 40, 30, 36, 38, 36, 39, 39, 30, 38, 30, 37, // Graveyard stone wall
        26, 10, 10, 10, 10, 10, 26, 27, 10, 10, 10, 61, 26, 27, 10, 12, 10, 10, 10, 10, 10, 10, 10, 62,
        27, 10, 27, 27, 26, 10, 10, 26, 27, 27, 10, 10, 10, 10, 92, 12, 10, 10, 10, 10, 62, 10, 10, 63, // quest character
        26, 10, 26, 80, 27, 27, 10, 10, 10, 10, 26, 27, 26, 10, 10, 96, 10, 10, 10, 10, 10, 10, 10, 62, // upper gate
        27, 10, 27, 10, 10, 10, 26, 26, 27, 10, 10, 10, 27, 27, 10, 95, 10, 10, 10, 63, 10, 10, 10, 63, // lower gate
        61, 10, 10, 10, 27, 10, 10, 10, 10, 27, 26, 10, 26, 10, 10, 12, 10, 10, 10, 10, 10, 62, 10, 63,
        61, 74, 10, 74, 27, 26, 27, 27, 10, 10, 27, 10, 27, 10, 10, 26, 12, 10, 63, 10, 10, 10, 10, 63,
        19, 19, 18, 19, 19, 88, 10, 26, 10, 10, 26, 10, 27, 10, 27, 27, 12, 10, 10, 10, 10, 10, 10, 63,
        19, 10, 88, 10, 19, 27, 10, 90, 10, 27, 27, 10, 10, 10, 26, 27, 10, 12, 10, 10, 10, 10, 18, 63,
        19, 19, 19, 19, 19, 27, 60, 26, 27, 26, 26, 27, 26, 26, 26, 60, 26, 12, 26, 63, 63, 63, 63, 62,
    ],

    enemies = [90, 91]; // Add all block IDs that are enemies in here. 90 is a big troll.

    const characterStats = {
        health: 100,
        superStrength: false
    };

    function updateHealthBar() {
        const healthBarFill = document.getElementById('healthBar');
        healthBarFill.style.width = characterStats.health + '%';
        const healthBarLabel = document.getElementById('healthValue');
        healthBarLabel.textContent = characterStats.health;

        if (characterStats.health > 80) {
            healthBarLabel.style.color = 'greenyellow';
        } else if (characterStats.health >= 40) {
            healthBarLabel.style.color = 'orange';
        } else {
            healthBarLabel.style.color = 'red';
        }
    }

    updateHealthBar();

    function updateSuperpowerDisplay() {
        const superIcon = document.getElementById('superIcon');
        const superContainer = document.getElementById('superContainer');
        if (characterStats.superStrength) {
            superIcon.classList.add('active');
            superContainer.classList.add('active');
        } else {
            superIcon.classList.remove('active');
            superContainer.classList.remove('active');
        }
    }

    updateSuperpowerDisplay();

    const inventory = {};

    const sounds = {
        move: new Audio('./sounds/walking.mp3'),
        eat: new Audio('./sounds/eat.mp3'),
        kill: new Audio('./sounds/kill.mp3'),
        kick: new Audio('./sounds/kick.mp3'),
        // splash: new Audio('./sounds/splash.mp3'),
        // dig: new Audio('./sounds/dig.mp3'),
    };

    class SoundManager {
        constructor() {
            this.sounds = sounds;
            this.muted = false;
            
            // Optional: volume control per category
            this.volumes = {
                move: 0.6,
                effects: 0.8
            };
        }

        play(key, options = {}) {
            if (this.muted) return;

            const sound = this.sounds[key];
            if (!sound) {
                console.warn(`Sound "${key}" not found`);
                return;
            }

            const instance = sound.cloneNode();
            const category = options.category || 'effects';
            instance.volume = (options.volume || this.volumes[category]) ?? 1;

            if (options.randomize && Math.random() > 0.5) {
                instance.playbackRate = 0.9 + Math.random() * 0.3;
            }

            instance.play().catch(err => {
                console.log("Audio play prevented:", err);
            });

            return instance;
        }

        mute() { this.muted = true; }
        unmute() { this.muted = false; }
    }

    const sound = new SoundManager();

    function isTileAnEnemy(tileId) {
        return enemies.includes(tileId);
    }

    /**
     * Draw the initial gameplan
    */
    function drawGamePlan(gameArea, gameBlocks) {
        let i, e, b;
        for (i = 0; i < gameArea.length; i++) {
            e = document.createElement('div');
            e.innerHTML = '';
            e.className = 'tile t' + gameArea[i] + (gameBlocks[i] ? ' b' + gameBlocks[i] : '') + (isTileAnEnemy(gameBlocks[i]) ? ' flipBg' : '');
            if (isTileAnEnemy(gameBlocks[i])) {
                e.style = 'animation: flipBg 1s infinite steps(1);';
            }
            e.id = 'n' + i;
            area.appendChild(e);
        }
    };

    drawGamePlan(gameArea, gameBlocks);

    /**
     * Move Rockford
    */
    let move = function (moveLeft, moveTop, which) {
        function moveIt() {
            rockford.style.left = (area.offsetLeft + posLeft * tileSize + tileSize / 2) + 'px';
            rockford.style.top = (area.offsetTop + posTop * tileSize + tileSize / 2) + 'px';
        };

        if (which) { rockford.className = 'baddie ' + which; baddieDirection = which; }

        if (!(gameBlocks[(posLeft + moveLeft) + (posTop + moveTop) * gridSize] - 10)) {
            posLeft += moveLeft;
            posTop += moveTop;
            moveIt();
            if (soundOn) {
                sound.play('move', {
                    category: 'move', // Category for volume control, wont be used in this case as we are passing volume directly below.
                    volume: 0.1, // What volume to use, in this case 10%.
                    randomize: true // Slight variation in playback rate (kinda goofy, but more realistic)
                });
            }
        } else {  // Else means the baddie cannot move because of a wall
            console.log('Block detected, cant move.');
        }
    };
    move(1, 1, 'down');

    document.onkeydown = function (event) {
        let key;
        key = event.keyCode || event.which;
        switch (key) {
            case 37: move(-1, 0, 'left'); break;
            case 39: move(1, 0, 'right'); break;
            case 38: move(0, -1, 'up'); break;
            case 40: move(0, 1, 'down'); break;
        };
    };

    function getTileInFront() {
        let dx = 0, dy = 0;
        switch (baddieDirection) {
            case 'left': dx = -1; break;
            case 'right': dx = 1; break;
            case 'up': dy = -1; break;
            case 'down': dy = 1; break;
        }

        const x = posLeft + dx;
        const y = posTop + dy;

        if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
            return null; // There is no tiles here, return null.
        }

        const idx = x + y * gridSize;
        const block = gameBlocks[idx];

        return {id: idx, block: block, ground: gameArea[idx]}; // Returning all info about the tile, even though it's not needed for now.
    }

    function addItemToInventory(item, amount) {
        if (!inventory[item]) {
            inventory[item] = 0;
        }
        inventory[item] += amount;
    }

    function removeItemFromInventory(item, amount) {
        if (!inventory[item]) {
            inventory[item] = 0;
        }
        inventory[item] -= amount;
    }

    function handlePlayerHealthChange(add, amount) {
        if (add) {
            if (characterStats.health + amount >= 100) {
                characterStats.health = 100;
                return;
            } else {
                characterStats.health += amount;
            }
        } else {
            characterStats.health -= amount;
        }

        if (characterStats.health <= 0) {
            alert('You have died! GAME OVER!');
        }

        updateHealthBar();
    }

    function setSuperStrength(enabled) {
        characterStats.superStrength = enabled;
        if (enabled) {
            alert('You feel a surge of power! You now have super strength!');
        } else {
            alert('You feel your super strength fade away.');
        }
        updateSuperpowerDisplay();
    }

    function eatFood(health, superpower) {
        sound.play('eat', {
            category: 'eat', // Category for volume control, wont be used in this case as we are passing volume directly below.
            volume: 0.1, // What volume to use, in this case 10%.
            randomize: false // Slight variation in playback rate (kinda goofy, but more realistic)
        });

        if (health) {
            handlePlayerHealthChange(true, health);
        }

        if (superpower) {
            setSuperStrength(true);
        }
    }

    function action () {
        const tile = getTileInFront();
        if (tile === null) {
            console.log('There is no tile in front of Rockford.');
            return;
        }

        if (tile.block === 24) { // Closed chest in house
            gameBlocks[tile.id] = 25;
            document.getElementById('n' + tile.id).className = 'tile t' + gameArea[tile.id] + ' b25';
            addItemToInventory("door_key", 1);
            alert('You found a key in the chest!');
        } else if (tile.block === 25) {
            console.log('This chest at tile ' + tile.id + ' is already open.');
        } else if (tile.block === 18) { // Door
            if (inventory["door_key"] > 0) {
                gameBlocks[tile.id] = 10;
                gameArea[tile.id] = 25;
                document.getElementById('n' + tile.id).className = 'tile t25 b10';
                removeItemFromInventory("door_key", 1);
            } else {
                alert('The door is locked, you need a key to open it.');
            }
        } else if (tile.block === 48) { // Food item that gives health
            alert('Wow, I really hate these creatures...');
        } else if (tile.block === 80) { // Food item that gives super strength
            eatFood(20, true);
            gameBlocks[tile.id] = 10;
            document.getElementById('n' + tile.id).className = 'tile t' + gameArea[tile.id] + ' b10';
        } else if (tile.block === 90) { // Troll enemy
            if (characterStats.superStrength) {
                setSuperStrength(false);
                sound.play('kick', {
                category: 'effects', // Category for volume control, wont be used in this case as we are passing volume directly below.
                volume: 0.25, // What volume to use, in this case 10%.
                randomize: false // Slight variation in playback rate (kinda goofy, but more realistic)
            });
            } else {
                alert('You lost 20 health for trying to defeat the troll without super strength!');
                handlePlayerHealthChange(false, 20);
                return;
            }
            gameBlocks[tile.id] = 10;
            document.getElementById('n' + tile.id).className = 'tile t' + gameArea[tile.id] + ' b' + gameBlocks[tile.id];
            document.getElementById('n' + tile.id).style = '';
            sound.play('kill', {
                category: 'effects', // Category for volume control, wont be used in this case as we are passing volume directly below.
                volume: 0.25, // What volume to use, in this case 10%.
                randomize: false // Slight variation in playback rate (kinda goofy, but more realistic)
            });
            alert('You defeated the troll!');
        }
    }

    document.onkeyup = function (event) {
        let key;
        key = event.keyCode || event.which;
        switch (key) {
            case 13: action(); break;
        };
    }
});