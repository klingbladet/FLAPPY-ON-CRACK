import { Entity } from './Entity.js';
import { THEMES } from '../constants.js';

export class Pipe extends Entity {
  constructor(x, y, width, height, type, theme) {
    super(x, y, width, height, '#73bf2e');
    this.type = type; this.theme = theme; this.passed = false; this.mainColor = THEMES[theme].pipeMain; this.strokeColor = THEMES[theme].pipeStroke;
  }
  update(speed) { this.x -= speed; if (this.x + this.width < 0) this.markedForDeletion = true; }
  draw(ctx) {
    ctx.fillStyle = this.mainColor; ctx.strokeStyle = this.strokeColor; ctx.lineWidth = 2; ctx.fillRect(this.x, this.y, this.width, this.height); ctx.strokeRect(this.x, this.y, this.width, this.height);
    const capHeight = 20; const capExtension = 4; let capY = this.type === 'top' ? this.y + this.height - capHeight : this.y;
    ctx.fillRect(this.x - capExtension, capY, this.width + (capExtension * 2), capHeight); ctx.strokeRect(this.x - capExtension, capY, this.width + (capExtension * 2), capHeight);
    ctx.globalAlpha = 0.2; ctx.fillStyle = '#000';
    if (this.theme === 'leaf') { ctx.beginPath(); ctx.arc(this.x + 30, this.y + 30, 10, 0, Math.PI * 2); ctx.fill(); }
    else if (this.theme === 'soviet') { ctx.fillRect(this.x + 5, capY + 5, 4, 4); ctx.fillRect(this.x + this.width - 9, capY + 5, 4, 4); }
    ctx.globalAlpha = 1.0;
  }
}
