import SignupSaga from './signup/sagas';
import LoginSaga from './login/sagas';
import BoardSaga from './board/sagas';

export default function* IndexSaga() {
	yield [
		SignupSaga(),
		LoginSaga(),
		BoardSaga(),
	]
}

