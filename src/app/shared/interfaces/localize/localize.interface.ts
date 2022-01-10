import { INavbarLocalize } from '@shared/interfaces/localize/navbar-localize.interface';
import { ISearchLocalize } from '@shared/interfaces/localize/search-localize.interface';
import { ICatalogLocalize } from '@shared/interfaces/localize/catalog-localize.interface';
import { IAboutLocalize } from '@shared/interfaces/localize/about-localize.interface';
import { ICartLocalize } from '@shared/interfaces/localize/cart-localize.interface';
import { IContactsLocalize } from '@shared/interfaces/localize/contacts-localize.interface';
import { IDeliveryLocalize } from '@shared/interfaces/localize/delivery-localize.interface';
import { IUserLocalize } from '@shared/interfaces/localize/user-localize.interface';
import { IFooterLocalize } from '@shared/interfaces/localize/footer-localize.interface';
import { INotFoundLocalize } from '@shared/interfaces/localize/not-found-localize.interface';
import { IProductCardLocalize } from '@shared/interfaces/localize/product-card-localize.interface';
import { IFilterLocalize } from '@shared/interfaces/localize/filter-localize.interface';
import { ISortingLocalize } from '@shared/interfaces/localize/sorting-localize.interface';
import { ILoginLocalize } from '@shared/interfaces/localize/login-localize.interface';

export interface ILocalize {
  navbar: INavbarLocalize;
  search: ISearchLocalize;
  catalog: ICatalogLocalize;
  about: IAboutLocalize;
  cart: ICartLocalize;
  contacts: IContactsLocalize;
  delivery: IDeliveryLocalize;
  user: IUserLocalize;
  footer: IFooterLocalize;
  notFound: INotFoundLocalize;
  productCard: IProductCardLocalize;
  filter: IFilterLocalize;
  sorting: ISortingLocalize;
  login: ILoginLocalize;
}
