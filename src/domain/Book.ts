export interface Book {
    id: string;
    title: string;
    userId: string | null;
}

export interface BookDto {
    title: string;
}