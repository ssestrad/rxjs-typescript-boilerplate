import { fromEvent, Observable } from 'rxjs';
import {
  map,
  filter,
  distinctUntilChanged,
  debounceTime,
  switchMap,
} from 'rxjs/operators';
import Component from 'lib/component';
import Logger from 'lib/logger';
import SearchInput from 'components/search-input';
import ErrorAlert from 'components/error-alert';
import InfoAlert from 'components/info-alert';
import ArticleCard from 'components/article-card';
import WikipediaService, { ContentItem } from 'services/wikipedia';
import style from './main.css';

const logger = new Logger('Main');

export default class Main extends Component {
  public searchInput = new SearchInput();
  public errorAlert = new ErrorAlert('Error loading data.');
  public noResultsAlert = new InfoAlert('No Results');
  public content = new Component();

  public constructor() {
    super({ className: style.mainView });
    this.setupViews();
    this.setupStreams();
  }

  private setupViews(): void {
    this.add(this.searchInput);
    this.errorAlert.hide();
    this.add(this.errorAlert);
    this.noResultsAlert.hide();
    this.add(this.noResultsAlert);
    this.add(this.content);
  }

  private setupStreams(): void {
    const searchStream$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(this.searchInput.$element, 'keyup');
    const wikipediaService = new WikipediaService();

    searchStream$.pipe(
      map((event: KeyboardEvent) => {
        const input = event.target as HTMLInputElement;
        return input.value;
      }),
      filter((text: string) => !!text),
      distinctUntilChanged(),
      debounceTime(250),
      switchMap(wikipediaService.search),
    ).subscribe(
      this.processSearchResults.bind(this),
      this.processSearchError.bind(this),
    );
  }

  private processSearchResults(results: ContentItem[]): void {
    this.errorAlert.hide();
    this.content.clear();
    if (results.length) {
      this.noResultsAlert.hide();
      this.addItems(results);
    } else {
      this.noResultsAlert.show();
    }
  }

  private processSearchError(err: string): void {
    this.errorAlert.show();
    logger.error(err);
  }

  private addItems(items: ContentItem[]): void {
    items.forEach(item => this.content.add(new ArticleCard({
      image: (item.thumbnail || {}).source,
      title: item.title,
      description: item.snippet,
      link: item.fullurl,
    })));
  }
}
