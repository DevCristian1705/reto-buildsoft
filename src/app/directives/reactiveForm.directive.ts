import { Directive, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[cbxReactiveForm]',
    standalone: true, 
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ReactiveFormDirective),
            multi: true
        }
    ]
})
export class ReactiveFormDirective implements ControlValueAccessor {

    @Input() firstTouchedValue= true;
    protected lastValue: any;
    private onChange!: (value: any) => void;
    private onTouched!: () => void;

    writeValue(value: any) {
    }

    registerOnChange(fn: (value: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
    }

    @HostListener('valueChanged', ['$event'])
    _handleInputEvent(value: any) {
        if (JSON.stringify(value) !== JSON.stringify(this.lastValue)) {
            this.lastValue = value;
            this.onChange(value);
            if(this.firstTouchedValue) this.onTouched();
        }
    }
    @HostListener('changed', ['$event'])
    _handleRadioEvent(value: any) {
        if (JSON.stringify(value) !== JSON.stringify(this.lastValue)) {
            this.lastValue = value;
            this.onChange(value);
            this.onTouched();
        }
    }

    @HostListener("focusout", ["$event.target.value"])
    _handleBlurEvent(value: any): void {
        this.onTouched();
    }
}
