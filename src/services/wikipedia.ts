import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, concatMap } from 'rxjs/operators';
import config from 'config';

const DEFAULT_THUMB_SIZE = 100;

export interface ContentItem {
  title: string;
  thumbnail: {
    source: string;
  };
  snippet: string;
  fullurl: string;
}

interface SearchResult {
  pageid: string;
}

interface SearchResults {
  query: {
    search: SearchResult[];
  };
}

interface Page {
  pageid: string;
}

interface ImageResult {
  query: {
    pages: Page[];
  };
}

export default class WikipediaService {
  public searchUrl: string;
  public imageUrl: string;

  public constructor({ thumbSize = DEFAULT_THUMB_SIZE }: {thumbSize?: number} = {}) {
    const { base, searchQuery, imageQuery } = config.wikipediaApi;
    const baseUrl: string = `${base}?origin=*&`;
    this.searchUrl = `${baseUrl}${searchQuery}`;
    this.imageUrl = `${baseUrl}${imageQuery}`.replace('{thumbsize}', String(thumbSize));
  }

  public search = (query: string): Observable<ContentItem[]> => ajax
    .getJSON<SearchResults>(this.searchUrl.replace('{query}', query))
    .pipe(
      concatMap<SearchResults, Observable<ContentItem[]> | Promise<never[]>>(
        ({ query: { search } }: SearchResults) => {
          const pageIds: string[] = search.map(({ pageid }) => pageid);
          return pageIds.length
            ? this.getImages(pageIds).pipe(
              map(
                ({ query: { pages } }: ImageResult) => search.map(
                  (page: Page) => ({ ...page, ...pages[page.pageid] }),
                ),
              ),
            )
            : Promise.resolve([]);
        },
      ),
    );

  public getImages(pageIds: string[]): Observable<ImageResult> {
    return ajax.getJSON<ImageResult>(this.imageUrl.replace('{pageids}', pageIds.join('|')));
  }
}
