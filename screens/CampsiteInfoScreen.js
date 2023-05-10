import { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Button,
    Modal, 
    Rating
} from 'react-native';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    
    const handleSubmit = () => {
        const newComment = {
            author: author,
            rating: rating,
            text: text,
            campsiteId: campsite.id
        };
        console.log('newComment');
        setShowModal(!showModal);
    };

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    };

    const renderCommentItem = ({ item }) => {
        return (
            <View style={StyleSheet.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <FlatList
            data={comments.commentsArray.filter(
                (comment) => comment.campsiteId === campsite.id
            )}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
                marginHorizontal: 20,
                paddingVertical: 20
            }}
            ListHeaderComponent={
                <>
                    <RenderCampsite
                        campsite={campsite}
                        isFavorite={favorites.includes(campsite.id)}
                        markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                        onShowModal={() => setShowModal(!showModal)}
                    />

                    <Text style={styles.commentsTitle}>Comments</Text>
                    <Modal
                        animationType='slide'
                        transparent={false}
                        visible={showModal}
                        onRequestClose={() => setShowModal(!showModal)}
                    >
                        <View style={styles.modal}>
                            <Rating style={{paddingVertical: 10}}
                                type='star'
                                ratingCount={5}
                                startingValue={3}
                                imageSize={40}
                                showRating
                                onFinishRating={(rating)=> setRating(rating)}
                            />
                            <Input></Input>
                            <Input></Input>
                        </View>
                       

                        <View style={styles.modal}>
                            <View style={{ margin: 10 }}>
                                <Button
                                    onPress={() => {
                                        setShowModal(!showModal);
                                    }}
                                    color='#808080'
                                    title='Cancel'
                                />
                            </View>
                        </View>

                    </Modal>
                </>
            }

        />

    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen; 