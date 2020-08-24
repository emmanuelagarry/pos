interface Combo {
    name: string;
    price: number;
}

export interface Dish {
    id?: string;
    observableId?: number;
    name: string;
    category: string;
    combo: Combo[];
    imageUrl?: string;
}

