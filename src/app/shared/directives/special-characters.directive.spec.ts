import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { Regex } from "src/app/core/constants/regex";
import { MainComponent } from "src/app/modules/home/components/main/main.component";
import { SpecialCharactersDirective } from "./special-characters.directive";

describe('Testeo de Special Characters Directive', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let input: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [MainComponent, SpecialCharactersDirective]
    });

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
  });

  it('Deberia quitar simbolos especiales para el evento pegar', () => {
    const debugEl = fixture.debugElement;
    input = debugEl.query(By.directive(SpecialCharactersDirective)).nativeElement;

    fixture.detectChanges();

    const value = 'a¿b¿c';

    // Generando el objeto con la data
    const pasteData = new DataTransfer();
    pasteData.setData('text/plain', value);

    // Creando el evento
    const pasteEvent = new ClipboardEvent('paste', { clipboardData: pasteData });

    // Generando el evento y detectandolo
    input.dispatchEvent(pasteEvent);

    expect(debugEl.query(By.directive(SpecialCharactersDirective)).nativeElement.value).toBe(value.replace(Regex.ONLY_NORMAL_CHARACTERS_REPLACE, ''));
  });

  it('Deberia quitar simbolos especiales para el evento tecla presionada', () => {
    const debugEl = fixture.debugElement;
    input = debugEl.query(By.directive(SpecialCharactersDirective)).nativeElement;

    const value = '¿';

    // Creando el evento
    const keyboardEvent = new KeyboardEvent('keypress', { key: value });

    // Generando el evento y detectandolo
    input.dispatchEvent(keyboardEvent);
    fixture.detectChanges();

    expect(debugEl.query(By.directive(SpecialCharactersDirective)).nativeElement.value).toBe(value.replace(Regex.ONLY_NORMAL_CHARACTERS_REPLACE, ''));
  });
});
