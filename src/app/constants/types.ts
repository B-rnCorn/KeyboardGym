export type Key = {
    id: number;
    title: string;
    alternativeTitle: string;
}

export type Keyboard = [Key[]];

export type KeyboardConfig = {
    keyboard: Keyboard;
    isMainLanguage: boolean;
}

export type ChartDataset = {
    label: string,
    data: number[],
    borderWidth: number
}
