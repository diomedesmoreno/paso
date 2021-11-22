import * as jQuery from 'jquery';
import 'bootstrap-notify';

let $: any = jQuery;

export class MessengerNotification {
    public errors: any;

    constructor (){}

    public getDisplayErrors(error:any):void{
        let errores = Object.keys(error);
        errores.map((item,key)=>{
            $.notify({
                message: `El campo ${item}: ${error[item]}`
            }, {
                type: 'danger'
            });
        });
    }
    
    public getDisplayNotification(msj = 'Acción completada con exitos!', type = 'success'):void{
        $.notify({
            message: msj
        }, {
            type: type
        });
    }
}
