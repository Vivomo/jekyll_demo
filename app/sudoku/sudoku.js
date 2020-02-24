const App = {
    set activeCeil(obj){
        let prevActive = this.wrap.querySelector('.active');
        if (prevActive) {
            prevActive.classList.remove('active');
        }
        this.wrap.querySelector(`[data-r="${obj.r}"][data-c="${obj.c}"]`).classList.add('active');
        this._activeCeil = obj;
    },
    setCeil(value, mark) {
        let activeElem = this.wrap.querySelector('.active');
        if (!activeElem || activeElem.dataset.value) {
            return;
        }
        let data = activeElem.dataset;
        data.value = value;
        let {r, c} = data;
        
        activeElem.innerHTML = value;
        if (mark) {
            activeElem.classList.add('mark');
        }

        this.virtualData[r][c] = {
            value,
            mark
        };

        this.virtualData[r].forEach((item) => {
            this.removeArrElem(item, value);
        });

        this.virtualData.forEach((row) => {
            let item = row[c];
            this.removeArrElem(item, value);
        });

        let tIndex = ~~(r / 3) * 3 + ~~(c / 3);
        this.eachTableItem(tIndex, (item) => {
            this.removeArrElem(item, value);
        })
        
        
        Array.from(document.querySelectorAll(`[data-r="${r}"] .temp${value}, [data-c="${c}"] .temp${value}`)).forEach((ceil) => {
            ceil.remove();
        });

        Array.from(activeElem.parentNode.querySelectorAll(`.temp${value}`)).forEach((ceil) => {
            ceil.remove();
        });
    },
    derivation() {
        this.derivationRow();
        this.derivationCol();
        this.derivationTable();
        
    },
    derivationRow() {
        this.virtualData.forEach((row, rowIndex) => {
            let counter = {};
            row.forEach((item, colIndex) => {
                this.setArrCounter(item, counter, rowIndex, colIndex);
            });
            this.dispatchCounter(counter);
        });
    },
    derivationCol() {
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            let counter = {};
            this.virtualData.forEach((row, rowIndex) => {
                let item = row[colIndex];
                this.setArrCounter(item, counter, rowIndex, colIndex);
            });
            this.dispatchCounter(counter);
        }
    },
    derivationTable() {
        for (let tIndex = 0; tIndex < 9; tIndex++) {
            let counter = {};
            this.eachTableItem(tIndex, (item, rowIndex, colIndex) => {
                this.setArrCounter(item, counter, rowIndex, colIndex);
            });
            this.dispatchCounter(counter);
        }
    },
    derivationTableColRow() {
        for (let tIndex = 0; tIndex < 9; tIndex++) {
            let rCounter = {};
            let cCounter = {};
            this.eachTableItem(tIndex, (item, rowIndex, colIndex) => {
                this.setCRCounter(item, rCounter, rowIndex);
                this.setCRCounter(item, cCounter, colIndex);
            });
            this.dispathcTableRCounter(tIndex, rCounter);
            this.dispathcTableCCounter(tIndex, cCounter);
            // console.log(tIndex, rCounter, cCounter);
        }
    },
    rInTable(rowIndex, tIndex) {
        let startRow = this.getTableFirstR(tIndex);
        return rowIndex >= startRow && rowIndex < startRow + 3;
    },
    cInTable(colIndex, tIndex) {
        let startCol = this.getTableFirstC(tIndex);
        return colIndex >= startCol && colIndex < startCol + 3;
    },
    getTableFirstR(tIndex) {
        return ~~(tIndex / 3) * 3;
    },
    getTableFirstC(tIndex) {
        return (tIndex % 3) * 3;
    },
    eachTableItem(tIndex, fn) {
        let startRow = this.getTableFirstR(tIndex);
        let startCol = this.getTableFirstC(tIndex);
        for (let rowIndex = startRow; rowIndex < startRow + 3; rowIndex++) {
            for (let colIndex = startCol; colIndex < startCol + 3; colIndex++) {
                let item = this.virtualData[rowIndex][colIndex];
                fn(item, rowIndex, colIndex)
            }
        }
    },
    setArrCounter(item, counter, rowIndex, colIndex) {
        if (Array.isArray(item)) {
            item.forEach((num) => {
                if (counter[num]) {
                    counter[num] = 2
                } else {
                    counter[num] = `${rowIndex}_${colIndex}`;
                }
            });
        } else {
            counter[item.value] = true;
        }
    },
    setCRCounter(item, counter, cr) {
        if (Array.isArray(item)) {
            item.forEach((num) => {
                if (counter[num]) {
                    if (cr !== ~~counter[num]) {
                        counter[num] = 2
                    }
                } else {
                    counter[num] = `${cr}`;
                }
            });
        } else {
            counter[item.value] = true;
        }
    },
    dispatchCounter(counter) {
        for (let k in counter) {
            if (typeof counter[k] === 'string') {
                let [r, c] = counter[k].split('_');
                console.log(r, c, 'derivation');
                this.activeCeil = {r,c};
                this.setCeil(~~k);
            }
        }
    },
    dispathcTableRCounter(tIndex, counter) {
        for (let k in counter) {
            if (typeof counter[k] === 'string') {
                let r = ~~counter[k];
                this.virtualData[r].forEach((item, colIndex) => {
                    if (!this.cInTable(colIndex, tIndex)) {
                        this.removeArrElem(item, ~~k)
                    }
                });
                this.find(`[data-r="${r}"] .temp${k}`).forEach((temp) => {
                    if (!temp.parentNode.parentNode.classList.contains(`t${tIndex}`)) {
                        temp.remove();
                    }
                });
            }
        }
    },
    dispathcTableCCounter(tIndex, counter) {
        for (let k in counter) {
            if (typeof counter[k] === 'string') {
                let c = ~~counter[k];
                this.virtualData.forEach((row, rowIndex) => {
                    let item = row[c];
                    if (!this.rInTable(rowIndex, tIndex)) {
                        this.removeArrElem(item, ~~k)
                    }
                });
                this.find(`[data-c="${c}"] .temp${k}`).forEach((temp) => {
                    if (!temp.parentNode.parentNode.classList.contains(`t${tIndex}`)) {
                        temp.remove();
                    }
                });
            }
        }
    },
    removeArrElem(arr, elem) {
        if (Array.isArray(arr)) {
            let index = arr.indexOf(elem);
            index !== -1 && arr.splice(index, 1);
        }
    },
    find(selector) {
        return Array.from(this.wrap.querySelectorAll(selector));
    },
    initHtml () {
        let wrap = this.wrap = document.querySelector('.wrap');
        let html = new Array(9).fill(null).map((item, outerIndex) => {
            let _html = new Array(9).fill(null).map((innerItem, innerIndex) => {
                let tempHtml = new Array(9).fill(null).map((temp, tempIndex) => {
                    return `<div class="temp temp${tempIndex + 1}">${tempIndex + 1}</div>`
                }).join('');
                return `<div 
                            data-r="${~~(outerIndex / 3) * 3 + ~~(innerIndex / 3)}" 
                            data-c="${(outerIndex % 3) * 3 + (innerIndex % 3)}" 
                            class="ceil">${tempHtml}</div>`
            }).join('');
            return `<div class="t t${outerIndex}">${_html}</div>`;
        }).join('');
        wrap.innerHTML = html;
    },
    initEvent () {
        this.wrap.addEventListener('click', (e) => {
            if (e.target.className === 'ceil') {
                this.activeCeil = {
                    r: e.target.dataset.r,
                    c: e.target.dataset.c
                }
            }
        });

        document.querySelector('.opt').addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                this.setCeil(~~e.target.dataset.value);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (/\d/.test(e.key)) {
                this.setCeil(~~e.key, e.altKey)
            }
        })
    },
    initVirtualData() {
        this.virtualData = new Array(9).fill(null).map(() => {
            return new Array(9).fill(null).map(() => {
                let arr = [];
                for (let i = 1; i < 10; i++) {
                    arr.push(i);
                }
                return arr;
            });
        });
    },
    setDefaultData() {
        let defautData = [
            [1, 3, 4],
            [1, 4, 6],
            [1, 6, 2],
            [2, 1, 6],
            [2, 5, 3],
            [2, 9, 4],
            [3, 2, 2],
            [3, 4, 4],
            [3, 8, 9],
            [4, 1, 9],
            [4, 2, 8],
            [4, 7, 3],
            [4, 8, 5],
            [5, 1, 1],
            [5, 3, 3],
            [5, 8, 4],
            [6, 2, 6],
            [6, 7, 8],
            [6, 9, 7],
            [7, 2, 3],
            [7, 5, 2],
            [7, 8, 7],
            [8, 5, 6],
            [8, 6, 1],
            [8, 9, 5],
            [9, 3, 9],
            [9, 4, 3],
            [9, 7, 4]
        ];
        defautData.forEach((item) => {
            let [r, c, value] = item;
            r--;
            c--;
            this.activeCeil = {r , c};
            this.setCeil(value, true);
        })
    },
    init() {
        this.initHtml();
        this.initEvent();
        this.initVirtualData();
        this.setDefaultData();
    }
}

App.init();