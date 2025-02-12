import { getDistance, getMovePointer } from '../utils/coordinate.js';
import { SafeDistance } from '../contants/index.js';

const EnemyController = {
  init(hero) {
    this.app = hero.app;
    this.hero = hero;
    this.enemies = [];
    this.categories = [];

    setInterval(() => {
      this.create();
    }, 3000);

    setInterval(() => {
      this.update();
    }, 500)
  },

  add(category) {
    this.categories.push(category);
  },

  create() {
    this.categories.forEach((enemy) => {
      let x, y, distance;
      do {
        x = ~~(this.app.renderer.width * Math.random());
        y = ~~(this.app.renderer.height * Math.random());
        distance = getDistance({ x, y }, this.hero);
      } while (distance < SafeDistance);

      const item = new enemy();
      item.x = x;
      item.y = y;
      this.enemies.push(item);
      this.app.stage.addChild(item.graph);
    });
  },

  update() {
    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.destroyed) {
        return false;
      }
      const pointer = getMovePointer(enemy, this.hero, enemy.speed);
      enemy.x = pointer.x;
      enemy.y = pointer.y;
      return true;
    });
  }
}

export default EnemyController;