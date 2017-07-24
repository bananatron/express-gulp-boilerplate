// Test helper functions

module.exports.testOutput = function(test_state) {
  if (test_state.failures > 0) {
    test_state.emoji = '⚠️';
  } else {
    test_state.emoji = '✅';
  }
  console.log(`Tests finished ${test_state.emoji}`);
  console.log(`Failures: ${test_state.failures}`);
  console.log(`Passes: ${test_state.passes}`);
}

module.exports.test = function(args) {
  // component, function_name, function_args, return_value
  if (args.component[args.function_name](args.function_args) === args.return_value) {
    args.test_state.passes += 1;
  } else {
    args.test_state.failures += 1;
  }
}
