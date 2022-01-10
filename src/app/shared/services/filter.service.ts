import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Endpoint } from '@shared/enums/endpoint.enum';
import { ICategory } from '@shared/interfaces/filter/category.interface';
import { ICompany } from '@shared/interfaces/filter/company.interface';
import { ICountry } from '@shared/interfaces/filter/country.interface';
import { IMaterial } from '@shared/interfaces/filter/material.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class FilterService {
  
  constructor(private http: HttpClient) {
  }
  
  public getCategory(): Observable<ICategory[]> {
    const url = `${environment.baseUrl}${Endpoint.category}`;
    
    return this.http.get<ICategory[]>(url);
  }
  
  public getCompany(): Observable<ICompany[]> {
    const url = `${environment.baseUrl}${Endpoint.company}`;
    
    return this.http.get<ICompany[]>(url);
  }
  
  public getCountry(): Observable<ICountry[]> {
    const url = `${environment.baseUrl}${Endpoint.country}`;
    
    return this.http.get<ICountry[]>(url);
  }
  
  public getMaterial(): Observable<IMaterial[]> {
    const url = `${environment.baseUrl}${Endpoint.material}`;
    
    return this.http.get<IMaterial[]>(url);
  }
}
  