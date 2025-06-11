import { ScreenElement, Actor, Vector, Font, Label, Color, TextAlign, BaseAlign } from "excalibur"

export class UI extends ScreenElement{

    #labelReputatie;
    #labelResources;

    player;

    constructor(player) {
        super();
        this.player = player;
    }

    updateReputatie() {
        if (!this.#labelReputatie) {
            this.#labelReputatie = new Label({
                text: `Score: ${this.player.score}`,
                pos: new Vector(30, 30),
                font: new Font({
                    size: 20,
                    family: 'Open Sans',
                    color: Color.Yellow
                })
            });
            this.#labelReputatie.z = 10000;
            this.#labelReputatie.screenPos = true;
            this.addChild(this.#labelReputatie);
        }
        this.#labelReputatie.text = `Score: ${this.player.score}`;
    }

    updateResources() {
        if (!this.#labelResources) {
            this.#labelResources = new Label({
                text: `Resources: ${this.player.resources}`,
                pos: new Vector(30, 60),
                font: new Font({
                    size: 20,
                    family: 'Open Sans',
                    color: Color.White
                })
            });
            this.#labelResources.z = 10000;
            this.#labelResources.screenPos = true;
            this.addChild(this.#labelResources);
        }
        this.#labelResources.text = `Resources: ${this.player.resources}`;
    }

    // Optioneel: beide labels tegelijk updaten
    updateUI() {
        this.updateReputatie();
        this.updateResources();
    }

    onInitialize(engine) {
        // Reputatie label
        this.#labelReputatie = new Label({
            text: `Reputatie: ${this.player.score}`,
            pos: new Vector(30, 30),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Yellow
            })
        });
        this.#labelReputatie.z = 10000;
        this.#labelReputatie.screenPos = true;
        this.addChild(this.#labelReputatie);

        // Resources label
        this.#labelResources = new Label({
            text: `Resources: ${this.player.resources}`,
            pos: new Vector(30, 60),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.White
            })
        });
        this.#labelResources.z = 10000;
        this.#labelResources.screenPos = true;
        this.addChild(this.#labelResources);
    }

    showEventLabel () {
        // Label voor "event"
        if (!this.eventLabel) {
            this.eventLabel = new Label({
                text: '',
                pos: new Vector(1280/2, 720/2),
                font: new Font({
                    size: 60,
                    family: 'Open Sans',
                    color: Color.Yellow,
                    textAlign: TextAlign.Center,
                    baseAlign: BaseAlign.Middle
                }),
                z: 9001
            });
            this.addChild(this.eventLabel);
            this.eventLabel.kill(); // standaard niet zichtbaar
            this.eventLabel = null;
        }

        // Multiple choice container (HTML overlay)
        let mcContainer = document.getElementById('mc-container');
        if (!mcContainer) {
            mcContainer = document.createElement('div');
            mcContainer.id = 'mc-container';
            mcContainer.style.position = 'fixed';
            mcContainer.style.top = '65%';
            mcContainer.style.left = '50%';
            mcContainer.style.transform = 'translate(-50%, -50%)';
            mcContainer.style.zIndex = '10000';
            mcContainer.style.display = 'none';
            mcContainer.style.textAlign = 'center';
            mcContainer.style.background = 'rgba(0,0,0,0.7)';
            mcContainer.style.padding = '1.5rem 2rem';
            mcContainer.style.borderRadius = '1rem';
            mcContainer.style.boxShadow = '0 0 20px #0008';
            document.body.appendChild(mcContainer);
        } else {
            mcContainer.innerHTML = '';
            mcContainer.style.display = 'none';
        }

        // Zet labels altijd bovenop
        if (this.#labelReputatie) this.#labelReputatie.z = 10000;
        if (this.#labelResources) this.#labelResources.z = 10000;
    }

    showEvent(choices = []) {
        if (!this.eventLabel) {
            this.eventLabel = new Label({
                text: 'Game Over',
                pos: new Vector(1280/2, 720/2),
                font: new Font({
                    size: 60,
                    family: 'Open Sans',
                    color: Color.Yellow,
                    textAlign: TextAlign.Center,
                    baseAlign: BaseAlign.Middle
                }),
                z: 9001
            });
            this.addChild(this.eventLabel);
        } else {
            this.eventLabel.text = 'Game Over';
        }
        // Multiple choice tonen
        const mcContainer = document.getElementById('mc-container');
        if (mcContainer) {
            mcContainer.innerHTML = '';
            if (choices.length > 0) {
                choices.forEach((choice, idx) => {
                    const btn = document.createElement('button');
                    btn.innerText = choice.text || `Keuze ${idx+1}`;
                    btn.style.margin = '0.5rem';
                    btn.style.fontSize = '1.2rem';
                    btn.style.padding = '0.7rem 2rem';
                    btn.style.cursor = 'pointer';
                    btn.onclick = () => {
                        if (typeof choice.onSelect === 'function') choice.onSelect();
                        this.hideEvent();
                    };
                    mcContainer.appendChild(btn);
                });
                mcContainer.style.display = 'block';
            }
        }
    }

    hideEvent() {
        if (this.eventLabel) {
            this.eventLabel.kill();
            this.eventLabel = null;
        }
        const mcContainer = document.getElementById('mc-container');
        if (mcContainer) mcContainer.style.display = 'none';
    }
}