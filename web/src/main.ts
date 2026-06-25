import { Application, Assets, Sprite, Text, TextStyle, Color } from 'pixi.js';

function coordsToText(x, y) {
    return '[' + Math.round(x) + ', ' + Math.round(y) + ']';
}

function colorGradient(fadeFraction) {
    let leftmostColor = new Color("green");
    let middleColor = new Color("orange");
    let rightmostColor = new Color("red");
    var color1 = leftmostColor;
    var color2 = middleColor;
    var fade = fadeFraction * 2;
    if (fade >= 1) {
          fade -= 1;
          color1 = middleColor;
          color2 = rightmostColor;
    }

    let color = new Color([
        color1.red * (1- fade) + color2.red * fade,
        color1.green * (1 - fade) + color2.green * fade,
        color1.blue * (1 - fade) + color2.blue * fade,
    ]);
    return color;
}


class Position {
    x: number;
    y: number;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toText() {
        return coordsToText(this.x, this.y);
    }
    distance(other) {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }
};

class Enemy {
    position: Position;
    radius: number;
    text_sprite: Text;
    kill_range: Boolean;
    dead: Boolean;

    constructor(pos, r) {
        this.position = pos;
        this.radius = r;
        this.text_sprite = new Text({
            text: this.position.toText(),
            style: {
              fill: '#000000',
              fontSize: 36,
              fontFamily: 'MyFont',
            },
        });
        this.kill_range = false;
        this.dead = false;
    }


    aim(cursor_position) {
        const MAX_RATIO = 10;
        if (this.dead) {
            return;
        }
        let distance = this.position.distance(cursor_position)
        let ratio = distance / this.radius;
        if (ratio <= 1) {
            this.kill_range = true;
            this.text_sprite.style.fill = new Color('lime');
        } else {
            this.kill_range = false;
            if (ratio > MAX_RATIO) {
                this.text_sprite.style.fill = new Color('black');
            } else {
                ratio /= MAX_RATIO;
                let color = colorGradient(ratio);
                this.text_sprite.style.fill = color;
            }
        }
    }

    shoot() {
        this.dead |= this.kill_range;
        if (this.dead) {
            this.text_sprite.text = "DEAD";
            this.text_sprite.style.fill = '#000000';
        }
    }
};

(async () => {
    // Create a new application
    const app = new Application();
    const enemy_count = 10;
    const enemy_radius = 20;
    const enemy_sprite_height = 40;
    const enemy_sprite_width = 200;
    const app_height = 400;
    const app_width = 400;
    const enemies: Enemy[] = [];
    for (let i = 0; i < enemy_count; ++i) {
        enemies.push(
            new Enemy(
                new Position(
                    Math.floor(Math.random() * app_width),
                    Math.floor(Math.random() * app_height),
                ),
                enemy_radius,
        ));
    }

    // Initialize the application with a transparent background
    await app.init({
        backgroundColor: 0xFFFFFF,
        width: app_width,
        height: app_height,
    });
    document.body.appendChild(app.canvas);

  // Append the application canvas to the document body
    await Assets.load({
        src: '/assets/times.ttf',
    });

    const text = new Text({
        text: 'huh',
        style: {
          fill: '#000000',
          fontSize: 20,
          fontFamily: 'MyFont',
        },
    });
    text.style.fill = '#000000'

    app.stage.addChild(text);

    for (const [idx, enemy] of enemies.entries()) {
        app.stage.addChild(enemy.text_sprite);
        let y = idx * enemy_sprite_height;
        let x = enemy_sprite_width * Math.floor(y / app_height);
        y = y % app_height;
        enemy.text_sprite.x = x;
        enemy.text_sprite.y = y;
    }

    app.canvas.addEventListener('pointermove', e => {
        let pos = new Position(e.clientX, e.clientY);
        text.text = pos.toText();
        text.x = pos.x;
        text.y = pos.y;
        enemies.forEach((enemy, i) => {
            enemy.aim(pos);
        });
    });
    app.canvas.addEventListener('pointerdown', e => {
        enemies.forEach((enemy, i) => {enemy.shoot()});
    });

})();

