export default interface ShopInterface {
    itemName: string,
    description: string
    value: number,
    sellvalue: number,
    id: string,
    maxallowed?: number
}

export let Shop: Array<ShopInterface> = [
    {
        itemName: 'The Arun',
        description: 'Gives you a 5% extra chance to win gamble',
        value: 250,
        id: 'Arun',
        sellvalue: 100,
        maxallowed: 4
    }
]
