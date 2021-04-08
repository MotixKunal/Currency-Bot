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
        description: 'makes you look rich 😳',
        value: 250,
        id: 'Arun',
        sellvalue: 100,
    }
]
