import React, { useRef, useEffect, useState } from "react";
export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export function useMemoCompare(next, compare) {
  // Ref for storing previous value
  const previousRef = useRef();
  const previous = previousRef.current;
  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const isEqual = compare(previous, next);
  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true.
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  }, [next, isEqual, compare]);
  // Finally, if equal then return the previous value
  return isEqual ? previous : next;
}

export function useDebouncedCallback(callback, delay, options = {}) {
  const maxWait = options.maxWait;
  const maxWaitHandler = React.useRef(null);
  const maxWaitArgs = React.useRef([]);

  const leading = options.leading;
  const trailing = options.trailing === undefined ? true : options.trailing;
  const leadingCall = React.useRef(false);

  const functionTimeoutHandler = React.useRef(null);
  const isComponentUnmounted = React.useRef(false);

  const debouncedFunction = React.useRef(callback);
  debouncedFunction.current = callback;

  const cancelDebouncedCallback = React.useCallback(() => {
    clearTimeout(functionTimeoutHandler.current);
    clearTimeout(maxWaitHandler.current);
    maxWaitHandler.current = null;
    maxWaitArgs.current = [];
    functionTimeoutHandler.current = null;
    leadingCall.current = false;
  }, []);

  React.useEffect(
    () => () => {
      // we use flag, as we allow to call callPending outside the hook
      isComponentUnmounted.current = true;
    },
    []
  );

  const debouncedCallback = React.useCallback(
    (...args) => {
      maxWaitArgs.current = args;
      clearTimeout(functionTimeoutHandler.current);
      if (leadingCall.current) {
        leadingCall.current = false;
      }
      if (!functionTimeoutHandler.current && leading && !leadingCall.current) {
        debouncedFunction.current(...args);
        leadingCall.current = true;
      }

      functionTimeoutHandler.current = setTimeout(() => {
        let shouldCallFunction = true;
        if (leading && leadingCall.current) {
          shouldCallFunction = false;
        }
        cancelDebouncedCallback();

        if (!isComponentUnmounted.current && trailing && shouldCallFunction) {
          debouncedFunction.current(...args);
        }
      }, delay);

      if (maxWait && !maxWaitHandler.current && trailing) {
        maxWaitHandler.current = setTimeout(() => {
          const _args = maxWaitArgs.current;
          cancelDebouncedCallback();

          if (!isComponentUnmounted.current) {
            debouncedFunction.current.apply(null, _args);
          }
        }, maxWait);
      }
    },
    [maxWait, delay, cancelDebouncedCallback, leading, trailing]
  );

  const callPending = React.useCallback(() => {
    // Call pending callback only if we have anything in our queue
    if (!functionTimeoutHandler.current) {
      return;
    }

    debouncedFunction.current.apply(null, maxWaitArgs.current);
    cancelDebouncedCallback();
  }, [cancelDebouncedCallback]);

  // At the moment, we use 3 args array so that we save backward compatibility
  return [debouncedCallback, cancelDebouncedCallback, callPending];
}
