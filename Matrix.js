class Matrix {
    
    constructor(rows, cols, init) {
        this.rows = rows;
        this.cols = cols;
        this.v = [];

        for (let i = 0; i < this.rows; i++) {
            this.v[i] = [];
            for (let j = 0; j < this.cols; j++) {
                
                if (init) {
                    this.v[i][j] = init[i][j];
                } else {
                    this.v[i][j] = 0;
                }

            }
        }
    }

    mult = function(n) {
        if (n instanceof Matrix) {

            if (this.cols !== n.rows) {
                console.log('Columns don\'t match rows!');
                return undefined;
            }

            let toReturn = new Matrix(this.rows, n.cols)

            for (let i = 0; i < toReturn.rows; i++) {
                for (let j = 0; j < toReturn.cols; j++) {

                    let sum = 0;
                    for (let k = 0; k < this.cols; k++) {
                        sum += this.v[i][k] * n.v[k][j];
                    }
                    toReturn.v[i][j] = sum

                }
            }
            return toReturn;

        } else {

            return this.apply(x => x*n);

        }
    }
    add = function(n) {
        if (n instanceof Matrix) {
            let toReturn = new Matrix(this.rows, this.cols);

            for (let i = 0; i < this.matrix.length; i++) {
                for (let j = 0; j < this.matrix[i].length; j++) {
                    toReturn.v[i][j] += n.v[i][j];
                }
            }
            return toReturn;

        } else {

            return this.apply(x => x+n);

        }
    }
    randomize = function(min, max) {
        if (!min) min = 0;
        if (!max) max = 10;
        return this.apply(x => Math.random() * (max - min) + min);
    }
    apply = function(callback) {
        let toReturn = new Matrix(this.rows, this.cols);
        for (let i = 0; i < toReturn.rows; i++) {
            for (let j = 0; j < toReturn.cols; j++) {
                toReturn.v[i][j] = callback(toReturn.v[i][j]);
            }
        }
        return toReturn;
    }

    getX = function() {
        return this.v[0][0];
    }
    getY = function() {
        return this.v[1][0];
    }
    getZ = function() {
        return this.v[2][0];
    }

    static cubicPoints = function(r) {
        return [
            new Matrix(3, 1, [[-r], [-r], [-r]]),
            new Matrix(3, 1, [[-r], [-r], [r]]),
            new Matrix(3, 1, [[-r], [r], [-r]]),
            new Matrix(3, 1, [[-r], [r], [r]]),
            new Matrix(3, 1, [[r], [-r], [-r]]),
            new Matrix(3, 1, [[r], [-r], [r]]),
            new Matrix(3, 1, [[r], [r], [-r]]),
            new Matrix(3, 1, [[r], [r], [r]])
        ]
    }

    static nDimensionSquare = function(r, d) {
        let toReturn = [];

        for (let i = 0; i < pow(2, d); i++) {

            let init = [];

            for(let j = 0; j < d; j++){
                init.push([(1 << j) & i ? r : -r]) 
            }

            toReturn.push(new Matrix(d, 1, init));
        }

        return toReturn;
    }

    static rotateX = function(theta) {
        return new Matrix(3, 3, [
            [1, 0, 0],
            [0, cos(theta), -sin(theta)],
            [0, sin(theta), cos(theta)]
        ])
    }

    static rotateY = function(theta) {
        return new Matrix(3, 3, [
            [cos(theta), 0, sin(theta)],
            [0, 1, 0],
            [-sin(theta), 0, cos(theta)]
        ])
    }

    static rotateZ = function(theta) {
        return new Matrix(3, 3, [
            [cos(theta), -sin(theta), 0],
            [sin(theta), cos(theta), 0],
            [0, 0, 1]
        ])
    }

    static nDimensionProjection = function(d) {

        let init = [];

        for (let i = 0; i < d; i++) {

            let toPush = [];

            for (let j = 0; j < d+1; j++) {
                if (i == j) {
                    toPush.push(1);
                } else {
                    toPush.push(0)
                }
            }

            init.push(toPush);

        }

        return new Matrix(d, d+1, init);

    }

    static nDimensionRotation = function(d) {

        

    }

    static utils = {
        orthoProjection: new Matrix(2, 3, [
            [1, 0, 0],
            [0, 1, 0]
        ])
    }

}