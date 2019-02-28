import Component from 'lib/component';
import style from './search-input.css';

export default class SearchInput extends Component<HTMLInputElement> {
  public constructor() {
    super({ elementType: 'input', className: style.searchInput });
    this.$element.type = 'text';
    this.$element.placeholder = 'Enter a Search Query';
  }
}
