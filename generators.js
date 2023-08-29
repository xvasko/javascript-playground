function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

let generator = generateSequence();
typeof generator; // [object Generator]

let one = generator.next();
typeof one; // 'object' {value: 1, done: false}

let two = generator.next();
typeof two; // 'object' {value: 2, done: false}

let three = generator.next();
typeof three // 'object '{value: 3, done: true}


/*
 *  Generators are iterable
 */

let generator1 = generateSequence();

for(let value of generator1) {
  console.log(value); // 1, then 2, 3 is not returned as for .. of ignores the value with done: true 
}

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
    try {
       const user = yield call(Api.fetchUser, action.payload.userId);
       yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    } catch (e) {
       yield put({type: "USER_FETCH_FAILED", message: e.message});
    }
 }
 
 // Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
 // Allows concurrent fetches of user
 function* mySaga() {
   yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
 }
 