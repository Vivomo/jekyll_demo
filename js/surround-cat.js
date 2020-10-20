const MAP_WIDTH = 13;

let App = {
    wrap: document.getElementById('wrap'),
    colElem: null,
    rowElem: null,
    cat: null,
    catWidth: null,
    catHeight: null,
    catX: null,
    catY: null,
    ceilWidth: null,
    ceilHeight: null,
    map: null,
    move(x, y) {
        let target = this.rowElem[y].children[x];
        this.cat.style.left = target.offsetLeft - this.catWidth / 2 + this.ceilWidth / 2 + 'px';
        this.cat.style.top = target.offsetTop - this.catHeight + this.ceilHeight / 2 + 'px';
        this.catX = x;
        this.catY = y;
    },
    initHtml() {
        let html = new Array(MAP_WIDTH).fill(0).map((_, rowIndex) => {
            let items = new Array(MAP_WIDTH).fill(0).map((_, colIndex) =>
                `<div class="point" data-y="${rowIndex}" data-x="${colIndex}"></div>`).join('');
            return `<div class="row">${items}</div>`;
        }).join('');
        this.wrap.querySelector('.map').innerHTML = html;
        let cat = this.cat = document.createElement('div');
        cat.className = 'cat';
        this.wrap.appendChild(cat);
        this.rowElem = this.wrap.querySelectorAll('.row');
        this.cat = this.wrap.querySelector('.cat');
        this.catWidth = this.cat.offsetWidth;
        this.catHeight = this.cat.offsetHeight;
        let ceil = this.wrap.querySelector('.point');
        this.ceilWidth = ceil.offsetWidth;
        this.catHeight = ceil.offsetHeight;
    },
    initMap() {
        this.map = new Array(MAP_WIDTH).fill(0).map(_ => {
            return new Array(MAP_WIDTH).fill(0).map(_ => ({active: false}));
        });
        let points = [{x: 5, y: 5}];
        let maxIndex = MAP_WIDTH - 1;
        while (points.length < 8) {
            let x = ~~(Math.random() * MAP_WIDTH);
            let y = ~~(Math.random() * MAP_WIDTH);
            if (x === 0 || x === maxIndex || y === 0 || y === maxIndex) {
                continue;
            }
            let isCreated = points.some(point => point.x === x && point.y === y);
            if (!isCreated) {
                points.push({x, y});
            }
        }
        points.slice(1).forEach((point) => {
            this.activate(point);
        });
    },
    initEvent() {
        this.wrap.addEventListener('click', (e) => {
            let target = e.target;
            let classList = target.classList;
            if (!classList.contains('point')) {
                return;
            }
            if (classList.contains('active')) {
                return;
            }
            let data = target.dataset;
            this.activate({
                x: ~~data.x,
                y: ~~data.y
            })
        });
    },
    activate({x, y}) {
        let point = this.map[y][x];
        if (point.active || (this.catX === x && this.catY === y)) {
            return;
        }
        point.activate = true;
        this.rowElem[y].children[x].classList.add('active');
    },
    init() {
        this.initHtml();
        this.initMap();
        this.initEvent();

        let mid = ~~(MAP_WIDTH / 2)
        this.move(mid, mid);
    }
};

App.init();