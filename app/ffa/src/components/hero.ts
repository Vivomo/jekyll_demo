import * as PIXI from 'pixi.js';
import { createGraphProxy } from '../utils/proxy.js';

const defaultCfg = {
  x: 500,
  y: 500,
  radius: 20,
  fillColor: '0x000000'
}

export default class Hero {
  constructor (param = {}, app) {
    const cfg = Object.assign({}, defaultCfg, param);
    let graph = new PIXI.Graphics()
      .fill(cfg.fillColor)
      .circle(0, 0, cfg.radius);
    graph.x = cfg.x;
    graph.y = cfg.y;
    graph.fill(cfg.fillColor);
    this.graph = graph;
    this.app = app;
    this.enemyController = null;
    this.weapons = [];
    // this.bullets = [];
    return createGraphProxy(this);
  }


  start () {

  }

  get bullets() {
    return this.weapons.map(weapon => weapon.bullets).flat();
  }

  get enemies() {
    if (this.enemyController) {
      return this.enemyController.enemies;
    }
  }
}
