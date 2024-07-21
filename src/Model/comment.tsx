interface CommentInterface {
    by: string;
    id: number;
    kids?: number[];
    parent?: number;
    text: string;
    time: number;
    type: string;
    deleted?: string
}

class Comment {
    private _by: string;
    private _id: number;
    private _kids?: number[];
    private _parent?: number;
    private _text: string;
    private _time: number;
    private _type: string;

    constructor(comment: CommentInterface) {
        this._by = comment.by;
        this._id = comment.id;
        this._kids = comment.kids;
        this._parent = comment.parent;
        this._text = comment.text;
        this._time = comment.time;
        this._type = comment.type;
    }

    get by(): string {
        return this._by;
    }
    set by(value: string) {
        this._by = value;
    }

    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }

    get kids(): number[] | undefined {
        return this._kids;
    }
    set kids(value: number[] | undefined) {
        this._kids = value;
    }

    get parent(): number | undefined {
        return this._parent;
    }
    set parent(value: number | undefined) {
        this._parent = value;
    }

    get text(): string {
        return this._text;
    }
    set text(value: string) {
        this._text = value;
    }

    get time(): number {
        return this._time;
    }
    set time(value: number) {
        this._time = value;
    }

    get type(): string {
        return this._type;
    }
    set type(value: string) {
        this._type = value;
    }

    getSummary(): string {
        return `${this.by} commented at ${new Date(this.time * 1000).toLocaleString()}`;
    }

    getText(): string {
        return this.text;
    }


}

export { Comment };
export type { CommentInterface };