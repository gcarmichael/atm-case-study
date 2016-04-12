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

  /** TODO
   *
   * areAnyNotesLeft - Checks the availability of notes for the amount specified for withdrawal.
   *
   * @param  {Number} withdraw   - Amount to check
   * @param  {Object} notesContainer - Object of objects containing the count for each note
   * @return {Boolean} -
   *
   * This method is used inside getInvalidScenarios from the parent component,
   * so an error can be returned for the availability validation.
   *
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

    // const sumNotes = this.getSumCountNotes(notesContainer);

    // if (sumNotes > withdraw){
    //   return true;
    // } else {
    //   return false;
    // }

    // if ((withdraw / 50) > 1){
    //   if (notesContainer['50'].count !== 0){
    //     let notesToUse50 = Math.floor(withdraw / 50);
    //     notesContainer['50'].count = notesContainer['50'].count - notesToUse50;
    //     let remainder = withdraw - (notesToUse50 * 50);
    //     if ((remainder / 20) > 1){
    //       if (notesContainer['20'].count !== 0){
    //         let notesToUse20 = Math.floor(remainder / 20);
    //         notesContainer['20'].count = notesContainer['20'].count - notesToUse20;
    //         let remainder = remainder - (notesToUse20 * 20);
    //         if ((remainder / 10) > 1){
    //           if (notesContainer['10'].count !== 0){
    //             let notesToUse10 = Math.floor(withdraw / 10);
    //             notesContainer['10'].count = notesContainer['10'].count - notesToUse10;
    //             let remainder = withdraw - (notesToUse10 * 10);

    //             if (remainder === 0){
    //               return true;
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    // return false;

   },

  /**
   *
   * calculateCountNotes - Calculates the total count for each type of notes required for withdrawal.
   *
   * @param  {Number} withdraw   - Amount to calculate
   * @param  {Object} notesContainer - ATM notes container (Originally used props)
   * @return {Object} - Object of objects containing the count for each note
   *
   * The failing tests from "./test-utils/utilsSpec.js" can give you an idea about
   * how you can develop this method. This application relies on the follow data structure:
   * { 50: { count: 0 }, ... } idem for the rest of notes.
   *
   * "./src/components/atm.js" is the parent component for this React app,
   * there you can understand more how this app works.
   */
   calculateCountNotes( withdraw, props ) {
    let notes50Count = 0;
    let notes20Count = 0;
    let notes10Count = 0;

    while (withdraw > 0){
      if (withdraw >= 50 && props.atmData.notesContainer['50'].count !== 0){
        withdraw = withdraw - 50;
        notes50Count += 1;
      }
      if (withdraw >= 20 && props.atmData.notesContainer['20'].count !== 0){
        withdraw = withdraw - 20;
        notes20Count += 1;
      }
      if (withdraw >= 10 && props.atmData.notesContainer['10'].count !== 0){
        withdraw = withdraw - 10;
        notes10Count += 1;
      }
    }

    // while (withdraw >= 50){
    //   if(props.atmData.notesContainer['50'].count !== 0){
    //     withdraw = withdraw - 50;
    //     notes50Count += 1;
    //   }
    //   if (withdraw >= 20){
    //     if(props.atmData.notesContainer['20'].count !== 0){
    //       withdraw = withdraw - 20;
    //       notes20Count += 1;
    //     }
    //   }
    //   if (withdraw >= 10){
    //     if(props.atmData.notesContainer['10'].count !== 0){
    //       withdraw = withdraw - 10;
    //       notes10Count += 1;
    //     }
    //   }
    // }

    // while (withdraw >= 20){
    //     if(props.atmData.notesContainer['20'].count !== 0){
    //     withdraw = withdraw - 20;
    //     notes20Count += 1;
    //   }
    //   if (withdraw >= 10){
    //       if(props.atmData.notesContainer['10'].count !== 0){
    //       withdraw = withdraw -10;
    //       notes10Count += 1;
    //     }
    //   }
    // }

    // while (withdraw > 0){
    //     if(props.atmData.notesContainer['10'].count !== 0){
    //     withdraw = withdraw - 10;
    //     notes10Count += 1;
    //   }
    // }

    return {
      50: {
        count: notes50Count
      },
      20: {
        count: notes20Count
      },
      10: {
        count: notes10Count
      }
    };

      // var fifties = Math.floor(withdraw / 50);
      // fifties = (fifties > props.atmData.notesContainer['50'].count) ? props.atmData.notesContainer['50'].count : fifties;
      // var remainder = withdraw - (fifties * 50);

      // var twenties = Math.floor(remainder / 20);
      // twenties = (twenties > props.atmData.notesContainer['20'].count) ? props.atmData.notesContainer['20'].count : twenties;
      // remainder = remainder - (twenties * 20); 

      // var tens = Math.floor(remainder / 10);
      // tens = (tens > props.atmData.notesContainer['10'].count) ? props.atmData.notesContainer['10'].count : tens;
      // remainder = remainder - (tens * 10);

    // while (withdraw >= 0) {
    //   var notes50Needed = Math.floor(withdraw / 50);
    //   if (notes50Needed <= notesContainer && notes50Needed > 1) {
    //     withdraw -= 50;
    //     var notes50Count = notes50Count + 1;
    //     var notes20Needed = Math.floor(withdraw / 20);
    //     if (notes20Needed <= notesContainer && notes20Needed > 1) {
    //       withdraw -= 20;
    //       var notes20Count = notes20Count + 1;
    //       var notes10Needed = Math.floor(withdraw / 10);
    //       if (notes10Needed <= notesContainer && notes10Needed > 1) {
    //         withdraw -= 10;
    //         var notes10Count = notes10Count + 1;
    //       }
    //     }
    //   }
    // };

    // return {
    //   50: {
    //     count: fifties
    //   },
    //   20: {
    //     count: twenties
    //   },
    //   10: {
    //     count: tens
    //   }
    // };
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
      notesAvailability: 'The only available notes at this time are  ',
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
   * TODO Refactor this method
   *
   * This returns a poorly string, maybe it's because there are some tests missing?
   * Try to return something more meaningful, I was thinking about pictures of notes or ...
   *
   * displayWithdrawnCount - Displays the amount of notes used for withdrawal.
   *
   * @param  {Object} withdrawnNotes - Total count of notes needed
   * @return {String} - Notes values
   */
   displayWithdrawnCount( withdrawnNotes ) {
    if ( withdrawnNotes[ '10' ] === undefined || withdrawnNotes['20'] === undefined || withdrawnNotes['50'] === undefined) {
      return;
    }
    // let textResult = 'Notes dispensed: ';
    let results = [];
    _.forOwn( withdrawnNotes, ( value, key ) => {
      // textResult += `key=${key} value=${value.count}`;
        // textResult += `£${key}: x${value.count} | `;
        results.push(value.count);
    });
    // return textResult;
    return `Notes dispensed:
    £10x ${results[0]},
    £20x ${results[1]},
    £50x ${results[2]}`;
  }
};

module.exports = Utils;
