import { TestBed } from '@angular/core/testing';

import { LocalStorageServiceService } from './local-storage-service.service';

describe('LocalStorageServiceService', () => {
  let service: LocalStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data from login key in local storage', () => {
    const mockData = { username: 'testuser', password: 'testpassword' };
    localStorage.setItem('login', JSON.stringify(mockData));

    const result = service.getData();

    expect(result).toEqual(mockData);
  });

  it('should remove data from login key in local storage', () => {
    localStorage.setItem('login', JSON.stringify({}));

    service.removeData();

    expect(localStorage.getItem('login')).toBeNull();
  });

  it('should set customer data to customerlogin key in local storage', () => {
    const mockData = { customerId: 12345 };
    spyOn(localStorage, 'setItem');

    service.customerSetData(mockData);

    expect(localStorage.setItem).toHaveBeenCalledWith('customerlogin', JSON.stringify(mockData));
  });

  it('should get customer data from customerlogin key in local storage', () => {
    const mockData = { customerId: 12345 };
    localStorage.setItem('customerlogin', JSON.stringify(mockData));

    const result = service.customerGetData();

    expect(result).toEqual(mockData);
  });

  it('should remove customer data from customerlogin key in local storage', () => {
    localStorage.setItem('customerlogin', JSON.stringify({}));

    service.customerremoveData();

    expect(localStorage.getItem('customerlogin')).toBeNull();
  });


  

});
