export class Product{

    constructor(
        public id:number,
        public company: string,
        public name: string,
        public oven_time_min: number,
        public oven_time_sec:number
    ){}
}