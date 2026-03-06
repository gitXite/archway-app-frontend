export interface TrainingImage {
    id: string;
    file: File;
    preview: string;
}

export interface LoRAModel {
    id: string;
    name: string;
    images: TrainingImage[];
    status: 'utkast' | 'trener' | 'trent';
    createdAt: Date;
}