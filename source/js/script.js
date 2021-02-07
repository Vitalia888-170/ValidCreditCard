var input = document.querySelector('input');
var message = document.getElementById('answer');
var manager = document.getElementById('manager');
var form = document.getElementById('form');
var error_msg = document.querySelector('small');
var form_control = input.parentElement;
var cardNumber = '';
var error = [];


form.addEventListener('submit', function (e) {

   const cardValue = input.value.trim();
   if (!cardValue) {
      setError('Field cannot be empty');
   }
   if (cardValue && cardValue.length < 14) {
      setError('Card should have minimum 13 digits');
   }
   if (cardValue.length > 16) {
      setError('Card shouldnt have more than 16 digits');
   }

   if (error.length > 0) {
      e.preventDefault();
      error_msg.innerText = error[0];
      error = [];
   } else {
      e.preventDefault(e);
      reverseValueCard();
   }

});

function setError(message) {
   form_control.className = 'form-control error';
   error.push(`${message}`);
}

//------------Luhn’s Algorithm-------------
function reverseValueCard() {
   let cardNumber = input.value;
   let reverseNumber = Array.from(cardNumber).reverse();
   total(reverseNumber);
   let timer = setTimeout(hideMessage, 5000);
   return () => clearTimeout(timer);
}

function total(str) {
   var sumEvenPosNum = 0;
   var sumOddPosNum = 0;
   for (let i = 0; i < str.length; i++) {
      if (i == 0 || i % 2 == 0) {
         sumEvenPosNum += Number(str[i]);
      } else {
         sumOddPosNum += getSumNumber(str[i] * 2);
      }
   }
   checkValidCard(sumEvenPosNum + sumOddPosNum);
}


function getSumNumber(num) {
   var sum = 0, tmp;
   if (num >= 10) {
      while (num) {
         tmp = num % 10;
         num = (num - tmp) / 10;
         sum += tmp;
      }
      return sum;
   } else {
      return num;
   }

}

function checkValidCard(sum) {
   if (sum % 10 == 0) {
      showMessage();
   } else {
      showMessage('NOT')
   }
}
//-------------------------
function showMessage(msg = '') {
   let cardType = checkCardType();
   manager.style.display = 'block';
   message.textContent = ` We identify card as ${cardType}. This card is ${msg} VALID!`;
}
function hideMessage() {
   manager.style.display = 'none';
}

function checkCardType() {
   let card = input.value;
   var re = {
      Electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
      Maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
      Dankort: /^(5019)\d+$/,
      Interpayment: /^(636)\d+$/,
      Unionpay: /^(62|88)\d+$/,
      VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
      MasterCard: /^5[1-5][0-9]{14}$/,
      Amex: /^3[47][0-9]{13}$/,
      Diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      Jcb: /^(?:2131|1800|35\d{3})\d{11}$/
   }
   for (let key in re) {
      if (re[key].test(card)) {
         return key
      }
   }
}


