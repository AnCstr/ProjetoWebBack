import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoItemComponent } from './pedido-item.component';

describe('PedidoItemComponent', () => {
  let component: ProdutoItemComponent;
  let fixture: ComponentFixture<ProdutoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdutoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
