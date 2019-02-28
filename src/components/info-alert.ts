import Component from 'lib/component';
import style from './info-alert.css';

export default class ErrorAlert extends Component {
  public constructor(message = '') {
    super({ className: style.infoAlert });
    this.updateText(message);
  }
}
