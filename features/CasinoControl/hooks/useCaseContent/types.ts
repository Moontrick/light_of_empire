import { CaseRarity } from "@/shared/ui/CaseRoulette";

export type CaseType = {
    id: number;
    label: string;
    price: number;
    rare: CaseRarity;
    img: string;
}
