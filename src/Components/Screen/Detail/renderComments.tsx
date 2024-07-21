import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { StyleSheet } from "react-native";
import { HEIGHT, WIDTH } from '../../../constance';
import WebView from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import HackerNewsAPI from '../../../Model/api';



const RenderCommentsScreen: React.FC<any> = ({ }) => {
    const params: any = useRoute().params
    const [comments, setComments] = useState<any>()
    const [loadingCommentId, setLoadingCommentId] = useState<number | null>(null);
    const api = useMemo(() => new HackerNewsAPI(), []);
    const navigation: any = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: { backgroundColor: '#DEAC80' },
            title: 'Comments',

        });
    }, [navigation]);

    const handleRequestForKids = async (commentId: number) => {
        setLoadingCommentId(commentId);
        console.log('commentId', commentId)

        const comment = comments.find(c => c.id === commentId);
        console.log('handleRequestForKids comment::::', comment)
        if (comment?.kids && comment.kids.length > 0) {
            // setLoading(true);
            try {
                const promises = comment.kids.map(id => api.getStoryOrCommentById(id));
                const results = await Promise.all(promises);
                console.log('results.length', results?.length)
                setComments(prevComments => {

                    const existingComments = new Map(prevComments.map(c => [c.id, c]));
                    results.forEach(r => {
                        existingComments.set(r.id, r as any)
                    });

                    return Array.from(existingComments.values());

                });

                // setComments(results)
            } catch (error: any) {
                console.error("Error fetching reply comments:", error.message);
            } finally {
                // setLoading(false);
                setLoadingCommentId(null);

            }
        }
    };

    const renderCommentsHTML = (comments: any, loadingCommentId?: any) => {
        const renderedComments = new Set(); // Set để lưu các ID đã render

        // Hàm để tính màu nền dựa trên level
        const getBackgroundColor = (level: number) => {
            const baseColor = 230; // Màu nền ban đầu (nhạt)
            const colorStep = 20;  // Bước độ đậm màu cho mỗi level
            const colorValue = Math.max(baseColor - level * colorStep, 180); // Tính giá trị màu
            return `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
        };

        const renderComments = (parentComments: any, allComments: any, level = 0) => {
            return parentComments.map((comment: any) => {
                // Bỏ qua các comment đã render
                if (renderedComments.has(comment.id)) {
                    return '';
                }

                // Thêm comment vào Set đã render
                renderedComments.add(comment.id);

                // Lọc các comment con của comment hiện tại
                const childComments = allComments.filter((c: any) => c.parent === comment.id);

                // Render comment hiện tại và các comment con của nó
                return `
                    <div class="comment-container" style="margin-left: ${level * 2}px; background-color: ${getBackgroundColor(level)};">
                        <div class="comment-header">
                            <span class="comment-author">${comment.by != undefined && comment.by}</span>
                        </div>
                        <div class="comment-text">
                            ${comment.text != undefined && comment.text?.replace(/<pre><code>/g, '<div class="code-block">').replace(/<\/code><\/pre>/g, '</div>')}
                        </div>
                        ${!comment.deleted
                        ? `
                                <div class="comment-replies" onclick="window.ReactNativeWebView.postMessage(${comment.id})">
                                    <span>Reply: ${comment?.kids?.length || 0}</span>
                                    <span style="margin-left: 5px;">&#128172;</span>
                                </div>
                                ${childComments.length > 0 ? renderComments(childComments, allComments, level + 1) : ''}
                                ${loadingCommentId === comment.id ? '<div class="loading">Loading...</div>' : ''}
                            `
                        : ''}
                    </div>
                `;
            }).join('');
        };

        // Lấy các comment gốc (không có parent)
        const rootComments = comments.filter((comment: any) => comment.parent);

        return `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 10px;
                            background-color: #f9f9f9;
                            color: #333;
                        }
                        .comment-container {
                            border: 1px solid #ddd;
                            border-radius: 5px;
                            padding: 10px;
                            margin-bottom: 10px;
                            background-color: #fff;
                        }
                        .comment-header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 10px;
                        }
                        .comment-author {
                            font-weight: bold;
                        }
                        .comment-text {
                            white-space: pre-wrap;
                        }
                        .code-block {
                            background-color: #f1f1f1;
                            border: 1px solid #ddd;
                            border-radius: 5px;
                            padding: 10px;
                            margin-top: 10px;
                            overflow-x: auto;
                            font-family: monospace;
                        }
                        .comment-replies {
                            margin-top: 10px;
                            font-size: 0.9em;
                            color: #007bff;
                            cursor: pointer;
                        }
                        .loading {
                            margin-top: 10px;
                            font-size: 0.9em;
                            color: #007bff;
                        }
                    </style>
                </head>
                <body>
                    ${renderComments(rootComments, comments)}
                </body>
            </html>
        `;
    };
    useEffect(() => {
        if (params.comments) { setComments(params.comments) }
    }, [params])

    const handleMessage = (event: any) => {
        const commentId = parseInt(event.nativeEvent.data, 10);
        console.log('handleMessage commentId', commentId)
        handleRequestForKids(commentId);
    };


    return (
        <>
            {
                comments?.length > 0 && <WebView
                    originWhitelist={['*']}
                    source={{ html: renderCommentsHTML(comments) }}
                    style={styles.webView}
                    onMessage={handleMessage}
                />
            }
        </>
    );
};

export default RenderCommentsScreen;

const styles = StyleSheet.create({
    webView: {
        width: WIDTH,
        height: HEIGHT,
    },
    headerContainer: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    articleText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 12,
    },
    tableContent30res: {
        padding: 4,
        width: '30%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'grey',
    },
    tableContent70res: {
        width: '70%',
        flexDirection: 'row',
        borderColor: 'grey',
        borderLeftWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
