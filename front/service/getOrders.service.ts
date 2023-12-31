import { Order } from "interfaces/order.interface";

export default async function getOrders(setClientList: (value:{ allOrders:Order[], total:number}) => void) {
    const res = await fetch(`${process.env.URL_FRONT}/api/order`)   
    const resJson = await res.json();
    setClientList( JSON.parse(resJson.data) )
    return
}