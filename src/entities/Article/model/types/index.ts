import { User } from "@/entities/User";

export enum ArticleSortFields {
    VIEWS = "views",
    TITLE = "title",
    CREATED = "createdAt",
}

export interface ArticleSchema {
    isLoading: boolean;
    error?: string;
    data?: Article;
}

export interface Article {
    id: string;
    title: string;
    user: User;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    userId: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
}

export enum ArticleBlockType {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    CODE = "CODE",
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockType.CODE;
    code: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockType.TEXT;
    title?: string;
    paragraphs: string[];
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockType.IMAGE;
    src: string;
    title: string;
}

export interface ArticleBlockBase {
    id: string;
    type: ArticleBlockType;
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export enum ArticleType {
    ALL = "ALL",
    IT = "IT",
    SCIENCE = "SCIENCE",
    ECONOMICS = "ECONOMICS",
}

export enum ArticleView {
    BIG = "BIG",
    SMALL = "SMALL",
}
