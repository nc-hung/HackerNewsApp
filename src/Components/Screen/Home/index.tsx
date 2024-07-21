import { View } from "react-native";
import { Text } from "react-native-paper";
import HackerNewsAPI, { ResponseList, ReturnType } from "../../../Model/api";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Pagination } from "./pagination";
import { Table } from "./table";
import { useNavigation } from "@react-navigation/native";
import { WIDTH } from "../../../constance";

export type Topic = 'new' | 'top' | 'best';
export interface ItemsType {
    label: string;
    value: Topic;
}

export const HOMESCREEN = (_props: any) => {
    const api = useMemo(() => new HackerNewsAPI(), []);
    const [open, setOpen] = useState(false);
    const [stories, setStories] = useState([]);
    const [topic, setTopic] = useState<Topic>('top');
    const [itemLength, setItemLength] = useState<number>(20);
    const [items, setItems] = useState<ItemsType[]>([
        { label: 'New', value: 'new' },
        { label: 'Top', value: 'top' },
        { label: 'Best ', value: 'best' },
    ]);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: { backgroundColor: '#DEAC80' },
            headerLargeTitle: true,
            title: 'Hacker News',
            headerTitleStyle: { fontSize: 32, fontWeight: '700' },

        });
    }, [navigation, open, items, topic, setOpen, setTopic, setItems]);

    const fetchStoriesByTopic = async (topic: Topic) => {
        const result: ReturnType = await api.getStoriesOf(topic);
        if (result?.data.length > 0) {
            setStories(result.data);
        }
    };

    useEffect(() => {
        fetchStoriesByTopic(topic);
    }, [topic]);

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Table stories={stories} itemLength={itemLength} />
            <Pagination
                setItemLength={setItemLength}
                itemLength={itemLength}
                open={open}
                items={items}
                topic={topic}
                setOpen={setOpen}
                setTopic={setTopic}
                setItems={setItems}
            />
        </View>
    );
};
