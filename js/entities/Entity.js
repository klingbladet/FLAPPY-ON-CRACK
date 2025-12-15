export class Entity {
  constructor(x, y, width, height, color) {
    this.x = x; this.y = y; this.width = width; this.height = height; this.color = color; this.markedForDeletion = false;
  }
  update() { }
  draw(ctx) { ctx.fillStyle = this.color; ctx.fillRect(this.x, this.y, this.width, this.height); }
  collidesWith(other) {
    const padding = 4;
    return (this.x + padding < other.x + other.width - padding && this.x + this.width - padding > other.x + padding && this.y + padding < other.y + other.height - padding && this.y + this.height - padding > other.y + padding);
  }
}
