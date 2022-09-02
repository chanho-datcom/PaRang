import { action, makeObservable, observable} from "mobx";

class County{
    countyName = "";

    constructor(countyName) {
        this.countyName = countyName;
    }
}
export class CountyStore{
    rootStore;

    counties = [];

    constructor(root) {
        makeObservable(this, {
           counties : observable,
        })
        this.rootStore = root;
        this.counties = [
            new County("경기도"),
            new County("부산광역시"),
            new County("제주특별자치도"),
            new County("충청남도"),
            new County("강원도"),
            new County("도_광역시선택")
        ]
    }
}