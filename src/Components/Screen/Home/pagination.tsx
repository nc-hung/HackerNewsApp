import React from "react";
import { DataTable } from "react-native-paper";
import { HEIGHT, WIDTH } from "../../../constance";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ItemsType, Topic } from ".";
const numberOfItemsPerPageList = [10, 30, 50, 90];
const items = [
    {
        key: 1,
        name: 'Page 1',
    },
    {
        key: 2,
        name: 'Page 2',
    },
    {
        key: 3,
        name: 'Page 3',
    },
];

interface PaginationProps {
    open: boolean;
    topic: Topic;
    itemLength: number;
    items: ItemsType[];
    setOpen: any;
    setTopic: any;
    setItems: any;
    setItemLength: any;
}

export const Pagination: React.FC<PaginationProps> = ({
    itemLength, setItemLength,
    open, topic, setItems, setTopic, setOpen, items
}) => {

    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

    React.useEffect(() => {
        setPage(itemLength);
    }, [itemLength]);

    React.useEffect(() => {
        setPage(numberOfItemsPerPage);
        setItemLength(numberOfItemsPerPage);
        console.log('numberOfItemsPerPage', numberOfItemsPerPage)
    }, [numberOfItemsPerPage]);


    return (
        // <View style={{ position: 'relative' }}>

        //     <DataTable.Pagination
        //         style={{ height: HEIGHT * 0.11, borderWidth: 1, }}
        //         page={page}
        //         numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
        //         onPageChange={page => setPage(page)}
        //         label={`${from + 1}-${to} of ${items.length}`}
        //         showFastPaginationControls
        //         numberOfItemsPerPageList={numberOfItemsPerPageList}
        //         numberOfItemsPerPage={numberOfItemsPerPage}
        //         onItemsPerPageChange={onItemsPerPageChange}
        //         selectPageDropdownLabel={'Rows per page'}
        //     />

        // </View>
        <View style={{ width: WIDTH * 0.25, position: 'absolute', right: 0, top: -10, marginLeft: 8, }}>
            <DropDownPicker
                style={{ backgroundColor: '#DEAC80', borderWidth: 0 }}
                open={open}
                setOpen={setOpen}
                items={items}
                value={topic}
                setValue={setTopic}
                setItems={setItems}
                placeholder={'Choose a topic.'}
            />
        </View>
    )
}