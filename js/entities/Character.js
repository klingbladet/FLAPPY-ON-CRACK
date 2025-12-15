import { Entity } from './Entity.js';
import { CHARACTERS } from '../constants.js';

export class Character extends Entity {
  constructor(gameHeight, type = 'cartman') {
    super(50, gameHeight / 2, 40, 40, CHARACTERS[type].color);
    this.type = type; this.velocity = 0; this.gravity = 0.5; this.jumpStrength = -8; this.rotation = 0; this.gameHeight = gameHeight; this.invincible = false; this.invincibleTimer = 0; this.hue = 0;
  }
  flap() { this.velocity = this.jumpStrength; }
  activateStar() { this.invincible = true; this.invincibleTimer = 180; }
  update() {
    this.velocity += this.gravity; this.y += this.velocity;
    if (this.velocity < 0) this.rotation = -25 * (Math.PI / 180);
    else { this.rotation += 2 * (Math.PI / 180); if (this.rotation > 90 * (Math.PI / 180)) this.rotation = 90 * (Math.PI / 180); }
    if (this.invincible) { this.invincibleTimer--; this.hue += 10; if (this.invincibleTimer <= 0) this.invincible = false; }
    if (this.y + this.height > this.gameHeight - 50) { this.y = this.gameHeight - 50 - this.height; return 'ground'; }
    if (this.y < 0) { this.y = 0; this.velocity = 0; }
    return false;
  }
  draw(ctx) {
    ctx.save(); ctx.translate(this.x + this.width / 2, this.y + this.height / 2); ctx.rotate(this.rotation);
    let config = CHARACTERS[this.type];
    if (this.invincible) { ctx.shadowBlur = 15; ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`; }
    this.drawSpecificCharacter(ctx, config); ctx.restore();
  }
  drawSpecificCharacter(ctx, config) {
    ctx.fillStyle = config.face;
    if (this.type === 'cartman') { ctx.fillStyle = config.color; ctx.beginPath(); ctx.arc(0, 10, 22, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = config.face; ctx.beginPath(); ctx.arc(0, -5, 18, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(0, 5, 10, 0, Math.PI); ctx.stroke(); ctx.fillStyle = config.hat; ctx.beginPath(); ctx.arc(0, -10, 19, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#F1C40F'; ctx.beginPath(); ctx.ellipse(0, -28, 5, 3, 0, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.moveTo(-18, -10); ctx.lineTo(18, -10); ctx.stroke(); }
    else if (this.type === 'naruto') { ctx.fillStyle = config.color; ctx.fillRect(-15, 10, 30, 20); ctx.fillStyle = config.face; ctx.beginPath(); ctx.arc(0, -5, 16, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = config.hair; ctx.beginPath(); for (let i = 0; i < 7; i++) { ctx.lineTo(-20 + (i * 6), -30 + (Math.random() * 10)); ctx.lineTo(-17 + (i * 6), -15); } ctx.fill(); ctx.fillStyle = '#2C3E50'; ctx.fillRect(-16, -18, 32, 6); ctx.fillStyle = '#95A5A6'; ctx.fillRect(-8, -17, 16, 4); ctx.strokeStyle = '#000'; ctx.beginPath(); ctx.moveTo(-12, -2); ctx.lineTo(-6, -1); ctx.moveTo(-12, 1); ctx.lineTo(-6, 2); ctx.moveTo(-12, 4); ctx.lineTo(-6, 5); ctx.moveTo(12, -2); ctx.lineTo(6, -1); ctx.moveTo(12, 1); ctx.lineTo(6, 2); ctx.moveTo(12, 4); ctx.lineTo(6, 5); ctx.stroke(); }
    else if (this.type === 'killua') { ctx.fillStyle = config.color; ctx.fillRect(-15, 10, 30, 20); ctx.fillStyle = config.face; ctx.beginPath(); ctx.arc(0, -5, 15, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = config.hair; ctx.beginPath(); ctx.moveTo(-20, -10); ctx.lineTo(-25, -25); ctx.lineTo(-10, -15); ctx.lineTo(0, -30); ctx.lineTo(10, -15); ctx.lineTo(25, -25); ctx.lineTo(20, -10); ctx.fill(); ctx.fillStyle = '#2E86C1'; ctx.beginPath(); ctx.ellipse(-6, -2, 4, 2, 0.2, 0, Math.PI * 2); ctx.ellipse(6, -2, 4, 2, -0.2, 0, Math.PI * 2); ctx.fill(); }
    else if (this.type === 'stalin') { ctx.fillStyle = config.color; ctx.fillRect(-18, 8, 36, 22); ctx.fillStyle = config.face; ctx.fillRect(-15, -20, 30, 30); ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.moveTo(-15, -15); ctx.quadraticCurveTo(0, -25, 15, -15); ctx.lineTo(15, -22); ctx.quadraticCurveTo(0, -32, -15, -22); ctx.fill(); ctx.fillStyle = '#000'; ctx.beginPath(); ctx.moveTo(-10, 5); ctx.quadraticCurveTo(0, 0, 10, 5); ctx.quadraticCurveTo(12, 8, 8, 8); ctx.quadraticCurveTo(0, 5, -8, 8); ctx.quadraticCurveTo(-12, 8, -10, 5); ctx.fill(); }
    else if (this.type === 'mussolini') { ctx.fillStyle = config.color; ctx.fillRect(-18, 8, 36, 22); ctx.fillStyle = config.face; ctx.beginPath(); ctx.ellipse(0, -8, 16, 18, 0, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#D68910'; ctx.beginPath(); ctx.arc(0, 8, 5, 0, Math.PI); ctx.stroke(); }
    else if (this.type === 'kimj') { ctx.fillStyle = config.suit; ctx.fillRect(-18, 8, 36, 22); ctx.fillStyle = config.face; ctx.beginPath(); ctx.arc(0, -5, 18, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#000'; ctx.fillRect(-18, -25, 36, 10); ctx.strokeStyle = '#000'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-12, -5); ctx.lineTo(-2, -5); ctx.moveTo(2, -5); ctx.lineTo(12, -5); ctx.stroke(); }
    else if (this.type === 'kimk') {
      // Body (Silver shirt)
      ctx.fillStyle = config.color; ctx.fillRect(-15, 10, 30, 20);
      // Hair (DRAW FIRST so it's behind the face)
      ctx.fillStyle = config.hair; ctx.beginPath(); ctx.moveTo(-16, -15); ctx.quadraticCurveTo(0, -25, 16, -15); ctx.lineTo(18, 15); ctx.lineTo(-18, 15); ctx.fill();
      // Face (DRAW SECOND so it sits on top of the hair)
      ctx.fillStyle = config.face; ctx.beginPath(); ctx.arc(0, -5, 16, 0, Math.PI * 2); ctx.fill();
      // Sunglasses
      ctx.fillStyle = '#111'; ctx.fillRect(-14, -8, 12, 6); ctx.fillRect(2, -8, 12, 6); ctx.fillRect(-2, -7, 4, 2);
    }

    if (this.type !== 'killua' && this.type !== 'kimk') { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-6, -5, 4, 0, Math.PI * 2); ctx.arc(6, -5, 4, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(-5, -5, 2, 0, Math.PI * 2); ctx.arc(7, -5, 2, 0, Math.PI * 2); ctx.fill(); }
  }
}
