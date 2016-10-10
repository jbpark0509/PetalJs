(function(window) {

    'use strict';

    var PetalContainer, Petal, _randomGenerator,
        _defaultOptions = {
            numPetals: 50,
            maxVel: 2,
            minVel: 1,
            color: "rgba(255, 183, 197, .8)"
        };

    function Petal(initialX, initialY, rotateAngle, width, options) {
        this.initialX = initialX;
        this.currentX = initialX;
        this.initialY = initialY;
        this.currentY = initialY;
        this.rotateAngle = rotateAngle;
        this.width = width;
        this.incrementer = _randomGenerator(options.minVel, options.maxVel);
        this.random = _randomGenerator(0, 1);
    }

    Petal.prototype.update = function(ctx, canvasHeight, options) {
        ctx.save();

        this.currentY += this.incrementer;
        this.rotateAngle += this.incrementer / 500;
        var rotateAngle = Math.sin(this.rotateAngle);

        if (this.random < 0.2) {
            this.currentX -= this.incrementer / 3;
        } else if (this.random > 0.8) {
            this.currentX += this.incrementer / 3;
        } else {
            this.currentX = this.initialX + 30 * Math.sin(this.currentY / 100);
        }
        var width = this.width;

        if (this.currentY > canvasHeight) {
            this.currentY = this.initialY;
        }

        ctx.translate(this.currentX, this.currentY);
        ctx.rotate(rotateAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(width / 2, width / 2, width, 0);
        ctx.quadraticCurveTo(width / 2, -1 * (width / 2), 0, 0);
        ctx.closePath();

        var gradient = ctx.createLinearGradient(0, 0, 170, 0);
        gradient.addColorStop(0, options.color);
        gradient.addColorStop(1, options.color);

        ctx.lineJoin = "round";
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
    }

    //PetalContainer Constructor
    PetalContainer = function(id, options) {
        this._canvas = document.getElementById(id);
        this.ctx = this._canvas.getContext('2d');
        this.canvasWidth = this.ctx.canvas.width;
        this.canvasHeight = this.ctx.canvas.height;
        this.options = Object.assign({}, _defaultOptions, options);
        this.petals = [];
        this.init();
    }

    PetalContainer.prototype.init = function() {
        //Generate Petals
        for (var i = 0; i < this.options.numPetals; i++) {
            var initialX = Math.random() * this.canvasWidth;
            var initialY = -1 * _randomGenerator(100, 1200);
            var rotateAngle = _randomGenerator(0, 2 * Math.PI);
            var width = _randomGenerator(18, 24);
            var petal = new Petal(initialX, initialY, rotateAngle, width, this.options);
            this.petals.push(petal);
        }
        requestAnimationFrame(this.draw.bind(this));
    }

    PetalContainer.prototype.draw = function() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight, this.options);

        for (var i = 0; i < this.petals.length; i++) {
            this.petals[i].update(this.ctx, this.canvasHeight, this.options);
        }

        // // call the draw function again!
        requestAnimationFrame(this.draw.bind(this));
    }

    function _randomGenerator(start, end, isInt) {
        let num = start + ((end - start) * Math.random());
        num = isInt ? Math.floor(num) : num;
        return num;
    }

    window.PetalContainer = PetalContainer;

})(window)
