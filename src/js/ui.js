import { ScreenElement, Actor, Vector, Font, Label, Color } from "excalibur"

export class UI extends ScreenElement {
    constructor() {
        super({})

        console.log("test")
    }

    #labelCurrentScore;
    #labelHighScore;

onInitialize(engine) {
        this.#labelCurrentScore = new Label({
            text: 'Score: 0',
            pos: new Vector(30, 30),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Yellow
            })
        });
        this.#labelCurrentScore.z = 10000;
        this.#labelCurrentScore.screenPos = true;
        this.addChild(this.#labelCurrentScore);
        // Highscore label
        const highScore = localStorage.getItem('highscore') || 0;
        this.#labelHighScore = new Label({
            text: `Highscore: ${highScore}`,
            pos: new Vector(30, 90),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Green
            })
        });
        this.#labelHighScore.z = 10000;
        this.#labelHighScore.screenPos = true;
        this.addChild(this.#labelHighScore);
    }

}