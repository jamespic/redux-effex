'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

// @flow

/*:: type ReduxStore = {
  dispatch: Function,
  getState: () => Object
};*/
/*:: export type EffectParams = {
  action: Object,
  dispatch: (action: any) => void,
  getState: () => any,
  nextDispatchAsync: (actionType: string) => Promise<Object>,
};*/
/*:: export type EffectErrorHandlerParams = {
  action: Object,
  dispatch: (action: any) => void,
  getState: () => any,
  nextDispatchAsync: (actionType: string) => Promise<Object>,
  error: Object,
};*/
/*:: export type EffectFunction = (params: EffectParams) => Promise<any>;*/
/*:: export type EffectDefinition = {
  action: string,
  effect: EffectFunction,
  error?: (params: EffectErrorHandlerParams) => any
};*/
var effectsMiddleware = exports.effectsMiddleware = function effectsMiddleware(effectsDefinitionArray /*: Array<EffectDefinition>*/) {
  var _waiting = {};

  var _effects = effectsDefinitionArray.reduce(function (result, effectDefinition) {
    var actionType = effectDefinition.action;
    var effect = effectDefinition.effect;
    var error = effectDefinition.error;

    result[actionType] = result[actionType] || [];
    effect.__errorHandler = error;
    result[actionType].push(effect);
    return result;
  }, {});

  var nextDispatchAsync = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(actionType) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _waiting[actionType] = _waiting[actionType] || [];

              return _context.abrupt('return', new Promise(function (resolve) {
                _waiting[actionType].push(resolve);
              }));

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function nextDispatchAsync(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var callEffect = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(effect, action, store) {
      var params;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              params = {
                action: action,
                dispatch: store.dispatch,
                getState: store.getState,
                nextDispatchAsync: nextDispatchAsync
              };

              if (!effect.__errorHandler) {
                _context2.next = 12;
                break;
              }

              _context2.prev = 2;
              _context2.next = 5;
              return effect(params);

            case 5:
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](2);

              effect.__errorHandler(_extends({ error: _context2.t0 }, params));

            case 10:
              _context2.next = 13;
              break;

            case 12:
              effect(params);

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[2, 7]]);
    }));

    return function callEffect(_x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  return function (store /*: ReduxStore*/) {
    return function (next /*: Function*/) {
      return function (action /*: Object*/) {
        var result = next(action);
        var actionEffects = _effects[action.type];

        if (actionEffects) {
          actionEffects.forEach(function (effect) {
            callEffect(effect, action, store);
          });
        }

        if (typeof _waiting[action.type] !== 'undefined') {
          _waiting[action.type].forEach(function (resolve) {
            return resolve(action);
          });
          delete _waiting[action.type];
        }
        return result;
      };
    };
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJlZmZlY3RzTWlkZGxld2FyZSIsImVmZmVjdHNEZWZpbml0aW9uQXJyYXkiLCJfd2FpdGluZyIsIl9lZmZlY3RzIiwicmVkdWNlIiwicmVzdWx0IiwiZWZmZWN0RGVmaW5pdGlvbiIsImFjdGlvblR5cGUiLCJhY3Rpb24iLCJlZmZlY3QiLCJlcnJvciIsIl9fZXJyb3JIYW5kbGVyIiwicHVzaCIsIm5leHREaXNwYXRjaEFzeW5jIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjYWxsRWZmZWN0Iiwic3RvcmUiLCJwYXJhbXMiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwibmV4dCIsImFjdGlvbkVmZmVjdHMiLCJ0eXBlIiwiZm9yRWFjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOEJPLElBQU1BLGdEQUFvQixTQUFwQkEsaUJBQW9CLENBQUNDLHNCQUFELGdDQUFxRDtBQUNwRixNQUFJQyxXQUFXLEVBQWY7O0FBRUEsTUFBTUMsV0FBV0YsdUJBQXVCRyxNQUF2QixDQUE4QixVQUFDQyxNQUFELEVBQVNDLGdCQUFULEVBQThCO0FBQUEsUUFDN0RDLFVBRDZELEdBQy9CRCxnQkFEK0IsQ0FDckVFLE1BRHFFO0FBQUEsUUFDakRDLE1BRGlELEdBQy9CSCxnQkFEK0IsQ0FDakRHLE1BRGlEO0FBQUEsUUFDekNDLEtBRHlDLEdBQy9CSixnQkFEK0IsQ0FDekNJLEtBRHlDOztBQUUzRUwsV0FBT0UsVUFBUCxJQUFxQkYsT0FBT0UsVUFBUCxLQUFzQixFQUEzQztBQUNBRSxXQUFPRSxjQUFQLEdBQXdCRCxLQUF4QjtBQUNBTCxXQUFPRSxVQUFQLEVBQW1CSyxJQUFuQixDQUF3QkgsTUFBeEI7QUFDQSxXQUFPSixNQUFQO0FBQ0QsR0FOZ0IsRUFNZCxFQU5jLENBQWpCOztBQVFBLE1BQU1RO0FBQUEseURBQW9CLGlCQUFPTixVQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDeEJMLHVCQUFTSyxVQUFULElBQXVCTCxTQUFTSyxVQUFULEtBQXdCLEVBQS9DOztBQUR3QiwrQ0FHakIsSUFBSU8sT0FBSixDQUFZLG1CQUFXO0FBQzVCWix5QkFBU0ssVUFBVCxFQUFxQkssSUFBckIsQ0FBMEJHLE9BQTFCO0FBQ0QsZUFGTSxDQUhpQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFwQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFOOztBQVFBLE1BQU1DO0FBQUEsMERBQWEsa0JBQU9QLE1BQVAsRUFBZUQsTUFBZixFQUF1QlMsS0FBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2JDLG9CQURhLEdBQ0o7QUFDWFYsOEJBRFc7QUFFWFcsMEJBQVVGLE1BQU1FLFFBRkw7QUFHWEMsMEJBQVVILE1BQU1HLFFBSEw7QUFJWFA7QUFKVyxlQURJOztBQUFBLG1CQVFiSixPQUFPRSxjQVJNO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQkFVUEYsT0FBT1MsTUFBUCxDQVZPOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBWWJULHFCQUFPRSxjQUFQLFlBQXVCRCxtQkFBdkIsSUFBaUNRLE1BQWpDOztBQVphO0FBQUE7QUFBQTs7QUFBQTtBQWVmVCxxQkFBT1MsTUFBUDs7QUFmZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFiOztBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQU47O0FBbUJBLFNBQU8sVUFBQ0QsS0FBRDtBQUFBLFdBQXVCLFVBQUNJLElBQUQ7QUFBQSxhQUFvQixVQUFDYixNQUFELGVBQW9CO0FBQ3BFLFlBQUlILFNBQVNnQixLQUFLYixNQUFMLENBQWI7QUFDQSxZQUFJYyxnQkFBZ0JuQixTQUFTSyxPQUFPZSxJQUFoQixDQUFwQjs7QUFFQSxZQUFJRCxhQUFKLEVBQW1CO0FBQ2pCQSx3QkFBY0UsT0FBZCxDQUFzQixrQkFBVTtBQUM5QlIsdUJBQVdQLE1BQVgsRUFBbUJELE1BQW5CLEVBQTJCUyxLQUEzQjtBQUNELFdBRkQ7QUFHRDs7QUFFRCxZQUFJLE9BQU9mLFNBQVNNLE9BQU9lLElBQWhCLENBQVAsS0FBaUMsV0FBckMsRUFBa0Q7QUFDaERyQixtQkFBU00sT0FBT2UsSUFBaEIsRUFBc0JDLE9BQXRCLENBQThCO0FBQUEsbUJBQVdULFFBQVFQLE1BQVIsQ0FBWDtBQUFBLFdBQTlCO0FBQ0EsaUJBQU9OLFNBQVNNLE9BQU9lLElBQWhCLENBQVA7QUFDRDtBQUNELGVBQU9sQixNQUFQO0FBQ0QsT0FmNkI7QUFBQSxLQUF2QjtBQUFBLEdBQVA7QUFnQkQsQ0F0RE0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG50eXBlIFJlZHV4U3RvcmUgPSB7XG4gIGRpc3BhdGNoOiBGdW5jdGlvbixcbiAgZ2V0U3RhdGU6ICgpID0+IE9iamVjdFxufTtcblxuZXhwb3J0IHR5cGUgRWZmZWN0UGFyYW1zID0ge1xuICBhY3Rpb246IE9iamVjdCxcbiAgZGlzcGF0Y2g6IChhY3Rpb246IGFueSkgPT4gdm9pZCxcbiAgZ2V0U3RhdGU6ICgpID0+IGFueSxcbiAgbmV4dERpc3BhdGNoQXN5bmM6IChhY3Rpb25UeXBlOiBzdHJpbmcpID0+IFByb21pc2U8T2JqZWN0Pixcbn07XG5cbmV4cG9ydCB0eXBlIEVmZmVjdEVycm9ySGFuZGxlclBhcmFtcyA9IHtcbiAgYWN0aW9uOiBPYmplY3QsXG4gIGRpc3BhdGNoOiAoYWN0aW9uOiBhbnkpID0+IHZvaWQsXG4gIGdldFN0YXRlOiAoKSA9PiBhbnksXG4gIG5leHREaXNwYXRjaEFzeW5jOiAoYWN0aW9uVHlwZTogc3RyaW5nKSA9PiBQcm9taXNlPE9iamVjdD4sXG4gIGVycm9yOiBPYmplY3QsXG59O1xuXG5leHBvcnQgdHlwZSBFZmZlY3RGdW5jdGlvbiA9IChwYXJhbXM6IEVmZmVjdFBhcmFtcykgPT4gUHJvbWlzZTxhbnk+O1xuXG5leHBvcnQgdHlwZSBFZmZlY3REZWZpbml0aW9uID0ge1xuICBhY3Rpb246IHN0cmluZyxcbiAgZWZmZWN0OiBFZmZlY3RGdW5jdGlvbixcbiAgZXJyb3I/OiAocGFyYW1zOiBFZmZlY3RFcnJvckhhbmRsZXJQYXJhbXMpID0+IGFueVxufTtcblxuZXhwb3J0IGNvbnN0IGVmZmVjdHNNaWRkbGV3YXJlID0gKGVmZmVjdHNEZWZpbml0aW9uQXJyYXk6IEFycmF5PEVmZmVjdERlZmluaXRpb24+KSA9PiB7XG4gIGxldCBfd2FpdGluZyA9IHt9O1xuXG4gIGNvbnN0IF9lZmZlY3RzID0gZWZmZWN0c0RlZmluaXRpb25BcnJheS5yZWR1Y2UoKHJlc3VsdCwgZWZmZWN0RGVmaW5pdGlvbikgPT4ge1xuICAgIGxldCB7IGFjdGlvbjogYWN0aW9uVHlwZSwgZWZmZWN0LCBlcnJvciB9ID0gZWZmZWN0RGVmaW5pdGlvbjtcbiAgICByZXN1bHRbYWN0aW9uVHlwZV0gPSByZXN1bHRbYWN0aW9uVHlwZV0gfHwgW107XG4gICAgZWZmZWN0Ll9fZXJyb3JIYW5kbGVyID0gZXJyb3I7XG4gICAgcmVzdWx0W2FjdGlvblR5cGVdLnB1c2goZWZmZWN0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LCB7fSk7XG5cbiAgY29uc3QgbmV4dERpc3BhdGNoQXN5bmMgPSBhc3luYyAoYWN0aW9uVHlwZSkgPT4ge1xuICAgIF93YWl0aW5nW2FjdGlvblR5cGVdID0gX3dhaXRpbmdbYWN0aW9uVHlwZV0gfHwgW107XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBfd2FpdGluZ1thY3Rpb25UeXBlXS5wdXNoKHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgY2FsbEVmZmVjdCA9IGFzeW5jIChlZmZlY3QsIGFjdGlvbiwgc3RvcmUpID0+IHtcbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgYWN0aW9uLFxuICAgICAgZGlzcGF0Y2g6IHN0b3JlLmRpc3BhdGNoLFxuICAgICAgZ2V0U3RhdGU6IHN0b3JlLmdldFN0YXRlLFxuICAgICAgbmV4dERpc3BhdGNoQXN5bmMsXG4gICAgfTtcblxuICAgIGlmIChlZmZlY3QuX19lcnJvckhhbmRsZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGVmZmVjdChwYXJhbXMpO1xuICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICBlZmZlY3QuX19lcnJvckhhbmRsZXIoe2Vycm9yLCAuLi5wYXJhbXN9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWZmZWN0KHBhcmFtcyk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoc3RvcmU6IFJlZHV4U3RvcmUpID0+IChuZXh0OiBGdW5jdGlvbikgPT4gKGFjdGlvbjogT2JqZWN0KSA9PiB7XG4gICAgbGV0IHJlc3VsdCA9IG5leHQoYWN0aW9uKTtcbiAgICBsZXQgYWN0aW9uRWZmZWN0cyA9IF9lZmZlY3RzW2FjdGlvbi50eXBlXTtcblxuICAgIGlmIChhY3Rpb25FZmZlY3RzKSB7XG4gICAgICBhY3Rpb25FZmZlY3RzLmZvckVhY2goZWZmZWN0ID0+IHtcbiAgICAgICAgY2FsbEVmZmVjdChlZmZlY3QsIGFjdGlvbiwgc3RvcmUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBfd2FpdGluZ1thY3Rpb24udHlwZV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBfd2FpdGluZ1thY3Rpb24udHlwZV0uZm9yRWFjaChyZXNvbHZlID0+IHJlc29sdmUoYWN0aW9uKSk7XG4gICAgICBkZWxldGUgX3dhaXRpbmdbYWN0aW9uLnR5cGVdO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=