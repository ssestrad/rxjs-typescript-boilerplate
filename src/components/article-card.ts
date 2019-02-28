import Component from 'lib/component';
import { tif } from 'lib/template-operators';
import style from './article-card.css';

export interface ArticleCardContent {
  image: string;
  title: string;
  description: string;
  link: string;
}

export default class ArticleCard extends Component {
  public image: string;
  public description: string;

  public constructor(content: ArticleCardContent) {
    super({ className: style.articleCard });
    const {
      image,
      title,
      description,
      link,
    } = content;
    this.image = image;
    this.description = description;

    this.updateHtml(`
      ${tif(image)(`
        <div class='${style.thumbnail}'>
          <img src='${image}' alt='${title}' class='${style.image}' />
        </div>
      `)}
      <p class='${style.description}'>${description}</p>
      <a href='${link}' class='${style.link}' name='${title}' target='_blank'></a>
    `);
  }
}
