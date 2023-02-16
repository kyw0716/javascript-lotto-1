const { PRICE_UNIT } = require('../constants/constants');
const Lottos = require('../domain/model/Lottos');
const WinningNumbers = require('../domain/model/WinningNumbers');
const exception = require('../utils/exception');
const Console = require('../view/Console');
const inputView = require('../view/inputView');

class LottoGameController {
  #lottos;

  #numbers = {
    winningNumbers: [],
    bonusNumber: undefined,
  };

  inputPurchasePrice() {
    inputView.readPurchasePrice((purchasePriceInput) => {
      try {
        const lottoCount = this.calcalateLottoCount(purchasePriceInput);
        this.#lottos = new Lottos(lottoCount);
      } catch (error) {
        Console.print(error.message);
        this.inputPurchasePrice();
      }
    });
  }

  inputWinningNumbers() {
    inputView.readWinningNumbers((winningNumbersInput) => {
      try {
        this.#numbers.winningNumbers = new WinningNumbers(winningNumbersInput);
      } catch (error) {
        Console.print(error.message);
        this.inputWinningNumbers();
      }
    });
  }

  calcalateLottoCount(priceInput) {
    exception.checkPurchasePrice(priceInput);

    const price = Number(priceInput);

    return Math.floor(price / PRICE_UNIT);
  }
}

module.exports = LottoGameController;

new LottoGameController().inputWinningNumbers();
