import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { timer } from 'rxjs';
import { takeUntil, filter, take } from 'rxjs/operators';


export const isDate = (x: any) =>
    Object.prototype.toString.call(x) === "[object Date]";





enum ControlType {
    Boolean = "boolean",
    String = "string",
    Array = "array",
    Object = "object",
    Date = "date"
}

export const getControlType = (val: any) => {
    if (Array.isArray(val)) {
        return ControlType.Array;
    } else if (typeof val === 'object') {
        return isDate(val) ? ControlType.Date : ControlType.Object;
    } else {
        return typeof val === 'boolean' ? ControlType.Boolean : ControlType.String;
    }
}

export const makeFormGroup = (obj: any): FormGroup => {
    let controls: any = {};
    const fb = new FormBuilder;

    Object.keys(obj).map((key: string) => {
        const val = obj[key];
        const typ = getControlType(val);

        if (typ === ControlType.Object) {
            controls[key] = makeFormGroup(val);
        } else if (typ === ControlType.Array) {
            controls[key] = makeFormArray(val);
        } else {
            controls[key] = val;
        }
    });
    return fb.group(controls);
}

export const makeFormArray = (arr: any[]): FormArray => {
    let controls: any = [];
    const fb = new FormBuilder;

    arr.forEach((ele: any) => {
        const typ = getControlType(ele);

        if (typ === ControlType.Object) {
            controls.push(makeFormGroup(ele));
        } else if (typ === ControlType.Array) {
            controls.push(makeFormArray(ele));
        } else {
            controls.push(ele);
        }
    });
    return fb.array(controls);
}

export const makeFormGroupFromObject = (properties: string[]): FormGroup => {
    // console.debug('=> makeFormGroup', properties);
    const frm: FormGroup = new FormGroup({});
    properties.filter(prop => prop !== 'urls').forEach(prop => frm.addControl(prop, new FormControl('')));
    return frm;
}

export const disableFormControls = (form: FormGroup, ctrls?: string[]): FormGroup => {
    Object.keys(form.controls).forEach(key => {
        form.controls[key].disable({ onlySelf: true });
    });

    return form;
}

export const waitUntilCondition = (arg: () => boolean) => {
    return timer(100, 100).pipe(takeUntil(timer(1500)), filter(arg), take(1));
}
