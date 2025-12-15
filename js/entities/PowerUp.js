import { Entity } from './Entity.js';

export class PowerUp extends Entity {
  constructor(x, y, type, theme) {
    super(x, y, 35, 35, type === 'life' ? 'red' : 'gold');
    this.type = type; this.theme = theme; this.initialY = y; this.angle = 0;
  }
  update(speed) {
    this.x -= speed; this.angle += 0.1; this.y = this.initialY + Math.sin(this.angle) * 20;
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(ctx) {
    ctx.save(); ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    if (this.theme === 'soviet') {
      if (this.type === 'life') this.drawStar(ctx, 0, 0, 5, 15, 7, '#E74C3C', '#C0392B');
      else { ctx.rotate(Math.sin(this.angle)); ctx.fillStyle = '#F1C40F'; ctx.fillRect(-4, -10, 8, 20); ctx.fillRect(-10, -12, 20, 8); }
    } else if (this.theme === 'leaf') {
      if (this.type === 'life') { ctx.fillStyle = '#E59866'; ctx.beginPath(); ctx.arc(0, 5, 15, 0, Math.PI); ctx.fill(); ctx.fillStyle = '#F7DC6F'; ctx.beginPath(); ctx.ellipse(0, 5, 14, 4, 0, 0, Math.PI * 2); ctx.fill(); }
      else { ctx.rotate(this.angle * 2); ctx.fillStyle = '#5D6D7E'; ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(4, -4); ctx.lineTo(15, 0); ctx.lineTo(4, 4); ctx.lineTo(0, 15); ctx.lineTo(-4, 4); ctx.lineTo(-15, 0); ctx.lineTo(-4, -4); ctx.fill(); }
    } else if (this.theme === 'southpark') {
      if (this.type === 'life') { ctx.fillStyle = '#FF7F50'; ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#C0392B'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(Math.random() * 20 - 10, Math.random() * 20 - 10, 2, 0, Math.PI * 2); ctx.fill(); } }
      else { ctx.rotate(this.angle); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(0, -15); ctx.lineTo(0, 15); ctx.stroke(); ctx.rotate(Math.PI / 3); } }
    }
    ctx.restore();
  }
  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, fill, stroke) {
    let rot = Math.PI / 2 * 3; let x = cx, y = cy, step = Math.PI / spikes; ctx.beginPath(); ctx.moveTo(cx, cy - outerRadius); for (let i = 0; i < spikes; i++) { x = cx + Math.cos(rot) * outerRadius; y = cy + Math.sin(rot) * outerRadius; ctx.lineTo(x, y); rot += step; x = cx + Math.cos(rot) * innerRadius; y = cy + Math.sin(rot) * innerRadius; ctx.lineTo(x, y); rot += step; } ctx.lineTo(cx, cy - outerRadius); ctx.closePath(); ctx.lineWidth = 2; ctx.strokeStyle = stroke; ctx.stroke(); ctx.fillStyle = fill; ctx.fill();
  }
}
