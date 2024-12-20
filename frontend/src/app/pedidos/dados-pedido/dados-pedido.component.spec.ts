import { ComponentFixture, TestBed } from '@angular/core/testing';
import {DadosPedidoComponent} from './dados-pedido.component';

describe('DadosPedidoComponent', () => {
  let component: DadosPedidoComponent;
  let fixture: ComponentFixture<DadosPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadosPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
