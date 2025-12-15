import { Entity } from './Entity.js';

export class Enemy extends Entity {
  constructor(x, y, theme, type) {
    const width = type === 'big' ? 80 : 40;
    const height = type === 'big' ? 80 : 40;
    super(x, y, width, height, '#000');
    this.theme = theme;
    this.type = type;
    this.vx = (type === 'big') ? 1.5 : (Math.random() * 2 + 1);
    this.wobble = Math.random() * Math.PI * 2;
    this.health = (type === 'big') ? 3 : 1;
    this.hitFlash = 0;
    this.shootTimer = Math.floor(Math.random() * 100) + 50;
  }

  update() {
    this.x -= this.vx;
    this.wobble += 0.1;
    this.y += Math.sin(this.wobble) * 2;
    if (this.hitFlash > 0) this.hitFlash--;

    if (this.type === 'shooter') {
      this.shootTimer--;
      if (this.shootTimer <= 0) {
        this.shootTimer = 120;
        return 'shoot';
      }
    }

    if (this.x + this.width < 0) this.markedForDeletion = true;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

    if (this.hitFlash > 0) {
      ctx.globalCompositeOperation = 'source-atop';
      ctx.fillStyle = 'white';
    }

    if (this.type === 'big') {
      ctx.scale(2, 2);
    }

    if (this.type === 'shooter') {
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'red';
    }

    if (this.theme === 'soviet') {
      ctx.fillStyle = '#000'; ctx.fillRect(-15, 0, 30, 20);
      ctx.fillStyle = '#F5CBA7'; ctx.beginPath(); ctx.arc(0, -5, 15, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#17202A'; ctx.fillRect(-15, -25, 30, 15); ctx.fillRect(-20, -10, 40, 5);
      ctx.strokeStyle = (this.type === 'shooter') ? 'red' : '#F1C40F';
      ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(5, -5, 5, 0, Math.PI * 2); ctx.stroke();
    } else if (this.theme === 'leaf') {
      ctx.fillStyle = '#212F3C'; ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#F5CBA7'; ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = (this.type === 'shooter') ? '#922B21' : '#17202A';
      ctx.fillRect(-10, 2, 20, 10);
      ctx.fillStyle = '#7F8C8D'; ctx.fillRect(-12, -12, 24, 6);
      ctx.strokeStyle = '#000'; ctx.beginPath(); ctx.moveTo(-5, -12); ctx.lineTo(5, -6); ctx.stroke();
    } else {
      ctx.fillStyle = '#D7DBDD'; ctx.beginPath(); ctx.arc(0, 0, 20, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#F5CBA7'; ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = (this.type === 'shooter') ? 'red' : '#000';
      ctx.beginPath(); ctx.arc(-4, 0, 2, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(4, 0, 2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }
}
