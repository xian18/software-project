import { connect} from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import {sendMessageAction,startSocketAction} from '../../actions';
import { StoreState } from '../../reducers';

import Messenger from '../../components/Messenger';
import { Message} from '../../types';

const mapStateToProps = ({ Chat: {messages} }: StoreState): {
    messages:Message[];
} => ({
    messages,

});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            sendMessageAction,
            startSocketAction,
        },
        dispatch,
    );

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
export type Props = StateProps & DispatchProps;

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
