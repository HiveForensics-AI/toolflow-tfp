export interface Doc {
    id: string;
    text: string;
    embedding: number[];
}
export declare function addDoc(doc: Doc): Promise<void>;
export declare function topK(queryEmb: number[], k?: number): Promise<Doc[]>;
