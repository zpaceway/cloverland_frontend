import { atom } from "jotai";
import Customer from "../types/Customer";

export const customerAtom = atom<Customer | undefined | null>(undefined);
