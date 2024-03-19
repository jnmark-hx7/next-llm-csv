export type ReGraphType = {
    title: string,
    graph:string,
    x_axis: string,
    y_axis: string,
    data: any[],
    insights: string
}

/** Generative schema after generate graph and properties via llm */
export type GSchema = {
    graph:string,
    x_axis: string,
    y_axis: string,
    title: string,
}