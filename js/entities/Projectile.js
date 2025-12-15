import { Entity } from './Entity.js';

export class Projectile extends Entity {
  constructor(x, y, targetX, targetY, theme) {
    super(x, y, 15, 15, '#fff');
    this.theme = theme;
    this.speed = 10;
    const dx = targetX - x; const dy = targetY - y; const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 0) { this.vx = (dx / dist) * this.speed; this.vy = (dy / dist) * this.speed; } else { this.vx = this.speed; this.vy = 0; }
    this.rotation = Math.atan2(this.vy, this.vx);
    this.spinAngle = 0;
  }
  update() {
    this.x += this.vx; this.y += this.vy; this.rotation += 0.2; this.spinAngle += 0.5;
    if (this.x < 0 || this.x > 2000 || this.y < 0 || this.y > 2000) this.markedForDeletion = true;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.spinAngle);
    if (this.theme === 'soviet') {
      ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 8, 0.5, Math.PI * 1.5); ctx.stroke(); ctx.fillStyle = '#FFD700'; ctx.fillRect(-2, 0, 4, 10);
    } else if (this.theme === 'leaf') {
      ctx.fillStyle = '#2C3E50'; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 2); ctx.moveTo(0, 0); ctx.lineTo(8, 4); ctx.lineTo(0, 12); ctx.lineTo(-8, 4); } ctx.fill(); ctx.fillStyle = '#EEE'; ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = '#D6EAF8'; ctx.beginPath(); for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 2); ctx.moveTo(0, 0); ctx.lineTo(4, 10); ctx.lineTo(-4, 10); } ctx.fill();
    }
    ctx.restore();
  }
}
