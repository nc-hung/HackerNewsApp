import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Icon, MD3Colors, Text } from 'react-native-paper';
import HackerNewsAPI from '../../../Model/api';
import { StoryInterface } from '../../../Model/story';
import { CommentInterface } from '../../../Model/comment';
import { useNavigation } from '@react-navigation/native';
import { formatTimestampToDate } from '../Detail';

interface TableProps {
    stories: any;
    itemLength: number;
}

export const Table: React.FC<TableProps> = ({ stories, itemLength }) => {
    const api = useMemo(() => new HackerNewsAPI(), [])
    const navigation: any = useNavigation()
    const [elements, setElements] = useState<number[]>([])
    const [storyContent, setStoryContent] = useState<(StoryInterface)[]>([]);

    const [fromValue, setFromValue] = React.useState<number>(0);
    const [toValue, setToValue] = React.useState<number>(50);


    useEffect(() => {
        setToValue(itemLength)
    }, [itemLength])

    useEffect(() => {
        const newElements: any = getElementsFrom(stories, fromValue, toValue as number)
        setElements(newElements)
    }, [stories])

    useEffect(() => {
        handleRequest(elements)
    }, [elements])

    async function handleRequest(elements: number[]) {
        try {
            const promises = elements.map(id => api.getStoryOrCommentById(id));
            const results: any = await Promise.all(promises);
            setStoryContent(results)
        } catch (error: any) {
            console.error("handleRequest::::::::", error.message)
        }
    }

    function getElementsFrom(array: number[], from: number, to: number) {
        try {
            if (from >= array.length) {
                return [];
            }
            return array.slice(from, to);
        } catch (error: any) {
            console.error('getElementsFrom err::', error.message)
        }
    }

    return (
        <ScrollView style={{ flexGrow: 1, backgroundColor: '#F7DCB9' }}>
            {
                storyContent && storyContent.map((story: StoryInterface, index: number) => {

                    return (
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Detail', { story }) }}
                            key={story.id}
                            style={{ borderWidth: 1, margin: 4, padding: 8, borderRadius: 8, backgroundColor: 'white' }}
                        >
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: '700', }}>{story.title}</Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon source="hand-clap" color={MD3Colors.tertiary50} size={20} />
                                    <Text style={{ fontSize: 15, fontWeight: '400', marginLeft: 8 }}>{story.score ?? 0}</Text>

                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Icon source="clock-time-two-outline" color={MD3Colors.tertiary50} size={20} />
                                    <Text style={{ fontSize: 15, fontWeight: '400', marginLeft: 8 }}>{formatTimestampToDate(story?.time as number)}</Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    );
};
