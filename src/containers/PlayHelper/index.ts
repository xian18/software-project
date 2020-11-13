import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import {
    blockHighlightAction,
    setPlaceValueAction,
    clearPlaceValueAction,
    chooseDigitAction,
    toggleShowUnchangeableAction,
    updateSudokuAction,
    playRoundBackwardAction,
    clearBlockHighlightAction,
    toggleShowConflictAction,
    toggleShowOptionNumberAction,
} from '../../actions';
import { StoreState } from '../../reducers';

import PlayHelper from '../../components/PlayHelper';
import { PlaceValue } from '../../types';

const mapStateToProps = ({
    Game: { placeValue, complete },
}: StoreState): {
    placeValue: PlaceValue;
    complete: boolean;
} => ({
    placeValue,
    complete,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            blockHighlightAction,
            setPlaceValueAction,
            clearPlaceValueAction,
            chooseDigitAction,
            toggleShowUnchangeableAction,
            updateSudokuAction,
            playRoundBackwardAction,
            clearBlockHighlightAction,
            toggleShowConflictAction,
            toggleShowOptionNumberAction,
        },
        dispatch,
    );

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
export type Props = StateProps & DispatchProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlayHelper);
