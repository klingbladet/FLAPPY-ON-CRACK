import { Entity } from './Entity.js';

export class Particle extends Entity {
  constructor(x, y, color = null) {
    const c = color || `hsl(${Math.random() * 360}, 100%, 50%)`; super(x, y, Math.random() * 5 + 2, Math.random() * 5 + 2, c); this.vx = (Math.random() - 0.5) * 10; this.vy = (Math.random() - 0.5) * 10; this.life = 1.0;
  }
  update() { this.x += this.vx; this.y += this.vy; this.life -= 0.02; if (this.life <= 0) this.markedForDeletion = true; }
  draw(ctx) { ctx.globalAlpha = this.life; super.draw(ctx); ctx.globalAlpha = 1.0; }
}
