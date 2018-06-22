import SignupSaga from './signup/sagas';
import LoginSaga from './login/sagas';
import BoardSaga from './board/sagas';
import DataSaga from './dashboard/sagas';
import ListSaga from './list/sagas';
import CardSaga from './card/sagas';

export default function* IndexSaga() {
	yield [
		SignupSaga(),
		LoginSaga(),
		DataSaga(),
		BoardSaga(),
		ListSaga(),
		CardSaga(),
	]
}

