interface StoryInterface {
    by: string;
    descendants: number;
    id: number;
    kids: number[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}

class Story {
    private _by: string;
    private _descendants: number;
    private _id: number;
    private _kids?: number[];
    private _score: number;
    private _time: number;
    private _title: string;
    private _type: string;
    private _url: string;

    constructor(story: StoryInterface) {
        this._by = story.by;
        this._descendants = story.descendants;
        this._id = story.id;
        this._kids = story.kids;
        this._score = story.score;
        this._time = story.time;
        this._title = story.title;
        this._type = story.type;
        this._url = story.url;
    }

    get by(): string {
        return this._by;
    }
    set by(value: string) {
        this._by = value;
    }

    get descendants(): number {
        return this._descendants;
    }
    set descendants(value: number) {
        this._descendants = value;
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

    get score(): number {
        return this._score;
    }
    set score(value: number) {
        this._score = value;
    }

    get time(): number {
        return this._time;
    }
    set time(value: number) {
        this._time = value;
    }

    get title(): string {
        return this._title;
    }
    set title(value: string) {
        this._title = value;
    }

    get type(): string {
        return this._type;
    }
    set type(value: string) {
        this._type = value;
    }

    get url(): string {
        return this._url;
    }
    set url(value: string) {
        this._url = value;
    }

    getSummary(): string {
        return `${this.title} by ${this.by}`;
    }

    getUrl(): string {
        return this.url;
    }
}


export { Story };
export type { StoryInterface };

