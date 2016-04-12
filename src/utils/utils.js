// Utils for Atm parent component

import _ from 'lodash';

const Utils = {

  /**
   * isMultipleOf - checks the multiple of a number
   *
   * @param  {Number} withdraw - number to divide
   * @param  {Number} multiple - number which divides for
   * @return {Boolean}          -  true if is equals 0
   */
   isMultipleOf( withdraw, multiple ) {
    return withdraw % multiple === 0;
  },

  /**
   * isValueWithinRange - checks if a number is within a range
   *
   * @param  {Number} withdraw    - number to check
   * @param  {Number} minWithdraw - minimum number within the range
   * @param  {Number} maxWithdraw - maximum number within the range
   * @return {Boolean}
   */
   isValueWithinRange( withdraw, minWithdraw, maxWithdraw ) {
    return _.inRange( withdraw, minWithdraw, ( maxWithdraw + 1 ));
  },

  /**
   * isAnyMoneyLeft - checks if an amount is bigger than another
   *
   * @param  {Number} totalMoney - Initial amount
   * @param  {Number} withdraw   - Amount to compare with
   * @return {Boolean} - Returns true if the initial amount is bigger
   * or equal than the amount compared
   */
   isAnyMoneyLeft( totalMoney, withdraw ) {
    return totalMoney >= withdraw;
  },

  getSumCountNotes( notesContainer ) {
    return _.reduce( notesContainer, ( result, value, key ) => {
      result += ( value.count * key );
      return result;
    }, 0 );
  },

  /**
   *
   * areAnyNotesLeft - Checks the availability of notes for the amount specified for withdrawal.
   *
   * @param  {Number} withdraw   - Amount to check
   * @param  {Object} notesContainer - Object of objects containing the count for each note
   * @return {Boolean} -
   */
   areAnyNotesLeft( withdraw, notesContainer ) {

    let fifties = Math.floor(withdraw / 50);
    fifties = (fifties > notesContainer['50'].count) ? notesContainer['50'].count : fifties;
    let remainder = (withdraw - (fifties * 50));

    let twenties = Math.floor(remainder / 20);
    twenties = (twenties > notesContainer['20'].count) ? notesContainer['20'].count : twenties;
    remainder = (remainder - (twenties * 20));

    let tens = Math.floor(remainder / 10);
    tens = (tens > notesContainer['10'].count) ? notesContainer['10'].count : tens;
    remainder = (remainder - (tens * 10));

    if (remainder === 0){
      return true;
    } else {
      return false;
    }
   },

  /**
   *
   * calculateCountNotes - Calculates the total count for each type of notes required for withdrawal.
   *
   * @param  {Number} withdraw   - Amount to calculate
   * @param  {Object} notesContainer - ATM notes container (Originally used props)
   * @return {Object} - Object of objects containing the count for each note
   */
   calculateCountNotes( withdraw, props ) {
    let notesUsed = this.compareNotesResults(withdraw, props.atmData.notesContainer)

    return {
      50: {
        count: notesUsed['50'].count
      },
      20: {
        count: notesUsed['20'].count
      },
      10: {
        count: notesUsed['10'].count
      }
    };
  },

  compareNotesResults(amount, notesContainer){
    let preferredResult = this.preferredMethod(amount, notesContainer);
    return !preferredResult.change.count ? preferredResult : this.fallbackMethod(amount, notesContainer);
  },

  preferredMethod(amount, notesContainer){
    let available50 = notesContainer['50'].count;
    let available20 = notesContainer['20'].count;
    let available10 = notesContainer['10'].count;

    let remainder = amount;
    let remainderStart = amount;
    let remainderEnd = 0;

    let notes50Count = 0;
    let notes20Count = 0;
    let notes10Count = 0;

    while (remainderStart !== remainderEnd){
      remainderStart = remainder;

      if (remainder >= 50 && available50){
        available50 -= 1;
        remainder = remainder - 50;
        notes50Count += 1;
      }

      if (remainder >= 20 && available20){
        available20 -= 1;
        remainder = remainder - 20;
        notes20Count += 1;
      }

      if (remainder >= 10 && available10){
        available10 -= 1;
        remainder = remainder - 10;
        notes10Count += 1;
      }

      remainderEnd = remainder;

    }

    return {
      50: {
        count: notes50Count
      },
      20: {
        count: notes20Count
      },
      10: {
        count: notes10Count
      },
      change: {
        count: remainder
      }
    };
  },

  fallbackMethod(amount, notesContainer){
    let fifties = Math.floor(amount / 50);
    fifties = (fifties > notesContainer['50'].count) ? notesContainer['50'].count : fifties;
    let remainder = (amount - (fifties * 50));

    let twenties = Math.floor(remainder / 20);
    twenties = (twenties > notesContainer['20'].count) ? notesContainer['20'].count : twenties;
    remainder = (remainder - (twenties * 20));

    let tens = Math.floor(remainder / 10);
    tens = (tens > notesContainer['10'].count) ? notesContainer['10'].count : tens;
    remainder = (remainder - (tens * 10));

    return {
          50: {
            count: fifties
          },
          20: {
            count: twenties
          },
          10: {
            count: tens
          },
          change: {
            count: remainder
          }
        };
  },

  /**
   * subtractCountFromTotal - subtracts the needed count of notes from the initial amount of notes
   *
   * @param  {Object} withdrawnNotes - Object of objects for the calculated amount of notes needed,
   *  is the object result from calculateCountNotes
   *
   * @param  {Object} availableNotes - Object of objects with the count of each note
   * @return {Object} - Object containing the new amount of each note
   */
   subtractCountFromTotal( withdrawnNotes, availableNotes ) {
    const notes50Used = _.get( withdrawnNotes, '50' );
    const notes20Used = _.get( withdrawnNotes, '20' );
    const notes10Used = _.get( withdrawnNotes, '10' );

    const notes50available = _.get( availableNotes, '50' );
    const notes20available = _.get( availableNotes, '20' );
    const notes10available = _.get( availableNotes, '10' );

    return {
      50: {
        count: notes50available.count - notes50Used.count
      },
      20: {
        count: notes20available.count - notes20Used.count
      },
      10: {
        count: notes10available.count - notes10Used.count
      }
    };
  },

  /**
   * getValidationMessage - Returns the validation message for each withdraw
   *
   * @param  {Object} validationObject - Object with the withdraw validation,
   * is the object result from isWithdrawValid
   *
   * @return {String} - Message that depends on the object passed
   */
   getValidationMessage( validationObject ) {
    const validationMsg = {
      notesError: 'There is only notes of £10, £20 and £50',
      notesAvailability: 'We cannot provide your withdrawal with the notes currently available. Please choose another amount.',
      rangeError: 'Only withdraws between £300 and £10',
      amountError: `Sorry, but the availability is £${validationObject.totalMoney}`,
      balanceError: `Sorry, but your balance is £${validationObject.userMethod}`,
      withdrawError: 'You are not providing a valid withdraw',
      withdrawValidMsg: 'We are dealing with your request'
    };

    return validationMsg[ validationObject.message ];
  },

  /**
   * getScreenMessage - Returns a message for each screen
   *
   * @param  {Object} props - Global React props "location.pathname"
   * @return {String} - Message that depends on the url passed
   */
   getScreenMessage( props ) {
    const screenMsg = {
      '/': `Hello, ${props.atmData.user.name}, welcome to iDotBank`,
      '/withdraw': `${props.atmData.user.name}, do your withdraw`,
      '/balance': 'Balance screen'
    };

    return screenMsg[ props.location.pathname ];
  },

  /**
   * getBalanceMessage - Returns message with account balance screen
   *
   * @param  {Object} props - Global React props
   * @return {String} - User's account balance
   */
   getBalanceMessage( props ) {
    const { user } = props.atmData;
    return `${user.name}, your current balance account is £${user.accountBalance}`;
  },

  /**
   * getSuccessMessage - Returns message when a withdraw is completed
   *
   * @param  {Object} props - Global React props
   * @return {String} - Success message
   */
   getSuccessMessage( props ) {
    const { name } = props.atmData.user;
    return `${name}, don't forget to take your money!`;
  },

  /**
   * displayWithdrawnCount - Displays the amount of notes used for withdrawal.
   *
   * @param  {Object} withdrawnNotes - Total count of notes needed
   * @return {String} - Notes values
   */
   displayWithdrawnCount( withdrawnNotes ) {
    if ( withdrawnNotes[ '10' ] === undefined || withdrawnNotes['20'] === undefined || withdrawnNotes['50'] === undefined) {
      return;
    }
    let results = [];
    _.forOwn( withdrawnNotes, ( value, key ) => {
        results.push(value.count);
    });
    return `Notes dispensed:
    £10x ${results[0]},
    £20x ${results[1]},
    £50x ${results[2]}`;
  }
};

module.exports = Utils;
