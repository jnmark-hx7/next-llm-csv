import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function findMinMax(arr: any[], key:string){
  const data = arr.map((node) => node[key]);
  return({
      min : Math.min(...data),
      max: Math.max(...data)
  })
}