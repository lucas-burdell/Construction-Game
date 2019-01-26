import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
const constructionGif = require("./construction_man.gif");


const rootDiv = document.createElement("div");
rootDiv.id = "gameId";
document.body.appendChild(rootDiv);

interface IState {
    houses: number;
    constructionWorkers: number;
    salesmen: number;
    money: number;
    houseMin: number;
    houseMax: number;
}

function FixRounding(value: number) {
    return Math.floor((value) * 100) / 100;
}

// style={{ position: "absolute", top: "0", zIndex: "-1", width: "100%", height: "100%" }}

const StyledImage = styled.img`
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;

`

class App extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = { houses: 0, salesmen: 0, constructionWorkers: 0, money: 0, houseMin: 1000, houseMax: 10000 };
        setInterval(() => {
            const shouldUpdate = this.state.constructionWorkers > 0 || this.state.salesmen > 0;
            if (!shouldUpdate) {
                return;
            }
            let soldHouses = 0;
            if (this.state.houses) {
                soldHouses = Math.floor(this.state.houses / this.state.salesmen);    
            }   
            let newHouse = this.state.houses; (this.state.houses - soldHouses) + (this.state.constructionWorkers * 0.05);
            const money = FixRounding(FixRounding(Math.random() * (this.state.houseMax - this.state.houseMin) + this.state.houseMin) * soldHouses + this.state.money);
            this.setState({houses: newHouse, money: money })
        }, 1000);
    }

    private addHouse = (house: number) => {
        const houses = FixRounding(this.state.houses + house);
        this.setState({ houses: houses });
    }

    private sellHouse = () => {
        if (this.state.houses >= 1) {
            const money = FixRounding(FixRounding(Math.random() * (this.state.houseMax - this.state.houseMin) + this.state.houseMin) + this.state.money);

            const houseIncrease = Math.random() * 50;
            const houseMin = this.state.houseMin + houseIncrease;
            const houseMax = this.state.houseMax + houseIncrease;
            this.setState((previous) => ({ ...previous, houses: previous.houses - 1, money: money, houseMin: houseMin, houseMax: houseMax }));
        }
    }

    private BuyWorker = () => this.setState((previous) => ({ ...previous, money: previous.money - 1000, constructionWorkers: previous.constructionWorkers + 1 }))
    
    private BuySalesman = () => this.setState((previous) => ({ ...previous, money: previous.money - 1000, salesmen: previous.salesmen + 1 }))


    render() {
        return (<div>
            <h2>You own {this.state.houses} houses</h2>
            <h2>You have ${this.state.money}</h2>
            <h2>You manage {this.state.constructionWorkers} construction workers</h2>
            <h2>You manage {this.state.salesmen} salesmen</h2>
            <div>
                <button onMouseUp={() => this.addHouse(0.05)} onKeyUp={() => this.addHouse(.05)}>work on house</button>
            </div>
            <br />
            <div>
                <button onMouseUp={() => this.sellHouse()} onKeyUp={() => this.sellHouse()}>sell a house</button>
            </div>
            <div>
                <button onMouseUp={() => this.BuyWorker()} onKeyUp={() => this.BuyWorker()}>Buy a construction worker</button>
            </div>
            <div>
                <button onMouseUp={() => this.BuySalesman()} onKeyUp={() => this.BuySalesman()}>Buy a salesman</button>
            </div>
            <div>
                <StyledImage src={constructionGif}></StyledImage>
            </div>

        </div>);
    }
}

ReactDOM.render(<App />, rootDiv);