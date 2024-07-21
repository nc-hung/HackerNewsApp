import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Icon, MD3Colors, Text } from "react-native-paper";
import WebView from "react-native-webview";
import { StoryInterface } from "../../../Model/story";
import { HEIGHT, WIDTH } from "../../../constance";
import HackerNewsAPI from "../../../Model/api";
import { CommentInterface } from "../../../Model/comment";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import RenderCommentsBottomSheet from "./renderComments";
import { TouchableOpacity } from "react-native-gesture-handler";

export const formatTimestampToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('vi-VN');
};
export const DETAILSCREEN = (_props: any) => {
    const navigation: any = useNavigation();
    const params: any = useRoute().params;
    const [story, setStory] = useState<StoryInterface | null>(null);
    const api = useMemo(() => new HackerNewsAPI(), []);
    const [comments, setComments] = useState<CommentInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    // const [loadingCommentId, setLoadingCommentId] = useState<number | null>(null);



    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: { backgroundColor: '#DEAC80' },
            title: story?.title,
            headerTitleStyle: { fontSize: 14, fontWeight: '400' },
            headerRight: () => (
                <View style={styles.headerRight}>
                    <Text>{formatTimestampToDate(story?.time as number)}</Text>
                    <TouchableOpacity style={styles.headerButton}>
                        <Icon source="hand-clap" color={MD3Colors.tertiary50} size={20} />
                        <Text style={styles.headerButtonText}>{story?.score ?? 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => handleRequest(story?.kids as number[])}
                    >
                        <Icon source="chat" color={MD3Colors.tertiary50} size={20} />
                        <Text style={styles.headerButtonText}>{story?.kids?.length ?? 0}</Text>
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation, story]);

    useEffect(() => {
        if (params.story) {
            setStory(params.story);
            // handleRequest(params.story.kids || []);
        }
    }, [params]);

    useEffect(() => {
        if (comments?.length > 0) {
            navigation.navigate('RenderComments', { comments })
        }
    }, [comments]);

    const handleRequest = async (commentIds: number[]) => {
        setLoading(true);
        try {
            const promises = commentIds.map(id => api.getStoryOrCommentById(id));
            const results = await Promise.all(promises);
            setComments(prevComments => [...prevComments, ...results] as any);

        } catch (error: any) {
            console.error("Error fetching comments:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {story?.url && (
                <WebView
                    originWhitelist={['*']}
                    style={styles.webView}
                    source={{ uri: story.url }}
                />
            )}
            {loading && <ActivityIndicator size="large" color="#6363c2" />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButton: {
        flexDirection: 'row',
        marginLeft: 12,
    },
    headerButtonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    webView: {
        width: WIDTH - 32,
        height: HEIGHT,
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    // container: {
    //     flex: 1,
    //     padding: 24,
    //     backgroundColor: 'grey',
    //   },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'grey'
    },
});
