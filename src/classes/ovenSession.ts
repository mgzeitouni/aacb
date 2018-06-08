import { Product } from "./product";

export class ovenSession{

    constructor(
        public formattedDate: string,
        public product:Product,
    public start_time: string,
    public quantity:number,
    public time_left:string='',
    public end_time:number,
public deleted:boolean=false,
public id:string=''){}
}