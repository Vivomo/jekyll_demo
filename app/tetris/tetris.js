class BaseCeil {
    constructor() {
        this.core = document.createElement('div');
        this.core.classList.add('core-ceil');
        this.rotateState = 0;
        this.initX = 5;
    }

    setChild(index, x, y) {
        this.children[index].style.transform = `translate( ${x * 100}%, ${y * 100}%)`;
    }

    rotate(direction = 1) {
        this.rotateState = (this.rotateState + direction) % this.loopCount;
        this.render();
    }

}

class I extends BaseCeil {
    constructor() {
        super();
        this.core.innerHTML = `
            <div class="i1"></div>
            <div class="i2"></div>
            <div class="i3"></div>
        `;
        this.children = [...this.core.children];
        this.loopCount = 2;
        this.initY = -3;
        this.x = this.initX;
        this.y = this.initY;
    }

    
    render() {
        this.core.style.transform = `translate( ${this.x * 30}px, ${this.y * 30}px)`;

        switch(this.rotateState) {
            case 0:
                this.setChild(0, 0, -1);
                this.setChild(1, 0, 1);
                this.setChild(2, 0, 2);
                break;
            default:
                this.setChild(0, -1, 0);
                this.setChild(1, 1, 0);
                this.setChild(2, 2, 0);    
        }
    }

    getPoints() {
        let points = [[this.x, this.y]];
        switch(this.rotateState) {
            case 0:
                points.push([this.x, this.y - 1]);
                points.push([this.x, this.y + 1]);
                points.push([this.x, this.y + 2]);
                break;
            default:
                points.push([this.x - 1, this.y]);
                points.push([this.x + 1, this.y]);
                points.push([this.x + 2, this.y]);
        };
        return points;
    }

    tryDrop(cb) {
        this.y++;
        let points = this.getPoints();
        let result = cb(points);
        if (result) {
            this.render();
        } else {
            this.y--;
        }
    }


    init() {
        this.render();
    }

}

class Tetris {
    constructor() {
        this.curCeil = null;
        this.nextCeil = null;
        this.ground = document.querySelector('.ground');
    }

    createCeil() {

    }

    appendNewCeil() {
        this.curCeil = new I();
        this.curCeil.init();
        this.ground.appendChild(this.curCeil.core);
    }

    impactCheck(points) {
        
        return points.every(([x, y]) => {
            
            return x > -1 && x < 10 && y < 20;
        });
    }

    next() {
        this.curCeil.tryDrop((points) => {
            let result = this.impactCheck(points);
            if (!result) {
                console.log('down');
                
            }
            return result;
        });
        // this.curCeil.v++;
        // this.curCeil.render();
    }

    start() {
        this.appendNewCeil();
        setInterval(this.next.bind(this), 1000);
    }
}

let game = new Tetris();
game.start();