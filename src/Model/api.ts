import axios, { AxiosInstance, AxiosResponse, ResponseType } from 'axios';
import { StoryInterface } from './story';
import { CommentInterface } from './comment';
import { Topic } from '../Components/Screen/Home';

export type ResponseList = number[]
export interface ReturnType {
    status: any,
    data: any,
}

export default class HackerNewsAPI {
    private axiosInstance: AxiosInstance;
    private readonly baseUrl: string = 'https://hacker-news.firebaseio.com/v0';

    constructor() {
        console.log(' ================HackerNewsAPI constructor=============');
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async getTopStories(): Promise<any> {
        try {
            console.log('==========================topstories==============================');
            const response = await this.axiosInstance.get('/topstories.json');
            return this.convertResponse(response);
        } catch (error) {
            console.error('Error fetching top stories:', error);
            throw error;
        }
    }

    async getNewStories(): Promise<ReturnType> {
        try {
            console.log('==========================newstories==============================');
            const response = await this.axiosInstance.get('/newstories.json');
            return this.convertResponse(response);
        } catch (error) {
            console.error('Error fetching new stories:', error);
            throw error;
        }
    }

    async getBestStories(): Promise<ReturnType> {
        try {
            console.log('==========================beststories==============================');
            const response = await this.axiosInstance.get('/beststories.json');
            return this.convertResponse(response);
        } catch (error) {
            console.error('Error fetching best stories:', error);
            throw error;
        }
    }

    async getStoryOrCommentById(id: number): Promise<StoryInterface | CommentInterface> {
        try {
            console.log("============getStoryOrCommentById============");

            const { data, status } = await this.axiosInstance.get(`/item/${id}.json`);
            if (data.parent) {
                return data as CommentInterface
            }
            return data as StoryInterface

        } catch (error) {
            console.error(`Error fetching story with ID ${id}:`, error);
            throw error;
        }
    }

    convertResponse(response: AxiosResponse): ReturnType {
        return {
            status: response.status,
            data: response.data ?? null,
        }
    }

    getStoriesOf(topic: Topic) {
        switch (topic) {
            case 'best':
                console.log("-------------best");
                return this.getBestStories();
            case 'new':
                console.log("-------------new");

                return this.getNewStories();
            case 'top':
                console.log("-------------top");

                return this.getTopStories();

            default:
                break;
        }
    }
}