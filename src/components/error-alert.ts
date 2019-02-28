import Component from 'lib/component';
import style from './error-alert.css';

export default class ErrorAlert extends Component {
  public constructor(message = 'Error') {
    super({ className: style.errorAlert });
    this.updateText(message);
  }
}
