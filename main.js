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
        currentDimension = 1,
        enemies = [90, 91]; // Add all block IDs that are enemies in here. 90 is a big troll.

    const dimensions = { // These names are only for testing purposes. You can set the real names later.
        1: 'Main Dimension',
        2: 'Hell Dimension',
    }

    var gameArea = {
        1: [ // Dimension 1
            24, 24, 24, 24, 24, 24, 24, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12,
            24, 24, 24, 49, 49, 24, 24, 13, 14, 12, 13, 14, 12, 46, 14, 12, 47, 14, 12, 45, 14, 12, 13, 14,
            24, 24, 24, 24, 24, 24, 24, 12, 13, 14, 45, 13, 14, 12, 13, 14, 12, 26, 26, 12, 13, 14, 12, 13,
            24, 24, 44, 24, 24, 44, 24, 14, 12, 13, 14, 12, 13, 14, 12, 47, 14, 12, 13, 13, 12, 13, 14, 12,
            24, 24, 24, 24, 24, 24, 24, 45, 14, 12, 13, 14, 12, 45, 14, 12, 12, 13, 14, 13, 40, 12, 13, 14,
            14, 12, 13, 14, 12, 46, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 40, 12, 13,
            13, 14, 12, 13, 48, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12,
            14, 12, 13, 45, 12, 13, 14, 16, 16, 14, 12, 16, 46, 12, 29, 30, 33, 33, 33, 33, 33, 14, 27, 13, // water start
            13, 14, 12, 13, 14, 12, 13, 14, 16, 17, 14, 17, 13, 15, 30, 28, 30, 31, 28, 29, 28, 33, 27, 28,
            12, 13, 14, 12, 13, 14, 12, 13, 15, 15, 13, 45, 12, 30, 28, 30, 31, 30, 29, 30, 30, 28, 30, 14, // three tombs in a row
            14, 12, 13, 45, 12, 13, 14, 12, 15, 15, 17, 17, 29, 28, 29, 31, 30, 31, 28, 30, 31, 28, 29, 28,
            13, 14, 12, 13, 14, 12, 13, 14, 12, 17, 17, 15, 13, 29, 28, 31, 30, 29, 28, 31, 30, 28, 29, 12,
            12, 13, 46, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 28, 30, 31, 28, 29, 28, 30, 31, 30, 31, 14,
            14, 45, 13, 14, 12, 13, 14, 16, 13, 14, 45, 13, 14, 17, 16, 16, 16, 13, 14, 12, 13, 16, 19, 21, // graveyard wall
            13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 17, 13, 14, 12, 16, 16, 12, 13, 19, 18, 18, 21, 21,
            12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 17, 12, 13, 19, 18, 21, 21, 21, 21, 21,
            14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 15, 16, 14, 12, 20, 21, 21, 21, 21, 21, 21,
            13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 15, 15, 13, 19, 21, 21, 21, 21, 21, 21, 21,
            12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 45, 14, 12, 20, 21, 21, 21, 21, 21, 21, 21,
            14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 22, 21, 21, 21, 21, 21, 21, 21,
            13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 22, 21, 21, 21, 21, 21, 21,
            12, 60, 14, 60, 13, 14, 12, 13, 14, 12, 13, 46, 12, 13, 14, 12, 13, 14, 22, 21, 21, 21, 21, 21,
            14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 12, 13, 14, 22, 21, 21, 21, 21,
        ],
        2: [ // Dimension 2
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
    };

    /**
     * These are blocks that cant be moved to, or something happens when you try to move on them.
     * The blocks are drawn "on top" of the gamearea. Block 10 is empty, should be 0 but looks nicer with two figures.
     */
    var gameBlocks = {
        1: [ // Dimension 1
            22, 20, 21, 23, 20, 22, 23, 26, 60, 26, 26, 26, 26, 26, 26, 26, 26, 28, 28, 26, 26, 26, 26, 26,
            20, 10, 70, 10, 10, 24, 20, 10, 10, 10, 10, 27, 26, 10, 10, 10, 10, 28, 28, 10, 10, 10, 60, 26,
            21, 10, 10, 10, 10, 10, 21, 80, 26, 27, 10, 26, 10, 10, 10, 10, 90, 10, 10, 10, 26, 10, 27, 26,
            20, 70, 10, 10, 70, 10, 22, 26, 27, 10, 10, 10, 10, 10, 10, 10, 27, 28, 28, 26, 27, 10, 10, 26,
            22, 21, 71, 18, 72, 20, 20, 10, 26, 10, 10, 10, 26, 10, 10, 26, 26, 28, 28, 28, 10, 26, 10, 26,
            26, 10, 10, 10, 10, 10, 26, 10, 10, 10, 26, 27, 26, 26, 26, 26, 28, 28, 28, 28, 28, 10, 10, 26,
            27, 10, 26, 10, 10, 10, 90, 10, 10, 27, 26, 61, 27, 27, 26, 10, 10, 28, 28, 28, 28, 28, 10, 26,
            26, 80, 26, 10, 10, 10, 26, 10, 60, 26, 27, 10, 10, 37, 36, 38, 40, 40, 38, 37, 36, 28, 10, 28, // Water
            27, 27, 27, 26, 27, 27, 26, 27, 26, 27, 10, 10, 38, 44, 10, 10, 10, 50, 10, 10, 10, 40, 10, 28, // Water
            26, 26, 60, 26, 26, 10, 10, 10, 10, 10, 10, 10, 46, 10, 10, 49, 10, 10, 10, 41, 10, 10, 10, 26,
            26, 61, 27, 10, 10, 10, 27, 26, 10, 10, 10, 10, 91, 10, 10, 10, 10, 73, 10, 10, 10, 10, 10, 26, // fountain
            27, 27, 10, 10, 10, 10, 61, 60, 27, 26, 10, 26, 47, 10, 10, 43, 10, 10, 10, 10, 10, 48, 10, 26,
            27, 26, 10, 10, 10, 10, 10, 26, 26, 27, 61, 26, 38, 44, 10, 10, 10, 42, 10, 45, 10, 10, 10, 26,
            60, 10, 26, 27, 26, 27, 10, 10, 10, 10, 10, 26, 60, 40, 30, 36, 38, 36, 39, 39, 30, 38, 30, 37, // Graveyard stone wall
            26, 10, 10, 10, 10, 10, 26, 27, 10, 10, 10, 61, 26, 27, 61, 12, 10, 10, 10, 10, 10, 10, 10, 62,
            27, 10, 27, 27, 26, 10, 10, 61, 27, 27, 10, 10, 10, 10, 92, 12, 10, 10, 10, 10, 62, 10, 10, 63, // quest character
            26, 10, 26, 80, 27, 27, 10, 10, 10, 10, 26, 27, 26, 10, 10, 96, 10, 10, 10, 10, 10, 10, 10, 62, // upper gate
            27, 10, 27, 10, 10, 10, 26, 26, 60, 10, 10, 10, 27, 27, 10, 95, 10, 10, 10, 63, 10, 10, 10, 63, // lower gate
            61, 10, 10, 10, 27, 10, 10, 10, 10, 27, 26, 10, 26, 10, 10, 12, 10, 10, 10, 10, 10, 62, 10, 63,
            61, 74, 10, 74, 27, 26, 27, 27, 10, 10, 27, 10, 27, 10, 10, 26, 12, 10, 63, 10, 10, 10, 10, 63,
            19, 19, 18, 19, 19, 88, 10, 26, 10, 10, 26, 10, 27, 10, 27, 27, 12, 10, 10, 10, 10, 10, 10, 63,
            19, 10, 75, 10, 19, 10, 10, 90, 10, 27, 27, 10, 10, 10, 26, 27, 10, 12, 10, 10, 10, 10, 18, 63,
            19, 19, 19, 19, 19, 27, 60, 26, 27, 26, 26, 27, 26, 26, 26, 60, 26, 12, 26, 63, 63, 63, 63, 62,
        ],
        2: [ // Dimension 2
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
            26, 61, 27, 10, 10, 10, 27, 26, 10, 10, 10, 10, 10, 10, 10, 10, 10, 73, 10, 10, 10, 10, 10, 26, // fountain
            27, 27, 10, 10, 10, 10, 61, 60, 27, 26, 10, 26, 47, 10, 10, 41, 10, 10, 10, 10, 10, 48, 10, 26,
            27, 26, 10, 10, 10, 10, 10, 26, 26, 27, 61, 26, 38, 44, 10, 10, 10, 42, 10, 45, 10, 10, 10, 26,
            60, 10, 26, 27, 26, 27, 10, 10, 10, 10, 10, 26, 60, 40, 30, 36, 38, 36, 39, 39, 30, 38, 30, 37, // Graveyard stone wall
            26, 10, 10, 10, 10, 10, 26, 27, 10, 10, 10, 61, 26, 27, 10, 12, 10, 10, 10, 10, 10, 10, 10, 62,
            27, 10, 27, 27, 26, 10, 10, 26, 27, 27, 10, 10, 10, 10, 10, 12, 10, 10, 10, 10, 62, 10, 10, 63,
            26, 10, 26, 10, 27, 27, 10, 10, 10, 10, 26, 27, 26, 10, 10, 96, 10, 10, 10, 10, 10, 10, 10, 62,
            27, 10, 27, 10, 10, 10, 26, 26, 27, 10, 10, 10, 27, 27, 10, 95, 10, 10, 10, 63, 10, 10, 10, 63,
            61, 10, 10, 10, 27, 10, 10, 10, 10, 27, 26, 10, 26, 10, 10, 12, 10, 10, 10, 10, 10, 62, 10, 63,
            61, 74, 10, 74, 27, 26, 27, 27, 10, 10, 27, 10, 27, 10, 10, 26, 12, 10, 63, 10, 10, 10, 10, 63,
            19, 19, 10, 19, 19, 88, 10, 26, 10, 10, 26, 10, 27, 10, 27, 27, 12, 10, 10, 10, 10, 10, 10, 63,
            19, 10, 88, 10, 19, 27, 10, 10, 10, 27, 27, 10, 10, 10, 26, 27, 10, 12, 10, 10, 10, 10, 18, 63,
            10, 10, 10, 10, 10, 10, 10, 10, 10, 26, 26, 27, 26, 26, 26, 60, 26, 12, 26, 63, 63, 63, 63, 62,
        ],
    };

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
        openChest: new Audio('./sounds/open-chest.mp3'),
        ghost: new Audio('./sounds/jfk-ghost.mp3'),
        dumbledore: new Audio('./sounds/dumbledore.mp3'),
        damage: new Audio('./sounds/bone-crack.mp3'),
        gameover: new Audio('./sounds/gameover.mp3')
    };

    class SoundManager {
        constructor() {
            this.sounds = sounds;
            this.muted = false;
            this.activeInstances = new Set();
            
            this.volumes = {
                move: 0.6,
                effects: 0.8,
                eat: 0.7,
            };
        }

        play(key, options = {}) {
            if (this.muted) return null;

            const sound = this.sounds[key];
            if (!sound) {
                console.warn(`Sound "${key}" not found`);
                return null;
            }

            const instance = sound.cloneNode(true);
            
            const category = options.category || 'effects';
            instance.volume = (options.volume !== undefined ? options.volume : this.volumes[category]) ?? 1;

            if (options.randomize && Math.random() > 0.5) {
                instance.playbackRate = 0.9 + Math.random() * 0.3;
            }

            this.activeInstances.add(instance);

            instance.addEventListener('ended', () => {
                this.activeInstances.delete(instance);
            }, { once: true });

            instance.play().catch(err => {
                console.log("Audio play prevented:", err);
            });

            return instance;
        }

        stop(instance, fadeOutMs = 400) {
            if (!instance) return;
            
            if (fadeOutMs > 0) {
                const startVol = instance.volume;
                const step = startVol / (fadeOutMs / 20);
                const interval = setInterval(() => {
                    instance.volume = Math.max(0, instance.volume - step);
                    if (instance.volume <= 0.01) {
                        instance.pause();
                        instance.currentTime = 0;
                        clearInterval(interval);
                        this.activeInstances.delete(instance);
                    }
                }, 20);
            } else {
                instance.pause();
                instance.currentTime = 0;
                this.activeInstances.delete(instance);
            }
        }

        stopAll() {
            for (const instance of this.activeInstances) {
                instance.pause();
                instance.currentTime = 0;
            }
            this.activeInstances.clear();
        }

        mute() {
            this.muted = true;
            this.stopAll();
        }

        unmute() {
            this.muted = false;
        }

        toggleMute() {
            if (this.muted) {
                this.unmute();
            } else {
                this.mute();
            }
            return this.muted;
        }
    }

    const sound = new SoundManager();

    const notificationContainer = document.getElementById('notifications');

    function showNotification(message, options = {}) {
        const {
            type = 'info',
            title = '',
            duration = 3500
        } = options;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let html = '';
        if (title) {
            html += `<div class="title">${title}</div>`;
        }
        html += `<div class="message">${message}</div>`;

        notification.innerHTML = html;
        notificationContainer.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        if (duration > 0) {
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 450);
            }, duration);
        }

        return notification;
    }

    function notify(msg, type, duration = 5000) {
        showNotification(msg, { type, duration });
    }

    function isTileAnEnemy(tileId) {
        return enemies.includes(tileId);
    }

    function drawGamePlan(gameover) {
        const savedPos = { left: posLeft, top: posTop, direction: baddieDirection };

        area.innerHTML = '<div id="flash-overlay"><p>GAME OVER!</p></div>';
        let i, e, b;
        for (i = 0; i < gameArea[currentDimension].length; i++) {
            e = document.createElement('div');
            e.innerHTML = '';
            e.className = 'tile t' + gameArea[currentDimension][i] + (gameBlocks[currentDimension][i] ? ' b' + gameBlocks[currentDimension][i] : '') + (isTileAnEnemy(gameBlocks[currentDimension][i]) ? ' flipBg' : '');
            if (isTileAnEnemy(gameBlocks[currentDimension][i])) {
                e.style = 'animation: flipBg 1s infinite steps(1);';
            }
            e.id = 'n' + i;
            area.appendChild(e);
        }

        rockford = document.createElement('div');
        rockford.id = 'baddie1';
        if (gameover) {
            rockford.className = 'baddie down';
        } else {
            rockford.className = 'baddie ' + savedPos.direction;
        }
        area.appendChild(rockford);
        if (gameover) {
            posLeft = 1,
            posTop = 1,
            baddieDirection = 'down';
        } else {
            baddieDirection = savedPos.direction;
            posLeft = savedPos.left;
            posTop = savedPos.top;
        }
        rockford.style.left = (area.offsetLeft + posLeft * tileSize + tileSize / 2) + 'px';
        rockford.style.top = (area.offsetTop + posTop * tileSize + tileSize / 2) + 'px';
    };

    drawGamePlan(false);

    const savedStandardGameArea = structuredClone(gameArea);
    const savedStandardGameBlocks = structuredClone(gameBlocks);

    function resetGamePlan() {
        if (characterStats.health > 0) { return; };
        currentDimension = 1;
        gameArea = structuredClone(savedStandardGameArea);
        gameBlocks = structuredClone(savedStandardGameBlocks);
        drawGamePlan(true);
        characterStats.health = 100;
        updateHealthBar();
        if (characterStats.superStrength) {
            setSuperStrength(false);
        }
    }

    /**
     * Move Rockford
    */
    let move = function (moveLeft, moveTop, which) {
        function moveIt() {
            rockford.style.left = (area.offsetLeft + posLeft * tileSize + tileSize / 2) + 'px';
            rockford.style.top = (area.offsetTop + posTop * tileSize + tileSize / 2) + 'px';
        };

        if (which) { rockford.className = 'baddie ' + which; baddieDirection = which; }

        if (!(gameBlocks[currentDimension][(posLeft + moveLeft) + (posTop + moveTop) * gridSize] - 10)) {
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

    function changeDimension(dimension) {
        if (dimension !== currentDimension) {
            currentDimension = dimension;
            drawGamePlan(false);
            document.getElementById('dimensionName').textContent = dimensions[currentDimension];
            notify('Wow! You have been sent to the ' + dimensions[currentDimension] + '!', 'info', 4000);
        }
    }

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
        const block = gameBlocks[currentDimension][idx];

        return { id: idx, block: block, ground: gameArea[currentDimension][idx] }; // Returning all info about the tile, even though it's not needed for now.
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
            sound.play('damage', {
                category: 'effects',
                volume: 0.25,
                randomize: false
            });
        }

        if (characterStats.health <= 0) {
            notify('You have died! GAME OVER!', 'error', 5000);
            sound.play('gameover', {
                category: 'effects',
                volume: 0.25,
                randomize: false
            });
            document.getElementById("flash-overlay").style.opacity = 1;
            setTimeout(() => {
                resetGamePlan();
            }, 1500)
            setTimeout(() => {
                document.getElementById("flash-overlay").style.opacity = 0;
            }, 5000)
        }

        updateHealthBar();
    }

    function setSuperStrength(enabled) {
        characterStats.superStrength = enabled;
        if (enabled) {
            notify('You feel a surge of power! You now have super strength!', 'success', 4000);
        } else {
            notify('Your super strength has worn off.', 'info', 4000);
        }
        updateSuperpowerDisplay();
    }

    function eatFood(health, superpower) {
        sound.play('eat', {
            category: 'eat',
            volume: 0.1,
            randomize: false
        });

        if (health) {
            handlePlayerHealthChange(true, health);
        }

        if (superpower) {
            setSuperStrength(true);
        }
    }

    var dumbledoreSound = null;

    function action() {
        const tile = getTileInFront();
        if (tile === null) {
            console.log('There is no tile in front of Rockford.');
            return;
        }

        if (tile.block === 24) { // Closed chest in house
            gameBlocks[currentDimension][tile.id] = 25;
            document.getElementById('n' + tile.id).className = 'tile t' + gameArea[currentDimension][tile.id] + ' b25';
            addItemToInventory("door_key", 1);
            sound.play('openChest', {
                category: 'effects',
                volume: 0.25,
                randomize: false
            });
            notify('You found a key in the chest!', 'success', 4000);
        } else if (tile.block === 25) {
            console.log('This chest at tile ' + tile.id + ' is already open.');
        } else if (tile.block === 18) { // Door
            if (inventory["door_key"] > 0) {
                gameBlocks[currentDimension][tile.id] = 10;
                gameArea[currentDimension][tile.id] = 25;
                document.getElementById('n' + tile.id).className = 'tile t25 b10';
                removeItemFromInventory("door_key", 1);
            } else {
                notify('The door is locked, you need a key to open it.', 'warning', 4000);
            }
        } else if (tile.block === 88) { // Closed chest in forest
            gameBlocks[tile.id] = 89;
            document.getElementById('n' + tile.id).className = 'tile t' + gameArea[tile.id] + ' b89';
            addItemToInventory("door_key", 1);
            sound.play('openChest', {
                category: 'effects',
                volume: 0.25,
                randomize: false
            });
            notify('You found a key in the chest!', 'success', 4000);
        } else if (tile.block === 89) {
            notify('This chest has already been opened', 'error', 4000);
        } else if (tile.block === 48) { // Cat-statue
            notify('Dont look at me Im not a gravestone...', 'info', 4000);
        } else if (tile.block === 80) { // Food item that gives super strength
            eatFood(20, true);
            gameBlocks[currentDimension][tile.id] = 10;
            document.getElementById('n' + tile.id).className = 'tile t' + gameArea[currentDimension][tile.id] + ' b10';
        } else if (tile.block === 90) { // Troll enemy
            if (characterStats.superStrength) {
                setSuperStrength(false);
                sound.play('kick', {
                    category: 'effects',
                    volume: 0.25,
                    randomize: false
                });
            } else {
                notify('You lost 20 health for trying to defeat the troll without super strength!', 'error', 4000);
                handlePlayerHealthChange(false, 20);
                return;
            }
            gameBlocks[currentDimension][tile.id] = 10;
            document.getElementById('n' + tile.id).className = 'tile t' + gameArea[currentDimension][tile.id] + ' b' + gameBlocks[currentDimension][tile.id];
            document.getElementById('n' + tile.id).style = '';
            sound.play('kill', {
                category: 'effects',
                volume: 0.25,
                randomize: false
            });
            notify('You defeated the troll!', 'success', 4000);
        } else if (tile.block === 91) { // Skeleton enemy
            const kennedySound = sound.play('ghost', {
                category: 'effects',
                volume: 0.25,
                randomize: false
            });
            let yearBorn = prompt('Hello my name is John F Kennedy. If you can tell me which year I was born, I will let you pass.');
            sound.stop(kennedySound, 600);
            if (yearBorn === '1917') {
                notify('Correct! You may pass.', 'success', 4000);
            } else {
                if (yearBorn === null || yearBorn === "") { return; }
                notify('Incorrect! The skeleton hits you, and you lose 20 health.', 'error', 4000);
                handlePlayerHealthChange(false, 20);
                return;
            }

            gameBlocks[currentDimension][tile.id] = 10;
            document.getElementById('n' + tile.id).className = 'tile t' + gameArea[currentDimension][tile.id] + ' b' + gameBlocks[currentDimension][tile.id];
            document.getElementById('n' + tile.id).style = '';
        } else if (tile.block === 41) { // Gravestone 1
            notify('Here lies John F Kennedy, 1917-1963.', 'info', 5000);
        } else if (tile.block === 42) { // Gravestone 2
            notify('Here lies Marilyn Monroe, 1926-1962.', 'info', 5000);
        } else if (tile.block === 43) { // Gravestone 3
            notify('Here lies Albert Einstein, 1879-1955.', 'info', 5000);
        } else if (tile.block === 49) { // Gravestone 4
            notify('Here lies Leonardo da Vinci, 1452-1519.', 'info', 5000);
        } else if (tile.block === 50) { // Gravestone 5
            notify('Here lies Cleopatra, 69 BC-30 BC.', 'info', 5000);
        } else if (tile.block === 92) { // Quest character
            if (inventory["fan"] > 0) {
                removeItemFromInventory("fan", 1);
                notify('You found it! Thank you for returning my fan. Now I will try and open the gate.', 'success', 4000);
                sound.play('openChest', {
                    category: 'effects', // Category for volume control, wont be used in this case as we are passing volume directly below.
                    volume: 0.25, // What volume to use, in this case 10%.
                    randomize: false // Slight variation in playback rate (kinda goofy, but more realistic)
                });
            } else {
                if (dumbledoreSound) {
                    sound.stop(dumbledoreSound, 600);
                }
                dumbledoreSound = sound.play('dumbledore', {
                    category: 'effects',
                    volume: 0.25,
                    randomize: false
                });
                notify('"My name is Dumbledore, Im trying to get past this gate but my magic is not working. Theres a rumor that there are a magic fan deep in the forest, if I could get my hands on that I could probably open the gate."', 'info', 10000);
                return;
            }
            gameArea[currentDimension][399] = 42;
            gameBlocks[currentDimension][399] = 10;
            gameArea[currentDimension][423] = 41;
            gameBlocks[currentDimension][423] = 10;
            document.getElementById('n399').className = 'tile t' + gameArea[currentDimension][399] + ' b' + gameBlocks[currentDimension][399];
            document.getElementById('n423').className = 'tile t' + gameArea[currentDimension][423] + ' b' + gameBlocks[currentDimension][423];
        } else if (tile.block === 75) {
            gameArea[currentDimension][tile.id] = 60;
            gameBlocks[currentDimension][tile.id] = 10;
            document.getElementById('n' + tile.id).className = 'tile t' + gameArea[currentDimension][tile.id] + ' b' + gameBlocks[currentDimension][tile.id];
            addItemToInventory("fan", 1);
            // Should add some other sound here?
            // sound.play('openChest', {
            //     category: 'effects',
            //     volume: 0.25,
            //     randomize: false
            // });
            notify('You found the fan that Dumbledore was looking for! Go back and give it to him', 'success', 10000);
        }
    }

    document.onkeydown = function (event) {
        let key;
        key = event.keyCode || event.which;
        if (characterStats.health <= 0) { return; }
        switch (key) {
            case 37: move(-1, 0, 'left'); break;
            case 39: move(1, 0, 'right'); break;
            case 38: move(0, -1, 'up'); break;
            case 40: move(0, 1, 'down'); break;
        };
    };

    document.onkeyup = function (event) {
        let key;
        key = event.keyCode || event.which;
        if (characterStats.health <= 0) { return; }
        switch (key) {
            case 13: action(); break;
            case 32: // Spacebar to switch dimension (for testing purposes only - should be removed later)
                changeDimension(currentDimension === 1 ? 2 : 1);
                break;
        };
    }
});