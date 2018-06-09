import { Product } from "./product";

export class ovenSession{

    constructor(
        public formatted_date: string,
        public product:Product,
        public start_time: string,
        public quantity:number,
        public time_left:string='',
        public end_time:number,
        public baker_deleted:boolean=false,
        public id:string='',
        public cinnabon_delivered:boolean=false){}
}