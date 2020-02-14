avalon.config({
    interpolate: ["[[", "]]"]
});

let DIRECTION = {
    LEFT: 0,
    TOP: 1,
    RIGHT: 2,
    DOWN: 3
};

const Square = {
    cfg: {
        width: 11
    },
    createSquare: function () {
        return avalon.range(0, this.cfg.width).map(() =>
            avalon.range(0, this.cfg.width).map(() => ({
                isFood: false
            }))
        );
    },
    nextSquare: function (point, direction) {
        let x, y;
        if (direction % 2 === 0) {
            y = point.y;
            x = point.x + direction - 1;
        } else {
            x = point.x;
            y = point.y + direction - 2;
        }
        return { x, y };
    },
    createRandomPoint: () => ({
        x: ~~(Square.cfg.width * Math.random()),
        y: ~~(Square.cfg.width * Math.random())
    })
};

const Snake = {
    cfg: {
        speed: 1500,
    },
    createSnakeBody: function () {
        const center = ~~(Square.cfg.width / 2);
        return avalon.range(0, 4).map((i) => ({
            x: center,
            y: center + i
        }));
    },
};


let snake = avalon.define({
    $id: 'snake',
    $task: [],
    $food: null,

    tip: '',
    body: [],
    square: [],
    direction: DIRECTION.TOP, // 0123 依次代表左上右下
    ceilWidth: 60,
    // 反方向
    isNegativeDirection: function (direction) {
        return Math.abs(this.direction - direction) === 2;
    },
    move: function () {
        let head = this.body[0];
        let ceil = Square.nextSquare(head, this.direction);
        if (this.isOutOfIndex(ceil) || this.isOnBody(ceil)) {
            this.tip = 'Game Over!';
            return;
        }
        if (this.isFood(ceil)) {
            this.eat(ceil);
            return;
        }
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        switch (this.direction) {
            case 0:
                head.x -= 1;
                break;
            case 1:
                head.y -= 1;
                break;
            case 2:
                head.x += 1;
                break;
            case 3:
                head.y += 1;
                break;
        }

    },
    eat: function (food) {
        this.body.unshift(food);
        this.square[food.y][food.x].isFood = false;
        this.createFood();
    },
    isOutOfIndex: function (ceil) {
        return ceil.x < 0 || ceil.x >= Square.cfg.width || ceil.y < 0 || ceil.y >= Square.cfg.width
    },
    isOnBody: function (ceil) {
        return this.body.some(function (item) {
            return item.x === ceil.x && item.y === ceil.y
        })
    },
    isFood: function ({x, y}) {
        return this.square[y][x].isFood;
    },
    createFood: function () {
        while (true) {
            let point = Square.createRandomPoint();
            if (!this.isOnBody(point)) {
                this.$food = point;
                this.square[point.y][point.x].isFood = true;
                break;
            }
        }
    },
    pathfinding: function() {
        let start = this.body[0];
        let points = [];
        points.push([{
            x: start.x,
            y: start.y
        }]);
        let tempSquare = new Array(Square.cfg.width).fill(0).map(() => {
            return new Array(Square.cfg.width).fill(0);
        });
        let noWay = false;
        while(true) {
            let next = [];
            let last = points[points.length - 1];
            let find = last.some((point) => {
                for (let i = 0; i < 4; i++) {
                    let newPoint = Square.nextSquare(point, i);
                    
                    if (this.validPoint(newPoint) && !tempSquare[newPoint.y][newPoint.x]) {
                        newPoint.prev = point;
                        newPoint.direction = i;
                        tempSquare[newPoint.y][newPoint.x] = 1;
                        next.push(newPoint);

                        if (this.isFood(newPoint)) {
                            return true;
                        }
                    }
                    
                }
            });
            points.push(next);
            if (find) {
                break;
            }
            if (next.length === 0) {
                console.log('找不到路了');
                noWay = true;
                break;
            }
        }
        if (!noWay) {
            let end = points.pop().pop();
            let path = [];
            while(end) {
                path.push(end.direction);
                end = end.prev;
            }
            path.pop();
            this.runPath(path);
            console.log(path);
        }
        
    },
    runPath: function(path) {
        requestAnimationFrame(() => {
            this.direction = path.pop();
            this.move();
            if (path.length > 0) {
                this.runPath(path);
            } else {
                this.pathfinding();
            }
        })
    },
    validPoint: function(point) {
        return !this.isOutOfIndex(point) && !this.isOnBody(point);
    },

    init: function (auto = false) {
        this.auto = auto;

        this.body = Snake.createSnakeBody();
        this.square = Square.createSquare();
        this.createFood();
        this.pathfinding();
    },
    
});


snake.init();

avalon.scan();

