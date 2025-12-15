export const MUSIC_FILES = {
    soviet: 'audio/soviet-theme.mp3',
    leaf: 'audio/naruto-theme.mp3',
    southpark: 'audio/south-park-theme.mp3'
};

export const DIFFICULTIES = {
    easy: { speed: 2.5, pipeInterval: 2200, gap: 150, enemyChance: 0 },
    normal: { speed: 3, pipeInterval: 1700, gap: 170, enemyChance: 0.002 },
    hard: { speed: 4, pipeInterval: 1400, gap: 150, enemyChance: 0.005 }
};

export const THEMES = {
    soviet: { bgSky: '#5D6D7E', bgGround: '#2C3E50', pipeMain: '#5D6D7E', pipeStroke: '#17202A', clouds: false, factories: true, mountains: false, lifeIcon: '⭐' },
    leaf: { bgSky: '#85C1E9', bgGround: '#58D68D', pipeMain: '#A04000', pipeStroke: '#6E2C00', clouds: true, factories: false, mountains: false, lifeIcon: '🍜' },
    southpark: { bgSky: '#AED6F1', bgGround: '#FBFCFC', pipeMain: '#2ECC71', pipeStroke: '#27AE60', clouds: true, factories: false, mountains: true, lifeIcon: '🧀' }
};

export const CHARACTERS = {
    cartman: { color: '#E74C3C', hat: '#3498DB', face: '#F5CBA7' },
    naruto: { color: '#F39C12', hair: '#F1C40F', face: '#F5CBA7' },
    killua: { color: '#34495E', hair: '#ECF0F1', face: '#FDFEFE' },
    stalin: { color: '#6E2C00', uniform: '#D4AC0D', face: '#F5CBA7' },
    mussolini: { color: '#212F3C', uniform: '#212F3C', face: '#F5CBA7' },
    kimj: { color: '#2C3E50', suit: '#2C3E50', face: '#F5CBA7' },
    // Kim K: Silver Shirt, Tan Skin, Black Hair
    kimk: { color: '#C0C0C0', hair: '#000000', face: '#E0AC69' }
};
