import { atom } from "jotai";
import Customer from "../types/Customer";
import { atomWithStorage } from "jotai/utils";
import Lottery from "../types/Lottery";

export const customerObjectAtom = atom<Customer | undefined | null>(undefined);
export const customerCredentialsAtom = atomWithStorage("credentials", {
  customerId:
    (JSON.parse(localStorage.getItem("credentials") || "{}")
      .customerId as string) || "",
  customerSecret:
    (JSON.parse(localStorage.getItem("credentials") || "{}")
      .customerSecret as string) || "",
});
export const pageWrapperDataAtom = atom<{ header: string; title: string }>({
  header: "",
  title: "",
});
export const lotteriesAtom = atom<Lottery[] | undefined>(undefined);
