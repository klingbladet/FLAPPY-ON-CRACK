import { THEMES } from '../constants.js';

export class Background {
  constructor(width, height) { this.width = width; this.height = height; this.cloudOffset = 0; this.groundOffset = 0; }
  update(speed) { this.cloudOffset -= speed * 0.2; if (this.cloudOffset <= -this.width) this.cloudOffset = 0; this.groundOffset -= speed; if (this.groundOffset <= -20) this.groundOffset = 0; }
  draw(ctx, themeName) {
    const theme = THEMES[themeName]; ctx.fillStyle = theme.bgSky; ctx.fillRect(0, 0, this.width, this.height);
    this.drawDecorations(ctx, themeName);
    if (theme.clouds) { ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; for (let i = 0; i < 5; i++) { let xPos = (i * 200 + this.cloudOffset) % (this.width + 200); if (xPos < -100) xPos += this.width + 200; this.drawCloud(ctx, xPos, 100 + (i % 2) * 50); } }
    if (theme.mountains) { ctx.fillStyle = '#ECF0F1'; for (let i = 0; i < 5; i++) { let x = (i * 150 + this.cloudOffset * 0.5) % (this.width + 300); if (x < -150) x += this.width + 300; ctx.beginPath(); ctx.moveTo(x, this.height - 50); ctx.lineTo(x + 100, this.height - 250); ctx.lineTo(x + 200, this.height - 50); ctx.fill(); } }
    if (theme.factories) { ctx.fillStyle = '#2C3E50'; for (let i = 0; i < 6; i++) { let x = (i * 120 + this.cloudOffset * 0.5) % (this.width + 120); if (x < -100) x += this.width + 120; ctx.fillRect(x, this.height - 150 - (i % 2) * 30, 60, 200); ctx.fillStyle = '#F4D03F'; ctx.fillRect(x + 10, this.height - 120, 10, 10); ctx.fillStyle = '#2C3E50'; } }
    ctx.fillStyle = theme.bgGround; ctx.fillRect(0, this.height - 50, this.width, 50); ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(0, this.height - 50, this.width, 5); ctx.fillStyle = 'rgba(0,0,0,0.1)'; for (let i = 0; i < this.width + 20; i += 20) { ctx.beginPath(); ctx.moveTo(i + this.groundOffset, this.height - 50); ctx.lineTo(i + this.groundOffset - 15, this.height); ctx.lineTo(i + this.groundOffset - 10, this.height); ctx.lineTo(i + this.groundOffset + 5, this.height - 50); ctx.fill(); }
  }
  drawDecorations(ctx, theme) {
    ctx.save(); ctx.globalAlpha = 0.4;
    for (let i = 0; i < 6; i++) {
      let x = (i * 250 + this.cloudOffset * 0.8) % (this.width + 250); if (x < -100) x += this.width + 250; let y = 100 + (i * 50) % 300;
      ctx.translate(x, y); ctx.rotate(this.cloudOffset * 0.01 + i);
      if (theme === 'soviet') { ctx.strokeStyle = '#922B21'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 20, 0.5, Math.PI * 1.5); ctx.stroke(); ctx.fillStyle = '#922B21'; ctx.fillRect(-5, 0, 8, 20); }
      else if (theme === 'leaf') { ctx.fillStyle = '#34495E'; ctx.beginPath(); ctx.moveTo(0, -20); ctx.lineTo(8, 0); ctx.lineTo(0, 20); ctx.lineTo(-8, 0); ctx.fill(); }
      else if (theme === 'southpark') { ctx.strokeStyle = '#D6EAF8'; ctx.lineWidth = 4; for (let j = 0; j < 3; j++) { ctx.beginPath(); ctx.moveTo(0, -20); ctx.lineTo(0, 20); ctx.stroke(); ctx.rotate(Math.PI / 3); } }
      ctx.rotate(-(this.cloudOffset * 0.01 + i)); ctx.translate(-x, -y);
    }
    ctx.restore();
  }
  drawCloud(ctx, x, y) { ctx.beginPath(); ctx.arc(x, y, 30, 0, Math.PI * 2); ctx.arc(x + 25, y - 10, 35, 0, Math.PI * 2); ctx.arc(x + 50, y, 30, 0, Math.PI * 2); ctx.fill(); }
}
