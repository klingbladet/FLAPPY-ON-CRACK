import { MUSIC_FILES, DIFFICULTIES, THEMES } from './constants.js';
import { Background } from './components/Background.js';
import { Character } from './entities/Character.js';
import { Pipe } from './entities/Pipe.js';
import { Particle } from './entities/Particle.js';
import { PowerUp } from './entities/PowerUp.js';
import { Enemy } from './entities/Enemy.js';
import { Projectile } from './entities/Projectile.js';
import { EnemyProjectile } from './entities/EnemyProjectile.js';

export class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.currentDifficulty = 'normal';
    // DEFAULT CHAR: NARUTO, DEFAULT THEME: LEAF
    this.currentCharacter = 'naruto';
    this.currentTheme = 'leaf';
    this.username = "PLAYER";
    this.lastTime = 0; this.score = 0; this.lives = 1; this.knifeCount = 0; this.isRunning = false; this.isGameOver = false;
    this.bird = null; this.background = new Background(this.canvas.width, this.canvas.height);
    this.pipes = []; this.particles = []; this.powerups = []; this.enemies = []; this.projectiles = []; this.enemyProjectiles = []; this.hurtTimer = 0; this.mousePos = { x: 0, y: 0 }; this.speed = 3;
    this.scoreEl = document.getElementById('score-display'); this.livesEl = document.getElementById('lives-display'); this.knifeEl = document.getElementById('knife-display'); this.finalScoreEl = document.getElementById('final-score');
    this.startScreen = document.getElementById('start-screen'); this.gameOverScreen = document.getElementById('game-over-screen'); this.usernameInput = document.getElementById('username-input');
    this.currentMusic = null;
    this.setupInputs(); this.setupUI(); this.background.draw(this.ctx, this.currentTheme);
  }

  resize() {
    const container = this.canvas.parentElement; this.canvas.width = container.clientWidth; this.canvas.height = container.clientHeight;
    if (this.background) { this.background.width = this.canvas.width; this.background.height = this.canvas.height; }
  }

  setupUI() {
    document.querySelectorAll('#theme-selector .opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { document.querySelectorAll('#theme-selector .opt-btn').forEach(b => b.classList.remove('selected')); e.target.classList.add('selected'); this.currentTheme = e.target.dataset.theme; this.background.draw(this.ctx, this.currentTheme); });
    });
    document.querySelectorAll('#char-selector .opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { document.querySelectorAll('#char-selector .opt-btn').forEach(b => b.classList.remove('selected')); e.target.classList.add('selected'); this.currentCharacter = e.target.dataset.char; });
    });
    document.querySelectorAll('#diff-selector .opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { document.querySelectorAll('#diff-selector .opt-btn').forEach(b => b.classList.remove('selected')); e.target.classList.add('selected'); this.currentDifficulty = e.target.dataset.diff; });
    });
    document.getElementById('start-btn').addEventListener('click', () => { if (this.usernameInput.value.trim() !== "") this.username = this.usernameInput.value.trim(); this.start(); });
    document.getElementById('restart-btn').addEventListener('click', () => { this.gameOverScreen.classList.add('hidden'); this.start(); });
    document.getElementById('menu-btn').addEventListener('click', () => { this.gameOverScreen.classList.add('hidden'); this.startScreen.classList.remove('hidden'); this.background.draw(this.ctx, this.currentTheme); });
  }

  setupInputs() {
    window.addEventListener('keydown', (e) => {
      if (this.isRunning) {
        if (e.code === 'Space') this.bird.flap();
        if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && !e.repeat) this.shoot();
      }
    });
    this.canvas.addEventListener('touchstart', (e) => { if (this.isRunning) { e.preventDefault(); this.bird.flap(); } }, { passive: false });
    this.canvas.addEventListener('mousedown', (e) => { if (this.isRunning && e.button === 0) this.bird.flap(); });
    this.canvas.addEventListener('contextmenu', (e) => { e.preventDefault(); if (this.isRunning) this.shoot(); });
    const fireBtn = document.getElementById('fire-btn');
    fireBtn.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); if (this.isRunning) this.shoot(); }, { passive: false });
    fireBtn.addEventListener('mousedown', (e) => { e.stopPropagation(); if (this.isRunning) this.shoot(); });
  }

  shoot() {
    if (this.knifeCount <= 0) return;
    this.knifeCount--; this.updateKnifeDisplay();

    let targetX = this.bird.x + 500; let targetY = this.bird.y + this.bird.height / 2;
    let closestEnemy = null; let minDistance = Infinity;
    this.enemies.forEach(enemy => {
      if (enemy.x > this.bird.x) {
        const dx = enemy.x - this.bird.x; const dy = enemy.y - this.bird.y; const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDistance) { minDistance = dist; closestEnemy = enemy; }
      }
    });
    if (closestEnemy) { targetX = closestEnemy.x + closestEnemy.width / 2; targetY = closestEnemy.y + closestEnemy.height / 2; }

    this.projectiles.push(new Projectile(this.bird.x + this.bird.width, this.bird.y + this.bird.height / 2, targetX, targetY, this.currentTheme));
  }

  playThemeMusic() {
    this.stopMusic();
    const fileName = MUSIC_FILES[this.currentTheme];
    if (fileName) { this.currentMusic = new Audio(fileName); this.currentMusic.loop = true; this.currentMusic.volume = 0.4; this.currentMusic.play().catch(e => console.log("Audio play blocked:", e)); }
  }
  stopMusic() { if (this.currentMusic) { this.currentMusic.pause(); this.currentMusic.currentTime = 0; this.currentMusic = null; } }

  start() {
    this.bird = new Character(this.canvas.height, this.currentCharacter);
    this.pipes = []; this.particles = []; this.powerups = []; this.enemies = []; this.projectiles = []; this.enemyProjectiles = [];
    this.score = 0; this.knifeCount = 0;
    this.scoreEl.innerText = this.score;
    this.lives = 1;
    this.updateLivesDisplay(); this.updateKnifeDisplay();
    this.isRunning = true; this.isGameOver = false;
    this.startScreen.classList.add('hidden');
    this.lastTime = performance.now(); this.pipeTimer = 0;
    const diff = DIFFICULTIES[this.currentDifficulty]; this.speed = diff.speed;
    this.playThemeMusic();
    requestAnimationFrame((t) => this.loop(t));
  }

  updateLivesDisplay() { if (this.lives > 3) this.lives = 3; let hearts = ""; const icon = THEMES[this.currentTheme].lifeIcon; for (let i = 0; i < this.lives; i++) hearts += icon; this.livesEl.innerText = hearts; }
  updateKnifeDisplay() { this.knifeEl.innerText = `🔪 ${this.knifeCount}`; }

  loop(timestamp) { if (!this.isRunning) return; const dt = timestamp - this.lastTime; this.lastTime = timestamp; this.update(dt); this.draw(); if (!this.isGameOver) requestAnimationFrame((t) => this.loop(t)); }

  update(dt) {
    const diff = DIFFICULTIES[this.currentDifficulty];
    this.speed = diff.speed + (this.score * 0.02);

    this.background.update(this.speed);
    if (this.bird.update() === 'ground') this.endGame();

    this.projectiles.forEach(p => p.update());
    this.projectiles = this.projectiles.filter(p => !p.markedForDeletion);
    this.enemyProjectiles.forEach(p => p.update());
    this.enemyProjectiles = this.enemyProjectiles.filter(p => !p.markedForDeletion);

    if (this.enemies.length < 3) {
      if (Math.random() < (diff.enemyChance + (this.score * 0.0003))) {
        const y = Math.random() * (this.canvas.height - 200) + 50;
        let type = 'normal';
        if (this.score > 50) {
          const r = Math.random();
          if (r < 0.3) type = 'big';
          else if (r < 0.6) type = 'shooter';
        } else if (this.score > 10) {
          if (Math.random() < 0.5) type = 'shooter';
        }
        this.enemies.push(new Enemy(this.canvas.width, y, this.currentTheme, type));
      }
    }

    this.enemies.forEach(enemy => {
      const shot = enemy.update();
      if (shot === 'shoot') {
        this.enemyProjectiles.push(new EnemyProjectile(enemy.x, enemy.y + enemy.height / 2));
      }

      if (!this.bird.invincible && this.bird.collidesWith(enemy)) { this.takeDamage(); enemy.markedForDeletion = true; }

      this.projectiles.forEach(proj => {
        if (proj.collidesWith(enemy)) {
          proj.markedForDeletion = true;
          enemy.health--;
          enemy.hitFlash = 5;
          if (enemy.health <= 0) {
            enemy.markedForDeletion = true;
            this.createExplosion(enemy.x, enemy.y, '#555');
            this.score += 5; this.scoreEl.innerText = this.score;
          }
        }
      });
    });
    this.enemies = this.enemies.filter(e => !e.markedForDeletion);

    this.projectiles.forEach(pProj => {
      this.enemyProjectiles.forEach(eProj => {
        if (pProj.collidesWith(eProj)) {
          pProj.markedForDeletion = true; eProj.markedForDeletion = true;
          this.createExplosion(eProj.x, eProj.y, 'orange');
        }
      });
    });

    this.enemyProjectiles.forEach(eProj => {
      if (!this.bird.invincible && this.bird.collidesWith(eProj)) {
        this.takeDamage(); eProj.markedForDeletion = true;
      }
    });

    this.pipeTimer += dt;
    if (this.pipeTimer > diff.pipeInterval) { this.spawnPipe(diff.gap); this.pipeTimer = 0; }

    this.pipes.forEach(pipe => {
      pipe.update(this.speed);
      if (!this.bird.invincible && this.bird.collidesWith(pipe)) { this.takeDamage(); pipe.markedForDeletion = true; }
      if (!pipe.passed && pipe.type === 'top' && pipe.x + pipe.width < this.bird.x) {
        this.score++; this.scoreEl.innerText = this.score; pipe.passed = true;
      }
    });
    this.pipes = this.pipes.filter(p => !p.markedForDeletion);

    this.powerups.forEach(p => {
      p.update(this.speed);
      if (this.bird.collidesWith(p)) {
        this.knifeCount += 2; this.updateKnifeDisplay();

        if (p.type === 'star') this.bird.activateStar();
        if (p.type === 'life') { if (this.lives < 3) { this.lives++; this.updateLivesDisplay(); } }
        p.markedForDeletion = true; this.createExplosion(p.x, p.y, p.type === 'life' ? 'red' : 'gold');
      }
    });
    this.powerups = this.powerups.filter(p => !p.markedForDeletion);
    this.particles.forEach(p => p.update()); this.particles = this.particles.filter(p => !p.markedForDeletion);
  }

  takeDamage() {
    if (this.bird.invincible) return;
    this.lives--; this.updateLivesDisplay(); this.createExplosion(this.bird.x, this.bird.y);
    this.bird.velocity = -5; this.bird.activateStar(); this.bird.invincibleTimer = 60;
    if (this.lives <= 0) this.endGame();
  }

  createExplosion(x, y, color) { for (let i = 0; i < 15; i++) this.particles.push(new Particle(x, y, color)); }

  spawnPipe(gap) {
    const minHeight = 50; const groundHeight = 50; const availableHeight = this.canvas.height - groundHeight - gap - (minHeight * 2); const topHeight = Math.floor(Math.random() * availableHeight) + minHeight;
    this.pipes.push(new Pipe(this.canvas.width, 0, 60, topHeight, 'top', this.currentTheme));
    this.pipes.push(new Pipe(this.canvas.width, topHeight + gap, 60, this.canvas.height - groundHeight - topHeight - gap, 'bottom', this.currentTheme));

    const powerUpY = topHeight + (gap / 2) - 17; const powerUpX = this.canvas.width + 15;
    const chance = Math.random();
    if (chance < 0.2) this.powerups.push(new PowerUp(powerUpX, powerUpY, 'star', this.currentTheme));
    else if (chance > 0.2 && chance < 0.3) this.powerups.push(new PowerUp(powerUpX, powerUpY, 'life', this.currentTheme));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.background.draw(this.ctx, this.currentTheme);
    this.pipes.forEach(pipe => pipe.draw(this.ctx));
    this.powerups.forEach(p => p.draw(this.ctx));
    this.enemies.forEach(e => e.draw(this.ctx));
    this.projectiles.forEach(p => p.draw(this.ctx));
    this.enemyProjectiles.forEach(p => p.draw(this.ctx));
    this.bird.draw(this.ctx);

    if (this.bird.invincible) {
      const maxTime = 180; // UPDATED TO MATCH 3 SECONDS (180 FRAMES)
      const currentTime = this.bird.invincibleTimer; const barWidth = this.canvas.width; const barHeight = 10;
      const fillRatio = currentTime / maxTime; this.ctx.fillStyle = '#FFD700'; this.ctx.fillRect(0, 0, barWidth * fillRatio, barHeight);
    }
    this.particles.forEach(p => p.draw(this.ctx));
  }

  endGame() {
    this.isRunning = false; this.isGameOver = true; this.stopMusic();
    this.finalScoreEl.innerText = this.score; this.saveScore(); this.updateLeaderboard();
    this.gameOverScreen.classList.remove('hidden');
  }

  saveScore() {
    let scores = JSON.parse(localStorage.getItem('flappyScores')) || [];
    scores.push({ name: this.username, score: this.score, theme: this.currentTheme });
    scores.sort((a, b) => b.score - a.score); scores = scores.slice(0, 5);
    localStorage.setItem('flappyScores', JSON.stringify(scores));
  }

  updateLeaderboard() {
    const table = document.getElementById('leaderboard-table'); table.innerHTML = '';
    const scores = JSON.parse(localStorage.getItem('flappyScores')) || [];
    scores.forEach(s => { const row = document.createElement('tr'); row.innerHTML = `<td>${s.name}</td><td>${s.score}</td>`; table.appendChild(row); });
  }
}
