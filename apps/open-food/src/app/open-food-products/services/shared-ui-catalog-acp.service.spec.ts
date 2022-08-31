import { TestBed } from '@angular/core/testing';

import { SharedUiCatalogAcpService } from './shared-ui-catalog-acp.service';

describe('SharedUiCatalogAcpService', () => {
  let service: SharedUiCatalogAcpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedUiCatalogAcpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
