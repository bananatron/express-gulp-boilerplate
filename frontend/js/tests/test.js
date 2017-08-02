// Tests live here
console.log('Tests running...');

// Global test state
let testState = {
 failures: 0,
 passes: 0
}

const test = require('./test_helper').test;
const testOutput = require('./test_helper').testOutput;

// Mocks
const fakeEvent = document.createEvent('Events');

// Components
test({
  component: require('../component.js'),
  function_name: 'doSomething',
  function_args: fakeEvent,
  return_value: 'lol',
  test_state: testState
});


// Output
testOutput(testState);