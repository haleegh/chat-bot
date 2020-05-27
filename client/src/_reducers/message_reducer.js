import {
    SAVE_MESSAGE,
} from '../_actions/types';

export default function (state = {messages:[]}, action) {
    switch (action.type) {
        case SAVE_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.payload)
                //action.payload = text를 가리킴, concat으로 내가 입력한 데이터를 화면에 띄움
            }
        default:
            return state;
    }
}