import { Entity } from './Entity.js';

export class EnemyProjectile extends Entity {
  constructor(x, y) {
    super(x, y, 12, 12, '#e74c3c');
    this.speed = 6;
    this.vx = -this.speed;
  }
  update() {
    this.x += this.vx;
    if (this.x < 0) this.markedForDeletion = true;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
  }
}
