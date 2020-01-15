export class Ingredient
{
    public units:string;
    constructor(public name:string, public quantity:number, public preparation:string,unitId:number,private inUnit?:string)
    {
        this.units = this.SetUnits(unitId)
    }

    SetUnits(id):string
    {
        if (id == 0)
        {
            return this.inUnit;
        }
        var unit = 'units'

        if(id == 1)
            { if (this.quantity == 1){unit = 'number'} else { unit = 'numbers'}}
        else if(id == 2)
            {if (this.quantity == 1){unit = 'gram'} else {  unit = 'grams'}}
        else if(id == 3)
            {  unit = 'ml'}
        else if(id == 4)
            {if (this.quantity == 1){ unit = 'tea spoon'} else {  unit = 'tea spoons'}}
        else if(id == 5)
        {   if (this.quantity == 1){unit = 'table spoon'} else {  unit = 'table spoons'}}
        return unit;
    }
}